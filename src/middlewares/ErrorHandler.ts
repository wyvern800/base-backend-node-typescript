import { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Log the error details for debugging purposes
  console.error(err.stack || err.message);

  // Send a meaningful error response to the client
  res.status(500).json({
    error: {
      message: 'Something went wrong. Please try again later.',
    },
  });
  next();
}

export default errorHandler;
