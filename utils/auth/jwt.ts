import jwt from 'jsonwebtoken';

export const signToken = (_id: string, role: string )=>{
    if( !process.env.JWT_SECRET_KEY ){
        throw new Error('Environment variables: JWT_SECRET_KEY is not defined');
    }
    return jwt.sign({ _id, role }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}

export const verifyJWT = ( token: string ): Promise<string> => {
    if( !process.env.JWT_SECRET_KEY ){
        throw new Error('Environment variables: JWT_SECRET_KEY is not defined');
    }

    return new Promise( (resolve, reject) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_KEY || '', (err, payload) => {

            // the paylaod is my token data (what I sign while creating my JWT)
              if ( err ) return reject('Invalid JWT');

              const { _id } = payload as { _id: string };

              resolve(_id);

            })
        } catch (error) {
            
        }
        
    });
}