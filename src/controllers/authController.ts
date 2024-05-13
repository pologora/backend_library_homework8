import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { createJWTToken } from '../helpers/createJWT';
import { httpStatusCodes } from '../helpers/httpStatusCodes';

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
