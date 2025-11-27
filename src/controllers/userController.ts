import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      return ResponseHandler.created(res, newUser, RESPONSE_MESSAGES.USER.CREATE.SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      return ResponseHandler.success(res, users, RESPONSE_MESSAGES.USER.FETCH.ALL_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.userId);
      return ResponseHandler.success(res, user, RESPONSE_MESSAGES.USER.FETCH.BY_ID_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userService.updateUser(req.params.userId, req.body);
      return ResponseHandler.success(res, updatedUser, RESPONSE_MESSAGES.USER.UPDATE.SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.userId);
      return ResponseHandler.success(
        res,
        { id: req.params.userId },
        RESPONSE_MESSAGES.USER.DELETE.SUCCESS,
      );
    } catch (error) {
      next(error);
    }
  };
}
