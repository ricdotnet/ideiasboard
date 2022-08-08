import { Router } from 'express';
import { createToken, isValidEmail, verifyToken } from '../../utils';

const auth: Router = Router();

auth.post('/', (req, res) => {
  if ( !isValidEmail(req.body.email) ) {
    return res.status(400).send();
  }

  const token = createToken(req.body.email);

  // TODO: send auth email with auth link
  console.log(`${process.env.BASE}/auth?token=${token}`);

  res.status(200).send({ authed: true, token });
});

// TODO: refactor logic into a service
// when authing we then sign a new access token to use with the app
auth.post('/:token', (req, res) => {
  let payload;

  try {
    payload = verifyToken(<string>req.params.token);
    if ( !payload.hasOwnProperty('email') ) {
      return res.status(401).send({ error: 'could not auth' });
    }
  } catch (error) {
    return res.status(401).send({ error: 'could not auth' });
  }

  res.status(200).send({ message: 'authed', token: req.params.token });
});

export { auth };
