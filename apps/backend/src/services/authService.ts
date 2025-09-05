import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import prisma from "@/config/database";
import { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefresh";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

type SignupInput = {
  email: string;
  password: string;
  name: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function generateTokens(userId: string, email?: string, role?: string) {
   const payload = { id: userId, email, role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

class AuthService {
  setAuthCookie(res: Response, token: string) {
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }

  async signup({ email, password, name }: SignupInput) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name } });
    const tokens = generateTokens(user.id);
    return { user, ...tokens };
  }

  async login({ email, password }: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    if (!user.password) throw new Error("Password missing; use Google login");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const tokens = generateTokens(user.id);
    return { user, ...tokens };
  }

  async googleLogin(token: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) throw new Error("Invalid Google token");
    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email: payload.email, name: payload.name ?? "Google User" },
      });
    }
    const tokens = generateTokens(user.id);
    return { user, ...tokens };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return;
    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    // TODO: send via email
    console.log("Reset token:", resetToken);
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      throw new Error("Invalid or expired token");
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: payload.id }, data: { password: hashed } });
  }

  async refreshToken(refreshToken: string) {
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch {
      throw new Error("Invalid refresh token");
    }
    const tokens = generateTokens(payload.id);
    return tokens;
  }

  async logout(_userId: string, _refreshToken: string) {
    // Optionally blacklist refresh token
    return true;
  }
}

export const authService = new AuthService();
