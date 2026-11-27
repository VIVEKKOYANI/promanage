
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

const app = express();

// Hide Express fingerprint
app.disable("x-powered-by");

// Security headers
app.use(helmet());

// Allow only the configured frontend
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Request body limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Cookie support
app.use(cookieParser());

// Request logging only in development
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ProManage API is running",
    timestamp: new Date().toISOString()
  });
});

export default app;
