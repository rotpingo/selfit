import { Injectable, Signal } from '@angular/core';
import { db } from '../data/db';
import { NoteModel } from '../model/note.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotesSignal(): Signal<NoteModel[]> {
    return toSignal(
      liveQuery(() => db.notes.toArray()),
      { initialValue: [] }
    );
  }

  getNotes(): Promise<NoteModel[]> {
    return db.notes.toArray();
  }

  addNote(note: NoteModel) {
    return db.notes.add({ ...note });
  }

  getNoteSignal(id: number): Signal<NoteModel | undefined> {
    return toSignal(from(liveQuery(() => db.notes.get(id))),
      { initialValue: undefined });
  }

  getNote(id: number) {
    return db.notes.get(id);
  }
}
