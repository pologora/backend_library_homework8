import { Book } from './Book';
import { User } from './User';

export class Order {
  user: User;
  books: Book[];

  constructor(user: User, books: Book[]) {
    this.user = user;
    this.books = books;
  }
}
