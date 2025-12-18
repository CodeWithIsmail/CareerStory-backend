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
import { authorizeOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';
const userRouter = Router();
const userController = new UserController();

userRouter
  .get(
    '/',
    authenticate,
    validateReqQuery(PaginationValidator.validateUserPagination.bind(PaginationValidator)),
    userController.getAllUsers,
  )
  .get(
    '/:userId',
    authenticate,
    validateParamId('userId', UserValidator.validateUserIdParam),
    userController.getUserById,
  )
  .patch(
    '/:userId',
    authenticate,
    validateParamId('userId', UserValidator.validateUserIdParam),
    authorizeOwnerOrAdmin,
    validateReqBody(UserValidator.updateUserSchema),
    userController.updateUser,
  )
  .delete(
    '/:userId',
    authenticate,
    validateParamId('userId', UserValidator.validateUserIdParam),
    authorizeOwnerOrAdmin,
    userController.deleteUser,
  );
export default userRouter;
