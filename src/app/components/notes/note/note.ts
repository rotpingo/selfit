import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note implements OnInit {

  noteService = inject(NoteService);
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getNote();
  }

  getNote() {
    const noteId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    const note = this.noteService.getNote(noteId);
  }
}
