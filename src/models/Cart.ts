import { ValidateId } from '../validation/ValidateId';
import { Book } from './Book';
import { User } from './User';

export class Cart extends ValidateId {
  books: Book[];
  user: User;

  constructor(user: User, books: Book[]) {
    super();
    this.user = user;
    this.books = books;
  }
}
