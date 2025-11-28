export class ErrorResponseDto {
  success: false;
  statusCode: number;
  message: string;
  stack?: string;
  errors?: ErrorDetail[];
  timestamp: string;
}

export class ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  errors: ErrorDetail[];
}
