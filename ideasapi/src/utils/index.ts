import * as crypto from 'crypto';

function randomId(size: number = 20) {
  return crypto.randomBytes(size).toString('hex');
}

export { randomId };
