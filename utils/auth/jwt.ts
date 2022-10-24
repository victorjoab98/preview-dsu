import jwt from 'jsonwebtoken';

export const signToken = (_id: string, role: string )=>{
    if( !process.env.JWT_SECRET_KEY ){
        throw new Error('Environment variables: JWT_SECRET_KEY is not defined');
    }
    return jwt.sign({ _id, role }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}