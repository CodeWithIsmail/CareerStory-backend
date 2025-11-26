export const LOG_MESSAGES = {
  USER: {
    CREATE: {
      START: 'Creating a new user',
      SUCCESS: 'User created successfully',
      DUPLICATE_EMAIL: 'Email already exists.',
      DUPLICATE_USERNAME: 'Username already exists.',
      FAILED: 'Failed to create user.',
    },
    FETCH: {
      ALL_START: 'Fetching all users',
      ALL_SUCCESS: 'Users fetched successfully',
      BY_ID_START: 'Fetching user by ID',
      BY_ID_SUCCESS: 'User fetched successfully',
      BY_ID_NOT_FOUND: 'User not found',
    },
    UPDATE: {
      START: 'Updating user',
      SUCCESS: 'User updated successfully',
      NOT_FOUND_UPDATE: 'User not found for update',
    },
    DELETE: {
      START: 'Deleting user',
      SUCCESS: 'User deleted successfully',
      NOT_FOUND_DELETE: 'User not found for deletion',
    },
  },

  STORY: {
    CREATE: {
      START: 'Creating a new story',
      SUCCESS: 'Story created successfully',
      FAILED: 'Failed to create story',
      USER_NOT_FOUND: 'User not found for story creation',
    },
    FETCH: {
      ALL_START: 'Fetching all stories',
      ALL_SUCCESS: 'Stories fetched successfully',
      BY_ID_START: 'Fetching story by ID',
      BY_ID_SUCCESS: 'Story fetched successfully',
      BY_ID_NOT_FOUND: 'Story not found',
      BY_USER_START: 'Fetching stories by user',
      BY_USER_SUCCESS: 'User stories fetched successfully',
    },
    UPDATE: {
      START: 'Updating story',
      SUCCESS: 'Story updated successfully',
      NOT_FOUND: 'Story not found for update',
    },
    DELETE: {
      START: 'Deleting story',
      SUCCESS: 'Story deleted successfully',
      NOT_FOUND: 'Story not found for deletion',
    },
  },

  DATABASE: {
    CONNECTION: {
      SUCCESS: 'Database connected successfully',
      FAILED: 'Failed to connect to the database',
    },
  },

  SERVER: {
    RUNNING: 'Server is running on port',
  },
};
