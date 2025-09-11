
import { Router } from 'express';
import { authenticateToken } from '@/middleware/auth';
import { AppError, catchAsync } from '@/middleware/errorHandler';
import { validateCreatePayment, validateId } from '@/middleware/validation';
import prisma from '@/config/database';
import { logger } from '@/utils/logger';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '@/config/env';
import { sendEmail } from '@/services/emailService';

const router = Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID || '',
  key_secret: config.RAZORPAY_KEY_SECRET || '',
});

/**
 * @route   GET /api/payments/plans
 * @desc    Get all available plans
 * @access  Public
 */
router.get('/plans', catchAsync(async (req, res) => {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      currency: true,
      duration: true,
      features: true,
      planType: true,
    },
    orderBy: { price: 'asc' },
  });

  res.json({
    success: true,
    data: { plans },
  });
}));

/**
 * @route   POST /api/payments/create-order
 * @desc    Create a Razorpay order
 * @access  Private
 */
router.post('/create-order', authenticateToken, validateCreatePayment, catchAsync(async (req, res) => {
  const { planId, testId, amount, currency = 'INR' } = req.body;
  const userId = req.user!.id;

  // Validate that either planId or testId is provided
  if (!planId && !testId) {
    throw new AppError('Either planId or testId is required', 400);
  }

  // If planId is provided, verify the plan
  let plan = null;
  if (planId) {
    plan = await prisma.plan.findUnique({
      where: { id: planId, isActive: true },
    });
    
    if (!plan) {
      throw new AppError('Plan not found or inactive', 404);
    }
    
    if (plan.price !== amount) {
      throw new AppError('Amount does not match plan price', 400);
    }
  }

  // If testId is provided, verify the test
  let test = null;
  if (testId) {
    test = await prisma.test.findUnique({
      where: { id: testId },
      select: { id: true, title: true, price: true, isFree: true },
    });
    
    if (!test) {
      throw new AppError('Test not found', 404);
    }
    
    if (test.isFree || !test.price || test.price !== amount) {
      throw new AppError('Invalid test or amount', 400);
    }
  }

  try {
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: `order_${Date.now()}_${userId}`,
      notes: {
        userId,
        planId: planId || '',
        testId: testId || '',
      },
    });

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId,
        planId,
        testId,
        razorpayOrderId: razorpayOrder.id,
        amount,
        currency,
        status: 'CREATED',
      },
      select: {
        id: true,
        razorpayOrderId: true,
        amount: true,
        currency: true,
        status: true,
      },
    });

    logger.info(`Payment order created`, { 
      paymentId: payment.id, 
      razorpayOrderId: razorpayOrder.id, 
      userId,
      amount,
    });

    res.json({
      success: true,
      data: {
        payment,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      },
    });
  } catch (error: any) {
    logger.error('Razorpay order creation failed:', error);
    throw new AppError('Failed to create payment order', 500);
  }
}));

/**
 * @route   POST /api/payments/verify
 * @desc    Verify payment and update status
 * @access  Private
 */
router.post('/verify', authenticateToken, catchAsync(async (req, res) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError('Missing payment verification data', 400);
  }

  // Find payment record
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: razorpay_order_id },
    include: {
      user: { select: { email: true, name: true } },
      plan: { select: { name: true, duration: true } },
    },
  });

  if (!payment) {
    throw new AppError('Payment record not found', 404);
  }

  if (payment.userId !== req.user!.id) {
    throw new AppError('Unauthorized payment verification', 403);
  }

  // Verify signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', config.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    // Update payment status as failed
    await prisma.payment.update({
      where: { id: payment.id },
      data: { 
        status: 'FAILED',
        failureReason: 'Invalid signature',
      },
    });
    
    logger.warn(`Payment signature verification failed`, { 
      paymentId: payment.id,
      userId: payment.userId,
    });
    
    throw new AppError('Payment verification failed', 400);
  }

  try {
    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'COMPLETED',
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    // If this is a plan purchase, create entitlement
    if (payment.planId && payment.plan) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + payment.plan.duration);

      await prisma.entitlement.create({
        data: {
          userId: payment.userId,
          planId: payment.planId,
          paymentId: payment.id,
          expiresAt,
          isActive: true,
        },
      });

      logger.info(`Entitlement created for plan purchase`, {
        paymentId: payment.id,
        userId: payment.userId,
        planId: payment.planId,
        expiresAt,
      });
    }

    // Send confirmation email
    try {
      await sendEmail({
  to: payment.user.email,
  subject: "Payment Confirmation – PrernaTest",
  html: `
    <h2>Payment Successful ✅</h2>
    <p>Hi ${payment.user.name || "User"},</p>
    <p>We received your payment of <b>${payment.amount} ${payment.currency}</b>.</p>
    <p>Plan: ${payment.plan?.name || "Test Access"}</p>
    <p>Payment ID: ${razorpay_payment_id}</p>
  `,
});
    } catch (emailError) {
      logger.error('Failed to send payment confirmation email:', emailError);
      // Don't fail the payment verification for email issues
    }

    logger.info(`Payment verified successfully`, { 
      paymentId: payment.id, 
      userId: payment.userId,
      amount: payment.amount,
    });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        payment: {
          id: updatedPayment.id,
          status: updatedPayment.status,
          amount: updatedPayment.amount,
          currency: updatedPayment.currency,
        },
      },
    });
  } catch (error: any) {
    logger.error('Payment verification processing failed:', error);
    
    // Update payment status as failed
    await prisma.payment.update({
      where: { id: payment.id },
      data: { 
        status: 'FAILED',
        failureReason: error.message || 'Processing failed',
      },
    });
    
    throw new AppError('Payment processing failed', 500);
  }
}));

/**
 * @route   POST /api/payments/webhook
 * @desc    Handle Razorpay webhooks
 * @access  Public (but verified)
 */
router.post('/webhook', catchAsync(async (req, res) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  
  if (!signature) {
    throw new AppError('Missing signature', 400);
  }

  // Verify webhook signature
  const body = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', config.RAZORPAY_WEBHOOK_SECRET || '')
    .update(body)
    .digest('hex');

  if (expectedSignature !== signature) {
    logger.warn('Invalid webhook signature received');
    throw new AppError('Invalid signature', 400);
  }

  const { event, payload } = req.body;

  logger.info(`Webhook received: ${event}`, { payload: payload.payment || payload.order });

  try {
    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload.payment.entity);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;
        
      case 'order.paid':
        await handleOrderPaid(payload.order.entity);
        break;
        
      default:
        logger.info(`Unhandled webhook event: ${event}`);
    }

    res.json({ success: true });
  } catch (error: any) {
    logger.error(`Webhook processing failed for ${event}:`, error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}));

// Webhook event handlers
async function handlePaymentCaptured(paymentEntity: any) {
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: paymentEntity.order_id },
  });

  if (payment) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'COMPLETED',
        razorpayPaymentId: paymentEntity.id,
      },
    });
    
    logger.info(`Payment captured via webhook`, { paymentId: payment.id });
  }
}

async function handlePaymentFailed(paymentEntity: any) {
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: paymentEntity.order_id },
  });

  if (payment) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'FAILED',
        failureReason: paymentEntity.error_description || 'Payment failed',
      },
    });
    
    logger.info(`Payment failed via webhook`, { paymentId: payment.id });
  }
}

async function handleOrderPaid(orderEntity: any) {
  logger.info(`Order paid webhook received`, { orderId: orderEntity.id });
  // Additional order processing logic can be added here
}

/**
 * @route   GET /api/payments/history
 * @desc    Get user's payment history
 * @access  Private
 */
router.get('/history', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        plan: {
          select: {
            name: true,
            duration: true,
          },
        },
        entitlement: {
          select: {
            expiresAt: true,
            isActive: true,
          },
        },
      },
    }),
    prisma.payment.count({ where: { userId } }),
  ]);

  res.json({
    success: true,
    data: {
      payments,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: payments.length,
        totalPayments: total,
      },
    },
  });
}));

/**
 * @route   GET /api/payments/entitlements
 * @desc    Get user's active entitlements
 * @access  Private
 */
router.get('/entitlements', authenticateToken, catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const entitlements = await prisma.entitlement.findMany({
    where: { 
      userId,
      isActive: true,
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      expiresAt: true,
      createdAt: true,
      plan: {
        select: {
          id: true,
          name: true,
          description: true,
          features: true,
          planType: true,
        },
      },
      payment: {
        select: {
          amount: true,
          currency: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: { entitlements },
  });
}));

export default router;