/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';
import * as repository from './users.repository';

/**
 * Checks if username exists in database
 *
 * @param { string } value The value
 * @returns Returns true if user exist
 */
const isUsernameUnique = async (value: string): Promise<void> => {
  const user = await repository.checkDuplicates(value);
  if (user) {
    return Promise.reject(new Error('Username is already being used'));
  }
  return Promise.resolve();
};

export const createUser = [
  body('username')
    .exists()
    .withMessage('Username is required.')
    .isLength({ min: 5, max: 10 })
    .withMessage('Username must be at least 5 and maximum 10 characters long.')
    .custom(isUsernameUnique),
  body('password')
    .exists()
    .withMessage('Password is required.')
    .isLength({ min: 5, max: 10 })
    .withMessage('Password must be at least 5 and maximum 10 characters long.'),
];
