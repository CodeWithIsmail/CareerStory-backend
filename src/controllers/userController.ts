import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { ErrorHandler } from '../errors/errorHandler.ts';

/**
 * UserController
 * ----------------
 * Handles HTTP requests related to User entity.
 * Delegates business logic to UserService.
 * Responsible for request/response lifecycle and error handling.
 */

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response) => {
    try {
      const validatedNewUser: CreateUserDto = UserValidator.validateCreateUser(req.body);
      const newUser = await this.userService.createUser(validatedNewUser);
      return res.status(201).json(newUser);
    } catch (error) {
      return ErrorHandler.handleError(error, res, 'creating new user');
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return ErrorHandler.handleError(error, res, 'fetching all users');
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return ErrorHandler.handleError(error, res, `fetching user with ID ${req.params.userId}`);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      const updateData: UpdateUserDto = UserValidator.validateUpdateUser(req.body);
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return ErrorHandler.handleError(error, res, `updating user with ID ${req.params.userId}`);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      await this.userService.deleteUser(userId);
      return res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      return ErrorHandler.handleError(error, res, `deleting user with ID ${req.params.userId}`);
    }
  };
}
