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
  SERVICE_UNAVAILABLE: 503,
};

export const ERROR_MESSAGES = {
  COMMON: {
    INVALID_INPUT: 'Invalid request data',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden access',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Conflict occurred',
  },

  USER: {
    DUPLICATE_EMAIL: 'Email already exists.',
    DUPLICATE_USERNAME: 'Username already exists.',
  },
  STORY: {
    NOT_FOUND: 'Story not found',
    INVALID_ID: 'Invalid story ID format',
    INVALID_USER_ID: 'Invalid user ID format',
    USER_NOT_FOUND: 'Associated user not found',
    TITLE_REQUIRED: 'Story title is required',
    BODY_REQUIRED: 'Story body is required',
    FAILED_TO_CREATE: 'Failed to create story',
  },

  VALIDATION: {
    MISSING_REQUIRED_FIELDS: 'Required fields are missing',
    AT_LEAST_ONE_FIELD_REQUIRED: 'At least one field must be provided',
  },

  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    QUERY_FAILED: 'Database query failed',
    TRANSACTION_FAILED: 'Database transaction failed',
    DUPLICATE_ENTRY: 'Duplicate entry in database',
  },

  SERVER: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    ROUTE_NOT_FOUND: 'Route not found',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  },

  constantStatusCodes: HTTP_STATUS_CODES,
};
