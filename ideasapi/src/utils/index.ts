import * as crypto from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export function randomId(size: number = 20) {
  return crypto.randomBytes(size).toString('hex');
}

export function createToken(email: string, expiresIn?: string): string {
  const token = sign({ email }, <string>process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: expiresIn ?? '365d'
  });

  return token;
}

export function verifyToken(token: string): JwtPayload | string {
  const payload = verify(token, <string>process.env.SECRET);

  return payload;
}

export function isValidEmail(email: string): any {
  const emailPattern = /^([a-z0-9_.-]+)(@)([a-z0-9_.-]+)[.]([a-z0-9]+)/g;
  return emailPattern.test(email);
}
