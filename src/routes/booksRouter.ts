import express from 'express';
import { createNewBook, deleteBook, getAllbooks, getBookById, updateBook } from '../controllers/booksController';
import { withErrorHandling } from '../middleware/withErrorHandling';

const booksRouter = express.Router();

booksRouter.route('/').get(withErrorHandling(getAllbooks)).post(withErrorHandling(createNewBook));
booksRouter
  .route('/:id')
  .get(withErrorHandling(getBookById))
  .patch(withErrorHandling(updateBook))
  .delete(withErrorHandling(deleteBook));

export { booksRouter };
