/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const authenticate = [
  body('username').exists().withMessage('Username is required.'),
  body('password').exists().withMessage('Password is required.'),
];

export const permissions = [
  body('acessToken').exists().withMessage('Acess token is required.'),
];
