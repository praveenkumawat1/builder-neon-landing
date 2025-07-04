import { executeQuery } from "../config/database";

export interface EnrollmentData {
  name: string;
  email: string;
  phone: string;
  education?: string;
  experience?: string;
  motivation?: string;
  enrollmentType: "demo" | "join";
  selectedPlan: "starter" | "pro" | "elite";
  transactionId?: string;
}

export class EnrollmentService {
  // Create new enrollment
  static async createEnrollment(data: EnrollmentData) {
    const query = `
      INSERT INTO enrollments (
        name, email, phone, education, experience, motivation,
        enrollment_type, selected_plan, transaction_id, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const paymentStatus =
      data.enrollmentType === "demo"
        ? "completed"
        : data.transactionId
          ? "completed"
          : "pending";

    const params = [
      data.name,
      data.email,
      data.phone,
      data.education || null,
      data.experience || null,
      data.motivation || null,
      data.enrollmentType,
      data.selectedPlan,
      data.transactionId || null,
      paymentStatus,
    ];

    try {
      const result: any = await executeQuery(query, params);
      return {
        success: true,
        enrollmentId: result.insertId,
        message: "Enrollment created successfully",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          success: false,
          message: "Email already registered. Please use a different email.",
        };
      }
      throw error;
    }
  }

  // Get enrollment by email
  static async getEnrollmentByEmail(email: string) {
    const query = "SELECT * FROM enrollments WHERE email = ?";
    const results: any = await executeQuery(query, [email]);
    return results[0] || null;
  }

  // Get enrollment by ID
  static async getEnrollmentById(id: number) {
    const query = "SELECT * FROM enrollments WHERE id = ?";
    const results: any = await executeQuery(query, [id]);
    return results[0] || null;
  }

  // Update transaction ID
  static async updateTransactionId(email: string, transactionId: string) {
    const query = `
      UPDATE enrollments 
      SET transaction_id = ?, payment_status = 'completed', updated_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `;

    const result: any = await executeQuery(query, [transactionId, email]);
    return {
      success: result.affectedRows > 0,
      message:
        result.affectedRows > 0
          ? "Transaction updated successfully"
          : "Enrollment not found",
    };
  }

  // Get all enrollments (admin function)
  static async getAllEnrollments(limit: number = 50, offset: number = 0) {
    const query = `
      SELECT e.*, p.name as plan_name, p.price as plan_price
      FROM enrollments e
      LEFT JOIN plans p ON e.selected_plan = p.name
      ORDER BY e.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const results = await executeQuery(query, [limit, offset]);
    return results;
  }

  // Get enrollment statistics
  static async getEnrollmentStats() {
    const queries = {
      total: "SELECT COUNT(*) as count FROM enrollments",
      demos:
        "SELECT COUNT(*) as count FROM enrollments WHERE enrollment_type = 'demo'",
      paid: "SELECT COUNT(*) as count FROM enrollments WHERE enrollment_type = 'join' AND payment_status = 'completed'",
      pending:
        "SELECT COUNT(*) as count FROM enrollments WHERE payment_status = 'pending'",
      byPlan:
        "SELECT selected_plan, COUNT(*) as count FROM enrollments WHERE enrollment_type = 'join' GROUP BY selected_plan",
    };

    const [total, demos, paid, pending, byPlan]: any = await Promise.all([
      executeQuery(queries.total),
      executeQuery(queries.demos),
      executeQuery(queries.paid),
      executeQuery(queries.pending),
      executeQuery(queries.byPlan),
    ]);

    return {
      total: total[0].count,
      demos: demos[0].count,
      paid: paid[0].count,
      pending: pending[0].count,
      planBreakdown: byPlan,
    };
  }
}
