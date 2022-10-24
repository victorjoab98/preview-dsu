import { User } from './user';

export interface IAuth {
    ok: boolean,
    message: string,
    user: User,
    token: string;
}