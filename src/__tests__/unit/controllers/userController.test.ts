import { UserController } from '../../../controllers/userController.ts';
import { UserService } from '../../../services/userService.ts';
import { createMockRequest, createMockResponse } from '../../helpers/testHelpers.ts';
import {
  createMockUserProfile,
  createMockPaginatedResponse,
  createUpdateUserDto,
} from '../../fixtures/index.ts';
import { Response } from 'express';
import { AuthRequest } from '../../../middlewares/authenticationMiddleware.ts';

// Mock dependencies
jest.mock('../../../services/userService.ts');

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: jest.Mocked<UserService>;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserService = new UserService() as jest.Mocked<UserService>;
    userController = new UserController();
    (userController as any).userService = mockUserService;

    mockRequest = createMockRequest();
    mockResponse = createMockResponse();
  });

  describe('getAllUsers', () => {
    it('should return paginated list of users with 200 status', async () => {
      const mockUsers = [
        createMockUserProfile(),
        createMockUserProfile({ userId: 'user-2', userName: 'user2' }),
      ];
      const mockPaginatedResponse = createMockPaginatedResponse(mockUsers);

      mockUserService.getAllUsers = jest.fn().mockResolvedValue(mockPaginatedResponse);

      await userController.getAllUsers(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          statusCode: 200,
        }),
      );
      expect(mockUserService.getAllUsers).toHaveBeenCalledWith(mockRequest.validatedQuery);
    });

    it('should return empty list when no users exist', async () => {
      const mockPaginatedResponse = createMockPaginatedResponse([]);

      mockUserService.getAllUsers = jest.fn().mockResolvedValue(mockPaginatedResponse);

      await userController.getAllUsers(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getUserById', () => {
    it('should return user with 200 status when found', async () => {
      const mockUser = createMockUserProfile();
      mockRequest.params = { userId: 'user-uuid-123' };

      mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await userController.getUserById(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          result: mockUser,
        }),
      );
      expect(mockUserService.getUserById).toHaveBeenCalledWith('user-uuid-123');
    });

    it('should propagate error when user not found', async () => {
      mockRequest.params = { userId: 'invalid-id' };
      mockUserService.getUserById = jest.fn().mockRejectedValue(new Error('User not found'));

      await expect(userController.getUserById(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('getCurrentUserProfile', () => {
    it('should return current user profile with 200 status', async () => {
      const mockUser = createMockUserProfile();
      mockRequest.userId = 'user-uuid-123';

      mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await userController.getCurrentUserProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          result: mockUser,
        }),
      );
      expect(mockUserService.getUserById).toHaveBeenCalledWith('user-uuid-123');
    });
  });

  describe('updateUser', () => {
    it('should update user and return with 200 status', async () => {
      const updateData = createUpdateUserDto();
      const mockUpdatedUser = createMockUserProfile({ name: 'Updated Name' });

      mockRequest.params = { userId: 'user-uuid-123' };
      mockRequest.body = updateData;

      mockUserService.updateUser = jest.fn().mockResolvedValue(mockUpdatedUser);

      await userController.updateUser(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockUserService.updateUser).toHaveBeenCalledWith('user-uuid-123', updateData);
    });

    it('should propagate error when update fails', async () => {
      mockRequest.params = { userId: 'invalid-id' };
      mockRequest.body = createUpdateUserDto();
      mockUserService.updateUser = jest.fn().mockRejectedValue(new Error('Update failed'));

      await expect(userController.updateUser(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('updateUserProfile', () => {
    it('should update current user profile and return with 200 status', async () => {
      const updateData = createUpdateUserDto();
      const mockUpdatedUser = createMockUserProfile({ name: 'Updated Name' });

      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = updateData;

      mockUserService.updateUser = jest.fn().mockResolvedValue(mockUpdatedUser);

      await userController.updateUserProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockUserService.updateUser).toHaveBeenCalledWith('user-uuid-123', updateData);
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return 204 status', async () => {
      mockRequest.params = { userId: 'user-uuid-123' };

      mockUserService.deleteUser = jest.fn().mockResolvedValue(undefined);

      await userController.deleteUser(mockRequest as any, mockResponse as Response);

      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith('user-uuid-123');
    });

    it('should propagate error when delete fails', async () => {
      mockRequest.params = { userId: 'invalid-id' };
      mockUserService.deleteUser = jest.fn().mockRejectedValue(new Error('Delete failed'));

      await expect(userController.deleteUser(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
