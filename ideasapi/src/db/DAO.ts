import path from 'path';
import fs from 'fs';
import { Database } from 'sqlite3';

export class DAO {

  file: string = path.join(process.cwd(), './data/ideas.db');
  static db: Database;

  constructor() {
    if ( !fs.existsSync(this.file) ) {
      fs.writeFile(this.file, '', (error) => {
        if ( error ) return error;
      });
    }

    DAO.db = new Database(this.file, async (error) => {
      if ( error ) {
        return console.error('Could not connect to the database.');
      }

      await this.createBoardsTable();
      await this.createIdeiasTable();
      return console.log('Connected to the database.');
    });
  }

  async createBoardsTable() {
    DAO.db.run(`
        CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        secret TEXT,
        created_at INTEGER NOT NULL)
    `);

    console.log('Boards table has been created.');
    return Promise.resolve();
  }

  async createIdeiasTable() {
    DAO.db.run(`
        CREATE TABLE IF NOT EXISTS ideias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        board TEXT NOT NULL,
        content TEXT UNIQUE NOT NULL,
        created_at INTEGER NOT NULL,
        likes INTEGER DEFAULT 0,
        FOREIGN KEY (board) REFERENCES boards(key))
    `);

    console.log('Ideias table has been created.');
    return Promise.resolve();
  }

  static client(): Database {
    if (!this.db) {
      new DAO();
    }
    return this.db;
  }
}
