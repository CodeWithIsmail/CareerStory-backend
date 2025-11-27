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
    INVALID_INPUT: 'Invalid input data',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Conflict occurred',
    INTERNAL_SERVER_ERROR: 'Internal server error',
  },
  USER: {
    NOT_FOUND: 'User not found',
    DUPLICATE_EMAIL: 'Email already exists',
    DUPLICATE_USERNAME: 'Username already exists',
  },
  STORY: {
    NOT_FOUND: 'Story not found',
  },
  SERVER: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    ROUTE_NOT_FOUND: 'Route not found',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  },
};
