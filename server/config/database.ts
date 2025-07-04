import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "frontend_bootcamp",
  port: parseInt(process.env.DB_PORT || "3306"),
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    // Create enrollments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        education VARCHAR(100),
        experience VARCHAR(100),
        motivation TEXT,
        enrollment_type ENUM('demo', 'join') NOT NULL,
        selected_plan ENUM('starter', 'pro', 'elite') DEFAULT 'starter',
        transaction_id VARCHAR(255),
        payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create plans table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        features JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default plans if they don't exist
    const [existingPlans] = await connection.execute(
      "SELECT COUNT(*) as count FROM plans",
    );

    if ((existingPlans as any)[0].count === 0) {
      await connection.execute(`
        INSERT INTO plans (name, price, features) VALUES
        ('starter', 99.00, '["21 Days Live Classes", "Recorded Sessions Access", "3 Guided Projects", "WhatsApp Support", "Completion Certificate", "Community Access"]'),
        ('pro', 199.00, '["Everything in Starter", "1-on-1 Doubt Sessions (3x)", "Portfolio Review & Feedback", "Interview Preparation", "Job Referrals Network", "Premium Resources & Tools", "Priority Support"]'),
        ('elite', 399.00, '["Everything in Pro", "Unlimited 1-on-1 Sessions", "Live Portfolio Building", "Mock Interviews (5x)", "LinkedIn Profile Optimization", "Guaranteed Job Referrals", "6 Months Career Mentorship", "Advanced React/Node.js Bonus"]')
      `);
    }

    connection.release();
    console.log("✅ Database tables initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    return false;
  }
}

// Helper function to execute queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
