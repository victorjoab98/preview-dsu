export interface User{
    _id?: string;
    name: string;
    email: string;
    password?: string;
    google?: boolean;
    role: userRole;
    status?: boolean;
}


export type userRole = 'ADMIN_ROLE' | 'USER_ROLE';
