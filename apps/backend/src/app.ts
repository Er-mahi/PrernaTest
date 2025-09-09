import express from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "@/config/corsConfig";
// routes
import authRoutes from "@/routes/auth";
import testRoutes from "@/routes/tests";
import attemptRoutes from "@/routes/attempts";
import resultsRoutes from "./routes/results";
import userRoutes from "@/routes/users";
import paymentRoutes from "@/routes/payments";

const app = express();

// CORS first
app.use(corsMiddleware);

// Cookies
app.use(cookieParser());

// JSON and URL-encoded parsers (no verify here)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health and API meta
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || "1.0.0",
  });
});
app.get("/api", (_req, res) => {
  res.json({
    message: "TestMitra API v1.0.0",
    version: "1.0.0",
    documentation: "/api/docs",
    endpoints: {
      auth: "/api/auth",
      tests: "/api/tests",
      attempts: "/api/attempts",
      users: "/api/users",
      payments: "/api/payments",
    },
  });
});

// Mount webhook with raw body ONLY for that route
// If you have a webhook, do like:
// app.post("/api/payments/webhook", express.raw({ type: "*/*" }), paymentsWebhookHandler);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// notFound and error handlers at the end if desired
// app.use(notFoundHandler);
// app.use(errorHandler);

export default app;
