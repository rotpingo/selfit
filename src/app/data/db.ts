import Dexie, { Table } from "dexie";
import { NoteModel } from "../model/note.model";

export class AppDB extends Dexie {

  notes!: Table<NoteModel>;

  constructor() {
    super('selfit');
    this.version(1).stores({
      notes: '++id, title, createdAt'
    });
  }
}

export const db = new AppDB();
