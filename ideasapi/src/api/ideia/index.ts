import { Router } from 'express';
import { connections } from '../realtime';
import { DAO } from '../../db/DAO';

const ideia: Router = Router();

ideia.post('/', async (req, res) => {
  let ideia = await insertIdeia(req.body);

  // TODO: all connections, but the client sending, on this board should receive ideia.
  ideia = Object.assign({}, { ...req.body, ...ideia });
  broadcastIdeia(ideia);

  res.status(200).send({ message: 'Ideia added to the board.' });
});

ideia.patch('/like', (req, res) => {
  const { ideia, board, clientId } = req.body;

  DAO.client().run('UPDATE ideias SET likes = likes + 1 WHERE id = $ideia', {
    $ideia: ideia,
  });

  broadcastIdeiaLike(req.body);

  res.status(200).send({ message: 'Successfully liked the ideia.' });
});

// TODO: abstract these events
function broadcastIdeia({ board, clientId, content, id }: any) {
  connections.forEach(c => {
    if ( c.board === board /*&& c.id !== clientId*/ ) {
      c.conn.write(`id: ${clientId}\n`);
      c.conn.write(`event: ES_IDEIA\n`);
      c.conn.write(`data: {"ideia": { "content": "${content}", "id": ${id} }}\n\n`);
    }
  });
}

function broadcastIdeiaLike({ board, clientId, ideia }: any) {
  connections.forEach(c => {
    if ( c.board === board /*&& c.id !== clientId*/ ) {
      c.conn.write(`id: ${clientId}\n`);
      c.conn.write(`event: ES_IDEIA_LIKE\n`);
      c.conn.write(`data: {"ideia": "${ideia}"}\n\n`);
    }
  });
}

function insertIdeia({ board, content, user }: any): Promise<{}> {
  return new Promise((resolve, reject) => {
    DAO.client().run('INSERT INTO ideias (board, content, user, created_at) VALUES ($board, $content, $user, $createdAt)', {
      $board: board,
      $content: content,
      $user: user ?? null,
      $createdAt: Date.now(),
    }, function (error) {
      if (error) console.log(error);
      resolve({ id: this.lastID });
    });
  });
}

export {
  ideia
};
