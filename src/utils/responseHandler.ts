import { HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { Response } from 'express';
export class SuccessResponse<T> {
  success = true;
  statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
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
    data: T,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.OK,
  ): void {
    const response = new SuccessResponse(statusCode, message, data);
    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message: string): void {
    this.success(res, data, message, HTTP_STATUS_CODES.CREATED);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    details?: ErrorDetail[],
  ): void {
    const response = new ErrorResponse(statusCode, message, details);
    res.status(statusCode).json(response);
  }

  static noContent(res: Response): void {
    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT).send();
  }
}
