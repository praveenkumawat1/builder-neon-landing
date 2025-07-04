import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { testConnection, initializeDatabase } from "./config/database";
import {
  createEnrollment,
  getEnrollment,
  updateTransaction,
  getEnrollmentStats,
  getAllEnrollments,
} from "./routes/enrollment";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database on startup
  initializeDatabase()
    .then(() => {
      console.log("🚀 Database ready for Frontend Bootcamp!");
    })
    .catch((error) => {
      console.error("💥 Database initialization failed:", error);
    });

  // Test database connection
  testConnection();

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Frontend Bootcamp server!" });
  });

  app.get("/api/demo", handleDemo);

  // Enrollment routes
  app.post("/api/enrollment", createEnrollment);
  app.get("/api/enrollment/:email", getEnrollment);
  app.put("/api/enrollment/:email/transaction", updateTransaction);
  app.get("/api/admin/enrollments", getAllEnrollments);
  app.get("/api/admin/stats", getEnrollmentStats);

  // Health check with database status
  app.get("/api/health", async (_req, res) => {
    const dbStatus = await testConnection();
    res.json({
      status: "healthy",
      database: dbStatus ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
      message: "Frontend Bootcamp server is running!",
    });
  });

  return app;
}
