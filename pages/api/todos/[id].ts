import { NextApiRequest, NextApiResponse } from "next"
import { todos } from "../../../data/todos"
import { ToDo } from "../../../interfaces"

type Data = 
| { message: string, toDo: ToDo }
| { message: string }


export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    switch( req.method ){
        case 'DELETE':
            return deleteTodo( req, res )
        default:
            return res.status(400).json({ message: 'Invalid method' })
    }
}

function deleteTodo( req: NextApiRequest, res: NextApiResponse<Data>){
    const { id } = req.query;
    const todoIndex = todos.findIndex( todo => todo.id == Number(id) );
    if( todoIndex === -1 ){
        return res.status(404).json({ message: 'Todo not found' });
    }
    const todosDeleted = todos.splice( todoIndex, 1 );
    return res.status(200).json({ message: 'ToDo deleted', toDo: todosDeleted[0] });
}