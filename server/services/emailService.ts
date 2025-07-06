import { EnrollmentData } from "../storage/enrollmentStorage";

// Email service for sending receipts and confirmations
// Using console.log simulation for demonstration (replace with actual email service)

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

const PLAN_DETAILS = {
  starter: {
    name: "Starter Plan",
    price: 99,
    features: [
      "21-day course access",
      "All course materials",
      "Community support",
      "Course completion certificate",
    ],
  },
  pro: {
    name: "Pro Plan",
    price: 199,
    features: [
      "Everything in Starter",
      "2 One-on-one mentoring sessions",
      "Portfolio review and feedback",
      "Advanced project assignments",
      "Priority community support",
    ],
  },
  elite: {
    name: "Elite Plan",
    price: 399,
    features: [
      "Everything in Pro",
      "Unlimited mentoring sessions",
      "Job referral support",
      "Premium community access",
      "1-year extended support",
      "Industry networking events",
    ],
  },
};

function generateReceiptEmail(enrollment: EnrollmentData): EmailTemplate {
  const plan = PLAN_DETAILS[enrollment.selectedPlan];
  const enrollmentDate = new Date(enrollment.createdAt).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    },
  );

  const receiptId = `FBC-${enrollment.id.replace("ENR_", "")}`;

  const subject = `🎉 Payment Receipt - Frontend Bootcamp ${plan.name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frontend Bootcamp - Payment Receipt</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .receipt-box { background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #06b6d4; }
        .receipt-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .receipt-label { font-weight: 600; color: #475569; }
        .receipt-value { color: #1e293b; }
        .total-amount { background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .features { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .features h3 { color: #1e293b; margin-top: 0; }
        .features ul { margin: 0; padding-left: 20px; }
        .features li { margin: 8px 0; color: #475569; }
        .next-steps { background: #ecfdf5; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .contact-info { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; }
        .footer a { color: #06b6d4; text-decoration: none; }
        .success-badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; margin: 10px 0; }
        @media (max-width: 600px) { .container { margin: 10px; } .content { padding: 20px; } .receipt-row { flex-direction: column; } .receipt-value { margin-top: 5px; font-weight: 600; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Payment Successful!</h1>
            <p>Welcome to the Frontend Bootcamp Community</p>
            <div class="success-badge">✅ Enrollment Confirmed</div>
        </div>

        <div class="content">
            <h2>Hi ${enrollment.name}! 👋</h2>
            <p>Thank you for enrolling in our Frontend Bootcamp! Your payment has been successfully processed and your enrollment is now <strong>confirmed</strong>.</p>

            <div class="receipt-box">
                <h3 style="margin-top: 0; color: #1e293b;">📄 Payment Receipt</h3>
                <div class="receipt-row">
                    <span class="receipt-label">Receipt ID:</span>
                    <span class="receipt-value">${receiptId}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Student Name:</span>
                    <span class="receipt-value">${enrollment.name}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Email:</span>
                    <span class="receipt-value">${enrollment.email}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Phone:</span>
                    <span class="receipt-value">${enrollment.phone}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Plan:</span>
                    <span class="receipt-value">${plan.name}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Transaction ID:</span>
                    <span class="receipt-value">${enrollment.transactionId}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Date:</span>
                    <span class="receipt-value">${enrollmentDate}</span>
                </div>
            </div>

            <div class="total-amount">
                <h3 style="margin: 0;">💰 Total Amount Paid</h3>
                <h2 style="margin: 10px 0 0 0; font-size: 32px;">₹${plan.price}</h2>
            </div>

            <div class="features">
                <h3>🚀 What's Included in Your ${plan.name}</h3>
                <ul>
                    ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            </div>

            <div class="next-steps">
                <h3 style="margin-top: 0; color: #059669;">📋 Next Steps</h3>
                <p><strong>1. WhatsApp Group:</strong> You'll be added to our bootcamp WhatsApp group within 2 hours for important updates and community support.</p>
                <p><strong>2. Course Materials:</strong> Access links and study materials will be shared on WhatsApp before the course starts.</p>
                <p><strong>3. Course Start:</strong> Classes begin on <strong>July 10, 2024</strong> at 7:00 PM IST.</p>
                <p><strong>4. Preparation:</strong> Set up your development environment (we'll guide you!).</p>
            </div>

            <div class="contact-info">
                <h3 style="margin-top: 0; color: #d97706;">📞 Need Help?</h3>
                <p><strong>Support Team:</strong> GenZ Coding School</p>
                <p><strong>Phone/WhatsApp:</strong> +91 97725 46873</p>
                <p><strong>Email:</strong> genzcodingschool@gmail.com</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 9:00 PM IST</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 18px; color: #1e293b;"><strong>🎯 Ready to become a Frontend Developer?</strong></p>
                <p>Save this email for your records. We're excited to have you on this journey!</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>GenZ Coding School</strong></p>
            <p>Follow us:
                <a href="https://www.instagram.com/genz_coding_school/">Instagram</a> |
                <a href="https://www.youtube.com/@genzcodingschool">YouTube</a> |
                <a href="mailto:genzcodingschool@gmail.com">Email</a>
            </p>
            <p style="font-size: 12px; margin-top: 15px;">This is an automated receipt. Please save this email for your records.</p>
        </div>
    </div>
</body>
</html>`;

  const text = `
🎉 Frontend Bootcamp - Payment Receipt

Hi ${enrollment.name}!

Thank you for enrolling in our Frontend Bootcamp! Your payment has been successfully processed.

RECEIPT DETAILS:
================
Receipt ID: ${receiptId}
Student: ${enrollment.name}
Email: ${enrollment.email}
Phone: ${enrollment.phone}
Plan: ${plan.name}
Amount Paid: ₹${plan.price}
Transaction ID: ${enrollment.transactionId}
Date: ${enrollmentDate}

WHAT'S INCLUDED:
===============
${plan.features.map((feature) => `• ${feature}`).join("\n")}

NEXT STEPS:
==========
1. You'll be added to our WhatsApp group within 2 hours
2. Course materials will be shared on WhatsApp
3. Classes start on July 10, 2024 at 7:00 PM IST
4. Set up your development environment (we'll guide you)

CONTACT SUPPORT:
===============
Support Team: GenZ Coding School
Phone/WhatsApp: +91 97725 46873
Email: genzcodingschool@gmail.com
Support Hours: 9:00 AM - 9:00 PM IST

Save this email for your records. We're excited to have you on this journey!

---
GenZ Coding School
`;

  return { subject, html, text };
}

export class EmailService {
  // Simulate sending email (replace with actual email service like SendGrid, AWS SES, etc.)
  static async sendReceiptEmail(enrollment: EnrollmentData): Promise<boolean> {
    try {
      const emailTemplate = generateReceiptEmail(enrollment);

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log email details (replace with actual email sending)
      console.log(`
📧 EMAIL SENT TO: ${enrollment.email}
📝 SUBJECT: ${emailTemplate.subject}
💰 AMOUNT: ₹${PLAN_DETAILS[enrollment.selectedPlan].price}
📄 RECEIPT ID: FBC-${enrollment.id.replace("ENR_", "")}
🎯 PLAN: ${PLAN_DETAILS[enrollment.selectedPlan].name}
💳 TRANSACTION: ${enrollment.transactionId}
📅 DATE: ${new Date().toLocaleString("en-IN")}

✅ Receipt email sent successfully!
      `);

      // TODO: Replace this simulation with actual email service
      // Example with SendGrid:
      // const msg = {
      //   to: enrollment.email,
      //   from: 'praveen@frontendbootcamp.com',
      //   subject: emailTemplate.subject,
      //   text: emailTemplate.text,
      //   html: emailTemplate.html,
      // };
      // await sgMail.send(msg);

      return true;
    } catch (error) {
      console.error("Failed to send receipt email:", error);
      return false;
    }
  }

  static async sendDemoConfirmationEmail(
    enrollment: EnrollmentData,
  ): Promise<boolean> {
    try {
      // Demo confirmation email template
      const subject = "🎯 Demo Session Confirmed - Frontend Bootcamp";

      console.log(`
📧 DEMO CONFIRMATION EMAIL SENT TO: ${enrollment.email}
📝 SUBJECT: ${subject}
👨‍🏫 INSTRUCTOR: Praveen Kumawat
📞 CONTACT: +91 97725 36873
📅 DEMO TIMING: Within 2 hours via WhatsApp

✅ Demo confirmation email sent successfully!
      `);

      return true;
    } catch (error) {
      console.error("Failed to send demo confirmation email:", error);
      return false;
    }
  }
}
