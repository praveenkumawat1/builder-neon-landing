# MySQL Database Setup for Frontend Bootcamp

## Prerequisites

1. Install MySQL Server on your system
2. Create a database for the application

## Database Setup Steps

### 1. Install MySQL (if not already installed)

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS (using Homebrew):**

```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download and install from [MySQL official website](https://dev.mysql.com/downloads/installer/)

### 2. Create Database and User

Connect to MySQL as root:

```bash
mysql -u root -p
```

Create database and user:

```sql
-- Create database
CREATE DATABASE frontend_bootcamp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (replace 'your_password' with a secure password)
CREATE USER 'bootcamp_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON frontend_bootcamp.* TO 'bootcamp_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=bootcamp_user
DB_PASSWORD=your_password
DB_NAME=frontend_bootcamp
DB_PORT=3306
```

### 4. Start the Application

The application will automatically create the required tables on startup:

```bash
npm run dev
```

## Database Schema

### Tables Created Automatically

#### 1. `enrollments` Table

- `id` - Primary key
- `name` - Student full name
- `email` - Email address (unique)
- `phone` - Phone number
- `education` - Education background
- `experience` - Programming experience
- `motivation` - Why they want to join
- `enrollment_type` - 'demo' or 'join'
- `selected_plan` - 'starter', 'pro', or 'elite'
- `transaction_id` - Payment transaction ID
- `payment_status` - 'pending', 'completed', or 'failed'
- `created_at` - Registration timestamp
- `updated_at` - Last update timestamp

#### 2. `plans` Table

- `id` - Primary key
- `name` - Plan name (starter, pro, elite)
- `price` - Plan price
- `features` - JSON array of features
- `created_at` - Creation timestamp

## API Endpoints

### Enrollment Management

- `POST /api/enrollment` - Create new enrollment
- `GET /api/enrollment/:email` - Get enrollment by email
- `PUT /api/enrollment/:email/transaction` - Update transaction ID

### Admin Endpoints

- `GET /api/admin/enrollments` - Get all enrollments
- `GET /api/admin/stats` - Get enrollment statistics

### Health Check

- `GET /api/health` - Check server and database status

## Example Usage

### Create Enrollment

```javascript
const enrollmentData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  education: "undergraduate",
  experience: "none",
  motivation: "Want to become a frontend developer",
  enrollmentType: "join",
  selectedPlan: "pro",
  transactionId: "TXN123456789",
};

fetch("/api/enrollment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(enrollmentData),
});
```

### Get Enrollment Statistics

```javascript
fetch("/api/admin/stats")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Troubleshooting

### Common Issues

1. **Connection refused**

   - Ensure MySQL service is running
   - Check host and port in `.env`

2. **Access denied**

   - Verify username and password in `.env`
   - Check user privileges in MySQL

3. **Database doesn't exist**

   - Create database manually using MySQL commands above

4. **Port conflicts**
   - Change DB_PORT in `.env` if MySQL runs on different port

### Useful MySQL Commands

```sql
-- Check tables
SHOW TABLES;

-- View enrollments
SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 10;

-- Get enrollment stats
SELECT
  enrollment_type,
  selected_plan,
  payment_status,
  COUNT(*) as count
FROM enrollments
GROUP BY enrollment_type, selected_plan, payment_status;

-- Reset auto-increment
ALTER TABLE enrollments AUTO_INCREMENT = 1;
```

## Security Notes

1. Never commit `.env` file to version control
2. Use strong passwords for database users
3. Consider using connection pooling for production
4. Implement rate limiting for API endpoints
5. Add input validation and sanitization
6. Use HTTPS in production

## Backup and Maintenance

### Create Backup

```bash
mysqldump -u bootcamp_user -p frontend_bootcamp > backup.sql
```

### Restore Backup

```bash
mysql -u bootcamp_user -p frontend_bootcamp < backup.sql
```

### Regular Maintenance

- Monitor database size and performance
- Backup data regularly
- Update MySQL server and dependencies
- Review and optimize queries
