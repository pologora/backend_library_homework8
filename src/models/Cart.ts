import { Book } from './Book';
import { User } from './User';

export class Cart {
  books: Book[];
  user: User;

  constructor(user: User, books: Book[]) {
    this.user = user;
    this.books = books;
  }
}
