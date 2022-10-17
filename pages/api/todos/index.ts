import type { NextApiRequest, NextApiResponse } from 'next';
import { ToDo, User } from '../../../interfaces';
import { todos } from '../../../data/todos';
import { users } from '../../../data/users';

type Data = 
| ToDo
| ToDo [] 
| { message: string }

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET':
            return getTodos(res)
        case 'POST':
            return createTodo( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

function getTodos( res: NextApiResponse<Data> ){
    return res.status(200).json( todos );
}

function createTodo( req: NextApiRequest, res:NextApiResponse<Data> ){
    
    const { description = '', userId } = req.body;
    const user: User = users.find( user => user.id === userId )!;
   
    const newToDo: ToDo = {
        id: (todos[todos.length - 1].id * 2) + 1,
        description,
        createdAt: new Date(),
        status: 'ToDo',
        user
    }

    todos.push( newToDo );
    return res.status(201).json( newToDo );
}

            