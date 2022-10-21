import type { NextApiRequest, NextApiResponse } from 'next';
import { ToDoModel } from '../../../models';

import { ToDo } from '../../../interfaces';
import { authUser } from '../../../data/users';
import { db } from '../../../database';

type Data = 
| ToDo
| ToDo [] 
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
 *     summary: Create a new ToDo
 *     description: Adds a new ToDo to the database
 *     requestBody:
 *       description: This endpoint only requires the description of the ToDo, 
 *                    the rest of the fields are set by the server.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the activity to do.
 *                 example: I have to do the laundry.
 *     responses:
 *       200:
 *         description: Message was added to the database successfully.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/ToDo'
 *     
 */
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

        authUser.role === 'USER_ROLE'
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
            user: authUser._id,
            createdAt: Date.now()
        })        

        await todo.populate('user');

        await todo.save();

        await db.disconnectDatabase();
    
        return res.status(201).json(todo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong while trying to save todos' })
    }
}

            