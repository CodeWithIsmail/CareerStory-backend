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

const categoryController = new CategoryController();
const router = Router();

router
  .get('/', categoryController.getAllCategories)

  .get(
    '/:id',
    reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, 'categoryId'),
    categoryController.getCategoryById,
  )

  .post(
    '/',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.BODY, createCategorySchema),
    categoryController.createCategory,
  )

  .patch(
    '/:id',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, 'categoryId'),
    reqValidation(REQ_SOURCE.BODY, updateCategorySchema),
    categoryController.updateCategory,
  )

  .delete(
    '/:id',
    authenticate,
    authorizeRoles(UserRole.ADMIN),
    reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, 'categoryId'),
    categoryController.deleteCategory,
  );

export default router;
