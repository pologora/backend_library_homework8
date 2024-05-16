import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../db/db';
import { AppError } from '../utils/AppError';
import { ValidateId } from '../validation/ValidateId';
import bcrypt from 'bcryptjs';
import { httpStatusCodes } from '../utils/httpStatusCodes';
import { createJWTToken } from '../utils/JWT';

interface CreateUserData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface GetOneUserData {
  email: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  passwordChangedAt: Date;
}

export class User extends ValidateId {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

  static async getAll() {
    const query = 'SELECT id, name, email, created_at, updated_at FROM users';
    const [rows] = await pool.query(query);

    return rows as User[];
  }

  static async getOne(id: number) {
    this.validateId(id);

    const query = 'SELECT id, name, email, created_at, updated_at, passwordChangedAt FROM users WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);

    if (!rows.length) {
      throw new AppError(`Provided id: ${id} was not found`, httpStatusCodes.notFound);
    }

    return rows[0] as GetOneUserData;
  }

  static async updateOne(id: number) {
    this.validateId(id);
  }

  static async deleteOne(id: number) {
    this.validateId(id);

    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    if (!result.affectedRows) {
      throw new AppError('Nothing was deleted from database. Please check your data and try again.');
    }
  }

  static async signup(data: CreateUserData) {
    const { email, password, passwordConfirm } = data;

    this.validateEmail(email);
    this.validatePassword(password, passwordConfirm);

    const encryptedPassword = await this.encryptPassword(password);

    const query = 'INSERT INTO users (email, password) VALUES (?,?);';
    const [result] = await pool.execute<ResultSetHeader>(query, [email, encryptedPassword]);

    if (!result.affectedRows) {
      throw new AppError('No recods was created. Please check your data and try again.');
    }

    return result;
  }

  static async login({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new AppError('Email and password are required', httpStatusCodes.unauthorized);
    }

    const query = 'SELECT id, password FROM users WHERE email = ?';
    const [result] = await pool.execute<RowDataPacket[]>(query, [email]);

    const { id, password: hash } = result[0];
    const compare = await this.comparePasswordWithHash(password, hash);

    if (compare) {
      return createJWTToken(id);
    } else {
      throw new AppError('Wrong email or password.', httpStatusCodes.unauthorized);
    }
  }

  private static validateEmail(email: string) {
    const regex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
    const valid = regex.test(email);

    if (!valid) {
      throw new AppError(`Email "${email}" is not valid. Please provide a valid email`);
    }
  }

  private static validatePassword(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      throw new AppError('Passwords should match.');
    }

    if (password.length < 3) {
      throw new AppError(`Password is required and password length should be more than 3 characters.`);
    }
  }

  private static async encryptPassword(password: string) {
    const saltRounds = 12;
    const encrypted = await bcrypt.hash(password, saltRounds);

    return encrypted;
  }

  private static async comparePasswordWithHash(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
