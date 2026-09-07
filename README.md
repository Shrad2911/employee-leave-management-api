# Employee Leave Management REST API

A Node.js, Express.js, and PostgreSQL RESTful API designed to handle employee registration and manage leave applications, approvals, query filtering, and leave summaries.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Local Setup & Installation](#local-setup--installation)
- [API Documentation & Sample Requests](#api-documentation--sample-requests)

---

## Features
- **Employee Management**: Register employees with email uniqueness validation.
- **Leave Requests**: Submit, track, and manage employee leave applications.
- **Status Workflows**: Update leave statuses (`pending`, `approved`, `rejected`).
- **Query Filtering**: Retrieve leave applications filtered by `employee_id` and `status`.
- **Leave Summaries**: Aggregated reporting of leave balances/counts per employee.

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Hosted on Neon Cloud Database)
- **Database Client**: `pg` (node-postgres)
- **Environment Configuration**: `dotenv`
- **Development Tooling**: Nodemon

---

## Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- PostgreSQL Cloud Database (e.g., [Neon.tech](https://neon.tech))

---

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3000
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-cool-sample-a5xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
```
---


## Database Setup

Execute the following SQL queries in your PostgreSQL instance or Cloud Database Console (e.g., Neon SQL Editor) to initialize the database schema:

```sql
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leaves (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
---

## Local Setup & Installation
Clone the Repository:

Bash
git clone [https://github.com/shrad2911/employee-leave-management-api.git](https://github.com/shrad2911/employee-leave-management-api.git)
cd employee-leave-management-api
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file as described in the Environment Variables section.

Start the Application:

For production:

Bash
npm start
For development (with live reload via Nodemon):

Bash
npm run dev

---

## API Documentation & Sample Requests
1. Register Employee
Endpoint: POST /employees

Description: Creates a new employee record.

cURL Command:

Bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "department": "Engineering",
    "email": "jane.doe@example.com"
  }'
Expected Response (201 Created):

JSON
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "department": "Engineering",
    "email": "jane.doe@example.com",
    "created_at": "2026-09-07T01:58:02.968Z"
  }
}
2. Submit Leave Request
Endpoint: POST /leaves

Description: Submits a leave application for an existing employee.

cURL Command:

Bash
curl -X POST http://localhost:3000/leaves \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "leave_type": "Sick Leave",
    "from_date": "2026-09-10",
    "to_date": "2026-09-12"
  }'
Expected Response (201 Created):

JSON
{
  "success": true,
  "data": {
    "id": 1,
    "employee_id": 1,
    "leave_type": "Sick Leave",
    "from_date": "2026-09-10",
    "to_date": "2026-09-12",
    "status": "pending",
    "created_at": "2026-09-07T02:00:00.000Z"
  }
}
3. Get Leaves (With Filters)
Endpoint: GET /leaves

Query Parameters: employee_id (optional), status (optional)

Description: Retrieves leave requests with optional filters.

cURL Command:

Bash
curl -X GET "http://localhost:3000/leaves?employee_id=1&status=pending"
Expected Response (200 OK):

JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employee_id": 1,
      "leave_type": "Sick Leave",
      "from_date": "2026-09-10",
      "to_date": "2026-09-12",
      "status": "pending"
    }
  ]
}
4. Update Leave Status
Endpoint: PATCH /leaves/:id/status

Description: Approves or rejects a leave request.

cURL Command:

Bash
curl -X PATCH http://localhost:3000/leaves/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved"
  }'
Expected Response (200 OK):

JSON
{
  "success": true,
  "data": {
    "id": 1,
    "status": "approved"
  }
}
5. Get Employee Leave Summary
Endpoint: GET /leaves/summary/:employee_id

Description: Retrieves the total breakdown of leaves taken/applied by an employee.

cURL Command:

Bash
curl -X GET http://localhost:3000/leaves/summary/1
Expected Response (200 OK):

JSON
{
  "success": true,
  "data": {
    "employee_id": 1,
    "summary": {
      "Sick Leave": 1
    }
  }
}