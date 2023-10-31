import AppError from '../error';

export default class DatabaseError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
