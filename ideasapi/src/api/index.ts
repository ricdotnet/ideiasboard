import { Router } from 'express';
import { realtime } from './realtime';
import { board } from './board';
import { ideia } from './ideia';
import { auth } from './auth';

const api: Router = Router();
api.use('/board', board);
api.use('/ideia', ideia);
api.use('/realtime', realtime);
api.use('/auth', auth);

export { api };
