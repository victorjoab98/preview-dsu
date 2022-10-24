import { User } from "./user";



export interface Message {
    text: string;
    createdAt: number;
    status: 'active' | 'deleted';
    user: User;
} 

