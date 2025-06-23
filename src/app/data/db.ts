import Dexie, { Table } from "dexie";
import { NoteModel } from "../model/note.model";
import { TaskModel } from "../model/task.model";

export class AppDB extends Dexie {

  notes!: Table<NoteModel>;
  tasks!: Table<TaskModel>;


  constructor() {
    super('selfit');
    this.version(1).stores({
      notes: '++id, title, createdAt',
      tasks: '++id, title, createdAt'
    });
  }
}

export const db = new AppDB();
