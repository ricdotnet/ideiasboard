import { Router } from 'express';
import { DAO } from '../../db/DAO';
import { authenticate } from '../../middlewares';
import { fetchBoard, getUserBoards } from '../../services/BoardService';

const board: Router = Router();

board.post('/', (req, res) => {
  const { name, key, email } = req.body;

  DAO.client().run('INSERT INTO boards (name, key, user, created_at) VALUES ($name, $key, $user, $createdAt)', {
    $name: name,
    $key: key,
    $user: email ?? null,
    $createdAt: Date.now(),
  });

  res.status(200).send();
});

board.post('/all', authenticate, async (req, res) => {

  if ( !req.body.email ) {
    return res.status(401).send({ status: 401, error: 'Invalid email address.' });
  }

  const boards = await getUserBoards(req.body);

  res.status(200).send({ boards });
});

board.get('/:key', async (req, res) => {
  const { key } = req.params;
  let result;
  try {
    result = await fetchBoard(key);
    // ideias = await getBoardIdeias(key);
  } catch (error) {
    if ( error ) return res.status(400).send({ status: 400, error });
  }

  if ( !result ) return res.status(404).send({ status: 404, error: 'Board not found.' });

  const board = result[0];
  Object.assign(board, { ideias: result[1] });

  res.status(200).send({ board });
});

function getBoardData(key: string) {
  return new Promise((resolve, reject) => {
    DAO.client().get('SELECT * FROM boards WHERE key = $key', {
      $key: key
    }, (error, result) => {
      if ( error ) return reject(error);
      resolve(result);
    });
  });
}

function getBoardIdeias(key: string) {
  return new Promise((resolve, reject) => {
    DAO.client().all('SELECT * FROM ideias WHERE board = $key', {
      $key: key,
    }, (error, result) => {
      if ( error ) return reject(error);
      resolve(result);
    });
  });
}

export { board };
