import express, { NextFunction, Request, Response } from 'express';
import { booksRouter } from './routes/booksRouter';
import { AppError } from './utils/AppError';
import { globalErrorHandler } from './controllers/errorController';
import { usersRouter } from './routes/usersRouter';
import cors from 'cors';

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('UNHANDLER EXEPTION! Shutting down...');

  process.exit(1);
});

const corsOptions = {
  origin: ['http://localhost:5173', 'https://homework8classes.netlify.app'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/books', booksRouter);
app.use('/api/v1/users', usersRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App listening port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
