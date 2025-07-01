import { Injectable, Signal } from "@angular/core";
import { TaskModel } from "../model/task.model";
import { db } from "../data/db";
import { toSignal } from "@angular/core/rxjs-interop";
import { liveQuery } from "dexie";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  // tasks that are in progress
  getTasksSignal() {
    const taskObservable = from(db.tasks.toArray().then(
      (tasks) => tasks.filter(task => task.status === 'progress')
    )) as Observable<TaskModel[]>;
    const tasks = toSignal(taskObservable, { initialValue: [] }
    );
    return tasks;
  }

  // tasks that are done or canceled
  getEndedTasksSignal() {
    const taskObservable = from(db.tasks.toArray().then(
      (tasks) => tasks.filter(task => task.status !== 'progress')
    )) as Observable<TaskModel[]>;
    const tasks = toSignal(taskObservable, { initialValue: [] }
    );
    return tasks;
  }


  getTasks(): Promise<TaskModel[]> {
    return db.tasks.toArray();
  }

  async createTask(task: TaskModel) {
    const id = await db.tasks.add({ ...task });
    await db.tasks.update(id, { parentId: id });

    const newTask = await db.tasks.get(id);
    return newTask;
  }

  getTaskSignalById(id: number): Signal<TaskModel | undefined> {
    return toSignal(from(liveQuery(() => db.tasks.get(id))),
      { initialValue: undefined });
  }

  getTaskById(id: number) {
    return db.tasks.get(id);
  }

  async deleteTaskById(id: number) {
    return await db.tasks.delete(id);
  }

  async editTaskById(id: number, task: TaskModel) {
    return await db.tasks.update(id, task);
  }
}
