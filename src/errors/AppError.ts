export class AppError extends Error {
  statusCode: number;
  context: string;

  constructor(message: string, statusCode: number, context: string = '') {
    const fullMessage = context ? `${message} during ${context}` : message;
    super(fullMessage);
    this.statusCode = statusCode;
    this.context = context;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
