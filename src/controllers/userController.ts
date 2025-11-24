import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { z } from 'zod';
import { UserValidator } from '../validators/userValidator.ts';
import { AppError } from '../errors/AppError.ts';
import { ErrorFactory } from '../errors/errorFactory.ts';

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
      if (error instanceof z.ZodError) {
        const validationError = ErrorFactory.createValidationError('Invalid request data');
        return res.status(validationError.statusCode).json({ message: validationError.message });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unexpected error occurred while creating user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: 'Unexpected error occurred while fetching all users' });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = ErrorFactory.createValidationError('Invalid user ID parameter');
        return res.status(validationError.statusCode).json({ message: validationError.message });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({
        message: `Unexpected error occurred while fetching user with ID ${req.params.userId}`,
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      const updateData: UpdateUserDto = UserValidator.validateUpdateUser(req.body);
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = ErrorFactory.createValidationError('Invalid user data for update');
        return res.status(validationError.statusCode).json({ message: validationError.message });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({
        message: `Unexpected error occurred while updating user with ID ${req.params.userId}`,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = UserValidator.validateUserIdParam(req.params);
      await this.userService.deleteUser(userId);
      return res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = ErrorFactory.createValidationError('Invalid user ID parameter');
        return res.status(validationError.statusCode).json({ message: validationError.message });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({
        message: `Unexpected error occurred while deleting user with ID ${req.params.userId}`,
      });
    }
  };
}
