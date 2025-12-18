import { UserService } from '../../../services/userService.ts';
import { UserRepository } from '../../../repositories/userRepository.ts';
import { NotFoundError, DatabaseError } from '../../../errors/CustomErrors.ts';
import { ERROR_MESSAGES } from '../../../constants/errorMessages.ts';
import {
  createMockUser,
  createMockPaginatedResponse,
  createCreateUserDto,
  createUpdateUserDto,
  MOCK_USER_ID,
  MOCK_USER_ID_2,
} from '../../fixtures/index.ts';
import { createMockDeleteResult } from '../../helpers/testHelpers.ts';

// Mock the repository
jest.mock('../../../repositories/userRepository.ts');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService();
    (userService as any).userRepository = mockUserRepository;
  });

  describe('createUser', () => {
    it('should create and return a new user successfully', async () => {
      const createUserDto = createCreateUserDto();
      const mockUser = createMockUser({
        userName: createUserDto.userName,
        email: createUserDto.email,
        name: createUserDto.name,
      });

      mockUserRepository.getUserByUsernameOrEmail = jest.fn().mockResolvedValue(null);
      mockUserRepository.createUser = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.createUser(createUserDto);

      expect(result.userName).toBe(createUserDto.userName);
      expect(result.email).toBe(createUserDto.email);
      expect(mockUserRepository.getUserByUsernameOrEmail).toHaveBeenCalledWith(
        createUserDto.email,
        createUserDto.userName,
      );
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw DatabaseError when user creation fails', async () => {
      const createUserDto = createCreateUserDto();

      mockUserRepository.getUserByUsernameOrEmail = jest.fn().mockResolvedValue(null);
      mockUserRepository.createUser = jest.fn().mockResolvedValue(null);

      await expect(userService.createUser(createUserDto)).rejects.toThrow(DatabaseError);
    });
  });

  describe('getAllUsers', () => {
    it('should return paginated list of users', async () => {
      const paginationParams = {
        page: 1,
        itemsPerPage: 10,
        orderBy: 'userName' as const,
        sortDirection: 'DESC' as const,
      };
      const mockUsers = [createMockUser(), createMockUser({ userId: MOCK_USER_ID_2, userName: 'user2' })];
      const mockPaginatedResponse = createMockPaginatedResponse(mockUsers);

      mockUserRepository.getAllUsers = jest.fn().mockResolvedValue(mockPaginatedResponse);

      const result = await userService.getAllUsers(paginationParams);

      expect(result.data).toHaveLength(2);
      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(paginationParams);
    });

    it('should return empty list when no users exist', async () => {
      const paginationParams = {
        page: 1,
        itemsPerPage: 10,
        orderBy: 'userName' as const,
        sortDirection: 'DESC' as const,
      };
      const mockPaginatedResponse = createMockPaginatedResponse([]);

      mockUserRepository.getAllUsers = jest.fn().mockResolvedValue(mockPaginatedResponse);

      const result = await userService.getAllUsers(paginationParams);

      expect(result.data).toHaveLength(0);
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = createMockUser();
      mockUserRepository.getUserById = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.getUserById(MOCK_USER_ID);

      expect(result.userId).toBe(MOCK_USER_ID);
      expect(result.userName).toBe('testuser');
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(MOCK_USER_ID);
    });

    it('should throw NotFoundError when user not found', async () => {
      mockUserRepository.getUserById = jest.fn().mockResolvedValue(null);

      await expect(userService.getUserById('invalid-id')).rejects.toThrow(NotFoundError);
      await expect(userService.getUserById('invalid-id')).rejects.toThrow(ERROR_MESSAGES.USER.NOT_FOUND);
    });
  });

  describe('getUserByUsername', () => {
    it('should return user when found by username', async () => {
      const mockUser = createMockUser();
      mockUserRepository.getUserByUsername = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.getUserByUsername('testuser');

      expect(result.userName).toBe('testuser');
      expect(mockUserRepository.getUserByUsername).toHaveBeenCalledWith('testuser');
    });

    it('should throw NotFoundError when user not found by username', async () => {
      mockUserRepository.getUserByUsername = jest.fn().mockResolvedValue(null);

      await expect(userService.getUserByUsername('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateUser', () => {
    it('should update and return user successfully', async () => {
      const updateData = createUpdateUserDto();
      const mockUpdatedUser = createMockUser({ name: 'Updated Name', bio: 'Updated bio' });

      mockUserRepository.updateUser = jest.fn().mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUser(MOCK_USER_ID, updateData);

      expect(result.name).toBe('Updated Name');
      expect(result.bio).toBe('Updated bio');
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(MOCK_USER_ID, updateData);
    });

    it('should throw NotFoundError when updating non-existent user', async () => {
      const updateData = createUpdateUserDto();
      mockUserRepository.updateUser = jest.fn().mockResolvedValue(null);

      await expect(userService.updateUser('invalid-id', updateData)).rejects.toThrow(NotFoundError);
    });

    it('should update user status successfully', async () => {
      const statusUpdate = { isEmailVerified: true };
      const mockUpdatedUser = createMockUser({ isEmailVerified: true });

      mockUserRepository.updateUser = jest.fn().mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUser(MOCK_USER_ID, statusUpdate);

      expect(result.isEmailVerified).toBe(true);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockUserRepository.deleteUser = jest.fn().mockResolvedValue(createMockDeleteResult(1));

      await expect(userService.deleteUser(MOCK_USER_ID)).resolves.toBeUndefined();
      expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(MOCK_USER_ID);
    });

    it('should throw NotFoundError when deleting non-existent user', async () => {
      mockUserRepository.deleteUser = jest.fn().mockResolvedValue(createMockDeleteResult(0));

      await expect(userService.deleteUser('invalid-id')).rejects.toThrow(NotFoundError);
    });
  });
});
