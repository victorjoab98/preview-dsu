import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { ToDo } from "../../../interfaces"
import { ToDoModel } from "../../../models"


type Data = 
| ToDo
| { message: string, toDo: ToDo }
| { message: string }
| any

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a ToDo
 *     description: This endpoint takes an id and deletes the ToDo with that id from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the ToDo to delete
 *     responses:
 *       200:
 *        description: This endpoint return the deleted ToDo.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDo'
 *   patch:
 *     summary: Update a ToDo
 *     description: This endpoint takes an id of a ToDo and updates it with the data provided in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the ToDo to update.
 *     requestBody:
 *       description: This endpoint will update the fields that are provided in the request body.
 *       content:
 *         application/json:
 *           schema:
*              type: object
*              properties:
*                description:
*                  type: string
*                  description: The new description of the activity to do.
*                  example: I am learning Java.
*                status:
*                  type: enum
*                  description: The new status of the ToDo.
*                  enum: [ 'ToDo' , 'In Progress' , 'Done' ]
*                  example: In Progress
 *     responses:
 *       200:
 *        description: The endpoint return the ToDo with the updated data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDo'
 */
export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'DELETE':
            return deleteTodo( req, res )
        case 'PATCH':
            return updateTodo( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

const updateTodo = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    try{
        const { id } = req.query;
        await db.connectToDatabase();

        const todo = await ToDoModel.findByIdAndUpdate( id, req.body, { new: true } ).populate('user');
        await db.disconnectDatabase();
        return res.status(200).json( todo )

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while trying to update todo' })
    }
}

const deleteTodo = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { id } = req.query;
        await db.connectToDatabase();

        const todo = await ToDoModel.findByIdAndDelete( id ).populate('user');
        await db.disconnectDatabase();
        return res.status(200).json( todo )

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while trying to delete todo' })
    }
}