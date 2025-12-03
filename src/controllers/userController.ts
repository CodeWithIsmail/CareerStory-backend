import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';

export class UserController {
  private userService = new UserService();

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers(req.validatedQuery);
    return ResponseHandler.success(res, users, RESPONSE_MESSAGES.USER.FETCH.ALL_SUCCESS);
  };

  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.userId);
    return ResponseHandler.success(res, user, RESPONSE_MESSAGES.USER.FETCH.BY_ID_SUCCESS);
  };

  updateUser = async (req: Request, res: Response) => {
    const updatedUser = await this.userService.updateUser(req.params.userId, req.body);
    return ResponseHandler.success(res, updatedUser, RESPONSE_MESSAGES.USER.UPDATE.SUCCESS);
  };

  deleteUser = async (req: Request, res: Response) => {
    await this.userService.deleteUser(req.params.userId);
    return ResponseHandler.noContent(res);
  };
}
