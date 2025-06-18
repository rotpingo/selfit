import { Injectable, Signal } from '@angular/core';
import { db } from '../data/db';
import { Note } from '../model/note.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotesSignal(): Signal<Note[]> {
    return toSignal(
      liveQuery(() => db.notes.toArray()),
      { initialValue: [] }
    );
  }

  getNotes(): Promise<Note[]> {
    return db.notes.toArray();
  }

  addNote(note: Note) {
    return db.notes.add({ ...note });
  }
}
