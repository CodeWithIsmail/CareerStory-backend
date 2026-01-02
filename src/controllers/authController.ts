import { Request, Response } from 'express';
import { AuthService } from '../services/authService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';
import { AuthRequest } from '../middlewares/authenticationMiddleware.ts';
import { ENV } from '../config/environment.ts';
import { ERROR_MESSAGES } from '../constants/errorMessages.ts';

export class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response) => {
    const newUser = await this.authService.signup(req.body);
    return ResponseHandler.created(res, newUser, RESPONSE_MESSAGES.USER.CREATE.SUCCESS);
  };

  login = async (req: Request, res: Response) => {
    const user = await this.authService.login(req.body);
    return ResponseHandler.success(res, user, RESPONSE_MESSAGES.AUTH.LOGIN.SUCCESS);
  };

  confirmEmail = async (req: Request, res: Response) => {
    try {
      await this.authService.confirmEmail(req.params.token);
      return res.redirect(`${ENV.FRONTEND_URL}/email-confirmation-status?status=success`);
    } catch (error: any) {
      let errorCode = 'verification_failed';
      if (error.message === ERROR_MESSAGES.AUTH.TOKEN_EXPIRED) {
        errorCode = 'token_expired';
      } else if (error.message === ERROR_MESSAGES.AUTH.INVALID_TOKEN) {
        errorCode = 'invalid_token';
      } else if (error.message === ERROR_MESSAGES.USER.NOT_FOUND) {
        errorCode = 'user_not_found';
      } else if (error.message === ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED) {
        errorCode = 'already_verified';
      }
      return res.redirect(`${ENV.FRONTEND_URL}/email-confirmation-status?status=error&code=${errorCode}`);
    }
  };

  resendConfirmationEmail = async (req: Request, res: Response) => {
    await this.authService.resendConfirmationEmail(req.params.userName);
    return ResponseHandler.success(res, null, RESPONSE_MESSAGES.AUTH.EMAIL_CONFIRMATION.RESEND);
  };

  changePassword = async (req: AuthRequest, res: Response) => {
    await this.authService.changePassword(req.userId, req.body);
    return ResponseHandler.success(res, null, RESPONSE_MESSAGES.AUTH.PASSWORD_CHANGE.SUCCESS);
  };
}
