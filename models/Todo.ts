import mongoose, { Model, Schema } from 'mongoose';
import { ToDo } from '../interfaces';

export interface IToDo extends ToDo {
    
}

const todoSchema = new Schema({
    description: { 
        type: String, 
        required: [true, 'Description is required']
    },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['ToDo' , 'In Progress' , 'Done'],
            message: '{VALUE} is not allowed.'
        },
        default: 'ToDo',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const ToDoModel: Model<IToDo> = mongoose.models.ToDo || mongoose.model('ToDo', todoSchema );

export default ToDoModel;