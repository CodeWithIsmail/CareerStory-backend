import { Router } from 'express';
import { AuthController } from '../controllers/authController.ts';
import { validateReqBody } from '../middlewares/reqValidationMiddleware.ts';
import { AuthValidator } from '../validators/authValidator.ts';
import { resendEmailLimiter } from '../middlewares/rateLimitMiddleware.ts';
const router = Router();
const authController = new AuthController();

router.post('/signup', validateReqBody(AuthValidator.signupSchema), authController.signup);
router.post('/login', validateReqBody(AuthValidator.loginSchema), authController.login);

router.get('/confirm-email/:token', authController.confirmEmail);
router.get('/resend-confirm-email/',resendEmailLimiter, authController.resendConfirmationEmail);


export default router;
