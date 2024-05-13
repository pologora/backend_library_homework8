import jwt from 'jsonwebtoken';

export function createJWTToken(id: number) {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN!;

  const token = jwt.sign({ id }, secret, { expiresIn });
  return token;
}
