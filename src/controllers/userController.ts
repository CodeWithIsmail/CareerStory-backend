import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/userDto.ts';
import { User } from '../entities/User.ts';

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
      const userData: CreateUserDto = req.body;
      const newUser = await this.userService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Failed to create user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: 'Failed to fetch all users' });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.userId;
      const user = await this.userService.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: `Failed to fetch user with ID ${req.params.userId}` });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.userId;
      const updateData: UpdateUserDto = req.body;
      const updatedUser = await this.userService.updateUser(id, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({
        message: `Failed to update user with ID ${req.params.userId}`,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.userId;
      await this.userService.deleteUser(id);
      return res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      return res.status(400).json({
        message: `Failed to delete user with ID ${req.params.userId}`,
      });
    }
  };
}
