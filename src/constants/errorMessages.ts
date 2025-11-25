export const constantErrorMessages = {
  USER: {
    BAD_REQUEST: 'Validation failed',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access to the resource is forbidden',
    NOT_FOUND: 'User not found',
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred',
    CONFLICT: 'This resource already exists',
    DUPLICATE_EMAIL: 'Email already exists. Please use a different email.',
    DUPLICATE_USERNAME: 'Username already exists. Please use a different username.',
  },
};

export const constantStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
