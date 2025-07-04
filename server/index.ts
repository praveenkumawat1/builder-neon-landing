import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { EnrollmentStorage } from "./storage/enrollmentStorage";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log("🚀 Frontend Bootcamp server starting with in-memory storage...");

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Frontend Bootcamp server!" });
  });

  app.get("/api/demo", handleDemo);

  // Enrollment endpoints with in-memory storage
  app.post("/api/enrollment", (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        education,
        experience,
        motivation,
        enrollmentType,
        selectedPlan,
        transactionId,
      } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !enrollmentType || !selectedPlan) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Check if email already exists
      const existing = EnrollmentStorage.findByEmail(email);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // Create new enrollment
      const enrollment = EnrollmentStorage.create({
        name,
        email,
        phone,
        education,
        experience,
        motivation,
        enrollmentType,
        selectedPlan,
        transactionId,
      });

      res.status(201).json({
        success: true,
        message: "Enrollment created successfully",
        enrollmentId: enrollment.id,
        data: {
          name: enrollment.name,
          email: enrollment.email,
          enrollmentType: enrollment.enrollmentType,
          selectedPlan: enrollment.selectedPlan,
        },
      });
    } catch (error) {
      console.error("Enrollment creation error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  app.put("/api/enrollment/:email/transaction", (req, res) => {
    try {
      const { email } = req.params;
      const { transactionId } = req.body;

      if (!transactionId) {
        return res.status(400).json({
          success: false,
          message: "Transaction ID is required",
        });
      }

      const success = EnrollmentStorage.updateTransaction(email, transactionId);

      if (success) {
        res.json({
          success: true,
          message: "Transaction updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
    } catch (error) {
      console.error("Transaction update error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Admin endpoints
  app.get("/api/admin/enrollments", (_req, res) => {
    try {
      const enrollments = EnrollmentStorage.getAll();
      res.json({
        success: true,
        data: enrollments,
        count: enrollments.length,
      });
    } catch (error) {
      console.error("Get enrollments error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  app.get("/api/admin/stats", (_req, res) => {
    try {
      const stats = EnrollmentStorage.getStats();
      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Admin data management
  app.delete("/api/admin/enrollments", (_req, res) => {
    try {
      EnrollmentStorage.clear();
      res.json({
        success: true,
        message: "All enrollment data cleared",
      });
    } catch (error) {
      console.error("Clear data error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    const stats = EnrollmentStorage.getStats();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      message: "Frontend Bootcamp server is running!",
      storage: "in-memory",
      enrollments: stats.total,
    });
  });

  return app;
}
