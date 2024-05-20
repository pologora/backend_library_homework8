import { NextFunction, Response, Request } from 'express';
import { Book } from '../models/Book';
import { httpStatusCodes } from '../utils/httpStatusCodes';
import { Ebook } from '../models/Ebook';

export const getAllbooks = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Book.getAll();

  res.status(httpStatusCodes.success).json({ status: 'success', data: result });
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await Book.getOne(Number(id));

  res.status(httpStatusCodes.success).json({ status: 'success', data: result });
};

export const createNewBook = async (req: Request, res: Response, next: NextFunction) => {
  const { price, author, quantity, title, format, fileSize } = req.body;

  if (format && fileSize) {
    const book = new Ebook({
      price: Number(price),
      author,
      quantity: Number(quantity),
      title,
      format,
      fileSize: Number(fileSize),
    });
    await Ebook.createOne(book);
  } else {
    const book = new Book({
      price: Number(price),
      author,
      quantity: Number(quantity),
      title,
    });
    await Book.createOne(book);
  }

  res.status(httpStatusCodes.created).json({ status: 'success' });
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { price, author, quantity, title } = req.body;

  await Book.updateOne(Number(id), { price, author, quantity, title });
  res.status(httpStatusCodes.noContent).end();
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await Book.deleteOne(Number(id));

  res.status(httpStatusCodes.noContent).end();
};
