export interface TaskModel {
  id?: number;
  parentId?: number;
  title: string;
  content: string;
  isRepeat: boolean;
  interval?: number;
  status: 'done' | 'canceled' | 'progress';
  notes?: string;
  execDate: string;
  execAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
