import { Message, User } from '../interfaces';
import { ToDo } from '../interfaces/todo';

interface SeedUser extends Omit<User, '_id' | 'id'> {
    _id: string
}

interface SeedTodo extends Omit<ToDo, '_id'| 'user'> {
    user: SeedUser
}

interface SeedMessage extends Omit<Message, '_id' | 'user' | 'id'> {
    user: SeedUser;
}

interface SeedData {
    todos?: SeedTodo[];
    users: SeedUser[];
    messages?: SeedMessage[];
}

const KunjoUser: SeedUser = {
    _id: '634f1a0283a505369ee20da8',
    name: 'Kunjo Lee',
    email: 'kunjo@gmail.com',
    password: '1234',
    role: 'ADMIN_ROLE',
    status: true  
}

const VictorUser: SeedUser = {
    _id: '634f1a0283a505369ee20da9',
    name: 'Victor Morales',
    email: 'victor@gmail.com',
    password: '1234',
    role: 'ADMIN_ROLE',
    status: true  
}

const JaimeUser: SeedUser = {
    _id: '634f1a0283a505369ee20daa',
    name: 'Jaime Tuyuc',
    email: 'jaime@gmail.com',
    password: '1234',
    role: 'USER_ROLE',
    status: true  
}

const MarcelaUser: SeedUser = {
    _id: '634f1a0283a505369ee20dad',
    name: 'Marcela Obeso',
    email: 'marcela@gmail.com',
    password: '1234',
    role: 'USER_ROLE',
    status: true  
}

const ChamaleUser: SeedUser ={
    _id: '634f1a0283a505369ee20dab',
    name: 'Victor Chamale',
    email: 'chamale@gmail.com',
    password: '1234',
    role: 'USER_ROLE',
    status: true  
}

const CristianUser: SeedUser = {
    _id: '634f1a0283a505369ee20dac',
    name: 'Cristian Monroy',
    email: 'cristian@gmail.com',
    password: '1234',
    role: 'USER_ROLE',
    status: true  
}

export const seedData: SeedData = {
    todos: [
        {
            description: 'Learning mongoDB',
            createdAt: Date.now(),
            status: 'In Progress',
            user: KunjoUser
        },
        {
            description: 'Creating todo CRUD',
            createdAt: Date.now(),
            status: 'ToDo',
            user: VictorUser
        },
        {
            description: 'connecting to mongoDB with mongoose',
            createdAt: Date.now(),
            status: 'Done',
            user: JaimeUser
        },
        {
            description: 'Implementing redis',
            createdAt: Date.now(),
            status: 'ToDo',
            user: JaimeUser
        },
        {
            description: 'Create chat',
            createdAt: Date.now(),
            status: 'ToDo',
            user: MarcelaUser
        },
        {
            description: 'Make the UI',
            createdAt: Date.now(),
            status: 'Done',
            user: CristianUser
        },
        {
            description: 'Implementing sockets',
            createdAt: Date.now(),
            status: 'ToDo',
            user: ChamaleUser
        },
    ],
    users: [
        KunjoUser,
        VictorUser,
        JaimeUser,
        MarcelaUser,
        ChamaleUser,
        CristianUser
    ],
    messages: [
        {
            text: 'This is my first message',
            createdAt: Date.now(),
            status: 'active',
            user: KunjoUser
        },
        {
            text: 'What sup guys',
            createdAt: Date.now(),
            status: 'active',
            user: VictorUser
        },
        {
            text: 'Morning team!!',
            createdAt: Date.now(),
            status: 'active',
            user: JaimeUser
        },
        {
            text: 'Hello team',
            createdAt: Date.now(),
            status: 'active',
            user: MarcelaUser
        },
        {
            text: 'Team what are you all doing?',
            createdAt: Date.now(),
            status: 'active',
            user: ChamaleUser
        },
        {
            text: 'Today we have System integrations meeting, hurry up',
            createdAt: Date.now(),
            status: 'active',
            user: CristianUser
        },
    ]
} 