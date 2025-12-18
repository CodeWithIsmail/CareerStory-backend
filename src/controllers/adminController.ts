import { Request, Response } from 'express';
import { ResponseHandler } from '../utils/responseHandler.ts';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';
import { AdminService } from '../services/adminService.ts';

export class AdminController {
  private adminService = new AdminService();

  updateUserRole = async (req: Request, res: Response) => {
    const updatedUser = await this.adminService.updateUserRole(req.params.userId, req.body.role);
    return ResponseHandler.success(res, updatedUser, RESPONSE_MESSAGES.USER.UPDATE.ROLE);
  };
}
