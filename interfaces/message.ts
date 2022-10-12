import { User } from "./user";

export interface Message {
    id: number;
    text: string;
    createdAt: Date;
    user: User;
} 