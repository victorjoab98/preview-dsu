import mongoose, { Model, Schema } from 'mongoose';
import { Message } from '../interfaces';

export interface IMessage extends Message {}

const messageSchema = new Schema({
    text: { 
        type: String,
        required: [true, 'Text is required'] 
    },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['active', 'deleted'],
            message: '{VALUE} is not allowed.'
        },
        default: 'active',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const MessageModel: Model<IMessage> = mongoose.models.Message || mongoose.model('Message', messageSchema );

export default MessageModel;