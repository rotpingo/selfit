import { Component, effect, inject, Signal, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../../model/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Backdrop } from '../../shared/backdrop/backdrop';
import { FabMenu } from '../../shared/fab-menu/fab-menu';

@Component({
  selector: 'app-task',
  imports: [DatePipe, ReactiveFormsModule, Backdrop, FabMenu],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

  taskService = inject(TaskService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  isEditMode = signal(false);

  taskId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  task: Signal<TaskModel | undefined> = this.taskService.getTaskSignalById(this.taskId);

  editTaskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(16), Validators.minLength(4), Validators.required],
    }),
    content: new FormControl('', {
      validators: [Validators.minLength(10), Validators.required],
    }),
    repeat: new FormControl(false),
    interval: new FormControl(1),
    execDate: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  oldTaskForm = new FormGroup({
    notes: new FormControl(''),
  });

  constructor() {
    effect(() => {
      this.oldTaskForm.patchValue({
        notes: this.task()?.notes,
      })
    });
  }

  onDelete() {
    this.taskService.deleteTaskById(this.taskId);
    this.router.navigate(["/tasks"]);
  }

  onEdit() {
    this.isEditMode.set(true);
    this.editTaskForm.patchValue({
      title: this.task()?.title,
      content: this.task()?.content,
      repeat: this.task()?.isRepeat,
      interval: this.task()?.interval ?? 0,
      execDate: this.task()?.execDate
    });
  }

  onCloseForm() {
    this.isEditMode.set(false);
  }

  onEditTask() {
    const editTask: TaskModel = {
      title: this.editTaskForm.value.title ?? '',
      content: this.editTaskForm.value.content ?? '',
      parentId: 0,
      status: 'progress',
      isRepeat: false,
      execDate: this.editTaskForm.value.execDate ?? '',
      updatedAt: new Date(Date.now()),
      createdAt: this.task()?.createdAt!
    }

    this.taskService.editTaskById(this.taskId, editTask);
    this.router.navigate(["/tasks"]);
  }

  onFabAction(action: string) {
    switch (action) {
      case 'edit':
        this.onEdit();
        break;
      case 'delete':
        this.onDelete();
        break;
    }
  }

  onCompleteTask() {
    const oldTask: TaskModel = {
      title: this.task()!.title,
      content: this.task()!.content,
      notes: this.oldTaskForm.value.notes ?? 'value',
      isRepeat: this.task()!.isRepeat,
      interval: this.task()?.interval,
      status: 'done',
      updatedAt: this.task()!.updatedAt,
      createdAt: this.task()!.createdAt,
      execDate: this.task()!.execDate,
      execAt: new Date(Date.now()),
    }
    this.taskService.editTaskById(this.taskId, oldTask);
    this.router.navigate(["/tasks"]);
  }
}
