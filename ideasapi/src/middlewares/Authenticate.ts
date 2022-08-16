import { NextFunction, Request, Response } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log('authenticating....')
  next();
}
