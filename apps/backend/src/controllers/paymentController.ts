import { Request, Response } from "express";
import { paymentService } from "@/services/paymentService";

export const plans = async (_req: Request, res: Response) => {
  const data = await paymentService.plans();
  return res.json({ success: true, data: { plans: data } });
};

export const createOrder = async (req: Request, res: Response) => {
  const { planId, testId, amount, currency } = req.body ?? {};
  const data = await paymentService.createOrder(req.user!.id, { planId, testId, amount, currency });
  return res.json({ success: true, data });
};

export const verify = async (req: Request, res: Response) => {
  const data = await paymentService.verify(req.user!.id, req.body);
  return res.json({ success: true, data });
};

export const history = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const data = await paymentService.history(req.user!.id, { page, limit });
  return res.json({ success: true, data });
};
