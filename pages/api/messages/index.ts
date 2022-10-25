import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Message } from '../../../interfaces';
import { MessageModel, UserModel } from '../../../models';
import { jwt } from '../../../utils/auth';

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
            return getMessages( req, res )
        case 'DELETE': 
            return deleteMessages( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

export const getMessages = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { token = ''} = req.cookies as { token: string }

    try {
        let messages;

        const userId = await jwt.verifyJWT( token );

        if (!userId) {
            return res.status(400).json({ message: 'Token no valid, take a look at your cookies'});
        }
        
        await db.connectToDatabase();
        
        const authUser = await UserModel.findOne({ _id: userId });
        
        if (!authUser) {
            return res.status(500).json({ message: 'User not founded'})
        }

        authUser.role === 'USER_ROLE'
        ? messages = await MessageModel.find({status: 'active'}).populate('user')
        : messages = await MessageModel.find().populate('user');
        
        await db.disconnectDatabase();

        return res.status(200).json(messages);

    } catch (error) {
        console.log('estas en catch?')
        // console.log(error);

        res.status(500).json({ message: 'something went wrong while trying to get messages' });
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