export interface TaskModel {
  id?: number;
  parentId: number;
  title: string;
  content: string;
  isRepeat: boolean;
  interval?: number;
  status: 'done' | 'canceled' | 'progress';
  notes?: string;
  execDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
