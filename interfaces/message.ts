import { User } from "./user";



export interface Message {
    text: string;
    createdAt: number;
    status: statusType;
    user: User;
} 

type statusType = 'active' | 'deleted';

// TODO: delete this interface
export interface ReduxMessage extends Omit <Message, 'createdAt'> {
    createdAt: number;
}
