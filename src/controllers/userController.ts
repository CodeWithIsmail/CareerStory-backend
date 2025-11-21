import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { z } from 'zod';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from '../validators/userValidator.ts';

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
      const validatedNewUser: CreateUserDto = createUserSchema.parse(req.body);
      const newUser = await this.userService.createUser(validatedNewUser);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Failed to create user' });
      }
      return res.status(500).json({ message: 'Failed to create user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Failed to fetch all users' });
      }
      return res.status(500).json({ message: 'Failed to fetch all users' });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = userIdParamSchema.parse(req.params).userId;
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: `Failed to fetch user with ID ${req.params.userId}` });
      }
      return res.status(500).json({ message: `Failed to fetch user with ID ${req.params.userId}` });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = userIdParamSchema.parse(req.params).userId;
      const updateData: UpdateUserDto = updateUserSchema.parse(req.body);
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: `Failed to update user with ID ${req.params.userId}`,
        });
      }
      return res.status(500).json({
        message: `Failed to update user with ID ${req.params.userId}`,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = userIdParamSchema.parse(req.params).userId;
      await this.userService.deleteUser(userId);
      return res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: `Failed to delete user with ID ${req.params.userId}`,
        });
      }
      return res.status(500).json({
        message: `Failed to delete user with ID ${req.params.userId}`,
      });
    }
  };
}
