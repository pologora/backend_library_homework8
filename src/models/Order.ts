import { ValidateId } from '../validation/ValidateId';
import { Book } from './Book';
import { User } from './User';

export class Order extends ValidateId {
  user: User;
  books: Book[];

  constructor(user: User, books: Book[]) {
    super();
    this.user = user;
    this.books = books;
  }
}
