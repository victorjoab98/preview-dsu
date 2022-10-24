export interface User{
    _id: string;
    name: string;
    email: string;
    password: string;
    role: userRole;
    status: boolean;
}


export type userRole = 'ADMIN_ROLE' | 'USER_ROLE';
