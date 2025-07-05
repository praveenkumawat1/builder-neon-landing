// In-memory storage for enrollments on the server
// Data is stored in memory during server runtime

export interface EnrollmentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  education?: string;
  experience?: string;
  motivation?: string;
  enrollmentType: "demo" | "join";
  selectedPlan: "starter" | "pro" | "elite";
  transactionId?: string;
  paymentStatus: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
}

// In-memory storage
let enrollments: EnrollmentData[] = [];

// Get enrollments from memory
const getStoredEnrollments = (): EnrollmentData[] => {
  return [...enrollments]; // Return a copy to prevent direct modification
};

// Save enrollments to memory
const saveEnrollments = (updatedEnrollments: EnrollmentData[]): void => {
  enrollments = [...updatedEnrollments];
};

export class EnrollmentStorage {
  static create(
    data: Omit<
      EnrollmentData,
      "id" | "createdAt" | "updatedAt" | "paymentStatus"
    >,
  ): EnrollmentData {
    const enrollments = getStoredEnrollments();

    const enrollment: EnrollmentData = {
      ...data,
      id: `ENR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      paymentStatus:
        data.enrollmentType === "demo"
          ? "completed"
          : data.transactionId
            ? "completed"
            : "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ipAddress: data.ipAddress || "unknown",
      userAgent: data.userAgent || "unknown",
      source: data.source || "direct",
    };

    enrollments.push(enrollment);
    saveEnrollments(enrollments);
    console.log(
      `📝 New enrollment permanently stored: ${enrollment.email} (${enrollment.enrollmentType})`,
    );
    return enrollment;
  }

  static findByEmail(email: string): EnrollmentData | null {
    const enrollments = getStoredEnrollments();
    return enrollments.find((e) => e.email === email) || null;
  }

  static updateTransaction(email: string, transactionId: string): boolean {
    const enrollments = getStoredEnrollments();
    const enrollment = enrollments.find((e) => e.email === email);
    if (enrollment) {
      enrollment.transactionId = transactionId;
      enrollment.paymentStatus = "completed";
      enrollment.updatedAt = new Date().toISOString();
      saveEnrollments(enrollments);
      console.log(
        `💳 Transaction updated permanently: ${email} - ${transactionId}`,
      );
      return true;
    }
    return false;
  }

  static getAll(): EnrollmentData[] {
    const enrollments = getStoredEnrollments();
    return [...enrollments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  static getStats() {
    const enrollments = getStoredEnrollments();
    const total = enrollments.length;
    const demos = enrollments.filter((e) => e.enrollmentType === "demo").length;
    const paid = enrollments.filter(
      (e) => e.enrollmentType === "join" && e.paymentStatus === "completed",
    ).length;
    const pending = enrollments.filter(
      (e) => e.paymentStatus === "pending",
    ).length;

    const planBreakdown = enrollments
      .filter((e) => e.enrollmentType === "join")
      .reduce(
        (acc, e) => {
          acc[e.selectedPlan] = (acc[e.selectedPlan] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    // Advanced analytics
    const today = new Date();
    const last7Days = enrollments.filter((e) => {
      const enrollDate = new Date(e.createdAt);
      const diffTime = today.getTime() - enrollDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length;

    const last30Days = enrollments.filter((e) => {
      const enrollDate = new Date(e.createdAt);
      const diffTime = today.getTime() - enrollDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    }).length;

    return {
      total,
      demos,
      paid,
      pending,
      planBreakdown,
      last7Days,
      last30Days,
      conversionRate: demos > 0 ? Math.round((paid / demos) * 100) : 0,
      averageValue: paid > 0 ? Math.round((paid * 199) / paid) : 0, // Assuming average plan price
    };
  }

  static clear(): void {
    enrollments = [];
    console.log("🗑️ All enrollment data cleared from memory");
  }

  static exportData(): string {
    const enrollments = getStoredEnrollments();
    return JSON.stringify(enrollments, null, 2);
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (Array.isArray(data)) {
        saveEnrollments(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }
}
