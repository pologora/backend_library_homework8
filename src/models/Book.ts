import { RowDataPacket } from 'mysql2';
import { pool } from '../db/db';

export class Book {
  title: string;
  author: string;
  price: number;
  availability: boolean;
  id: number;

  constructor(title: string, author: string, price: number, availability: boolean, id: number) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.availability = availability;
    this.id = id;
  }

  static async getAllbooks() {
    const query = 'select * from books';
    const [rows] = await pool.query(query);
    return rows;
  }

  static async getBook(id: number) {
    try {
      const query = 'select * from books where id = ?';
      const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async createBook(data: Book) {
    const query = 'insert into books (id) values(0)';
    await pool.execute(query);
  }

  static async deleteBook(id: number) {
    try {
      const query = 'DELETE FROM books WHERE id = ?';

      await pool.execute(query, [id]);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

  static async updateBook(id: number, data: Book) {
    const { id: newId } = data;
    const query = 'update books set id = ? where id = ?';

    await pool.execute(query, [newId, id]);
  }
}
