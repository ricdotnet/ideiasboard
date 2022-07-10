import { Router } from 'express';
import { connections } from '../realtime';
import { DAO } from '../../db/DAO';

const ideia: Router = Router();

ideia.post('/', (req, res) => {
  const { board, content, clientId } = req.body;

  DAO.client().run('INSERT INTO ideias (board, content, created_at) VALUES ($board, $content, $createdAt)', {
    $board: board,
    $content: content,
    $createdAt: Date.now(),
  });

  // TODO: all connections, but the client sending, on this board should receive ideia.
  broadcast(req.body);

  res.status(200).send({ message: 'Ideia added to the board.' });
});

function broadcast({ board, clientId, content }: any) {
  connections.forEach(c => {
    if ( c.board === board /*&& c.id !== clientId*/ ) {
      c.conn.write(`id: ${clientId}\n`);
      c.conn.write(`event: ES_IDEIA\n`);
      c.conn.write(`data: {"content": "${content}"}\n\n`);
    }
  });
}

export {
  ideia
};
