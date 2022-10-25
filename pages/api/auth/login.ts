import { NextApiRequest, NextApiResponse } from 'next';
import { IAuth } from '../../../interfaces';
import { UserModel } from '../../../models';
import { jwt } from '../../../utils/auth';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';

type Data =
 | { message: string}
 | IAuth

export default function handler ( req: NextApiRequest, res: NextApiResponse ) {
    switch (req.method) {
        case 'POST':
            return login(req, res);
        default:
            return res.status(400).json({ message: 'Invalid method' });
    }
}

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body;

    try {

        await db.connectToDatabase();
    
        let user = await UserModel.findOne({ email });
        
        await db.disconnectDatabase();

        if (!user){
            return res.status(400).json({
                message: 'Email or password are incorrect.'
            })
        }

        if( !bcrypt.compareSync( password, user.password! ) ){
            return res.status(400).json({
                message: 'Email or password are incorrect.'
            })
        }


        const token = jwt.signToken(user._id, user.role);

        res.status(200).json({
            ok: true,
            message: 'Successfully authenticated user.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log('Something went wrong in authentication using email and password.', error);
        res.status(500).json({ message: 'Something went wrong in authentication.' });   
    }

}