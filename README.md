# Project Management Backend

A RESTful backend API for a collaborative project management platform built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project is being developed as a modular backend for managing users, projects, tasks, subtasks, notes, and team members. The current implementation focuses on the **authentication and user-management foundation**, with the broader project-management modules planned as the next development phase.

## ✨ Current Features

### Authentication & User Management

- User registration with username, email, and password
- Unique username and email validation
- Password hashing using `bcrypt`
- User login with JWT-based authentication
- Access token and refresh token generation
- Refresh token rotation
- HTTP-only authentication cookies
- Bearer-token support through the `Authorization` header
- Protected routes using JWT middleware
- Current authenticated-user endpoint
- Secure logout and token invalidation
- Email verification
- Resend email verification
- Forgot-password flow
- Password reset using temporary tokens
- Change-password functionality
- Request validation using `express-validator`

### API Infrastructure

- Express 5 REST API
- MongoDB connection through Mongoose
- Centralized API response structure
- Centralized API error handling
- Async controller wrapper
- CORS configuration with credentials support
- Static file serving through Express
- Health-check endpoint
- Environment-based configuration
- Email delivery using Nodemailer + Mailtrap
- Email templates generated using Mailgen

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication and token management |
| **bcrypt** | Password hashing |
| **express-validator** | Request validation |
| **Nodemailer** | Email delivery |
| **Mailgen** | HTML/plain-text email generation |
| **cookie-parser** | Authentication cookie handling |
| **CORS** | Cross-origin request configuration |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server |
| **Prettier** | Code formatting |

## 🏗️ Project Structure

```text
project-management-backend/
├── public/
│   └── images/
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── healthcheck.controllers.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middlewares.js
│   │   └── validator.middlewares.js
│   │
│   ├── models/
│   │   ├── note.models.js
│   │   ├── project.models.js
│   │   ├── projectmember.models.js
│   │   ├── subtask.models.js
│   │   ├── task.models.js
│   │   └── user.models.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── healthcheck.routes.js
│   │
│   ├── utils/
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   │
│   ├── validators/
│   │   └── index.js
│   │
│   ├── app.js
│   └── index.js
│
├── PRD.md
├── package.json
├── package-lock.json
└── README.md
```

## 🔐 Authentication Flow

The authentication system uses short-lived access tokens and refresh tokens.

```text
Client
  │
  ├── Register
  │      ↓
  │   Validate input
  │      ↓
  │   Hash password
  │      ↓
  │   Create user
  │      ↓
  │   Generate email verification token
  │      ↓
  │   Send verification email
  │
  ├── Login
  │      ↓
  │   Verify credentials
  │      ↓
  │   Generate access + refresh tokens
  │      ↓
  │   Store refresh token
  │      ↓
  │   Set HTTP-only cookies
  │
  └── Protected Request
         ↓
      Verify JWT
         ↓
      Load user
         ↓
      Attach user to request
         ↓
      Execute controller
```

The authentication middleware accepts the access token either from the `accessToken` cookie or from a Bearer token in the `Authorization` header.

## 📌 API Endpoints

Base URL:

```text
http://localhost:3000/api/v1
```

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Login user |
| `GET` | `/auth/verify-email/:verificationToken` | No | Verify email |
| `POST` | `/auth/refresh-token` | No | Generate new access/refresh tokens |
| `POST` | `/auth/forgot-password` | No | Request password reset |
| `POST` | `/auth/reset-password/:resetToken` | No | Reset password |
| `POST` | `/auth/logout` | Yes | Logout current user |
| `POST` | `/auth/current-user` | Yes | Get authenticated user |
| `POST` | `/auth/change-password` | Yes | Change current password |
| `POST` | `/auth/resend-email-verification` | Yes | Resend verification email |

### Health Check

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/healthcheck` | No | Check whether the API is running |

## 📥 Example Registration Request

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "username": "ayush123",
  "email": "ayush@example.com",
  "password": "your-password"
}
```

## 📥 Example Login Request

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "ayush@example.com",
  "password": "your-password"
}
```

After successful authentication, the server generates an access token and refresh token and sets them as HTTP-only cookies.

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ayush16110/project-management-backend.git
cd project-management-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

CORS_ORIGIN=http://localhost:5173

MAILTRAP_SMTP_HOST=your_mailtrap_host
MAILTRAP_SMTP_PORT=your_mailtrap_port
MAILTRAP_SMTP_USER=your_mailtrap_username
MAILTRAP_SMTP_PASS=your_mailtrap_password

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/forgot-password
```

> Never commit your `.env` file or expose your secret keys.

### 4. Start the development server

```bash
npm run dev
```

### 5. Start the production server

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

You can verify that the server is running with:

```text
GET http://localhost:3000/api/v1/healthcheck
```

## 🧩 Architecture

The backend follows a modular Express architecture:

```text
Request
   │
   ▼
Route
   │
   ▼
Validation Middleware
   │
   ▼
Authentication Middleware
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

Supporting utilities provide common error handling, API responses, async handling, constants, and email functionality.

### Controllers

Controllers contain the application/business logic for individual API operations.

### Routes

Routes define API endpoints and connect requests with validators, middleware, and controllers.

### Models

Mongoose models define the database schema and model-level functionality.

### Middlewares

Reusable request-processing logic such as JWT authentication and validation handling.

### Validators

Input validation rules implemented using `express-validator`.

### Utils

Shared infrastructure such as API errors, API responses, async handlers, constants, and email services.

## 🔒 Security

The current authentication implementation includes:

- Password hashing with bcrypt
- JWT access tokens
- JWT refresh tokens
- Refresh-token rotation
- HTTP-only authentication cookies
- JWT verification middleware
- Temporary hashed tokens for email verification
- Temporary hashed tokens for password reset
- Request validation
- CORS configuration
- Sensitive authentication fields excluded from normal user responses

Temporary verification and password-reset tokens expire after a limited period.

## 🗄️ User Model

The current `User` model contains fields for:

- Avatar
- Username
- Email
- Full name
- Password
- Email verification status
- Refresh token
- Email verification token and expiry
- Forgot-password token and expiry
- Created/updated timestamps

Username and email are configured as unique fields.

## 🚧 Project Roadmap

The project is designed to evolve from the authentication foundation into a complete project-management backend.

Planned modules include:

- [ ] Project creation and management
- [ ] Project membership management
- [ ] Role-based project permissions
- [ ] Task creation and assignment
- [ ] Task status tracking
- [ ] Subtask management
- [ ] Project notes
- [ ] Task file attachments
- [ ] Project/member APIs
- [ ] Expanded role-based authorization
- [ ] More comprehensive API documentation

### Planned Roles

The project defines the following roles:

- `admin` — Full system-level access
- `project_admin` — Project-level administrative access
- `member` — Basic project member access

### Planned Task Statuses

- `todo`
- `in_progress`
- `done`

The project requirements document (`PRD.md`) contains the intended full project-management API scope.

## 🧪 Development Scripts

### Development

```bash
npm run dev
```

Starts the server with Nodemon.

### Production

```bash
npm start
```

Starts the Node.js server.

### Formatting

```bash
npm run prettier
```

Formats the project using Prettier.

## 📋 Project Status

**Current stage:** Authentication & backend foundation

The repository already contains the database models and structural foundation for the larger project-management system, while the currently wired API layer is focused primarily on authentication and health checking.

The `PRD.md` file documents the intended complete project-management feature set.

## 📄 License

This project is licensed under the **ISC License**.

## 👨‍💻 Author

**Ayush**

GitHub: [@Ayush16110](https://github.com/Ayush16110)

---

Built as a backend foundation for a scalable project management platform.
