import { DAO } from '../db/DAO';
import { IBoard } from '../models/board';
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

async function fetchUserBoards(email: string): Promise<any> {
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

async function fetchThirdPartyBoards(email: string): Promise<any> {
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
