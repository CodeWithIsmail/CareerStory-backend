export const VALIDATION_MESSAGES = {
  COMMON: {
    AT_LEAST_ONE_FIELD: 'At least one field must be provided for update',
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

  SORT_DIRECTION: {
    INVALID: 'Sort direction must be either ASC or DESC',
  },
};
