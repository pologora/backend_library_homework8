import { AppError } from '../utils/AppError';

export class ValidateId {
  protected static validateId(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new AppError('Invalid book ID. Please provide a valid positive number.');
    }
  }
}
