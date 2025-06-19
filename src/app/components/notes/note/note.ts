import { Component, inject, Signal } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { ActivatedRoute } from '@angular/router';
import { NoteModel } from '../../../model/note.model';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {

  noteService = inject(NoteService);
  activeRoute = inject(ActivatedRoute);

  noteId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  note: Signal<NoteModel | undefined>;

  constructor() {
    this.note = this.noteService.getNoteSignal(this.noteId);
  }
}
