import { Request, Response } from 'express';
import { AuthService } from '../services/authService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';

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
    const token = req.params.token;
    const confirmedUser = await this.authService.confirmEmail(token);
    return ResponseHandler.success(res, confirmedUser, RESPONSE_MESSAGES.AUTH.EMAIL_CONFIRMATION.SUCCESS);
  };


  resendConfirmationEmail = async (req: Request, res: Response) => {
    const userName= req.query.userName;
    await this.authService.rese
   
  }
}
