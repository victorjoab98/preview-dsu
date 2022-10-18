import mongoose, { Model, Schema } from 'mongoose';

import { User } from '../interfaces';

export interface IUser extends User { }

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