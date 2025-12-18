export const CONTEXT = {
  MIDDLEWARE: {
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    VALIDATION: 'Validation error',
    APPLICATION: 'application error',
    DATABASE: 'database error',
    UNEXPECTED: 'unexpected error',
    UNKNOWN: 'unknown error',
  },
  USER: {
    CREATE: 'creating user',
    FETCH: 'fetching user',
    UPDATE: 'updating user',
    DELETE: 'deleting user',
    EMAIL_VERIFICATION: 'updating email verification status',
  },
  STORY: {
    CREATE: 'creating story',
    FETCH: 'fetching story',
    UPDATE: 'updating story',
    DELETE: 'deleting story',
  },
  AUTH: {
    LOGIN: 'user login',
    SIGNUP: 'user signup',
    CONFIRM_EMAIL: 'confirming email',
    RESEND_CONFIRMATION_EMAIL: 'resending confirmation email',
  },
  CATEGORY: {
    CREATE: 'creating category',
    FETCH: 'fetching category',
    UPDATE: 'updating category',
    DELETE: 'deleting category',
  },
  AI: {
    SUMMARY_GENERATION: 'AI summary generation',
  },
};
