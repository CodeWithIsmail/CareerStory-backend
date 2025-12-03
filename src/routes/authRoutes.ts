import { Router } from 'express';
import { AuthController } from '../controllers/authController.ts';
import { validateParamId, validateReqBody } from '../middlewares/reqValidationMiddleware.ts';
import { AuthValidator } from '../validators/authValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { UserValidator } from '../validators/userValidator.ts';
import { authorizeOwnerOrAdmin } from '../middlewares/authorizationMiddleware.ts';

const router = Router();
const authController = new AuthController();

router.post('/signup', validateReqBody(AuthValidator.signupSchema), authController.signup);
router.post('/login', validateReqBody(AuthValidator.loginSchema), authController.login);

export default router;
