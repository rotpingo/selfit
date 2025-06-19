import { Injectable, Signal } from '@angular/core';
import { db } from '../data/db';
import { Note } from '../model/note.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';

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

  getNoteSignal(id: number): Signal<Note | undefined> {
    const note$ = liveQuery(() => db.notes.get(id));
    return toSignal(from(note$), { initialValue: undefined });
  }

  getNote(id: number) {
    return db.notes.get(id);
  }
}
