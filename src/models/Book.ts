import { RowDataPacket } from 'mysql2';
import { pool } from '../db/db';

interface BookData {
  title: string;
  author: string;
  price: number;
  quantity: number;
  id?: number;
}

interface UpdateBookData {
  title?: string;
  author?: string;
  price?: number;
  quantity?: number;
}

export class Book {
  title: string;
  author: string;
  price: number;
  id?: number;
  quantity: number;

  constructor({ title, author, price, quantity, id }: BookData) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.id = id;
    this.quantity = quantity;
  }

  static async getAllbooks() {
    const query = 'select * from books';
    const [rows] = await pool.query(query);

    return rows as Book[];
  }

  static async getBook(id: number) {
    try {
      const query = 'select * from books where id = ?';
      const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
      return rows[0] as Book;
    } catch (error) {
      console.log(error);
    }
  }

  static async createBook(data: Book) {
    try {
      const props = Object.keys(data).join(', ');
      const values = Object.values(data);
      const placeholders = values.map(() => '?').join(', ');

      const query = `insert into books (${props}) values(${placeholders})`;
      const result = await pool.execute(query, values);

      return result;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error('Failed to create book. Please try again later.');
    }
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

  static async updateBook(id: number, data: UpdateBookData) {
    try {
      const propValues = Object.values(data);
      const updateString = this.createUpdateString(data);
      const query = `UPDATE books SET  ${updateString} WHERE id = ?`;

      const result = await pool.execute(query, [...propValues, id]);
      return result;
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book. Please try again later.');
    }
  }

  private static createUpdateString(data: UpdateBookData) {
    const props = Object.keys(data);
    const updateValues = props.map((prop) => `${prop} = ?`).join(', ');

    return updateValues;
  }
}
