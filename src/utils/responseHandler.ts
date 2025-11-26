import { ValidationError } from 'class-validator';
import { HTTP_STATUS_CODES } from '../constants/errorMessages.ts';
import { ErrorDetail } from '../dto/errorDto.ts';

export interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  details?: ErrorDetail[] | any;
}

export class ResponseHandler {
  static success<T>(
    res: any,
    data: T,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.OK,
  ): SuccessResponse<T> {
    const response: SuccessResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: any, data: T, message: string): SuccessResponse<T> {
    return this.success(res, data, message, HTTP_STATUS_CODES.CREATED);
  }

  static error(
    res: any,
    message: string,
    statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    details?: ErrorDetail[] | any,
  ): ErrorResponse {
    const response: ErrorResponse = {
      success: false,
      statusCode,
      message,
      details,
    };
    return res.status(statusCode).json(response);
  }

  static noContent(res: any): void {
    res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  }
}
