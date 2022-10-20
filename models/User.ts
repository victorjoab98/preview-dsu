import mongoose, { Model, Schema } from 'mongoose';

import { User } from '../interfaces';

export interface IUser extends User { }

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user to register in the database.
 *           example: Victor Morales.
 *         email:
 *           type: string
 *           description: The email of the user to register in the database.
 *           example: victormorales@example.com
 *         password:
 *           type: string
 *           description: Encrypted password of the user to access the todo-chat-app.
 *           example: 5f9f1c9b9c9c9c9c9c9c9c9c
 *         role:
 *           type: enum
 *           enum: [ 'ADMIN_ROLE','USER_ROLE' ]
 *           description: Role define the permissions and privileges of the user.
 *                        Role can be ADMIN_ROLE or USER_ROLE. ROLE_ADMIN can create and update any todo. 
 *                        Also ADMIN_ROLE can delete all todos. ROLE_USER can only see, create, update and delete his own todos.   
 *           example: ADMIN_ROLE
 *         status:
 *           type: boolean
 *           description: The status of the user.
 *           example: true   
 */
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    }
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;