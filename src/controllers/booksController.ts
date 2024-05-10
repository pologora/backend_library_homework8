import { NextFunction, Response, Request } from 'express';
import { Book } from '../models/Book';

export async function getAllbooks(req: Request, res: Response, next: NextFunction) {
  const data = await Book.getAllbooks();

  res.status(200).json({ message: 'success', data });
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = await Book.getBook(Number(id));

  res.status(200).json({ message: 'success', data });
}

export async function createNewBook(req: Request, res: Response, next: NextFunction) {
  const {
    data: { price, author, quantity, title },
  }: { data: Book } = req.body;

  const book = new Book({ price, author, quantity, title });

  const result = await Book.createBook(book);

  res.status(201).json({ message: 'success', data: result });
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: 'success' });
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  await Book.deleteBook(Number(id));

  res.status(200).json({ message: 'success' });
}
