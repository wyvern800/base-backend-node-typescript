/* eslint-disable import/prefer-default-export */
import { body, ValidationChain } from 'express-validator';

/**
 * Validation chain for AUTHENTICATING user
 */
export const authenticate: ValidationChain[] = [
  body('username').exists().withMessage('Username is required.'),
  body('password').exists().withMessage('Password is required.'),
];

/**
 * Validation chain for CHECKING PERMISSIONS of user
 */
export const permissions: ValidationChain[] = [
  body('acessToken').exists().withMessage('Acess token is required.'),
];
