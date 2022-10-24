import { User } from "./user";



export interface Message {
    text: string;
    createdAt: number;
    status: 'active' | 'deleted';
    user: User;
} 

// TODO: delete this interface
export interface ReduxMessage extends Omit <Message, 'createdAt'> {
    createdAt: number;
}
