import express from 'express';
import { createNewBook, deleteBook, getAllbooks, getBookById, updateBook } from '../controllers/booksController';
import { withErrorHandling } from '../middleware/withErrorHandling';
import { protect } from '../controllers/authController';

const booksRouter = express.Router();

booksRouter.route('/').get(withErrorHandling(getAllbooks)).post(withErrorHandling(createNewBook));

booksRouter
  .route('/:id')
  .get(withErrorHandling(protect), withErrorHandling(getBookById))
  .patch(withErrorHandling(updateBook))
  .delete(withErrorHandling(deleteBook));

export { booksRouter };
