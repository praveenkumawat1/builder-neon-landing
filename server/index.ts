import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Frontend Bootcamp server!" });
  });

  app.get("/api/demo", handleDemo);

  // Temporary enrollment endpoint (will be replaced with online database)
  app.post("/api/enrollment", (_req, res) => {
    res.json({
      success: true,
      message: "Enrollment received. Online database integration pending.",
      enrollmentId: Date.now(),
    });
  });

  app.put("/api/enrollment/:email/transaction", (_req, res) => {
    res.json({
      success: true,
      message: "Transaction updated. Online database integration pending.",
    });
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      message: "Frontend Bootcamp server is running!",
    });
  });

  return app;
}
