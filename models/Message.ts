import mongoose, { Model, Schema } from 'mongoose';
import { Message } from '../interfaces';

export interface IMessage extends Message {}

const messageSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Number }
});


const MessageModel: Model<IMessage> = mongoose.models.Message || mongoose.model('Message', messageSchema );

export default MessageModel;