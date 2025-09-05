import { Request, Response } from "express";
import { testService } from "@/services/testService";

export const listTests = async (req: Request, res: Response) => {
  const data = await testService.list(req.query);
  return res.json({ success: true, ...data });
};

export const getTest = async (req: Request, res: Response) => {
  const userId = req.user?.id; // allow null if not logged in
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Test ID is required" });
  }

  const data = await testService.get(id, userId);
  return res.json({ success: true, data });
};

export const createTest = async (req: Request, res: Response) => {
  const test = await testService.create(req.body);
  return res.status(201).json({ success: true, data: { test } });
};

export const updateTest = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Test ID is required" });
  }

  const test = await testService.update(id, req.body);
  return res.json({ success: true, data: { test } });
};

export const deleteTest = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Test ID is required" });
  }

  await testService.remove(id);
  return res.json({ success: true });
};

export const publishTest = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Test ID is required" });
  }

  const test = await testService.publish(id);
  return res.json({ success: true, data: { test } });
};

export const adminPreviewQuestions = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Test ID is required" });
  }

  const test = await testService.previewQuestions(id);
  return res.json({ success: true, data: { test } });
};

export const listCategories = async (_req: Request, res: Response) => {
  const categories = await testService.categories();
  return res.json({ success: true, data: { categories } });
};
