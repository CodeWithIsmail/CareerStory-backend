# CareerStory Backend

A RESTful API backend for CareerStory - a platform where users share and discover interview experiences and career stories.

## Tech Stack

- **Runtime:** Node.js with TypeScript (ESM)
- **Framework:** Express.js 5
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT-based authentication
- **Validation:** Zod schema validation
- **Documentation:** Swagger/OpenAPI
- **AI Integration:** OpenRouter API for story summarization
- **Testing:** Jest with 100% code coverage

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

## Installation

```bash
git clone https://github.com/CodeWithIsmail/CarrerStory-backend.git
cd CarrerStory-backend
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=careerstory
NODE_ENV=development
LOG_LEVEL=info

JWT_SECRET=your_jwt_secret
AUTH_JWT_EXPIRES_IN=2592000
EMAIL_VERIFICATION_TOKEN_EXPIRES_IN=86400
SALT_ROUNDS=10

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

BACKEND_URL=http://localhost:3000/api/v1
FRONTEND_URL=http://localhost:5173

OPENROUTER_API_KEY=your_openrouter_api_key
AI_MODEL_NAME=openai/gpt-4o-mini
```

## Running the Application

```bash
# Development
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Format code
npm run format
```

## API Endpoints

### Authentication

| Method | Endpoint                                      | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| POST   | `/api/v1/auth/signup`                         | Register new user               |
| POST   | `/api/v1/auth/login`                          | User login                      |
| GET    | `/api/v1/auth/confirm-email/:token`           | Verify email                    |
| POST   | `/api/v1/auth/resend-confirm-email/:userName` | Resend verification email       |
| POST   | `/api/v1/auth/change-password`                | Change password (authenticated) |

### Users

| Method | Endpoint                            | Description                   |
| ------ | ----------------------------------- | ----------------------------- |
| GET    | `/api/v1/users`                     | Get all users (paginated)     |
| GET    | `/api/v1/users/profile`             | Get current user profile      |
| PATCH  | `/api/v1/users/profile`             | Update current user profile   |
| GET    | `/api/v1/users/:userId`             | Get user by ID                |
| PATCH  | `/api/v1/users/change-role/:userId` | Change user role (admin only) |
| DELETE | `/api/v1/users/:userId`             | Delete user                   |

### Stories

| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| POST   | `/api/v1/stories`              | Create story (authenticated) |
| GET    | `/api/v1/stories`              | Get all stories (paginated)  |
| GET    | `/api/v1/stories/user/:userId` | Get stories by user          |
| GET    | `/api/v1/stories/:storyId`     | Get story by ID              |
| PATCH  | `/api/v1/stories/:storyId`     | Update story (owner/admin)   |
| DELETE | `/api/v1/stories/:storyId`     | Delete story (owner/admin)   |

### Categories

| Method | Endpoint                         | Description                  |
| ------ | -------------------------------- | ---------------------------- |
| GET    | `/api/v1/categories`             | Get all categories           |
| POST   | `/api/v1/categories`             | Create category (admin only) |
| PATCH  | `/api/v1/categories/:categoryId` | Update category (admin only) |
| DELETE | `/api/v1/categories/:categoryId` | Delete category (admin only) |

## API Documentation

Swagger documentation available at: `http://localhost:3000/api-docs`

## Project Structure

```
src/
├── config/          # Environment configuration
├── constants/       # Application constants
├── controllers/     # Request handlers
├── dto/             # Data transfer objects
├── entities/        # TypeORM entities
├── errors/          # Custom error classes
├── mappers/         # Data mappers
├── middlewares/     # Express middlewares
├── repositories/    # Database repositories
├── routes/          # API routes
├── services/        # Business logic
├── swagger/         # API documentation
├── types/           # TypeScript types
├── utils/           # Utility functions
├── validators/      # Zod validation schemas
└── __tests__/       # Unit tests
```

## Features

- User registration with email verification
- JWT-based authentication and authorization
- Role-based access control (User/Admin)
- CRUD operations for stories and categories
- AI-powered story summarization
- Pagination and sorting for list endpoints
- Request validation with Zod
- Rate limiting for sensitive endpoints
- Comprehensive error handling
