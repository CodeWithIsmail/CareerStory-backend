import { Request, Response } from 'express';
import { UserService } from '../services/user.service.ts';

export class UserController {
  private userService = new UserService();

  // CREATE USER
  createUser = async (req: Request, res: Response) => {
    try {
      const { userName, name, email, role } = req.body;

      if (!userName || !name || !email) {
        return res
          .status(400)
          .json({ message: 'userName, name, and email are required' });
      }

      const createdUser = await this.userService.createUser({
        userName,
        name,
        email,
        role,
      });
      return res.status(201).json({ data: createdUser });
    } catch (err) {}
  };

  // GET ALL USERS
  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json({ data: users });
    } catch (err) {}
  };

  // GET USER BY ID
  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await this.userService.getUserById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({ data: user });
    } catch (err) {}
  };

  // UPDATE USER
  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const { userName, name, email, role } = req.body;
      if (!userName && !name && !email && !role) {
        return res
          .status(400)
          .json({ message: 'At least one field is required to update' });
      }

      const updatedUser = await this.userService.updateUser(userId, {
        userName,
        name,
        email,
        role,
      });
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({ data: updatedUser });
    } catch (err) {}
  };

  // DELETE USER (soft delete)
  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser)
        return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {}
  };
}
