import { UserService } from "@/services/userService";
import { Request, Response } from "express";

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await UserService.profile(req.user!.id);
    return res.json({ success: true, data: { user } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateProfile(req.user!.id, req.body);
    return res.json({ success: true, data: { user } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
