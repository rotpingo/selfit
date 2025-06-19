import { Component, ElementRef, inject, Signal, signal, viewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Backdrop } from '../shared/backdrop/backdrop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule, Backdrop, RouterLink],
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

  notes: Signal<Note[]> = this.noteService.getNotesSignal();

  onCloseForm() {
    this.form().nativeElement.style.display = "none";
    this.isFormOpen.set(false);
    this.noteForm.reset();
  }

  onAddForm() {
    this.isFormOpen.set(true);
    this.form().nativeElement.style.display = "flex";
  }

  async onSubmit() {
    if (this.noteForm.valid) {

      const newNote: Note = {
        title: this.noteForm.value.title!,
        content: this.noteForm.value.description!,
        createdAt: new Date(Date.now())!,
      };

      try {
        await this.noteService.addNote(newNote);
        this.onCloseForm();
      } catch (error) {
        console.error('Error adding note: ', error);
      }
    } else {
      console.log('Invalid Form')
    }
  }
}
