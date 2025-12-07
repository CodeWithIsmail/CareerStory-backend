import { Router } from 'express';
import { AuthController } from '../controllers/authController.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import { resendEmailLimiter } from '../middlewares/rateLimitMiddleware.ts';
import {
  emailResendSchema,
  loginSchema,
  signupSchema,
  tokenParamSchema,
} from '../validators/authValidator.ts';
import { REQ_SOURCE } from '../types/customTypes.ts';
import { userParamSchema } from '../validators/userValidator.ts';

const router = Router();
const authController = new AuthController();

router
  .post('/signup', reqValidation(REQ_SOURCE.BODY, signupSchema), authController.signup)

  .post('/login', reqValidation(REQ_SOURCE.BODY, loginSchema), authController.login)

  .get(
    '/confirm-email/:token',
    reqValidation(REQ_SOURCE.PARAM, tokenParamSchema, 'token'),
    authController.confirmEmail,
  )

  .get(
    '/resend-confirm-email/:userName',
    reqValidation(REQ_SOURCE.PARAM, emailResendSchema, 'userName'),
    resendEmailLimiter,
    authController.resendConfirmationEmail,
  );

export default router;
