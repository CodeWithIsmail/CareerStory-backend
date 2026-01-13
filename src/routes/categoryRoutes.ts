import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController.ts';
import { reqValidation } from '../middlewares/reqValidationMiddleware.ts';
import { REQ_SOURCE } from '../types/customTypes.ts';
import {
  categoryParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../validators/categoryValidator.ts';
import { authenticate } from '../middlewares/authenticationMiddleware.ts';
import { authorizeRoles } from '../middlewares/authorizationMiddleware.ts';
import { UserRole } from '../entities/User.ts';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter
  .get('/', categoryController.getAllCategories)

  .post(
    '/',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.BODY, createCategorySchema),
    categoryController.createCategory,
  )

  .patch(
    '/:categoryId',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, 'categoryId'),
    reqValidation(REQ_SOURCE.BODY, updateCategorySchema),
    categoryController.updateCategory,
  )

  .delete(
    '/:categoryId',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, 'categoryId'),
    categoryController.deleteCategory,
  );

export default categoryRouter;
