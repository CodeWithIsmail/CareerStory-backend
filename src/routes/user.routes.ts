import { Router } from 'express';
import { UserController } from '../controllers/user.controller.ts';

const router = Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

export default router;
