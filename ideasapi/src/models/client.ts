import {Response} from 'express';

// for the moment we sub to only 1 board at a time
export interface Client {
  id: string;
  conn: Response;
  board?: string;
}
