import express, { Express } from 'express';
import cors from 'cors';
import { DAO } from './db/DAO';
import { api } from './api';
import { Logger } from './utils/Logger';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api', api);

(async () => {
  await Logger.initiate().then(() => {
    new DAO();
    app.listen('3200', () => {
      Logger.info('Server listening on port 3200.');
    });
  });
})();
