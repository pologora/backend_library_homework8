import { RowDataPacket } from 'mysql2';
import { pool } from '../db/db';
import { AppError } from '../utils/AppError';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  static async getAll() {
    const query = 'SELECT * FROM users';
    const [rows] = await pool.query(query);

    return rows as User[];
  }

  static async getOne(id: number) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);

    if (!rows.length) {
      throw new AppError(`Provided id: ${id} was not found`, 404);
    }

    return rows[0] as User;
  }

  static async updateOne() {}
  static async deleteOne() {}
  static async createOne() {}
}
