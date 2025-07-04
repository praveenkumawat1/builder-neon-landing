import { RequestHandler } from "express";
import {
  EnrollmentService,
  EnrollmentData,
} from "../services/enrollmentService";
import { z } from "zod";

// Validation schema for enrollment data
const enrollmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email format").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  education: z.string().max(100).optional(),
  experience: z.string().max(100).optional(),
  motivation: z.string().max(1000).optional(),
  enrollmentType: z.enum(["demo", "join"]),
  selectedPlan: z.enum(["starter", "pro", "elite"]).default("starter"),
  transactionId: z.string().max(255).optional(),
});

// Create new enrollment
export const createEnrollment: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = enrollmentSchema.parse(req.body);

    // Create enrollment
    const result = await EnrollmentService.createEnrollment(validatedData);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        enrollmentId: result.enrollmentId,
        data: {
          name: validatedData.name,
          email: validatedData.email,
          enrollmentType: validatedData.enrollmentType,
          selectedPlan: validatedData.selectedPlan,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error: any) {
    console.error("Enrollment creation error:", error);

    if (error.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

// Get enrollment by email
export const getEnrollment: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email parameter is required",
      });
    }

    const enrollment = await EnrollmentService.getEnrollmentByEmail(email);

    if (enrollment) {
      res.json({
        success: true,
        data: enrollment,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }
  } catch (error) {
    console.error("Get enrollment error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update transaction ID
export const updateTransaction: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const { transactionId } = req.body;

    if (!email || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Email and transaction ID are required",
      });
    }

    const result = await EnrollmentService.updateTransactionId(
      email,
      transactionId,
    );

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(404).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Update transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get enrollment statistics (admin)
export const getEnrollmentStats: RequestHandler = async (req, res) => {
  try {
    const stats = await EnrollmentService.getEnrollmentStats();

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
};

// Get all enrollments (admin)
export const getAllEnrollments: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const enrollments = await EnrollmentService.getAllEnrollments(
      limit,
      offset,
    );

    res.json({
      success: true,
      data: enrollments,
      pagination: {
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Get all enrollments error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
