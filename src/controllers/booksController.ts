import { NextFunction, Response, Request } from 'express';
import { Book } from '../models/Book';
import { withErrorHandling } from '../middleware/withErrorHandling';
import { httpStatusCodes } from '../helpers/httpStatusCodes';

export const getAllbooks = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const result = await Book.getAll();

  res.status(httpStatusCodes.success).json({ status: 'success', data: result });
});

export const getBookById = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await Book.getOne(Number(id));

  res.status(httpStatusCodes.success).json({ status: 'success', data: result });
});

export const createNewBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { price, author, quantity, title }: Book = req.body;
  const book = new Book({ price, author, quantity, title });
  await Book.createOne(book);

  res.status(httpStatusCodes.created).json({ status: 'success' });
});

export const updateBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { price, author, quantity, title } = req.body;

  await Book.updateOne(Number(id), { price, author, quantity, title });
  res.status(httpStatusCodes.noContent).end();
});

export const deleteBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await Book.deleteOne(Number(id));

  res.status(httpStatusCodes.noContent).end();
});
