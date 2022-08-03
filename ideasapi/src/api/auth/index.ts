import { Router } from 'express';

const auth: Router = Router();

auth.post('/', (req, res) => {
  console.log(req.body);

  res.status(200).send({ authed: true });
});

export { auth };
