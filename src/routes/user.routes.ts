import { Router } from 'express';
import { UserController } from '../controllers/user.controller.ts';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/users', userController.createUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:userId', userController.getUserById);
userRouter.put('/users/:userId', userController.updateUser);
userRouter.patch('/users/:userId', userController.updateUser);
userRouter.delete('/users/:userId', userController.deleteUser);

export default userRouter;
