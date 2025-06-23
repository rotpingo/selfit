import { Injectable, Signal } from "@angular/core";
import { TaskModel } from "../model/task.model";
import { db } from "../data/db";
import { toSignal } from "@angular/core/rxjs-interop";
import { liveQuery } from "dexie";
import { from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasksSignal(): Signal<TaskModel[]> {
    return toSignal(
      liveQuery(() => db.tasks.toArray()),
      { initialValue: [] }
    );
  }

  getTasks(): Promise<TaskModel[]> {
    return db.tasks.toArray();
  }

  addTask(task: TaskModel) {
    return db.tasks.add({ ...task });
  }

  getTaskSignalById(id: number): Signal<TaskModel | undefined> {
    return toSignal(from(liveQuery(() => db.tasks.get(id))),
      { initialValue: undefined });
  }

  getTaskById(id: number) {
    return db.tasks.get(id);
  }

  deleteTaskById(id: number) {
    return db.tasks.delete(id);
  }

  editTaskById(id: number, task: TaskModel) {
    this.deleteTaskById(id);
    task.createdAt = new Date(Date.now());
    return db.tasks.put(task, id);
  }
}
