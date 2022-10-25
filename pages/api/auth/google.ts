import { NextApiRequest, NextApiResponse } from 'next';
import { IAuth } from '../../../interfaces';
import { UserModel } from '../../../models';
import { googleVerify, jwt } from '../../../utils/auth';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';

type Data =
 | { message: string}
 | IAuth

export default function handler ( req: NextApiRequest, res: NextApiResponse ) {
    switch (req.method) {
        case 'POST':
            return googleSignIn(req, res);
    
        default:
            return res.status(400).json({ message: 'Invalid method' });
    }
}

const googleSignIn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { google_token = ''} = req.body;

    try {
        const { name, email } = await googleVerify( google_token );

        await db.connectToDatabase();
    
        let user = await UserModel.findOne({ email });
        
        if (!user) {
            // This means if the user doesn't exist already in my DB i'm going to create a new user 
            const data = {
                name,
                email,
                google: true,
                password: bcrypt.hashSync('nothing here:P'),
                role: 'USER_ROLE',
            }
                
            user = new UserModel(data);
            await user.save();
        };

        await db.disconnectDatabase();

        if (!user.status){
            // if the user is disabled (status: false)
            return res.status(400).json({
                message: 'User disabled. Contact your admin'
            })
        }

        // TODO: generate jwt token
        const token = jwt.signToken(user._id, user.role);

        res.status(200).json({
            ok: true,
            message: 'successfully authenticated with google',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log('Something went wrong in google authentication', error);
        res.status(400).json({ message: 'Invalid google token' });   
    }

}