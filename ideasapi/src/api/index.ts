import { Router } from 'express';
import { realtime } from './realtime';

const api: Router = Router();
api.use('/realtime', realtime);

export { api };
