import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import {
  updateUserProfileSchema,
  updateUserRoleSchema,
  userParamSchema,
} from '../validators/userValidator.ts';
import { userPaginationSchema } from '../validators/paginationValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { authorizeOwnerOrAdmin, authorizeRoles } from '../middlewares/authorizationMiddleware.ts';
import { REQ_SOURCE, UserRole } from '../types/customTypes.ts';

const userRouter = Router();
const userController = new UserController();

userRouter
  .get('/', reqValidation(REQ_SOURCE.QUERY, userPaginationSchema), userController.getAllUsers)

  .get('/profile', authenticate, userController.getCurrentUserProfile)

  .patch(
    '/profile',
    authenticate,
    reqValidation(REQ_SOURCE.BODY, updateUserProfileSchema),
    userController.updateUserProfile,
  )

  .patch(
    '/change-role/:userId',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
    reqValidation(REQ_SOURCE.BODY, updateUserRoleSchema),
    userController.updateUser,
  )

  .get('/:userId', reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'), userController.getUserById)

  .delete(
    '/:userId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
    authorizeOwnerOrAdmin,
    userController.deleteUser,
  );

export default userRouter;
