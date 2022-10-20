import type { NextApiRequest, NextApiResponse } from 'next';
import { authUser } from '../../../data/users';
import { db } from '../../../database';
import { Message } from '../../../interfaces';
import { MessageModel } from '../../../models';

type Data = 
| Message[]
| Message
| { message: string }
| any


/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all the messages from the database
 *     description: Returns all the messages from the database
*     responses:
 *       200:
 *         description: All the messages were returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *   delete:
 *     summary: Delete all the messages from the database.
 *     description: Deletes all the messages from the database
 *     responses:
 *       200:
 *         description: All the messages were deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message: 
 *                  type: string
 *                  description: The message that the messages were deleted successfully.
 *                  example: Messages deleted successfully
 */
export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'GET': 
            return getMessages( res )
        case 'DELETE': 
            return deleteMessages( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const getMessages = async ( res: NextApiResponse<Data> ) => {
    try {
        let messages;

        await db.connectToDatabase();
        // this authentication is going to be with JWT in the request
        authUser.role === 'USER_ROLE'
           ? messages = await MessageModel.find({status: 'active'}).populate('user')
           : messages = await MessageModel.find().populate('user');
        
        await db.disconnectDatabase();

        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get messages' })
    }
}


const deleteMessages = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connectToDatabase();

        await MessageModel.updateMany({ status: 'deleted' } ).populate('user')

        await db.disconnectDatabase();
        
        return res.status(200).json( { message: 'Messages deleted successfully'} );


    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while trying to delete Messages' })
    }
}