import winston from 'winston';
import path from 'path';
import { ENV } from '../config/environment.ts';

const logsDir = 'logs';

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  // winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

const transports = [
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    maxsize: 5242880,
    maxFiles: 5,
  }),

  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    maxsize: 5242880,
    maxFiles: 10,
  }),

  new winston.transports.Console({
    level: 'debug',
    silent: ENV.NODE_ENV === 'production',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp, context, ...meta }) => {
        let metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} [${level}] ${message} ${context ? `(${context})` : ''} ${metaStr}`.trim();
      }),
    ),
  }),
];

export const logger = winston.createLogger({
  level: ENV.LOG_LEVEL || 'info',
  format: customFormat,
  transports: transports,
});

export default logger;
