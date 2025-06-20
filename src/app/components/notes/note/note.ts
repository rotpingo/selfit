import { Component, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteModel } from '../../../model/note.model';
import { Backdrop } from '../../shared/backdrop/backdrop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  imports: [Backdrop, ReactiveFormsModule],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {

  noteService = inject(NoteService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  isEditMode = signal(false);

  noteId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  note!: Signal<NoteModel | undefined>;

  noteForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(16), Validators.minLength(4), Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(10), Validators.required],
    }),
  });

  form = viewChild.required<ElementRef<HTMLFormElement>>('form');


  constructor() {
    this.note = this.noteService.getNoteSignalById(this.noteId);
  }

  onDelete() {
    this.noteService.deleteNoteById(this.noteId);
    this.router.navigate(["/notes"]);
  }

  onEdit() {
    this.isEditMode.set(true);
    this.noteForm.patchValue({
      title: this.note()?.title,
      description: this.note()?.content
    });
  }

  onCloseForm() {
    this.isEditMode.set(false);
  }

  onCancel() {
    this.isEditMode.set(false);
  }

  onSubmit() {

  }

}
