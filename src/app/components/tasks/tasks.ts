import { Component, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { TaskModel } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Backdrop } from '../shared/backdrop/backdrop';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, Backdrop, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {

  taskService = inject(TaskService);
  tasks: Signal<TaskModel[]> = this.taskService.getTasksSignal();

  isFormOpen = signal<boolean>(false);
  form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(16), Validators.minLength(4), Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(10), Validators.required],
    }),
  });

  onCloseForm() {
    this.form().nativeElement.style.display = "none";
    this.isFormOpen.set(false);
    this.taskForm.reset();
    console.log(this.tasks());
  }

  onAddForm() {
    this.isFormOpen.set(true);
    this.form().nativeElement.style.display = "flex";
  }

  async onCreate() {

    if (this.taskForm.valid) {

      const newTask: TaskModel = {
        title: this.taskForm.value.title!,
        content: this.taskForm.value.description!,
        createdAt: new Date(Date.now())!,
      };

      try {
        await this.taskService.addTask(newTask);
        this.onCloseForm();
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    } else {
      console.log('Invalid Form')
    }
  }
}
