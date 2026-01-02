export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  AI: {
    SUMMARY_GENERATION_FAILED: 'Failed to generate story summary',
    OPENROUTER_API_FAILED: 'OpenRouter API failed to generate summary',
  },
  DATABASE: {
    DUPLICATE_ENTRY: 'Duplicate entry in database',
    FOREIGN_KEY_CONFLICT: 'Foreign key constraint violation',
    NOT_NULL_VIOLATION: 'Not null constraint violation',
    INVALID_TYPE: 'Invalid data type provided',
  },
  AUTH: {
    INCORRECT_PASSWORD: 'Incorrect password',
    NO_TOKEN: 'No authentication token provided',
    INVALID_TOKEN: 'Invalid authentication token',
    TOKEN_EXPIRED: 'Authentication token has expired',
    UNAUTHORIZED: 'You do not have permission to perform this action',
    EMAIL_NOT_VERIFIED: 'Email address not verified',
    EMAIL_ALREADY_VERIFIED: 'Email address is already verified',

    CHANGE_PASSWORD: {
      UPDATE_FAILED: 'Failed to update password',
    },
  },
  COMMON: {
    INVALID_JSON: 'Invalid JSON format',
    ROUTE_NOT_FOUND: 'Requested route not found.',
    INVALID_INPUT: 'Invalid input data',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Conflict occurred',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    RATE_LIMIT_EXCEEDED: 'Only 1 resend email attempt allowed every 5 minutes. Please try again later.',
  },
  USER: {
    UNAUTHORIZED: 'No authorized user found',
    NOT_FOUND: 'User not found',
    DUPLICATE_EMAIL: 'Email already exists',
    DUPLICATE_USERNAME: 'Username already exists',
    DUPLICATE_EMAIL_AND_USERNAME: 'Email and Username already exist',
  },
  STORY: {
    NOT_FOUND: 'Story not found',
  },
  SERVER: {
    INTERNAL_SERVER_ERROR: 'Internal server error',

    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  },
  CATEGORY: {
    DUPLICATE_NAME: 'Category with this name already exists',
    CREATE: 'Failed to create category',
    FETCH: 'Category not found',
    UPDATE: 'Failed to update category',
    DELETE: 'Failed to delete category',
  },
};
