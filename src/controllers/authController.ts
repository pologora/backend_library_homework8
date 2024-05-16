import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { httpStatusCodes } from '../utils/httpStatusCodes';
import { AppError } from '../utils/AppError';
import { createJWTToken } from '../utils/JWT';
import {
  getTokenOrThrow,
  getDecodedTokenOrThrow,
  getUserOrThrow,
  checkPasswordWasChangedAndThrow,
} from '../utils/helpers';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, passwordConfirm } = req.body;
  const result = await User.signup({ email, password, passwordConfirm });

  const id = result.insertId;
  const token = createJWTToken(id);

  res.status(httpStatusCodes.created).json({
    status: 'success',
    token,
    data: result,
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const token = await User.login({ email, password });

  res.status(httpStatusCodes.success).json({
    status: 'success',
    token,
  });
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTY3MzQ1NSwiZXhwIjoxNzMxMjI1NDU1fQ.RkF7_SO20dgOVPl-JiQODenj0-Ng9k8ioyK2hWFD_pg';

  getTokenOrThrow();
  if (!token) {
    throw new AppError('You are not logged in! Please log in to get access', httpStatusCodes.forbidden);
  }

  const decoded = await getDecodedTokenOrThrow(token);

  const user = await getUserOrThrow(decoded.id);

  checkPasswordWasChangedAndThrow(decoded.iat, user);

  Object.defineProperty(req, 'user', { value: user });

  next();
};
