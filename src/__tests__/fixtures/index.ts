import { UserRole, TOKEN_TYPE } from '../../types/customTypes.ts';
import { User } from '../../entities/User.ts';
import { Auth } from '../../entities/Auth.ts';
import { Story } from '../../entities/Story.ts';
import { Category } from '../../entities/Category.ts';

// Valid UUIDs for testing
const MOCK_USER_ID = '550e8400-e29b-41d4-a716-446655440001';
const MOCK_USER_ID_2 = '550e8400-e29b-41d4-a716-446655440002';
const MOCK_ADMIN_ID = '550e8400-e29b-41d4-a716-446655440003';
const MOCK_STORY_ID = '550e8400-e29b-41d4-a716-446655440010';
const MOCK_STORY_ID_2 = '550e8400-e29b-41d4-a716-446655440011';
const MOCK_CATEGORY_ID = '550e8400-e29b-41d4-a716-446655440020';
const MOCK_CATEGORY_ID_1 = '550e8400-e29b-41d4-a716-446655440021';
const MOCK_CATEGORY_ID_2 = '550e8400-e29b-41d4-a716-446655440022';

// ============== USER FIXTURES ==============

export const createMockUser = (overrides?: Partial<User>): User => {
  return {
    userId: MOCK_USER_ID,
    userName: 'testuser',
    name: 'Test User',
    email: 'test@example.com',
    bio: 'A test user bio',
    organization: 'Test Org',
    photoUrl: null,
    linkedInUrl: null,
    githubUrl: null,
    portfolioUrl: null,
    isEmailVerified: true,
    role: UserRole.USER,
    joinDate: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    deletedAt: undefined,
    ...overrides,
  } as User;
};

export const createMockUserProfile = (overrides?: Partial<User>) => {
  const user = createMockUser(overrides);
  const { deletedAt, ...profile } = user;
  return profile;
};

export const createMockAdmin = (overrides?: Partial<User>): User => {
  return createMockUser({
    userId: MOCK_ADMIN_ID,
    userName: 'adminuser',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    ...overrides,
  });
};

export const createMockUnverifiedUser = (overrides?: Partial<User>): User => {
  return createMockUser({
    isEmailVerified: false,
    ...overrides,
  });
};

// ============== AUTH FIXTURES ==============

export const createMockAuth = (overrides?: Partial<Auth>): Auth => {
  return {
    userId: MOCK_USER_ID,
    hashedPassword: '$2b$10$hashedpassword123',
    passwordLastModificationTime: new Date('2024-01-01'),
    user: createMockUser(),
    ...overrides,
  } as Auth;
};

// ============== STORY FIXTURES ==============

export const createMockCategory = (overrides?: Partial<Category>): Category => {
  return {
    categoryId: MOCK_CATEGORY_ID,
    name: 'Test Category',
    description: 'A test category',
    createdAt: new Date('2024-01-01'),
    deletedAt: undefined,
    stories: [],
    ...overrides,
  } as Category;
};

export const createMockStory = (overrides?: Partial<Story>): Story => {
  return {
    storyId: MOCK_STORY_ID,
    userId: MOCK_USER_ID,
    title: 'Test Story Title',
    body: 'This is the body of the test story.',
    summary: 'Test summary',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    deletedAt: undefined,
    user: createMockUser(),
    categories: [],
    ...overrides,
  } as Story;
};

export const createMockStoryWithCategories = (overrides?: Partial<Story>): Story => {
  return createMockStory({
    categories: [
      createMockCategory({ categoryId: MOCK_CATEGORY_ID_1, name: 'Category 1' }),
      createMockCategory({ categoryId: MOCK_CATEGORY_ID_2, name: 'Category 2' }),
    ],
    ...overrides,
  });
};

// ============== DTO FIXTURES ==============

export const createSignupDto = (overrides?: Record<string, unknown>) => ({
  userName: 'newuser',
  email: 'newuser@example.com',
  name: 'New User',
  password: 'Password123!',
  confirmPassword: 'Password123!',
  ...overrides,
});

export const createLoginDto = (overrides?: Record<string, unknown>) => ({
  userName: 'testuser',
  password: 'Password123!',
  ...overrides,
});

export const createCreateUserDto = (overrides?: Record<string, unknown>) => ({
  userName: 'newuser',
  email: 'newuser@example.com',
  name: 'New User',
  ...overrides,
});

export const createUpdateUserDto = (overrides?: Record<string, unknown>) => ({
  name: 'Updated Name',
  bio: 'Updated bio',
  ...overrides,
});

export const createCreateStoryDto = (overrides?: Record<string, unknown>) => ({
  title: 'New Story Title',
  body: 'This is the body of a new story.',
  categoryIds: [],
  userId: MOCK_USER_ID,
  generateSummary: false,
  ...overrides,
});

export const createUpdateStoryDto = (overrides?: Record<string, unknown>) => ({
  title: 'Updated Story Title',
  body: 'Updated story body.',
  generateSummary: false,
  ...overrides,
});

// ============== TOKEN FIXTURES ==============

export const createMockTokenPayload = (overrides?: Record<string, unknown>) => ({
  userId: MOCK_USER_ID,
  role: UserRole.USER,
  tokenType: TOKEN_TYPE.AUTH,
  ...overrides,
});

export const createMockAuthResponse = (overrides?: Record<string, unknown>) => ({
  accessToken: 'mock-jwt-token',
  expiresIn: 3600,
  user: createMockUserProfile(),
  ...overrides,
});

// Export the mock IDs for test files
export {
  MOCK_USER_ID,
  MOCK_USER_ID_2,
  MOCK_ADMIN_ID,
  MOCK_STORY_ID,
  MOCK_STORY_ID_2,
  MOCK_CATEGORY_ID,
  MOCK_CATEGORY_ID_1,
  MOCK_CATEGORY_ID_2,
};

// ============== PAGINATION FIXTURES ==============

export const createMockPaginationQuery = (overrides?: Record<string, unknown>) => ({
  page: 1,
  itemsPerPage: 10,
  orderBy: 'userName',
  sortDirection: 'DESC' as const,
  ...overrides,
});

export const createMockStoryPaginationQuery = (overrides?: Record<string, unknown>) => ({
  page: 1,
  itemsPerPage: 10,
  orderBy: 'createdAt',
  sortDirection: 'DESC' as const,
  ...overrides,
});

export const createMockPaginatedResponse = <T>(data: T[], overrides?: Record<string, unknown>) => ({
  data,
  pagination: {
    totalItems: data.length,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    previousPage: null,
    ...overrides,
  },
});
