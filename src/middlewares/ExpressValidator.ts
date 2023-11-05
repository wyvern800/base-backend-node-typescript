import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ResponseBase from '../utils/response';

/**
 * Insert express validator to check if there was validation errors on current route, must be together with a
 * ValidationChain
 *
 * @param request The request
 * @param response The response
 * @param next  The nextFunction
 */
const expressValidator = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return ResponseBase.notFound(response, { errors: errors.array() });
  }

  return next();
};

export default expressValidator;
