import { Component, ElementRef, inject, Signal, signal, viewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../../model/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Backdrop } from '../../shared/backdrop/backdrop';

@Component({
  selector: 'app-task',
  imports: [DatePipe, ReactiveFormsModule, Backdrop],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

  taskService = inject(TaskService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  isEditMode = signal(false);

  taskId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  task!: Signal<TaskModel | undefined>;

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(16), Validators.minLength(4), Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(10), Validators.required],
    }),
  });

  form = viewChild.required<ElementRef<HTMLFormElement>>('form');


  constructor() {
    this.task = this.taskService.getTaskSignalById(this.taskId);
  }

  onDelete() {
    this.taskService.deleteTaskById(this.taskId);
    this.router.navigate(["/tasks"]);
  }

  onEdit() {
    this.isEditMode.set(true);
    this.taskForm.patchValue({
      title: this.task()?.title,
      description: this.task()?.content
    });
  }

  onCloseForm() {
    this.isEditMode.set(false);
  }

  onSubmit() {

    const editTask: TaskModel = {
      title: this.taskForm.value.title ?? '',
      content: this.taskForm.value.description ?? ''
    }

    this.taskService.editTaskById(this.taskId, editTask);
    this.router.navigate(["/notes"]);
  }
}
