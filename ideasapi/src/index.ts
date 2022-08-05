import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { DAO } from './db/DAO';
import { api } from './api';

if ( process.env.NODE_ENV === 'production' ) {
  config();
} else {
  config({ path: '.env.development' });
}

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', api);

new DAO();
app.listen('3200', () => {
  console.log('Server listening on port 3200.');
});
