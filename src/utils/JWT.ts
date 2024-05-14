import jwt from 'jsonwebtoken';
import { promisify } from './helpers';

export function createJWTToken(id: number) {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN!;

  const token = jwt.sign({ id }, secret, { expiresIn });
  return token;
}

export async function verifyJWTToken(token: string) {
  const jwtVerifyPromise = promisify(jwt.verify);

  const decoded = (await jwtVerifyPromise(token, process.env.JWT_SECRET!)) as unknown as {
    id: number;
    iat: number;
    exp: number;
  };

  return decoded;
}
