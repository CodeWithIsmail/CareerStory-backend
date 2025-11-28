import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { constantStatusCodes } from '../constants/errorMessages.ts';

/**
 * UserController
 * ----------------
 * Handles HTTP requests related to User entity.
 * Delegates business logic to UserService.
 * Responsible for request/response lifecycle and error handling.
 */

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedNewUser: CreateUserDto = UserValidator.validateCreateUser(req.body);
      const newUser = await this.userService.createUser(validatedNewUser);
      return res.status(constantStatusCodes.CREATED).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(constantStatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params.userId);
      const user = await this.userService.getUserById(userId);
      return res.status(constantStatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params.userId);
      const updateData: UpdateUserDto = UserValidator.validateUpdateUser(req.body);
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return res.status(constantStatusCodes.OK).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params.userId);
      await this.userService.deleteUser(userId);
      return res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}