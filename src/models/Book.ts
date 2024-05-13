import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../db/db';
import { AppError } from '../utils/AppError';
import { ValidateId } from '../validation/ValidateId';

interface BookData {
  title: string;
  author: string;
  price: number;
  quantity: number;
}

interface UpdateBookData {
  title?: string;
  author?: string;
  price?: number;
  quantity?: number;
}

export class Book extends ValidateId {
  title: string;
  author: string;
  price: number;
  quantity: number;
  private static validationMethodsMap: { [key: string]: (value: any) => void } = {
    price: Book.validatePrice,
    author: Book.validateAuthor,
    quantity: Book.validateQuantity,
    title: Book.validateTitle,
  };

  constructor({ title, author, price, quantity = 0 }: BookData) {
    super();
    this.title = title;
    this.author = author;
    this.price = price;
    this.quantity = quantity;
  }

  static async getAll() {
    const query = 'SELECT * FROM books';
    const [rows] = await pool.query(query);

    return rows as Book[];
  }

  static async getOne(id: number) {
    const query = 'SELECT * FROM books WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);

    if (!rows.length) {
      throw new AppError(`Provided id: ${id} was not found`, 404);
    }

    return rows[0] as Book;
  }

  static async createOne(data: Book) {
    this.validateData(data);

    const props = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO books (${props}) values(${placeholders})`;
    const [result] = await pool.execute<ResultSetHeader>(query, values);

    if (!result.affectedRows) {
      throw new AppError('No recods was created. Please check your data and try again.');
    }

    return result;
  }

  static async deleteOne(id: number) {
    this.validateId(id);

    const query = 'DELETE FROM books WHERE id = ?';

    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    if (!result.affectedRows) {
      throw new AppError('Nothing was deleted from database. Please check your data and try again.');
    }
  }

  static async updateOne(id: number, data: UpdateBookData) {
    this.validateId(id);
    this.validateData(data);

    const propValues = Object.values(data).filter((value) => value != null);
    const updateString = this.generateUpdateQuery(data);

    const query = `UPDATE books SET  ${updateString} WHERE id = ?`;

    const [result] = await pool.execute<ResultSetHeader>(query, [...propValues, id]);

    if (!result.affectedRows) {
      throw new AppError('Nothing was updated. Please check your data and try again.');
    }
  }

  private static generateUpdateQuery(data: UpdateBookData) {
    const updateValues = Object.entries(data)
      .filter(([_, value]) => value != null)
      .map(([key]) => `${key} = ?`)
      .join(', ');

    return updateValues;
  }

  private static validateData(data: UpdateBookData) {
    Object.entries(data)
      .filter(([_, value]) => value != null)
      .forEach(([key, value]) => Book.validationMethodsMap[key](value));
  }

  private static validatePrice(price: any) {
    if (!price || price <= 0) {
      throw new AppError('Error creating new book: Price is required and must be a positive number.');
    }
  }

  private static validateAuthor(author: any) {
    if (!author || typeof author !== 'string') {
      throw new AppError('Error creating new book: Author is required and must be a string.');
    }
  }

  private static validateQuantity(quantity: any) {
    if (quantity < 0 || typeof quantity !== 'number') {
      throw new AppError('Error creating new book: Quantity must be a non-negative number.');
    }
  }

  private static validateTitle(title: any) {
    if (!title || typeof title !== 'string') {
      throw new AppError('Error creating new book: Title is required and must be a string.');
    }
  }
}
