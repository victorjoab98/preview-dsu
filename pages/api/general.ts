import type { NextApiRequest, NextApiResponse } from 'next';
import { authAdmin, authUser } from '../../data/users';
import { db } from '../../database';
import { Message } from '../../interfaces';
import { MessageModel } from '../../models';

import { ToDoModel } from '../../models';
import { ToDo } from '../../interfaces';

type Data = 
| { todos: ToDo[], messages: Message[] }
| Message
| { message: string }


export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET': 
            return getTodosAndMessages( res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const getTodosAndMessages = async ( res: NextApiResponse<Data> ) => {
    try {
        let messages;
        let todos;

        await db.connectToDatabase();

        authAdmin.role === 'USER_ROLE'
           ? messages = await MessageModel.find({status: 'active'}).populate('user')
           : messages = await MessageModel.find().populate('user');
        
        authAdmin.role === 'USER_ROLE'
           ? todos = await ToDoModel.find({ user:  authUser._id }).sort({createdAt: 'descending'}).populate('user')
           : todos = await ToDoModel.find().sort({createdAt: 'descending'}).populate('user');

        await db.disconnectDatabase();

        return res.status(200).json({ todos, messages });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get messages' })
    }
}


            