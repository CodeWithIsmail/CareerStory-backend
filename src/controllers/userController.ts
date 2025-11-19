import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';

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
      const { userName, name, email, role } = req.body;
      const user = await this.userService.createUser({
        userName,
        name,
        email,
        role,
      });
      res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch all users' });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.userId);
      const user = await this.userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Failed to fetch user with ID ${req.params.userId}` });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.userId);
      const updateData = req.body;

      const updatedUser = await this.userService.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({
        message: `Failed to update user with ID ${req.params.userId}`,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.userId);
      const result = await this.userService.deleteUser(id);

      // TypeORM returns { affected: 0 } when nothing was deleted
      if (result.affected === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res
        .status(200)
        .json({ message: 'User soft deleted successfully' });
    } catch (error) {
      return res.status(500).json({
        message: `Failed to delete user with ID ${req.params.userId}`,
      });
    }
  };
}
