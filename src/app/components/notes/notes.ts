import { Component, inject, resource } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {

  // notes = signal<Note[]>([]);
  noteService = inject(NoteService);

  notes = resource<Note[], unknown>({
    loader: async () => {
      // const notes = await this.noteService.getNotes();
      const notes = await this.noteService.getNotes();
      console.log(notes);
      return notes;
    }
  })
}
