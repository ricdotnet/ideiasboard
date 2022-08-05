import { Router } from 'express';

const auth: Router = Router();

auth.post('/', (req, res) => {
  console.log(req.body);

  if(req.body.email === 'fakemail') {
    return res.status(400).send();
  }

  res.status(200).send({ authed: true });
});

export { auth };
