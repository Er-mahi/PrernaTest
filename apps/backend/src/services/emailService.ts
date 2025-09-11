import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: `"PrernaTest" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

/**
 * Specialized email helpers
 */
export async function sendPaymentConfirmationEmail(to: string, amount: number) {
  return sendEmail({
    to,
    subject: "Payment Confirmation – PrernaTest",
    html: `
      <h2>Payment Successful ✅</h2>
      <p>We received your payment of <b>₹${amount}</b>.</p>
      <p>Thank you for supporting PrernaTest!</p>
    `,
  });
}

export async function sendOTPEmail(to: string, otp: string) {
  return sendEmail({
    to,
    subject: "Your OTP – PrernaTest",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
  });
}
