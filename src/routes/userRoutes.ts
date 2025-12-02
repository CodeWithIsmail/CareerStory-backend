import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';
import {
  validateParamId,
  validateReqBody,
  validateReqQuery,
} from '../middlewares/reqValidationMiddleware.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { PaginationValidator } from '../validators/paginationValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { ENV } from '../config/environment.ts';
import { authorizeOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';
const userRouter = Router();
const userController = new UserController();

userRouter
  .get(
    '/',
    authenticate(ENV.JWT_SECRET),
    validateReqQuery(PaginationValidator.validateUserPagination.bind(PaginationValidator)),
    userController.getAllUsers,
  )
  .get(
    '/:userId',
    authenticate(ENV.JWT_SECRET),
    validateParamId('userId', UserValidator.validateUserIdParam),
    userController.getUserById,
  )
  .patch(
    '/:userId',
    authenticate(ENV.JWT_SECRET),
    validateParamId('userId', UserValidator.validateUserIdParam),
    authorizeOwnerOrAdmin,
    validateReqBody(UserValidator.updateUserSchema),
    userController.updateUser,
  )
  .delete(
    '/:userId',
    authenticate(ENV.JWT_SECRET),
    validateParamId('userId', UserValidator.validateUserIdParam),
    authorizeOwnerOrAdmin,
    userController.deleteUser,
  );
export default userRouter;
