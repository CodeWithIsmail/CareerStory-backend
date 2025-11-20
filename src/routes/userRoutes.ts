import { Router } from 'express';
import { UserController } from '../controllers/userController.ts';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
