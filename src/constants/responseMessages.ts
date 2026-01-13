export const RESPONSE_MESSAGES = {
  AUTH: {
    EMAIL_CONFIRMATION: {
      SUCCESS: 'Email confirmed successfully',
      RESEND: 'Confirmation email resent successfully',
    },
    PASSWORD_CHANGE: {
      SUCCESS: 'Password changed successfully',
    },
    LOGIN: {
      SUCCESS: 'User logged in successfully',
    },
  },
  USER: {
    CREATE: {
      SUCCESS: 'User created successfully',
    },
    FETCH: {
      ALL_SUCCESS: 'Users retrieved successfully',
      BY_ID_SUCCESS: 'User retrieved successfully',
      PROFILE_SUCCESS: 'User profile retrieved successfully',
    },
    UPDATE: {
      SUCCESS: 'User updated successfully',
      ROLE: 'User role updated successfully',
    },
  },

  STORY: {
    CREATE: {
      SUCCESS: 'Story created successfully',
    },
    FETCH: {
      ALL_SUCCESS: 'Stories retrieved successfully',
      BY_ID_SUCCESS: 'Story retrieved successfully',
      BY_USER_SUCCESS: 'User stories retrieved successfully',
    },
    UPDATE: {
      SUCCESS: 'Story updated successfully',
    },
  },
  CATEGORY: {
    CREATE: {
      SUCCESS: 'Category created successfully',
    },
    FETCH: {
      ALL_SUCCESS: 'Categories retrieved successfully',
      BY_ID_SUCCESS: 'Category retrieved successfully',
      BY_NAME_SUCCESS: 'Category retrieved successfully',
    },
    UPDATE: {
      SUCCESS: 'Category updated successfully',
    },
    DELETE: {
      SUCCESS: 'Category deleted successfully',
    },
  },
};
