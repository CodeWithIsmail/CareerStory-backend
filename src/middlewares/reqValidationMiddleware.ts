import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { REQ_SOURCE } from '../types/customTypes.ts';
declare global {
  namespace Express {
    interface Request {
      validatedQuery?: any;
    }
  }
}

export const reqValidation = <T>(source: REQ_SOURCE, schema: z.ZodSchema<T>, paramName?: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    switch (source) {
      case REQ_SOURCE.BODY:
        req.body = schema.parse(req.body);
        break;
      case REQ_SOURCE.PARAM:
        req.params[paramName] = schema.parse(req.params[paramName]) as string;
        break;
      case REQ_SOURCE.QUERY:
        req.validatedQuery = schema.parse(req.query) as string;
        break;
    }
    next();
  };
};
