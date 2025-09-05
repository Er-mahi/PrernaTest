// src/services/paymentService.ts
import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../config/database";
import { config } from "../config/env";

const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID ?? "",
  key_secret: config.RAZORPAY_KEY_SECRET ?? "",
});

export class PaymentService {
  async plans() {
    return prisma.plan.findMany({ where: { isActive: true }, orderBy: { price: "asc" } });
  }

  async createOrder(userId: string, { planId, testId, amount, currency = "INR" }: any) {
    if (!planId && !testId) throw new Error("Either planId or testId required");

    if (planId) {
      const plan = await prisma.plan.findUnique({ where: { id: planId, isActive: true } as any });
      if (!plan || plan.price !== amount) throw new Error("Invalid plan or amount");
    }
    if (testId) {
      const test = await prisma.test.findUnique({ where: { id: testId }, select: { isFree: true, price: true } });
      if (!test || test.isFree || !test.price || test.price !== amount) throw new Error("Invalid test or amount");
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `order_${Date.now()}_${userId}`,
      notes: { userId, planId: planId ?? "", testId: testId ?? "" },
    });

    const payment = await prisma.payment.create({
      data: { userId, planId, testId, razorpayOrderId: order.id, amount, currency, status: "CREATED" },
      select: { id: true, razorpayOrderId: true, amount: true, currency: true, status: true }
    });

    return { payment, razorpayOrder: { id: order.id, amount: order.amount, currency: order.currency } };
  }

  async verify(userId: string, payload: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload ?? {};
    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { user: true, plan: true },
    });
    if (!payment || payment.userId !== userId) throw new Error("Unauthorized");
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", config.RAZORPAY_KEY_SECRET ?? "").update(body).digest("hex");
    if (expected !== razorpay_signature) {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED", failureReason: "Invalid signature" } });
      throw new Error("Invalid signature");
    }

    const updated = await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "COMPLETED", razorpayPaymentId: razorpay_payment_id }
    });

    if (payment.planId && payment.plan) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + payment.plan.duration);
      await prisma.entitlement.create({ data: { userId, planId: payment.planId, paymentId: payment.id, expiresAt, isActive: true } });
    }

    return { payment: { id: updated.id, status: updated.status, amount: updated.amount, currency: updated.currency } };
  }

  async history(userId: string, { page, limit }: { page: number; limit: number }) {
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId }, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" },
        select: {
          id: true, amount: true, currency: true, status: true, createdAt: true,
          plan: { select: { name: true, duration: true } },
          entitlement: { select: { expiresAt: true, isActive: true } }
        }
      }),
      prisma.payment.count({ where: { userId } })
    ]);
    return { payments, pagination: { current: page, total: Math.ceil(total / limit), count: payments.length, totalPayments: total } };
  }

  async entitlements(userId: string) {
    return prisma.entitlement.findMany({
      where: { userId, isActive: true, expiresAt: { gt: new Date() } },
      select: { id: true, expiresAt: true, createdAt: true, plan: { select: { id: true, name: true, description: true, features: true, planType: true } }, payment: { select: { amount: true, currency: true, createdAt: true } } },
      orderBy: { createdAt: "desc" }
    });
  }
}
export const paymentService = new PaymentService();
