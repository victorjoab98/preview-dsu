import type { NextApiRequest, NextApiResponse } from 'next';
import { ToDoModel } from '../../../models';

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

        authAdmin.role === 'USER_ROLE'
           ? todos = await ToDoModel.find({ user:  authUser._id }).sort({createdAt: 'descending'}).populate('user')
           : todos = await ToDoModel.find().sort({createdAt: 'descending'}).populate('user');
        
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
        
        const todo = new ToDoModel({ 
            description,  
            user: authAdmin._id,
            createdAt: Date.now()
        })        

        await todo.populate('user');

        await todo.save();

        await db.disconnectDatabase();
    
        return res.status(200).json(todo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong while trying to save todos' })
    }
}

            