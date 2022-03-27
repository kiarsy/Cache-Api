
import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';

function ErrorHandlerMiddleware(
  err: Error | BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof (BaseError)) {
    var customError = err.makeResponse();
    return res.status(customError.httpCode).send(customError.error);
  }
  console.error(err)
  res.status(500).send({ customError: false });
};


export default ErrorHandlerMiddleware