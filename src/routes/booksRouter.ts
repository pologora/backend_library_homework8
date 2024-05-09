import express from 'express';
import { createNewBook, deleteBook, getAllbooks, getBookById, updateBook } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.route('/').get(getAllbooks).post(createNewBook);
booksRouter.route('/:id').get(getBookById).patch(updateBook).delete(deleteBook);

export { booksRouter };
