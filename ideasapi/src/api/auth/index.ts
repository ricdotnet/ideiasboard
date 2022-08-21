import { Router } from 'express';
import { createToken, isValidEmail, verifyToken } from '../../utils';

const auth: Router = Router();

// TODO: get rid of the 'any' type and maybe refactor into cool service functions

auth.post('/', (req, res) => {
  if ( !isValidEmail(req.body.email) ) {
    return res.status(400).send({ error: 'could not auth', message: 'invalid email address' });
  }

  const token = createToken(req.body.email, '15m');

  // TODO: send auth email with auth link
  console.log(`${process.env.BASE}/auth?token=${token}`);

  res.status(200).send({ authed: true, token });
});

auth.post('/verify', (req, res) => {
  const bearer = req.header('Authorization');
  if ( !bearer ) return res.status(401)
    .send({
      error: 'could not auth',
      message: 'no authorization header'
    });
  const token = bearer.split(' ')[1]; // split the header value and grab the token
  if ( !token ) return res.status(401)
    .send({
      error: 'could not auth',
      message: 'no bearer token'
    });
  let payload: any;

  try {
    payload = verifyToken(token);
    if ( !payload.hasOwnProperty('email') ) {
      return res.status(401).send({
        status: 401,
        error: 'could not auth',
        message: 'payload has no email'
      });
    }
  } catch (error) {
    return res.status(401).send({ status: 401, error, message: 'generic error' });
  }

  res.status(200).send({ message: 'authed', email: payload['email'] });
});

auth.post('/:token', (req, res) => {
  let payload: any;

  try {
    payload = verifyToken(<string>req.params.token);
    if ( !payload.hasOwnProperty('email') ) {
      return res.status(401).send({ error: 'could not auth', message: 'payload has no email' });
    }
  } catch (error) {
    return res.status(401).send({ error: 'could not auth', message: 'generic error' });
  }

  const token = createToken(payload['email']);

  res.status(200).send({ message: 'authed', token, email: payload['email'] });
});

export { auth };
