import { Request, Response } from "express";
import { attemptService } from "@/services/attemptService";

export const start = async (req: Request, res: Response) => {
  if (!req.params.testId) {
    return res.status(400).json({ success: false, message: "testId is required" });
  }
  const data = await attemptService.start(req.user!.id, req.params.testId as string);
  return res.status(201).json({ success: true, data });
};

export const getAttempt = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ 
      success: false, 
      message: "Attempt id is required" });
  }

  const data = await attemptService.getQuestions(req.user!.id, req.params.id as string);

  // ✅ Don't use .attempt — it's already flattened
  res.json({ success: true,
    attempt: data,
    userAnswers: data.userAnswers
   });
};




export const saveAnswer = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ success: false, message: "Attempt id is required" });
  }

  const { questionId, selectedOptionId, isMarkedForReview, timeSpent } = req.body ?? {};

  await attemptService.saveAnswer(req.user!.id, req.params.id as string, {
    questionId,
    selectedOptionId,
    isMarkedForReview,
    timeSpent,
  });

  return res.json({ success: true });
};

export const submit = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ success: false, message: "Attempt id is required" });
  }
  const result = await attemptService.submit(req.user!.id, req.params.id as string);
  return res.json({ success: true, data: { attempt: result } });
};

export const result = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ success: false, message: "Attempt id is required" });
  }
  const data = await attemptService.result(req.user!.id, req.params.id as string);
  return res.json({ success: true, data });
};
