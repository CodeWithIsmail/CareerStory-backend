import { HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { Response } from 'express';
export class SuccessResponse<T> {
  success = true;
  statusCode: number;
  message: string;
  result: T;

  constructor(statusCode: number, message: string, result: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}
export class ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}
export class ErrorResponse {
  success = false;
  statusCode: number;
  message: string;
  details?: ErrorDetail[];

  constructor(statusCode: number, message: string, details?: ErrorDetail[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export class ResponseHandler {
  static success<T>(
    res: Response,
    result: T,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.OK,
  ) {
    const response = new SuccessResponse(statusCode, message, result);
    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, result: T, message: string) {
    this.success(res, result, message, HTTP_STATUS_CODES.CREATED);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    details?: ErrorDetail[],
  ) {
    const response = new ErrorResponse(statusCode, message, details);
    res.status(statusCode).json(response);
  }

  static noContent(res: Response) {
    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
  }
}