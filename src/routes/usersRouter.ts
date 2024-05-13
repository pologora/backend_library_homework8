import express from 'express';
import { login, signup } from '../controllers/authController';
import { withErrorHandling } from '../middleware/withErrorHandling';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/usersController';

const usersRouter = express.Router();

usersRouter.post('/signup', withErrorHandling(signup));
usersRouter.post('/login', withErrorHandling(login));

usersRouter.route('/').get(withErrorHandling(getAllUsers));

usersRouter
  .route('/:id')
  .delete(withErrorHandling(deleteUser))
  .get(withErrorHandling(getUserById))
  .patch(withErrorHandling(updateUser));

export { usersRouter };
