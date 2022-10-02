import { Router } from 'express';
import { DAO } from '../../db/DAO';
import { authenticate } from '../../middlewares';
import { fetchBoard, getUserBoards } from '../../services/BoardService';
import { Logger } from '../../utils/Logger';

const board: Router = Router();

board.post('/', (req, res) => {
  Logger.info('Entering /api/v1/board/');

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
  await Logger.info('Entering /api/v1/board/all');

  if ( !req.body.email ) {
    await Logger.error('Tried to retrieve boards for user:', { user: req.body.email });
    return res.status(401).send({ status: 401, error: 'Invalid email address.' });
  }

  const boards = await getUserBoards(req.body);

  await Logger.info('Sending user boards to user:', { user: req.body.email });
  res.status(200).send({ boards });
});

board.get('/:key', async (req, res) => {
  const { key } = req.params;
  await Logger.info('Entering /api/v1/board/:key', { key: key });

  let result;
  try {
    result = await fetchBoard(key);
  } catch (error) {
    if ( error ) return res.status(400).send({ status: 400, error });
  }

  if ( !result[0].key ) {
    await Logger.error('Tried to retrieve data for a non existing board:', { board: key });
    return res.status(404).send({ status: 404, error: 'Board not found.' });
  }

  const board = result[0];

  // small hack to clean the ideias if id of 0 is null
  Object.assign(board, { ideias: (result[1][0].id === null) ? [] : result[1] });

  await Logger.info('Sending board data to user:', { board: key });
  res.status(200).send({ board });
});

export { board };
