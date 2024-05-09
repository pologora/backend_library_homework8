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
  const { data } = req.body;
  await Book.createBook(data);

  res.status(201).json({ message: 'success', data });
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { id: newId } = req.body;
  console.log(newId);
  console.log(id);

  await Book.updateBook(Number(id), { id: newId });

  res.status(200).json({ message: 'success' });
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  await Book.deleteBook(Number(id));

  res.status(200).json({ message: 'success' });
}
