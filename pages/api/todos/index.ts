import type { NextApiRequest, NextApiResponse } from 'next';
import { ToDo as TodoModel } from '../../../models';

import { ToDo } from '../../../interfaces';
import { authAdmin, authUser } from '../../../data/users';
import { db } from '../../../database';

type Data = 
| ToDo
| ToDo [] 
| { message: string }


export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET': 
            return getTodos( res )

        case 'POST':
            return createTodo( req, res );
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const getTodos = async ( res: NextApiResponse<Data> ) => {
    try {
        let todos;

        await db.connectToDatabase();

        if (authUser.role === 'USER_ROLE') {
            // console.log('you should join here before it crashes')
           todos = await TodoModel.find({ user:  authUser.id }).sort({createdAt: 'ascending'})
        } else {
            todos = await TodoModel.find().sort({createdAt: 'ascending'})
        }

        await db.disconnectDatabase();

        return res.status(200).json(todos);

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get todos' })
    }
}


 const createTodo = async ( req: NextApiRequest, res:NextApiResponse<Data> ) => {
    try {
        const { description='' } = req.body;

        await db.connectToDatabase();
        
        const todo = new TodoModel({ 
            description,  
            user: authUser.id,
            createdAt: Date.now()
        })
        
        await todo.save();

        await db.disconnectDatabase();
    
        return res.status(200).json(todo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong while trying to get todos' })
    }
    

    return res.status(201).json( { message: 'Are you working ok?'} );
}

            