import { Request, Response } from 'express';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.ts';
import { CategoryService } from '../services/categoryService.ts';
import { ResponseHandler } from '../utils/responseHandler.ts';

export class CategoryController {
  private categoryService = new CategoryService();

  createCategory = async (req: Request, res: Response) => {
    const newCategory = await this.categoryService.createCategory(req.body);
    return ResponseHandler.created(res, newCategory, RESPONSE_MESSAGES.CATEGORY.CREATE.SUCCESS);
  };

  getAllCategories = async (_req: Request, res: Response) => {
    const categories = await this.categoryService.getAllCategories();
    return ResponseHandler.success(res, categories, RESPONSE_MESSAGES.CATEGORY.FETCH.ALL_SUCCESS);
  };

  updateCategory = async (req: Request<{ categoryId: number }>, res: Response) => {
    const updatedCategory = await this.categoryService.updateCategory(req.params.categoryId, req.body);
    return ResponseHandler.success(res, updatedCategory, RESPONSE_MESSAGES.CATEGORY.UPDATE.SUCCESS);
  };

  deleteCategory = async (req: Request<{ categoryId: number }>, res: Response) => {
    await this.categoryService.deleteCategory(req.params.categoryId);
    return ResponseHandler.noContent(res);
  };
}
