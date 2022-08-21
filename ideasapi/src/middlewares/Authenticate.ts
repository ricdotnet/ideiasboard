import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const bearer = req.header('Authorization');
  if ( !bearer ) {
    return res.status(401).send({ status: 401, error: 'No authorization header found.' });
  }

  const token = bearer.split(' ')[1];
  if ( !token ) {
    return res.status(401).send({ status: 401, error: 'No bearer token found.' });
  }

  try {
    verifyToken(token);
  } catch (error) {
    return res.status(400).send({ status: 400, error });
  }

  next();
}
