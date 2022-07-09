import express, { Express } from 'express';
import cors from 'cors';

import { api } from './api';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.listen('3200', () => {
  console.log('Server listening on port 3200.');
});
