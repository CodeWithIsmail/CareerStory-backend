export const VALIDATION_MESSAGES = {
  URL: {
    INVALID: 'URL must be a valid URL',
    MAX: 'URL must be at most 255 characters',
  },
  COMMON: {
    AT_LEAST_ONE_FIELD: 'At least one field must be provided for update',
  },
  AUTH: {
    TOKEN: {
      INVALID: 'Token is invalid',
    },
    CHANGE_PASSWORD: {
      CURRENT_PASSWORD_REQUIRED: 'Current password is required',
      CODE_REQUIRED: 'Confirmation code must be 6 digits',
    },
  },

  USER: {
    USER_ID: {
      INVALID: 'User ID must be a valid UUID',
    },
    USERNAME: {
      MIN: 'Username must be at least 3 characters',
      MAX: 'Username must be at most 50 characters',
      INVALID: 'Username can only contain letters, numbers, and underscores',
      REQUIRED: 'Username is required',
    },
    NAME: {
      MIN: 'Name must be at least 3 characters',
      MAX: 'Name must be at most 100 characters',
      REQUIRED: 'Name is required',
    },
    ROLE: {
      INVALID: 'Role must be ADMIN or USER',
    },
    EMAIL: {
      INVALID: 'Email must be a valid email address',
      MAX: 'Email must be at most 255 characters',
      REQUIRED: 'Email is required',
    },
  },

  STORY: {
    SUMMARY: {
      REQUIRED: 'generateSummary must be a boolean value',
    },
    USER_ID: {
      INVALID: 'userId must be a valid UUID',
    },
    TITLE: {
      MIN: 'Title must be at least 5 characters',
      MAX: 'Title must be at most 255 characters',
      REQUIRED: 'Title is required',
    },
    BODY: {
      MIN: 'Body must be at least 10 characters',
      MAX: 'Body must be at most 5000 characters',
      REQUIRED: 'Body is required',
    },
    STORY_ID: {
      INVALID: 'Story ID must be a valid UUID',
    },
  },

  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN: 'Password must be at least 6 characters',
    MAX: 'Password must be at most 128 characters',
    LOWERCASE: 'Password must contain at least one lowercase letter',
    UPPERCASE: 'Password must contain at least one uppercase letter',
    NUMBER: 'Password must contain at least one number',
    SPECIAL: 'Password must contain at least one special character (!@#$%^&*)',
    MISMATCH: "Passwords don't match",
  },

  SORT_DIRECTION: {
    INVALID: 'Sort direction must be either ASC or DESC',
  },

  CATEGORY: {
    NAME: {
      REQUIRED: 'Category name is required',
      MAX: 'Category name must be at most 50 characters long',
    },
    DESCRIPTION: {
      MAX: 'Description must be at most 255 characters long',
    },
    INVALID: 'Category ID must be a valid UUID',
  },
};
