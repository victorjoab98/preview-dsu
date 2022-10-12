import { User } from "./user";

export interface ToDo {
    id: number;
    description: string;
    createdAt: Date;
    status: ToDoStatus;
    user: User;
}

export type ToDoStatus = 'To Do' | 'In Progress' | 'Done';