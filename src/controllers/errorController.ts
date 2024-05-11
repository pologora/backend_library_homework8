import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  return res.status(statusCode).json({ status, error: err.message });
};
