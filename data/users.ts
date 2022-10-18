import { User } from "../interfaces";

export const users : User[] = 
    [
        {
            id: 1,
            name: 'John Titor',
            email: 'john@telus.com',
            password: '1234',
            role: 'USER_ROLE',
            status: true
        },
        {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com',    
            password: '1234',
            role: 'USER_ROLE',
            status: true
        },
        {
            id: 3,
            name: 'Bruce Cruise',
            email: 'batman@telus.com',
            password: '1234',
            role: 'USER_ROLE',
            status: true
        },
        {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com' ,
            password: '1234',
            role: 'USER_ROLE',
            status: true
        }
    ]

 export const authUser = {
    id: '634f1a0283a505369ee20da9',
    name: 'Fernando Camilo',
    email: 'f@gmail.com',
    password: '1234',
    role: 'USER_ROLE',
    status: true
 }

 export const authAdmin:User = {
    id: 2,
    name: 'Garcia perez',
    email: 'g@gmail.com',
    password: '1234',
    role: 'ADMIN_ROLE',
    status: true
 }   
