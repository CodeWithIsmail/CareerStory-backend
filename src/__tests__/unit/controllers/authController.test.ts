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
import { ERROR_MESSAGES } from '../../../constants/errorMessages.ts';

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
    it('should confirm email and redirect to success page', async () => {
      mockRequest.params = { token: 'valid-jwt-token' };
      mockAuthService.confirmEmail = jest.fn().mockResolvedValue(undefined);

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockAuthService.confirmEmail).toHaveBeenCalledWith('valid-jwt-token');
      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('status=success'));
    });

    it('should redirect with token_expired error code', async () => {
      mockRequest.params = { token: 'expired-token' };
      mockAuthService.confirmEmail = jest
        .fn()
        .mockRejectedValue(new Error(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED));

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('code=token_expired'));
    });

    it('should redirect with invalid_token error code', async () => {
      mockRequest.params = { token: 'invalid-token' };
      mockAuthService.confirmEmail = jest
        .fn()
        .mockRejectedValue(new Error(ERROR_MESSAGES.AUTH.INVALID_TOKEN));

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('code=invalid_token'));
    });

    it('should redirect with user_not_found error code', async () => {
      mockRequest.params = { token: 'token-for-missing-user' };
      mockAuthService.confirmEmail = jest.fn().mockRejectedValue(new Error(ERROR_MESSAGES.USER.NOT_FOUND));

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('code=user_not_found'));
    });

    it('should redirect with already_verified error code', async () => {
      mockRequest.params = { token: 'already-verified-token' };
      mockAuthService.confirmEmail = jest
        .fn()
        .mockRejectedValue(new Error(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED));

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('code=already_verified'));
    });

    it('should redirect with verification_failed error code for unknown errors', async () => {
      mockRequest.params = { token: 'invalid-token' };
      mockAuthService.confirmEmail = jest.fn().mockRejectedValue(new Error('Unknown error'));

      await authController.confirmEmail(mockRequest as any, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('status=error'));
      expect(mockResponse.redirect).toHaveBeenCalledWith(expect.stringContaining('code=verification_failed'));
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

  describe('changePassword', () => {
    it('should change password and return 200 status', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { currentPassword: 'currentPass123', newPassword: 'newPassword123' };
      mockAuthService.changePassword = jest.fn().mockResolvedValue(undefined);

      await authController.changePassword(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockAuthService.changePassword).toHaveBeenCalledWith('user-uuid-123', mockRequest.body);
    });

    it('should propagate error when password change fails', async () => {
      mockRequest.userId = 'user-uuid-123';
      mockRequest.body = { currentPassword: 'wrongPassword', newPassword: 'newPassword123' };
      mockAuthService.changePassword = jest.fn().mockRejectedValue(new Error('Incorrect password'));

      await expect(
        authController.changePassword(mockRequest as AuthRequest, mockResponse as Response),
      ).rejects.toThrow('Incorrect password');
    });
  });
});
