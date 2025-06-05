import { Component, inject, OnInit, resource, ResourceRef, signal } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes implements OnInit {

  notes = signal<Note[]>([]);
  noteService = inject(NoteService);

  ngOnInit(): void {
    this.noteService.getNotes().then(data => {
      this.notes.set(data);
    });
  }
}
