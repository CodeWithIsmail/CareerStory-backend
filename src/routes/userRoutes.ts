import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';
import {
  validateParamId,
  validateReqBody,
  validateReqQuery,
} from '../middlewares/reqValidationMiddleware.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { PaginationValidator } from '../validators/paginationValidator.ts';

const userRouter = Router();
const userController = new UserController();

userRouter
  .post('/', validateReqBody(UserValidator.createUserSchema), userController.createUser)
  .get(
    '/',
    validateReqQuery(PaginationValidator.validateUserPagination.bind(PaginationValidator)),
    userController.getAllUsers,
  )
  .get(
    '/:userId',
    validateParamId('userId', UserValidator.validateUserIdParam),
    userController.getUserById,
  )
  .patch(
    '/:userId',
    validateParamId('userId', UserValidator.validateUserIdParam),
    validateReqBody(UserValidator.updateUserSchema),
    userController.updateUser,
  )
  .delete(
    '/:userId',
    validateParamId('userId', UserValidator.validateUserIdParam),
    userController.deleteUser,
  );
export default userRouter;
