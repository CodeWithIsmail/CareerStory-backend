import swaggerJsdoc from 'swagger-jsdoc';
import { ENV } from '../config/environment.ts';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareerStory API',
      version: '1.0.0',
      description:
        'API documentation for CareerStory, a platform for sharing recruitment experience stories for software engineers. This documentation provides details about the available endpoints, request/response formats, authentication methods, and error handling.',
      contact: {
        name: 'CareerStory',
        url: 'https://github.com/CodeWithIsmail/CarrerStory-backend',
      },
    },
    servers: [
      {
        url: ENV.BACKEND_URL,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Bearer token for authentication',
        },
      },
      schemas: {
        // ==========================================
        // RESPONSE MODELS
        // ==========================================

        User: {
          type: 'object',
          description: 'User profile data returned in responses',
          required: [
            'userId',
            'userName',
            'email',
            'name',
            'isEmailVerified',
            'role',
            'joinDate',
            'updatedAt',
          ],
          properties: {
            userId: { type: 'string', format: 'uuid' },
            userName: { type: 'string', minLength: 3, maxLength: 50 },
            email: { type: 'string', format: 'email' },
            name: { type: 'string', minLength: 3, maxLength: 100 },
            bio: { type: 'string', maxLength: 1000, nullable: true },
            organization: { type: 'string', maxLength: 255, nullable: true },
            photoUrl: { type: 'string', format: 'uri', nullable: true },
            linkedInUrl: { type: 'string', format: 'uri', nullable: true },
            githubUrl: { type: 'string', format: 'uri', nullable: true },
            portfolioUrl: { type: 'string', format: 'uri', nullable: true },
            isEmailVerified: { type: 'boolean' },
            role: { type: 'string', enum: ['USER', 'ADMIN'] },
            joinDate: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },

        Story: {
          type: 'object',
          description: 'Story with author and categories',
          required: ['storyId', 'userId', 'title', 'body', 'createdAt', 'updatedAt'],
          properties: {
            storyId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            title: { type: 'string', minLength: 5, maxLength: 255 },
            body: { type: 'string', minLength: 10, maxLength: 5000 },
            summary: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  categoryId: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  description: { type: 'string', nullable: true },
                },
              },
            },
            user: {
              type: 'object',
              nullable: true,
              properties: {
                userId: { type: 'string', format: 'uuid' },
                userName: { type: 'string' },
                name: { type: 'string' },
                organization: { type: 'string', nullable: true },
              },
            },
          },
        },

        Category: {
          type: 'object',
          description: 'Story category',
          required: ['categoryId', 'name', 'createdAt'],
          properties: {
            categoryId: { type: 'string', format: 'uuid' },
            name: { type: 'string', minLength: 1, maxLength: 50 },
            description: { type: 'string', maxLength: 255, nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },

        AuthResponse: {
          type: 'object',
          description: 'Login response with JWT token',
          required: ['accessToken', 'expiresIn', 'user'],
          properties: {
            accessToken: { type: 'string', description: 'JWT access token' },
            expiresIn: { type: 'integer', description: 'Token expiry in seconds' },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },

        // ==========================================
        // REQUEST MODELS - Authentication
        // ==========================================

        SignupRequest: {
          type: 'object',
          description: 'User registration',
          required: ['userName', 'email', 'name', 'password', 'confirmPassword'],
          properties: {
            userName: {
              type: 'string',
              minLength: 3,
              maxLength: 50,
              pattern: '^[a-z0-9_]+$',
              example: 'ismail_hossain',
            },
            email: { type: 'string', format: 'email', example: 'ismail@example.com' },
            name: { type: 'string', minLength: 3, maxLength: 100, example: 'ismail hossain' },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 128,
              description: 'Must include uppercase, lowercase, number, special character',
              example: 'SecurePass123!',
            },
            confirmPassword: { type: 'string', example: 'SecurePass123!' },
          },
        },

        LoginRequest: {
          type: 'object',
          description: 'User login',
          required: ['userName', 'password'],
          properties: {
            userName: { type: 'string', example: 'ismail_hossain' },
            password: { type: 'string', example: 'SecurePass123!' },
          },
        },

        UpdatePasswordRequest: {
          type: 'object',
          description: 'Change user password',
          required: ['currentPassword', 'newPassword', 'confirmPassword'],
          properties: {
            currentPassword: { type: 'string', example: 'CurrentPass123!' },
            newPassword: {
              type: 'string',
              minLength: 6,
              maxLength: 128,
              description: 'Must include uppercase, lowercase, number, special character',
              example: 'NewSecurePass123!',
            },
            confirmPassword: { type: 'string', example: 'NewSecurePass123!' },
          },
        },

        // ==========================================
        // REQUEST MODELS - User
        // ==========================================

        UpdateUserProfileRequest: {
          type: 'object',
          description: 'Update user profile (at least one field required)',
          properties: {
            name: { type: 'string', minLength: 3, maxLength: 100 },
            bio: { type: 'string', maxLength: 1000, nullable: true },
            organization: { type: 'string', maxLength: 255, nullable: true },
            photoUrl: { type: 'string', format: 'uri', nullable: true },
            linkedInUrl: { type: 'string', format: 'uri', nullable: true },
            githubUrl: { type: 'string', format: 'uri', nullable: true },
            portfolioUrl: { type: 'string', format: 'uri', nullable: true },
          },
        },

        UpdateUserRoleRequest: {
          type: 'object',
          description: '⚠️ ADMIN ONLY - Update user role. Requires admin privileges.',
          required: ['role'],
          properties: {
            role: { type: 'string', enum: ['USER', 'ADMIN'] },
          },
        },

        // ==========================================
        // REQUEST MODELS - Story
        // ==========================================

        CreateStoryRequest: {
          type: 'object',
          description: 'Create a new story',
          required: ['title', 'body', 'generateSummary'],
          properties: {
            title: { type: 'string', minLength: 5, maxLength: 255, example: 'My Journey to Google' },
            body: { type: 'string', minLength: 10, maxLength: 5000 },
            categoryIds: {
              type: 'array',
              items: { type: 'string', format: 'uuid' },
              default: [],
            },
            generateSummary: { type: 'boolean', description: 'Auto-generate AI summary' },
          },
        },

        UpdateStoryRequest: {
          type: 'object',
          description: 'Update story (at least one field required)',
          properties: {
            title: { type: 'string', minLength: 5, maxLength: 255 },
            body: { type: 'string', minLength: 10, maxLength: 5000 },
            categoryIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
            generateSummary: { type: 'boolean' },
          },
        },

        // ==========================================
        // REQUEST MODELS - Category
        // ==========================================

        CreateCategoryRequest: {
          type: 'object',
          description: '⚠️ ADMIN ONLY - Create Category. Requires admin privileges.',
          required: ['name'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 50, example: 'Frontend Development' },
            description: { type: 'string', maxLength: 255, nullable: true },
          },
        },

        UpdateCategoryRequest: {
          type: 'object',
          description:
            '⚠️ ADMIN ONLY - Update category (at least one field required). Requires admin privileges.',
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 50 },
            description: { type: 'string', maxLength: 255, nullable: true },
          },
        },

        // ==========================================
        // RESPONSE WRAPPERS
        // ==========================================

        SuccessResponse: {
          type: 'object',
          description: 'Standard success response',
          required: ['success', 'statusCode', 'message'],
          properties: {
            success: { type: 'boolean', enum: [true] },
            statusCode: { type: 'integer' },
            message: { type: 'string' },
            result: { type: 'object', description: 'Response data (varies by endpoint)' },
          },
        },

        PaginatedResponse: {
          type: 'object',
          description: 'Paginated list response',
          properties: {
            success: { type: 'boolean', enum: [true] },
            statusCode: { type: 'integer' },
            message: { type: 'string' },
            result: {
              type: 'object',
              properties: {
                data: { type: 'array', items: { type: 'object' } },
                pagination: { $ref: '#/components/schemas/PaginationMetadata' },
              },
            },
          },
        },

        PaginationMetadata: {
          type: 'object',
          description: 'Pagination info',
          properties: {
            totalItems: { type: 'integer' },
            totalPages: { type: 'integer' },
            currentPage: { type: 'integer' },
            itemsPerPage: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPreviousPage: { type: 'boolean' },
            nextPage: { type: 'integer', nullable: true },
            previousPage: { type: 'integer', nullable: true },
          },
        },

        ErrorResponse: {
          type: 'object',
          description: 'Standard error response',
          required: ['success', 'statusCode', 'message'],
          properties: {
            success: { type: 'boolean', enum: [false] },
            statusCode: { type: 'integer' },
            message: { type: 'string' },
            details: {
              type: 'array',
              description: 'Validation error details',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                  code: { type: 'string' },
                },
              },
            },
          },
        },
      },
      responses: {
        BadRequestError: {
          description: 'Bad request - Invalid input or operation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        UnauthorizedError: {
          description: 'Authentication required - Missing or invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        ValidationError: {
          description: 'Validation error - Invalid request body/params',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        ConflictError: {
          description: 'Conflict - Resource already exists (duplicate email/username)',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error - Database or AI service failure',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and email verification',
      },
      {
        name: 'Users',
        description: 'User profile management',
      },
      {
        name: 'Stories',
        description: 'Story management',
      },
      {
        name: 'Categories',
        description: 'Story category management',
      },
    ],
  },
  apis: ['./src/swagger/docs/*.ts'],
};

export const specs = swaggerJsdoc(options);

export const swaggerUiOptions = {
  customSiteTitle: 'CareerStory API Documentation',
};
