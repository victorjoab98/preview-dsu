import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { ToDo } from "../../../interfaces"
import { ToDoModel } from "../../../models"


type Data = 
| ToDo
| { message: string, toDo: ToDo }
| { message: string }
| any


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

        const todo = await ToDoModel.findByIdAndDelete( id );
        await db.disconnectDatabase();
        return res.status(200).json( todo )

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while trying to delete todo' })
    }
}