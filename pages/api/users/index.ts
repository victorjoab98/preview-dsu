import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models';

import { IAuth } from '../../../interfaces';
import { db } from '../../../database';
import bcrypt from 'bcryptjs';
import { validations } from '../../../utils';

type Data = 
| IAuth
| { message: string }

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all the ToDos from the database
 *     description: This endpoint returns all the ToDos from the database in an array.s
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo'
 *   post:
 *     summary: Create a new User
 *     description: Adds a new User to the database
 *     requestBody:
 *       name: Insert name of the user
 *       email: Insert the email of the user
 *       password: Insert the password of the user
 *          the rest of the fields are set by the server.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name that the created user will have.
 *                 example: Victor morales.
 *               email:
 *                 type: string
 *                 description: The email that the created user will have.
 *                 example: vExample@gmail.com.
 *               password:
 *                 type: string
 *                 description: The password that the created user will have.
 *                 example: 123456.
 *     responses:
 *       200:
 *         description: User was added to the database successfully.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *     
 */
export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'POST':
            return createUser( req, res );
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const createUser = async ( req: NextApiRequest, res:NextApiResponse<Data> ) => {
    try {
        const { name='', email='', password='' } = req.body as {email: string, password: string, name: string};
        
        
        if ( password.length < 6) {
            return res.status(400).json({
                message: 'password should be at least 6 characteres'
            })
        }
        
        if ( name.length < 2) {
            return res.status(400).json({
                message: 'Name should be at least 2 characteres'
            })
        }
        
        if ( !validations.isValidEmail( email ) ) {
            
            return res.status(400).json({
                message: 'Invalid email'
            })
        }
        
        await db.connectToDatabase();
        
        const user = await UserModel.findOne({ email})
        
        
        if ( user ) {
            await db.disconnectDatabase();
            return res.status(400).json({ message: 'That email is already in use, try another one' })
        }


        const newUser = new UserModel({
            name,
            email: email.toLowerCase(),
            password: bcrypt.hashSync( password ),
            role: 'USER_ROLE'
        });

        try {
             await newUser.save({ validateBeforeSave: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something went wrong while trying to save the user'
            })
        }

        const { _id, role } = newUser;

        return res.status(200).json({
            message: 'User saved successfully',
            ok: true,
            token: 'HEREEE the token',
            user: {
                name,
                email,
                role
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong while trying to save todos' })
    }
}

            