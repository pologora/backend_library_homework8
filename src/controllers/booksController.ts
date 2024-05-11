import { NextFunction, Response, Request } from 'express';
import { Book } from '../models/Book';
import { withErrorHandling } from '../middleware/withErrorHandling';

export const getAllbooks = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const result = await Book.getAllbooks();

  res.status(200).json({ status: 'success', data: result });
});

export const getBookById = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await Book.getBook(Number(id));

  res.status(200).json({ status: 'success', data: result });
});

export const createNewBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { price, author, quantity, title }: Book = req.body;
  const book = new Book({ price, author, quantity, title });
  await Book.createBook(book);

  res.status(201).json({ status: 'success' });
});

export const updateBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { price, author, quantity, title } = req.body;

  await Book.updateBook(Number(id), { price, author, quantity, title });
  res.status(204).end();
});

export const deleteBook = withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await Book.deleteBook(Number(id));

  res.status(204).end();
});
