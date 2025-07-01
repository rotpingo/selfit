import { Component, ElementRef, inject, Signal, signal, viewChild } from '@angular/core';
import { TaskModel } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { Router, RouterLink } from '@angular/router';
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
  router = inject(Router);
  tasks: Signal<TaskModel[]> = this.taskService.getTasksSignal();

  isFormOpen = signal<boolean>(false);
  form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(30), Validators.minLength(4), Validators.required],
    }),
    content: new FormControl('', {
      validators: [Validators.minLength(10), Validators.required],
    }),
    repeat: new FormControl(false),
    interval: new FormControl(1),
    execDate: new FormControl(new Date, {
      validators: [Validators.required],
    }),
  });

  onCloseForm() {
    this.form().nativeElement.style.display = "none";
    this.isFormOpen.set(false);
    this.taskForm.reset();
  }

  onAddForm() {
    this.isFormOpen.set(true);
    this.form().nativeElement.style.display = "flex";
  }

  async onCreate() {
    if (this.taskForm.valid) {
      const newTask: TaskModel = {
        title: this.taskForm.value.title!,
        content: this.taskForm.value.content!,
        parentId: -1,
        isRepeat: this.taskForm.value.repeat ?? false,
        interval: this.taskForm.value.interval ?? 1,
        status: 'progress',
        execDate: this.taskForm.value.execDate!,
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
      };
      try {
        await this.taskService.createTask(newTask);
        this.onCloseForm();
        this.router.navigate(['/tasks']);
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    } else {
      console.log('Invalid Form')
    }
  }

}
