// Temporary in-memory storage for enrollments
// This will be replaced with online database later

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
}

// In-memory storage
let enrollments: EnrollmentData[] = [];

export class EnrollmentStorage {
  static create(
    data: Omit<
      EnrollmentData,
      "id" | "createdAt" | "updatedAt" | "paymentStatus"
    >,
  ): EnrollmentData {
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
    };

    enrollments.push(enrollment);
    console.log(
      `📝 New enrollment stored: ${enrollment.email} (${enrollment.enrollmentType})`,
    );
    return enrollment;
  }

  static findByEmail(email: string): EnrollmentData | null {
    return enrollments.find((e) => e.email === email) || null;
  }

  static updateTransaction(email: string, transactionId: string): boolean {
    const enrollment = enrollments.find((e) => e.email === email);
    if (enrollment) {
      enrollment.transactionId = transactionId;
      enrollment.paymentStatus = "completed";
      enrollment.updatedAt = new Date().toISOString();
      console.log(`💳 Transaction updated: ${email} - ${transactionId}`);
      return true;
    }
    return false;
  }

  static getAll(): EnrollmentData[] {
    return [...enrollments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  static getStats() {
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

    return {
      total,
      demos,
      paid,
      pending,
      planBreakdown,
    };
  }

  static clear(): void {
    enrollments = [];
    console.log("🗑️ All enrollment data cleared");
  }
}
