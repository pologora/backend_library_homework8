/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetOneUserData, User } from '../models/User';
import { AppError } from './AppError';
import { verifyJWTToken } from './JWT';
import { httpStatusCodes } from './httpStatusCodes';

export function promisify(fn: any) {
  return (...args: any) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

export function getTokenOrThrow() {}

export async function getDecodedTokenOrThrow(token: string) {
  const decoded = await verifyJWTToken(token);
  return decoded as { id: number; iat: number; exp: number };
}

export async function getUserOrThrow(id: number) {
  const user = await User.getOne(id).catch(() => {
    throw new AppError('User no longer exist!', httpStatusCodes.unauthorized);
  });

  return user;
}

export function checkPasswordWasChangedAndThrow(JWTTimestamp: number, user: GetOneUserData) {
  if (user.passwordChangedAt) {
    const milliseconds = 1000;
    const isPasswordChanged = JWTTimestamp * milliseconds < user.passwordChangedAt.getTime();
    if (isPasswordChanged) {
      throw new AppError('Password was changed after token issued. Please log in again', httpStatusCodes.unauthorized);
    }
  }
}
