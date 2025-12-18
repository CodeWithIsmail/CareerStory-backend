import { AuthController } from '../../../controllers/authController.ts';
import { AuthService } from '../../../services/authService.ts';
import { createMockRequest, createMockResponse } from '../../helpers/testHelpers.ts';
import {
  createMockUserProfile,
  createMockAuthResponse,
  createSignupDto,
  createLoginDto,
} from '../../fixtures/index.ts';
import { Response } from 'express';
import { AuthRequest } from '../../../middlewares/authenticationMiddleware.ts';

// Mock dependencies
jest.mock('../../../services/authService.ts');

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
    (authController as any).authService = mockAuthService;

    mockRequest = createMockRequest();
    mockResponse = createMockResponse();
  });

  describe('signup', () => {
    it('should create new user and return 201 status', async () => {
      const signupDto = createSignupDto();
      const mockNewUser = createMockUserProfile({
        userName: signupDto.userName,
        email: signupDto.email,
      });

      mockRequest.body = signupDto;
      mockAuthService.signup = jest.fn().mockResolvedValue(mockNewUser);

      await authController.signup(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          statusCode: 201,
        }),
      );
      expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
    });

    it('should propagate error when signup fails', async () => {
      const signupDto = createSignupDto();
      mockRequest.body = signupDto;
      mockAuthService.signup = jest.fn().mockRejectedValue(new Error('Email already exists'));

      await expect(authController.signup(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Email already exists',
      );
    });
  });

  describe('login', () => {
    it('should login user and return 200 status with token', async () => {
      const loginDto = createLoginDto();
      const mockAuthResponse = createMockAuthResponse();

      mockRequest.body = loginDto;
      mockAuthService.login = jest.fn().mockResolvedValue(mockAuthResponse);

      await authController.login(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          result: mockAuthResponse,
        }),
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should propagate error when login fails', async () => {
      const loginDto = createLoginDto();
      mockRequest.body = loginDto;
      mockAuthService.login = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

      await expect(authController.login(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('confirmEmail', () => {
    it('should confirm email and return 200 status', async () => {
      mockRequest.params = { token: 'valid-jwt-token' };
      mockAuthService.confirmEmail = jest.fn().mockResolvedValue(undefined);

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.confirmEmail).toHaveBeenCalledWith('valid-jwt-token');
    });

    it('should propagate error when token is invalid', async () => {
      mockRequest.params = { token: 'invalid-token' };
      mockAuthService.confirmEmail = jest.fn().mockRejectedValue(new Error('Invalid token'));

      await expect(authController.confirmEmail(mockRequest as any, mockResponse as Response)).rejects.toThrow(
        'Invalid token',
      );
    });
  });

  describe('resendConfirmationEmail', () => {
    it('should resend confirmation email and return 200 status', async () => {
      mockRequest.params = { userName: 'testuser' };
      mockAuthService.resendConfirmationEmail = jest.fn().mockResolvedValue(undefined);

      await authController.resendConfirmationEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.resendConfirmationEmail).toHaveBeenCalledWith('testuser');
    });

    it('should propagate error when resend fails', async () => {
      mockRequest.params = { userName: 'testuser' };
      mockAuthService.resendConfirmationEmail = jest
        .fn()
        .mockRejectedValue(new Error('Email already verified'));

      await expect(
        authController.resendConfirmationEmail(mockRequest as any, mockResponse as Response),
      ).rejects.toThrow('Email already verified');
    });
  });

  describe('initiatePasswordChange', () => {
    it('should initiate password change and return 200 status', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { currentPassword: 'currentPass123' };
      mockAuthService.initiatePasswordChange = jest.fn().mockResolvedValue(undefined);

      await authController.initiatePasswordChange(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.initiatePasswordChange).toHaveBeenCalledWith('user-uuid-123', 'currentPass123');
    });

    it('should propagate error when initiation fails', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { currentPassword: 'wrongPassword' };
      mockAuthService.initiatePasswordChange = jest.fn().mockRejectedValue(new Error('Incorrect password'));

      await expect(
        authController.initiatePasswordChange(mockRequest as AuthRequest, mockResponse as Response),
      ).rejects.toThrow('Incorrect password');
    });
  });

  describe('verifyPasswordChangeCode', () => {
    it('should verify code and return 200 status', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { code: '123456' };
      mockAuthService.verifyPasswordChangeCode = jest.fn().mockResolvedValue(undefined);

      await authController.verifyPasswordChangeCode(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.verifyPasswordChangeCode).toHaveBeenCalledWith('user-uuid-123', '123456');
    });

    it('should propagate error when code is invalid', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { code: 'wrong-code' };
      mockAuthService.verifyPasswordChangeCode = jest.fn().mockRejectedValue(new Error('Invalid code'));

      await expect(
        authController.verifyPasswordChangeCode(mockRequest as AuthRequest, mockResponse as Response),
      ).rejects.toThrow('Invalid code');
    });
  });

  describe('changePassword', () => {
    it('should change password and return 200 status', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { password: 'newPassword123' };
      mockAuthService.setNewPassword = jest.fn().mockResolvedValue(undefined);

      await authController.changePassword(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.setNewPassword).toHaveBeenCalledWith('user-uuid-123', 'newPassword123');
    });

    it('should propagate error when password change fails', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { password: 'newPassword123' };
      mockAuthService.setNewPassword = jest.fn().mockRejectedValue(new Error('Code not verified'));

      await expect(
        authController.changePassword(mockRequest as AuthRequest, mockResponse as Response),
      ).rejects.toThrow('Code not verified');
    });
  });
});
