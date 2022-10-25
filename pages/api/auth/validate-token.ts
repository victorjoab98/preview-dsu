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
        case 'GET':
            return checkJWT(req, res);
        default:
            return res.status(400).json({ message: 'Invalid method' });
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    let userId = ''

    try {
        // get the userId data was sended in my JWT as the payload

        userId = await jwt.verifyJWT( token );


        await db.connectToDatabase();
        const user = await UserModel.findById( userId ).lean();
        await db.disconnectDatabase();

        if ( !user ) {
            return res.status(400).json({ message: 'There is no user with that ID' });
        }

        // after verify the token generates a new one
        res.status(200).json({
            ok: true,
            message: 'Successfully authenticated user.',
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: jwt.signToken(user._id, user.role)
        });

    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid token' 
        });   
    }

}