import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { httpStatusCodes } from '../utils/httpStatusCodes';

const handleJsonWebTokenError = () => new AppError('Invalid token. Please log in again!', httpStatusCodes.unauthorized);

const sendErrDevelopment = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || httpStatusCodes.internalServerError;
  const status = err.status || 'error';
  return res.status(statusCode).json({ status, error: err.message, message: err.message, stack: err.stack });
};

const sendErrProduction = (err: AppError, res: Response) => {
  if (err.name === 'JsonWebTokenError' || err.name === 'JsonExpiredError') {
    err = handleJsonWebTokenError();
  }

  const statusCode = err.statusCode || httpStatusCodes.internalServerError;
  const status = err.status || 'error';
  const message = err.isOperational ? err.message : 'Somthing goes wrong, please try again later';

  return res.status(statusCode).json({ status, error: message });
};

export const globalErrorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  if (!err.isOperational) {
    console.log(err);
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrDevelopment(err, res);
  } else {
    sendErrProduction(err, res);
  }
};
