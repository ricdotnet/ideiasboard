import { Router } from 'express';
import { realtime } from './realtime';
import { board } from './board';
import { ideia } from './ideia';

const api: Router = Router();
api.use('/board', board);
api.use('/ideia', ideia);
api.use('/realtime', realtime);

export { api };
