import express from 'express';
import { booksRouter } from './routes/booksRouter';

const port = 8000;

const app = express();
app.use(express.json());

app.use('/api/v1/books', booksRouter);

app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
