import { Router } from 'express';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { authorizeRoles } from '../middlewares/authorizationMiddleware.ts';
import { UserRole } from '../entities/User.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import { REQ_SOURCE } from '../types/customTypes.ts';
import { updateUserRoleSchema, userParamSchema } from '../validators/userValidator.ts';
import { AdminController } from '../controllers/adminController.ts';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.patch(
  '/update-role/:userId',
  authenticate,
  authorizeRoles(UserRole.ADMIN),
  reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
  reqValidation(REQ_SOURCE.BODY, updateUserRoleSchema),
  adminController.updateUserRole,
);

export default adminRouter;
