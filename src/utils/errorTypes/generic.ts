import AppError from '../error';

export default class GenericError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'GenericError';
  }
}
