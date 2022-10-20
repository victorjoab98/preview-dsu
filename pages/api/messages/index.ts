import type { NextApiRequest, NextApiResponse } from 'next';
import { authAdmin, authUser } from '../../../data/users';
import { db } from '../../../database';
import { Message } from '../../../interfaces';
import { MessageModel } from '../../../models';

type Data = 
| Message[]
| Message
| { message: string }


export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET': 
            return getMessages( res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const getMessages = async ( res: NextApiResponse<Data> ) => {
    try {
        let messages;

        await db.connectToDatabase();
        // this authentication is going to be with JWT in the request
        authAdmin.role === 'USER_ROLE'
           ? messages = await MessageModel.find({status: 'active'}).populate('user')
           : messages = await MessageModel.find().populate('user');
        
        await db.disconnectDatabase();

        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get messages' })
    }
}


            