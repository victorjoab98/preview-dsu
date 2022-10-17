import { User } from "./user";

export interface ToDoRedux {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    status: ToDoStatus;
    user: User;
}

export type ToDoStatus = 'ToDo' | 'In Progress' | 'Done';