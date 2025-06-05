import Dexie, { Table } from "dexie";
import { Note } from "../model/note.model";

export class AppDB extends Dexie {

  notes!: Table<Note>;

  constructor() {
    super('selfit');
    this.version(1).stores({
      notes: '++id, title, createdAt'
    });
  }
}

export const db = new AppDB();
