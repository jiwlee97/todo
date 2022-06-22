export interface IDateInfo {
  type: string;
  day: number;
  value: number;
}

export type ITodoItem = [string, { todo: string }];

export type ITodoList = ITodoItem[];
