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