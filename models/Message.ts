import mongoose, { Model, Schema } from 'mongoose';
import { Message } from '../interfaces';

export interface IMessage extends Message {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The text of the message.
 *           example: Hi Team! How are you?
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: number
 *           description: The date when the message was inserted in the database.
 *           example: 1600000000000
 *         status:
 *           type: enum
 *           enum: [ 'active', 'deleted' ]    
 *           example: active
 */
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