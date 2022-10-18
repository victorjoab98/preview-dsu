import { User } from "./user";

export interface ToDo {
    id: number;
    description: string;
    createdAt: number;
    status: ToDoStatus;
    user: User;
}

export type ToDoStatus = 'ToDo' | 'In Progress' | 'Done';