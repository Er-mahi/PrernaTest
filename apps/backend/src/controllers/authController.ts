import { Request, Response } from "express";
import { authService } from "@/services/authService";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.signup(req.body);
    console.log("1")
    authService.setAuthCookie(res, accessToken);
    console.log("2")
    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    authService.setAuthCookie(res, accessToken);
    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.googleLogin(req.body.token);
    authService.setAuthCookie(res, accessToken);
    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const me = async (req: Request, res: Response) => {
  if (!req.user?.id) return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    const user = await authService.getProfile(req.user.id);
    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  return res.json({ success: true });
};

export const resetPassword = async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  return res.json({ success: true });
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const tokens = await authService.refreshToken(req.body.refreshToken);
    return res.json({ success: true, ...tokens });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  if (!req.user?.id) return res.status(401).json({ success: false, error: "Unauthorized" });
  await authService.logout(req.user.id, req.body.refreshToken);
  res.clearCookie("auth-token", { path: "/" });
  return res.json({ success: true });
};
