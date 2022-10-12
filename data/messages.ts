import { Message } from "../interfaces";

export const messages: Message[] = [
    {
        id: 1,
        text: 'Hey Team I am learning Next.js :D',
        createdAt: new Date(),
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john@telus.com'
        }
    },
    {
        id: 2,
        text: 'Wow, I am learning React!',
        createdAt: new Date(),
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com'    
        }
        
    },
    {
        id: 3,
        text: 'Nice, I am learning MongoDB haha.',
        createdAt: new Date(),
        user: {
            id: 3,
            name: 'Bruce Wayne',
            email: 'batman@telus.com'
        }
    },
    {   
        id: 4,
        text: 'Cool, I am also learning Python.',
        createdAt: new Date(),
        user: {
            id: 2,
            name: 'Peter Parker',
            email: 'peter@telus.com' 
        }
    },
]