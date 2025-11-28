import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';
import { validateParamId, validateReqBody } from '../middlewares/reqValidationMiddleware.ts';
import { UserValidator } from '../validators/userValidator.ts';

const userRouter = Router();
const userController = new UserController();

userRouter
  .post('/', validateReqBody(UserValidator.createUserSchema), userController.createUser)
  .get('/', userController.getAllUsers)
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
