import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';

export class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.authService.signup(req.body);
      return ResponseHandler.created(res, newUser, RESPONSE_MESSAGES.USER.CREATE.SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.login(req.body);
      // Later, you can generate JWT here
      return ResponseHandler.success(res, user, RESPONSE_MESSAGES.AUTH.LOGIN.SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
