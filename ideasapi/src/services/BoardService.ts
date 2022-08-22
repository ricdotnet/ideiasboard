import { DAO } from '../db/DAO';
import { IBoard, IIdeia } from '../models/board';
import { ObjectBuilder } from '../models/ObjectBuilder';

export async function getUserBoards({ email }: any): Promise<{ owned: IBoard[]; other: IBoard[]; }> {
  const result: { owned: IBoard[]; other: IBoard[]; } = {
    owned: <IBoard[]>[],
    other: <IBoard[]>[],
  };

  Object.assign(result, { owned: await fetchUserBoards(email) });
  Object.assign(result, { other: await fetchThirdPartyBoards(email) });

  return result;
}

export function fetchBoard(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    DAO.client().get(`
        SELECT boards.key,
               boards.name,
               boards.created_at,
               json_group_array(json_object('id', ideias.id, 'content', ideias.content, 'likes',
                                            ideias.likes,
                                            'created_at', ideias.created_at)) as ideias
        FROM boards
                 LEFT OUTER JOIN ideias on boards.key = ideias.board
        WHERE key = $key`, {
      $key: key
    }, (error, result) => {
      if ( error ) return reject(error);
      resolve([
        ObjectBuilder<IBoard>(result),
        JSON.parse(result.ideias).map((i: IIdeia) => ObjectBuilder<IIdeia>(i))
      ]);
    });
  });
}

function fetchUserBoards(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    DAO.client().all(`
        SELECT boards.key, boards.name, boards.created_at, COUNT(DISTINCT ideias.id) as ideias
        FROM boards
                 LEFT OUTER JOIN ideias on ideias.board = boards.key
        WHERE boards.user = $email
        GROUP BY boards.key`, {
      $email: email
    }, (error: any, results: any) => {
      if ( error ) return reject(error);
      return resolve(results.map((b: IBoard) => ObjectBuilder<IBoard>(b)));
    });
  });
}

function fetchThirdPartyBoards(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    DAO.client().all(`
        SELECT DISTINCT ideias.board         as key,
                        boards.name,
                        boards.created_at,
                        COUNT(DISTINCT i.id) as ideias
        FROM ideias
                 LEFT OUTER JOIN boards
                                 ON ideias.board = boards.key
                 LEFT OUTER JOIN ideias i ON boards.key = i.board
        WHERE ideias.user = $email`, {
      $email: email
    }, (error, results: any) => {
      if ( error ) return reject(error);
      return resolve(results.map((b: IBoard) => ObjectBuilder<IBoard>(b)));
    });
  });
}
