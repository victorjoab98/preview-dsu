import { ToDoRedux } from "../interfaces/todoRedux";

export const todosRedux: ToDoRedux[] = [
    {
        id: 1,
        title: 'Learn Next.js',
        description: 'I want to learn Next.js because it is a great framework',
        createdAt: JSON.stringify(new Date().setHours(4)),
        status: 'ToDo',
        user: {
            id: 1,
            name: 'John Titor',
            email: 'john@telus.com'
        }
    },
    {
        id: 2,
        title: 'Learn React',
        description: 'I need to learn React tomorrow.',
        createdAt: JSON.stringify(new Date().setHours(4)),
        status: 'In Progress',
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com'    
        }
        
    },
    {
        id: 3,
        title: 'Learn MongoDB',
        description: 'Mongo is a very useful to handle databases.',
        createdAt: JSON.stringify(new Date().setDate(8) ),
        status: 'Done',
        user: {
            id: 3,
            name: 'Bruce Cruise',
            email: 'batman@telus.com'
        }
    },
    {   
        id: 4,
        title: 'Learn Jira',
        description: 'Jira is one of the most common SPM.',
        createdAt: JSON.stringify(new Date().setHours(18)),
        status: 'ToDo',
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com' 
        }
    },
]