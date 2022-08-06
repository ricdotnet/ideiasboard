import * as crypto from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

function randomId(size: number = 20) {
  return crypto.randomBytes(size).toString('hex');
}

function createToken(email: string): string {
  const token = sign({ email }, <string>process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m'
  });

  return token;
}

function verifyToken(token: string): JwtPayload | string {
  const payload = verify(token, <string>process.env.SECRET);

  return payload;
}

export { randomId, createToken, verifyToken };
