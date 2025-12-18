import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import { updateUserSchema, userParamSchema } from '../validators/userValidator.ts';
import { userPaginationSchema } from '../validators/paginationValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { authorizeOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';
import { REQ_SOURCE } from '../types/customTypes.ts';

const userRouter = Router();
const userController = new UserController();

userRouter
  .get('/', authenticate, reqValidation(REQ_SOURCE.QUERY, userPaginationSchema), userController.getAllUsers)

  .get(
    '/:userId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
    userController.getUserById,
  )

  .patch(
    '/:userId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
    authorizeOwnerOrAdmin,
    reqValidation(REQ_SOURCE.BODY, updateUserSchema),
    userController.updateUser,
  )

  .delete(
    '/:userId',
    authenticate,
    reqValidation(REQ_SOURCE.PARAM, userParamSchema, 'userId'),
    authorizeOwnerOrAdmin,
    userController.deleteUser,
  );

export default userRouter;
