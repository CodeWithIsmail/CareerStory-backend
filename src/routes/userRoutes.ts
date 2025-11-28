import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';

const userRouter = Router();
const userController = new UserController();

userRouter
  .post('/', userController.createUser)
  .get('/', userController.getAllUsers)
  .get('/:userId', userController.getUserById)
  .patch('/:userId', userController.updateUser)
  .delete('/:userId', userController.deleteUser);

export default userRouter;
