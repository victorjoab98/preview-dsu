import { ToDo } from "../interfaces";

export const todos: ToDo[] = [
    {
        id: 1,
        description: 'Learn Next.js',
        createdAt: new Date(),
        status: 'ToDo',
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john@telus.com'
        }
    },
    {
        id: 2,
        description: 'Learn React',
        createdAt: new Date(),
        status: 'In Progress',
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com'    
        }
        
    },
    {
        id: 3,
        description: 'Learn MongoDB',
        createdAt: new Date(),
        status: 'Done',
        user: {
            id: 3,
            name: 'Bruce Wayne',
            email: 'batman@telus.com'
        }
    },
    {   
        id: 4,
        description: 'Learn Jira',
        createdAt: new Date(),
        status: 'ToDo',
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com' 
        }
    },
]