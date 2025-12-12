import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareerStory API',
      version: '1.0.0',
      description:
        'A comprehensive REST API for managing career stories, user profiles, and categories. Built with Express.js, TypeORM, and PostgreSQL.',
      contact: {
        name: 'CareerStory Team',
        url: 'https://github.com/CodeWithIsmail/CarrerStory-backend',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://api.careerstory.com/api/v1',
        description: 'Production server',
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
        User: {
          type: 'object',
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
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the user',
            },
            userName: {
              type: 'string',
              minLength: 3,
              maxLength: 50,
              pattern: '^[a-z0-9_]+$',
              description: 'Unique username (lowercase alphanumeric and underscore only)',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Unique email address',
            },
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Full name of the user',
            },
            bio: {
              type: 'string',
              maxLength: 1000,
              nullable: true,
              description: 'User biography',
            },
            organization: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Current organization or company',
            },
            photoUrl: {
              type: 'string',
              format: 'uri',
              maxLength: 255,
              nullable: true,
              description: 'Profile photo URL',
            },
            linkedInUrl: {
              type: 'string',
              format: 'uri',
              maxLength: 255,
              nullable: true,
              description: 'LinkedIn profile URL',
            },
            githubUrl: {
              type: 'string',
              format: 'uri',
              maxLength: 255,
              nullable: true,
              description: 'GitHub profile URL',
            },
            portfolioUrl: {
              type: 'string',
              format: 'uri',
              maxLength: 255,
              nullable: true,
              description: 'Portfolio website URL',
            },
            isEmailVerified: {
              type: 'boolean',
              description: 'Whether the email is verified',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              description: 'User role',
            },
            joinDate: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Category: {
          type: 'object',
          required: ['categoryId', 'name', 'createdAt'],
          properties: {
            categoryId: {
              type: 'string',
              format: 'uuid',
              description: 'Unique category identifier',
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 50,
              description: 'Category name',
            },
            description: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Category description',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        Story: {
          type: 'object',
          required: ['storyId', 'userId', 'title', 'body', 'createdAt', 'updatedAt'],
          properties: {
            storyId: {
              type: 'string',
              format: 'uuid',
              description: 'Unique story identifier',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the story author',
            },
            title: {
              type: 'string',
              minLength: 5,
              maxLength: 255,
              description: 'Story title',
            },
            body: {
              type: 'string',
              minLength: 10,
              maxLength: 5000,
              description: 'Story content',
            },
            summary: {
              type: 'string',
              nullable: true,
              description: 'AI-generated or manual summary of the story',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
            categories: {
              type: 'array',
              description: 'Categories associated with the story',
              items: {
                type: 'object',
                properties: {
                  categoryId: {
                    type: 'string',
                    format: 'uuid',
                  },
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                    nullable: true,
                  },
                },
              },
            },
            user: {
              type: 'object',
              nullable: true,
              properties: {
                userId: {
                  type: 'string',
                  format: 'uuid',
                },
                userName: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                },
                organization: {
                  type: 'string',
                  nullable: true,
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          required: ['success', 'statusCode', 'message'],
          properties: {
            success: {
              type: 'boolean',
              enum: [true],
            },
            statusCode: {
              type: 'integer',
            },
            message: {
              type: 'string',
            },
            result: {
              type: 'object',
              description: 'Response data (format varies by endpoint)',
            },
          },
        },
        PaginationMetadata: {
          type: 'object',
          required: [
            'totalItems',
            'totalPages',
            'currentPage',
            'itemsPerPage',
            'hasNextPage',
            'hasPreviousPage',
          ],
          properties: {
            totalItems: {
              type: 'integer',
              description: 'Total number of items',
            },
            totalPages: {
              type: 'integer',
              description: 'Total number of pages',
            },
            currentPage: {
              type: 'integer',
              description: 'Current page number',
            },
            itemsPerPage: {
              type: 'integer',
              description: 'Number of items per page',
            },
            hasNextPage: {
              type: 'boolean',
              description: 'Whether there is a next page',
            },
            hasPreviousPage: {
              type: 'boolean',
              description: 'Whether there is a previous page',
            },
            nextPage: {
              type: 'integer',
              nullable: true,
              description: 'Next page number if available',
            },
            previousPage: {
              type: 'integer',
              nullable: true,
              description: 'Previous page number if available',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          required: ['success', 'statusCode', 'message'],
          properties: {
            success: {
              type: 'boolean',
              enum: [false],
            },
            statusCode: {
              type: 'integer',
            },
            message: {
              type: 'string',
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                  code: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Insufficient permissions',
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
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        ConflictError: {
          description: 'Resource conflict',
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
        description: 'Career story management',
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
