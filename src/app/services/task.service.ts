import { computed, Injectable, signal, Signal } from "@angular/core";
import { TaskModel } from "../model/task.model";
import { db } from "../data/db";
import { toSignal } from "@angular/core/rxjs-interop";
import { liveQuery } from "dexie";
import { from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSignal = signal<TaskModel[]>([]);

  tasks = computed(() => this.tasksSignal().filter(task => task.status === 'progress'));
  doneTasks = computed(() => this.tasksSignal().filter(task => task.status !== 'progress'));

  constructor() {
    this.onLoadTasks();
  }

  async onLoadTasks() {
    const tasks = await db.tasks.toArray();
    this.tasksSignal.set(tasks);
  }

  async createTask(task: TaskModel) {
    const id = await db.tasks.add({ ...task });
    await db.tasks.update(id, { parentId: id });

    const newTask = await db.tasks.get(id);
    await this.onLoadTasks();
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
    await db.tasks.update(id, task);
    return this.onLoadTasks();
  }
}
