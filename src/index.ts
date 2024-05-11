import express, { NextFunction, Request, Response } from 'express';
import { booksRouter } from './routes/booksRouter';
import { AppError } from './utils/AppError';
import { globalErrorHandler } from './controllers/errorController';

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('UNHANDLER EXEPTION! Shutting down...');

  process.exit(1);
});

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use('/api/v1/books', booksRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
});

app.use(globalErrorHandler);

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
