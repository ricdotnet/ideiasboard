import { Router } from 'express';
import { sign, verify } from 'jsonwebtoken';

const auth: Router = Router();

auth.post('/', (req, res) => {
  if ( req.body.email === 'fakemail' ) {
    return res.status(400).send();
  }

  const token = sign({ email: req.body.email }, <string>process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m'
  });

  console.log(token);

  res.status(200).send({ authed: true });
});

auth.post('/:token', (req, res) => {
  let payload;

  try {
    payload = verify(req.params.token, <string>process.env.SECRET);
    // payload = verify(req.params.token, 'notsecret');
  } catch (error) {
    return res.status(401).send({ error: 'could not auth' });
  }

  res.status(200).send({ message: 'authed' });
});

export { auth };
