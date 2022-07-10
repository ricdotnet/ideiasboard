import { Router } from 'express';
import { randomId } from '../../utils';
import { Client } from '../../models/client';

const realtime: Router = Router();

const connections: Client[] = [];

// Connect once to here
realtime.get('/', (req, res) => {
  res.set({
    'Cache-Control': 'no-store',
    'Content-Type': 'text/event-stream; charset=UTF-8',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  const clientId = randomId();
  connections.push({
    id: clientId,
    conn: res,
    board: undefined,
  });

  res.on('close', () => {
    connections.splice(connections.findIndex(c => c.conn === res), 1);
  });

  res.on('error', () => {
    console.log('some connection broke...');
  });

  res.write(`id: ${clientId}\n`);
  res.write(`event: ES_CONNECT\n`);
  res.write(`data: {"clientId": "${clientId}"}\n\n`);
});

realtime.post('/', (req, res) => {
  const { clientId, boardId } = req.body;

  connections.map(c => {
    if ( c.id === clientId ) {
      c.board = boardId;
    }
  });

  res.status(200).send({ message: `subscribed to '${boardId}'` });
});

// realtime.post('/test', (req, res) => {
//   const { clientId, boardId, ideia } = req.body;
//   connections.forEach(c => {
//     if ( c.board === boardId ) {
//       c.conn.write(`id: ${clientId}\n`);
//       c.conn.write(`event: ES_IDEIA\n`);
//       c.conn.write(`data: {"content": "${ideia}"}\n\n`);
//     }
//   });
//   res.end();
// });

export { realtime, connections };
