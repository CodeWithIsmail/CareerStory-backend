import { AuthService } from '../../../services/authService.ts';
import { AuthRepository } from '../../../repositories/authRepository.ts';
import { UserService } from '../../../services/userService.ts';
import { UnauthorizedError, BadRequestError, DatabaseError } from '../../../errors/CustomErrors.ts';
import { ERROR_MESSAGES } from '../../../constants/errorMessages.ts';
import {
  createMockUser,
  createMockUserProfile,
  createMockAuth,
  createMockAuthWithPasswordChangeCode,
  createMockAuthWithVerifiedCode,
  createMockUnverifiedUser,
  createSignupDto,
  createLoginDto,
  MOCK_USER_ID,
} from '../../fixtures/index.ts';

// Mock dependencies
jest.mock('../../../repositories/authRepository.ts');
jest.mock('../../../services/userService.ts');
jest.mock('../../../utils/emailUtils.ts', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordChangeCodeEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordChangeConfirmationEmail: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../../../utils/tokenUtils.ts', () => ({
  generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
  generateTokenError: jest.fn().mockImplementation(() => {
    throw new UnauthorizedError('Invalid token');
  }),
}));
jest.mock('../../../utils/passwordUtils.ts', () => ({
  generateHashedPassword: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  generatePasswordChangeCode: jest.fn().mockReturnValue('123456'),
  isPasswordChangeCodeExpired: jest.fn().mockReturnValue(false),
  validateUserPassword: jest.fn().mockResolvedValue(true),
}));
jest.mock('../../../mappers/authMapper.ts', () => ({
  mapSignUpToCreateAuth: jest.fn().mockResolvedValue({
    userId: 'user-uuid-123',
    hashedPassword: '$2b$10$hashedpassword',
  }),
  mapSignupToCreateUser: jest.fn().mockImplementation((dto) => ({
    userName: dto.userName,
    email: dto.email,
    name: dto.name,
  })),
}));

import * as passwordUtils from '../../../utils/passwordUtils.ts';
import * as emailUtils from '../../../utils/emailUtils.ts';

describe('AuthService', () => {
  let authService: AuthService;
  let mockAuthRepository: jest.Mocked<AuthRepository>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new AuthRepository() as jest.Mocked<AuthRepository>;
    mockUserService = new UserService() as jest.Mocked<UserService>;

    authService = new AuthService();
    (authService as any).authRepository = mockAuthRepository;
    (authService as any).userService = mockUserService;
  });

  describe('signup', () => {
    it('should successfully create a new user', async () => {
      const signupDto = createSignupDto();
      const mockNewUser = createMockUserProfile({
        userName: signupDto.userName,
        email: signupDto.email,
        isEmailVerified: false,
      });

      mockUserService.createUser = jest.fn().mockResolvedValue(mockNewUser);
      mockAuthRepository.createAuth = jest.fn().mockResolvedValue(createMockAuth());

      const result = await authService.signup(signupDto);

      expect(result.userName).toBe(signupDto.userName);
      expect(result.email).toBe(signupDto.email);
      expect(mockUserService.createUser).toHaveBeenCalled();
      expect(mockAuthRepository.createAuth).toHaveBeenCalled();
      expect(emailUtils.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should send verification email after signup', async () => {
      const signupDto = createSignupDto();
      const mockNewUser = createMockUserProfile({ userName: signupDto.userName });

      mockUserService.createUser = jest.fn().mockResolvedValue(mockNewUser);
      mockAuthRepository.createAuth = jest.fn().mockResolvedValue(createMockAuth());

      await authService.signup(signupDto);

      // Verify sendVerificationEmail was called at least once
      // The first argument should be the user object with matching email and userName
      const calls = (emailUtils.sendVerificationEmail as jest.Mock).mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      expect(calls[0][0]).toMatchObject({
        userName: mockNewUser.userName,
        email: mockNewUser.email,
      });
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const loginDto = createLoginDto();
      const mockUser = createMockUserProfile({ isEmailVerified: true });
      const mockAuth = createMockAuth();

      mockUserService.getUserByUsername = jest.fn().mockResolvedValue(mockUser);
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);

      const result = await authService.login(loginDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('expiresIn');
      expect(result).toHaveProperty('user');
      expect(mockUserService.getUserByUsername).toHaveBeenCalledWith(loginDto.userName);
    });

    it('should throw UnauthorizedError if email is not verified', async () => {
      const loginDto = createLoginDto();
      const mockUnverifiedUser = createMockUnverifiedUser();

      mockUserService.getUserByUsername = jest.fn().mockResolvedValue(mockUnverifiedUser);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedError);
      await expect(authService.login(loginDto)).rejects.toThrow(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED);
    });

    it('should throw UnauthorizedError if auth record not found', async () => {
      const loginDto = createLoginDto();
      const mockUser = createMockUserProfile({ isEmailVerified: true });

      mockUserService.getUserByUsername = jest.fn().mockResolvedValue(mockUser);
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('resendConfirmationEmail', () => {
    it('should resend confirmation email for unverified user', async () => {
      const mockUnverifiedUser = createMockUnverifiedUser();
      mockUserService.getUserByUsername = jest.fn().mockResolvedValue(mockUnverifiedUser);

      await authService.resendConfirmationEmail('testuser');

      expect(mockUserService.getUserByUsername).toHaveBeenCalledWith('testuser');
      expect(emailUtils.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should throw BadRequestError if email is already verified', async () => {
      const mockVerifiedUser = createMockUserProfile({ isEmailVerified: true });
      mockUserService.getUserByUsername = jest.fn().mockResolvedValue(mockVerifiedUser);

      await expect(authService.resendConfirmationEmail('testuser')).rejects.toThrow(BadRequestError);
      await expect(authService.resendConfirmationEmail('testuser')).rejects.toThrow(
        ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED,
      );
    });
  });

  describe('getAuthByUserId', () => {
    it('should return auth record when found', async () => {
      const mockAuth = createMockAuth();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);

      const result = await authService.getAuthByUserId('user-uuid-123', 'test-context');

      expect(result).toEqual(mockAuth);
      expect(mockAuthRepository.getAuthByUserId).toHaveBeenCalledWith('user-uuid-123');
    });

    it('should throw UnauthorizedError when auth not found', async () => {
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(null);

      await expect(authService.getAuthByUserId('invalid-id', 'test-context')).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });

  describe('initiatePasswordChange', () => {
    it('should initiate password change successfully', async () => {
      const mockAuth = createMockAuth();
      const mockUser = createMockUserProfile();

      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.storePasswordChangeCode = jest.fn().mockResolvedValue(mockAuth);
      mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await authService.initiatePasswordChange('user-uuid-123', 'currentPassword');

      expect(mockAuthRepository.storePasswordChangeCode).toHaveBeenCalled();
      expect(emailUtils.sendPasswordChangeCodeEmail).toHaveBeenCalled();
    });

    it('should throw DatabaseError when storing code fails', async () => {
      const mockAuth = createMockAuth();

      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.storePasswordChangeCode = jest.fn().mockResolvedValue(null);

      await expect(authService.initiatePasswordChange('user-uuid-123', 'currentPassword')).rejects.toThrow(
        DatabaseError,
      );
    });
  });

  describe('verifyPasswordChangeCode', () => {
    it('should verify password change code successfully', async () => {
      const mockAuth = createMockAuthWithPasswordChangeCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.verifyPasswordChangeCode = jest.fn().mockResolvedValue(mockAuth);

      await authService.verifyPasswordChangeCode('user-uuid-123', '123456');

      expect(mockAuthRepository.verifyPasswordChangeCode).toHaveBeenCalledWith('user-uuid-123');
    });

    it('should throw BadRequestError when no code requested', async () => {
      const mockAuth = createMockAuth(); // No password change code
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);

      await expect(authService.verifyPasswordChangeCode('user-uuid-123', '123456')).rejects.toThrow(
        BadRequestError,
      );
      await expect(authService.verifyPasswordChangeCode('user-uuid-123', '123456')).rejects.toThrow(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_NOT_REQUESTED,
      );
    });

    it('should throw BadRequestError when code is expired', async () => {
      const mockAuth = createMockAuthWithPasswordChangeCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.clearPasswordChangeCode = jest.fn().mockResolvedValue(undefined);
      (passwordUtils.isPasswordChangeCodeExpired as jest.Mock).mockReturnValueOnce(true);

      await expect(authService.verifyPasswordChangeCode('user-uuid-123', '123456')).rejects.toThrow(
        BadRequestError,
      );
    });

    it('should throw BadRequestError when code is invalid', async () => {
      const mockAuth = createMockAuthWithPasswordChangeCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);

      await expect(authService.verifyPasswordChangeCode('user-uuid-123', 'wrong-code')).rejects.toThrow(
        BadRequestError,
      );
      await expect(authService.verifyPasswordChangeCode('user-uuid-123', 'wrong-code')).rejects.toThrow(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_INVALID,
      );
    });

    it('should throw DatabaseError when verification fails', async () => {
      const mockAuth = createMockAuthWithPasswordChangeCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.verifyPasswordChangeCode = jest.fn().mockResolvedValue(null);

      await expect(authService.verifyPasswordChangeCode('user-uuid-123', '123456')).rejects.toThrow(
        DatabaseError,
      );
    });
  });

  describe('setNewPassword', () => {
    it('should set new password successfully', async () => {
      const mockAuth = createMockAuthWithVerifiedCode();
      const mockUser = createMockUserProfile();

      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.updatePassword = jest.fn().mockResolvedValue(mockAuth);
      mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);

      await authService.setNewPassword('user-uuid-123', 'newPassword123');

      expect(mockAuthRepository.updatePassword).toHaveBeenCalled();
      expect(emailUtils.sendPasswordChangeConfirmationEmail).toHaveBeenCalled();
    });

    it('should throw BadRequestError when code is not verified', async () => {
      const mockAuth = createMockAuthWithPasswordChangeCode(); // Not verified
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);

      await expect(authService.setNewPassword('user-uuid-123', 'newPassword')).rejects.toThrow(
        BadRequestError,
      );
      await expect(authService.setNewPassword('user-uuid-123', 'newPassword')).rejects.toThrow(
        ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.CODE_NOT_VERIFIED,
      );
    });

    it('should throw BadRequestError when code is expired during set', async () => {
      const mockAuth = createMockAuthWithVerifiedCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      (passwordUtils.isPasswordChangeCodeExpired as jest.Mock).mockReturnValueOnce(true);

      await expect(authService.setNewPassword('user-uuid-123', 'newPassword')).rejects.toThrow(
        BadRequestError,
      );
    });

    it('should throw DatabaseError when password update fails', async () => {
      const mockAuth = createMockAuthWithVerifiedCode();
      mockAuthRepository.getAuthByUserId = jest.fn().mockResolvedValue(mockAuth);
      mockAuthRepository.updatePassword = jest.fn().mockResolvedValue(null);

      await expect(authService.setNewPassword('user-uuid-123', 'newPassword')).rejects.toThrow(DatabaseError);
    });
  });
});
