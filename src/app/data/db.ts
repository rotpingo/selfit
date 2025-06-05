import Dexie, { Table } from "dexie";
import { Note } from "../model/note.model";

export const dummyNotes: Note[] = [
  {
    id: 1,
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Coffee',
    createdAt: Date.now() - 1000000,
  },
  {
    id: 2,
    title: 'Workout Plan',
    content: 'Monday: Chest\nTuesday: Back\nWednesday: Legs',
    createdAt: Date.now() - 500000,
  },
  {
    id: 3,
    title: 'Angular Notes',
    content: 'Explore signals, resources, and IndexedDB',
    createdAt: Date.now() - 10000,
  },
];

export async function seedDummyNotes() {
  const count = await db.notes.count();
  if (count === 0) {
    await db.notes.bulkAdd(dummyNotes);
    console.log('Dummy notes seeded!');
  }
}

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
