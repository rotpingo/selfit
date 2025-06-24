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
    await this.deleteTaskById(id);
    task.updatedAt = new Date(Date.now());
    return await db.tasks.put(task, id);
  }
}
