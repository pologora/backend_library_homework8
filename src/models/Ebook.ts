import { AppError } from '../utils/AppError';
import { Book, BookData, UpdateBookData } from './Book';

interface EBookData extends BookData {
  format: string;
  fileSize: number;
}

interface UpdateEBookData extends UpdateBookData {
  format?: string;
  fileSize?: number;
}

export class Ebook extends Book {
  format: string;
  fileSize: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validationMethodsMap: { [key: string]: (value: any) => void } = {
    ...Book.validationMethodsMap,
    format: this.validateFormat,
    fileSize: this.validateFileSize,
  };

  constructor({ title, author, price, quantity, format, fileSize }: EBookData) {
    super({ title, author, price, quantity });
    this.format = format;
    this.fileSize = fileSize;
  }

  /**
   * Polymorphism!
   * @param data ebook properties
   * @returns void or throw an error if one of the validation method fails
   */
  static validateData(data: UpdateEBookData) {
    super.validateData(data, Ebook.validationMethodsMap);
  }

  private static validateFormat(format: string) {
    if (!format || typeof format !== 'string') {
      throw new AppError('Error creating new book: Format must be a string.');
    }
  }

  private static validateFileSize(fileSize: number) {
    if (!fileSize || typeof fileSize !== 'number') {
      throw new AppError('Error creating new book: fileSize must be a valid number.');
    }
  }
}
