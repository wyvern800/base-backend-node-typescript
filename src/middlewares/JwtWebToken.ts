import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

// Define a custom interface that extends ExpressRequest
interface CustomRequest extends ExpressRequest {
  user?: unknown; // Define the user property with the appropriate type
}

/**
 * JWT Authentication Middleware
 *
 * @param { Request } req The request
 * @param { Response } res The response
 * @param { NextFunction } next The nextFunction
 * @returns token if proceeded
 */
const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): unknown => {
  const token = req.header('Authorization');

  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });

  jwt.verify(
    token,
    process.env.SECRET_KEY || '',
    (err: unknown, user: unknown) => {
      if (err) return res.status(403).json({ message: 'Invalid token.' });
      req.user = user;
      return next();
    },
  );
  return authenticateToken;
};

export default authenticateToken;
