import { Component, ElementRef, inject, resource, signal, viewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Backdrop } from '../shared/backdrop/backdrop';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule, Backdrop],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {

  isFormOpen = signal<boolean>(false);

  noteForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(16), Validators.minLength(4), Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(10), Validators.maxLength(50), Validators.required],
    }),
  });

  form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  noteService = inject(NoteService);

  // TODO: change function to rxjs Observables
  notes = resource<Note[], unknown>({
    loader: async () => {
      // const notes = await this.noteService.getNotes();
      return await this.noteService.getNotes();
    },
  });

  onCloseForm() {
    this.form().nativeElement.style.display = "none";
    this.isFormOpen.set(false);
    this.noteForm.reset();
  }

  onAddForm() {
    this.isFormOpen.set(true);
    this.form().nativeElement.style.display = "flex";
  }

  onSubmit() {
    if (this.noteForm.valid) {
      console.log(this.noteForm.value);
    } else {
      console.log('Invalid Form')
    }
  }
}
