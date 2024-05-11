import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

const sendErrDevelopment = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  return res.status(statusCode).json({ status, error: err.message, message: err.message, stack: err.stack });
};

const sendErrProduction = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.isOperational ? err.message : 'Somthing goes wrong, please try again later';

  return res.status(statusCode).json({ status, error: message });
};

export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (!err.isOperational) {
    console.log(err);
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrDevelopment(err, res);
  } else {
    sendErrProduction(err, res);
  }
};
