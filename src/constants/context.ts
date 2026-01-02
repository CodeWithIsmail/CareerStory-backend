export const CONTEXT = {
  MIDDLEWARE: {
    SYNTAX: 'syntax error',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    VALIDATION: 'Validation error',
    APPLICATION: 'application error',
    DATABASE: 'database error',
    UNEXPECTED: 'unexpected error',
    UNKNOWN: 'unknown error',
    EMAIL_CONFIRMATION: 'email confirmation',
  },
  USER: {
    CREATE: 'creating user',
    FETCH: 'fetching user',
    UPDATE: 'updating user',
    DELETE: 'deleting user',
    EMAIL_VERIFICATION: 'updating email verification status',
    UPDATE_ROLE: 'updating user role',
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
    CHANGE_PASSWORD: 'changing password',
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
