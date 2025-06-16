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

  noteService = inject(NoteService);

  // TODO: change function to rxjs Observables
  notes = resource<Note[], unknown>({
    loader: async () => {
      // const notes = await this.noteService.getNotes();
      return await this.noteService.getNotes();
    },
  });
}
