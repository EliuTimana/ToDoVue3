export interface TaskInterface {
  id: number;
  description: string;
  done: boolean;
  dueDate?: Date;
}

export class Task implements TaskInterface {
  description!: string;
  done!: boolean;
  id!: number;
}
