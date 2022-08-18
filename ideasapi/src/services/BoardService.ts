import { DAO } from '../db/DAO';

export async function getUserBoards({ email }: any): Promise<{}> {
  const result = {};

  Object.assign(result, { owned: await fetchUserBoards(email) });
  Object.assign(result, { other: await fetchThirdPartyBoards(email) });

  return result;
}

async function fetchUserBoards(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    DAO.client().all('SELECT key, name, created_at FROM boards WHERE user = $email', {
      $email: email
    }, (error: any, result: any) => {
      if ( error ) return reject(error);
      return resolve(result);
    });
  });
}

async function fetchThirdPartyBoards(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    DAO.client().all('SELECT DISTINCT ideias.board, boards.name, boards.created_at FROM ideias LEFT OUTER JOIN boards ON ideias.board = boards.key WHERE ideias.user = $email', {
      $email: email
    }, (error, result: any) => {
      if ( error ) return reject(error);
      return resolve(result);
    });
  });
}
