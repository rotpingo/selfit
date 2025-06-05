import { Injectable } from '@angular/core';
import { db } from '../data/db';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotes(): Promise<Note[]> {
    return db.notes.toArray();
  }

  addNote(note: Note) {
    return db.notes.add({ ...note, createdAt: Date.now() });
  }
}
