import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { Message } from '../../interfaces';
import { MessageModel, UserModel } from '../../models';

import { ToDoModel } from '../../models';
import { ToDo } from '../../interfaces';
import { jwt } from '../../utils/auth/';

type Data = 
| { todos: ToDo[], messages: Message[] }
| Message
| { message: string }


export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET': 
            return getTodosAndMessages( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const getTodosAndMessages = async ( req:NextApiRequest, res: NextApiResponse<Data> ) => {

    const { token = ''} = req.cookies as { token: string }

    try {
        let messages;
        let todos;

        const userId = await jwt.verifyJWT( token )

        if (!userId) {
            return res.status(400).json({ message: 'Token no valid, take a look at your cookies '})
        }
        
        await db.connectToDatabase();
        const authUser = await UserModel.findOne({ _id: userId });
        
        if (!authUser) {
            return res.status(500).json({ message: 'User not founded'})
        }

        authUser.role === 'USER_ROLE'
           ? messages = await MessageModel.find({status: 'active'}).populate('user')
           : messages = await MessageModel.find().populate('user');
        
        authUser.role === 'USER_ROLE'
           ? todos = await ToDoModel.find({ user:  authUser._id }).sort({createdAt: 'descending'}).populate('user')
           : todos = await ToDoModel.find().sort({createdAt: 'descending'}).populate('user');

        await db.disconnectDatabase();
        
        return res.status(200).json({ todos, messages });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get messages' })
    }
}


            