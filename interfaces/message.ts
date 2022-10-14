import { User } from "./user";

export interface Message {
    id: number;
    text: string;
    createdAt: Date;
    user: User;
} 



export interface ReduxMessage extends Omit <Message, 'createdAt'> {
    createdAt: number;
}
