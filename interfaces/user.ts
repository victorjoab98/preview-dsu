export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    role: userRole;
    status: boolean;
}


type userRole = 'ADMIN_ROLE' | 'USER_ROLE';