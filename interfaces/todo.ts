import { User } from "./user";

export interface ToDo {
    _id: string;
    description: string;
    createdAt: number;
    status: ToDoStatus;
    user: User;
}

export type ToDoStatus = 'ToDo' | 'In Progress' | 'Done';