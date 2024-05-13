import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { httpStatusCodes } from '../helpers/httpStatusCodes';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await User.getAll();

  res.status(httpStatusCodes.success).json({
    status: 'success',
    data: result,
  });
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await User.getOne(Number(id));

  res.status(httpStatusCodes.success).json({
    status: 'success',
    data: result,
  });
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await User.deleteOne(Number(id));

  res.status(httpStatusCodes.noContent).end();
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const {} = req.body;
  const { id } = req.params;
  const result = await User.updateOne(Number(id));

  res.status(httpStatusCodes.noContent).json();
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const result = await User.signup({ email, password, passwordConfirm: password });

  const id = result.insertId;

  res.status(httpStatusCodes.created).json({
    status: 'success',
    data: result,
  });
};
