import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../db/db';
import { AppError } from '../utils/AppError';
import { ValidateId } from '../validation/ValidateId';

export interface BookData {
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface UpdateBookData {
  title?: string;
  author?: string;
  price?: number;
  quantity?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationFunction = (value: any) => void;

export class Book extends ValidateId {
  title: string;
  author: string;
  price: number;
  quantity: number;

  /**
   * Map to store validation methods for a class properties
   */
  protected static validationMethodsMap: { [key: string]: ValidationFunction } = {
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

  /**
   *
   * @returns all books from database
   */
  static async getAll() {
    const query = 'SELECT * FROM books';
    const [rows] = await pool.query(query);

    return rows as Book[];
  }

  /**
   *
   * @param id uniq book id
   * @returns book from database or throw an error if no book was found
   */
  static async getOne(id: number) {
    const query = 'SELECT * FROM books WHERE id = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);

    if (!rows.length) {
      throw new AppError(`Provided id: ${id} was not found`, 404);
    }

    return rows[0] as Book;
  }

  /**
   *
   * @param data all fields needed for a new book creation
   * @returns  info about new book creation or throw an error
   */
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

  /**
   * Delete a book from database
   * @param id book id
   * @returns void or throw an error
   */
  static async deleteOne(id: number) {
    this.validateId(id);

    const query = 'DELETE FROM books WHERE id = ?';

    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    if (!result.affectedRows) {
      throw new AppError('Nothing was deleted from database. Please check your data and try again.');
    }
  }

  /**
   * Update a book
   * @param id book unique id
   * @param data new data for a book fields to update
   * @returns void or throw an error
   */
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

  /**
   *
   * @param data updated values for a book update
   * @returns part of a SQL query needed for a update, (key = value) pairs
   */
  private static generateUpdateQuery(data: UpdateBookData) {
    const updateValues = Object.entries(data)
      .filter(([_, value]) => value != null)
      .map(([key]) => `${key} = ?`)
      .join(', ');

    return updateValues;
  }

  /**
   *
   * @param data values for a book creation or update
   * @param validationMethodsMap list of a methods needed for a validation, maped by class properties (prop: function)
   * @returns void or throw an error if one of the validation methods fails
   */
  protected static validateData(data: UpdateBookData, validationMethodsMap = this.validationMethodsMap) {
    Object.entries(data)
      .filter(([_, value]) => value != null)
      .forEach(([key, value]) => validationMethodsMap[key](value));
  }

  private static validatePrice(price: number) {
    if (!price || price <= 0) {
      throw new AppError('Error creating new book: Price is required and must be a positive number.');
    }
  }

  private static validateAuthor(author: string) {
    if (!author || typeof author !== 'string') {
      throw new AppError('Error creating new book: Author is required and must be a string.');
    }
  }

  private static validateQuantity(quantity: number) {
    if (quantity < 0 || typeof quantity !== 'number') {
      throw new AppError('Error creating new book: Quantity must be a non-negative number.');
    }
  }

  private static validateTitle(title: string) {
    if (!title || typeof title !== 'string') {
      throw new AppError('Error creating new book: Title is required and must be a string.');
    }
  }
}
