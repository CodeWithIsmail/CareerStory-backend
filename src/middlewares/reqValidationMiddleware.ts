import { Request, Response, NextFunction } from 'express';
import z from 'zod';

export const validateParamId = (paramName: string, validateFn: (value: unknown) => any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.params[paramName] = validateFn(req.params[paramName]);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateReqBody = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
