# Express.js Backend API

A robust and secure Express.js backend API with authentication, rate limiting, and error handling.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Protected routes

- 🛡️ **Security Features**
  - Rate limiting to prevent brute force attacks
  - CORS protection
  - Request validation
  - Global error handling
  - Compression for better performance

- 📝 **API Features**
  - RESTful API design
  - Advanced filtering and pagination
  - Request logging (Morgan)
  - Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
[https://github.com/ASGonaz/eazy_gen_express_backend_task.git]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DB_URI =mongodb+srv://<name>:<pass>@cluster0.4rzmz.mongodb.net/auth_system
PORT=8000
NODE_ENV=production OR development
JWT_SECRET_KEY = JWT_SECRET_KEY
JWT_EXPIRE_TIME=12h
FRONTEND_BASEURL=http://localhost:3000
```

## Running the Application

### Development Mode
NODE_ENV=development
```bash
npm run start:dev
```

### Production Mode
NODE_ENV=production  
```bash
npm start
```

The server will start on port 8000 by default (or the port specified in your .env file).

## API Endpoints

### Authentication
- POST `/api/v1/auth/signup` - Register a new user
- POST `/api/v1/auth/login` - Login user

### Users
- GET `/api/v1/users/getMe` - Get Logged In  user (protected)

## Security Measures

1. **Rate Limiting**
   - Implements request rate limiting to prevent abuse
   - Configurable limits per IP address

2. **CORS Protection**
   - Configurable CORS options
   - Prevents unauthorized cross-origin requests

3. **Request Validation**
   - Input validation middleware
   - Sanitizes and validates all incoming requests

4. **Error Handling**
   - Global error handling middleware
   - Structured error responses
   - Unhandled rejection catching

5. **Compression**
   - Response compression for better performance
   - Reduces bandwidth usage

## Error Handling

The API implements a global error handling system that:
- Catches and processes all errors
- Provides structured error responses
- Handles both operational and programming errors
- Includes proper HTTP status codes

## Development

The project uses:
- Express.js as the web framework
- MongoDB as the database
- JWT for authentication
- Morgan for logging
- Compression for response optimization
