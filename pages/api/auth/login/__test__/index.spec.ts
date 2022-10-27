import handleLogin from '../index';

import { createMocks } from 'node-mocks-http';
import { UserModel } from '../../../../../models';
import { compareSync } from 'bcryptjs';
import { signToken } from '../../../../../utils/auth/jwt';

jest.mock('../../../../../models');

jest.mock('bcryptjs', () => ({
    compareSync: jest.fn(),
    hashSync: jest.fn()
}));


jest.mock('../../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

jest.mock('../../../../../utils/auth/jwt', () => ({
    signToken: jest.fn()
}));



describe('API Login route', () => {

    describe('Handle Login POST method', () => {
        it('should return status 400 when user not founded', async () => {
            
            const { req, res } = createMocks({ method: 'POST', body: {
                email:'',
                password:''
            } });

            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);

            await handleLogin( req, res );

            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Email or password are incorrect.'} )
            );
        });
        
        it('should return status 400 when password is not the same than in DB', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                email:'',
                password:''
            } });
    
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                _id: "6359bc92c4ecd2e00c770c3a",
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com',
                password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                role: 'USER_ROLE',
                google: true,
                status: false,
                __v: 0
            }));

            (compareSync as jest.Mock).mockImplementationOnce(() => null);
    
            await handleLogin( req, res );
    
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Email or password are incorrect.'} )
            );
            
        })

        it('should return status 400 when user not founded', async () => {
            
            const { req, res } = createMocks({ method: 'POST', body: {
                email:'',
                password:''
            } });

            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);

            await handleLogin( req, res );

            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Email or password are incorrect.'} )
            );
        });

        it('should return status 200 with the correct login response', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                email:'',
                password:''
            } });
    
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                _id: "6359bc92c4ecd2e00c770c3a",
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com',
                password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                role: 'USER_ROLE',
                google: true,
                status: false,
                __v: 0
            }));

            (compareSync as jest.Mock).mockImplementationOnce(() => true);
            (signToken as jest.Mock).mockImplementationOnce(() => 'my_valid_token!!');
    
            await handleLogin( req, res );
    
            expect(res._getStatusCode()).toBe(200);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({
                    ok: true,
                    message: 'Successfully authenticated user.',
                    user: {
                        _id: '6359bc92c4ecd2e00c770c3a',
                        name: 'Kunjo Lee',
                        email: 'kunjo.lee@telusinternational.com',
                        role: 'USER_ROLE'
                    },
                    token: 'my_valid_token!!'
                })
            );
        });

        // Something went wrong in authentication.
        it('should handle login catch error', async () => {
            
            const { req, res } = createMocks({ method: 'POST', body: {
                email:'',
                password:''
            }});
            
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                _id: "6359bc92c4ecd2e00c770c3a",
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com',
                password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                role: 'USER_ROLE',
                google: true,
                status: false,
                __v: 0
            }));
            
            
            (compareSync as any).mockImplementationOnce( () => {
                throw new Error()
            });

            await handleLogin( req, res);
            
            expect( res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Something went wrong in authentication.'})
            );

            expect(res._getStatusCode()).toBe(500);  
        });
    });

    describe('Invalid handle messages request method', () => {
        it('Should return 400 error when the request method is not POST', async () => {
            const { req, res } = createMocks({ method: 'GET' });
            
            await handleLogin(req,res);
            
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Invalid method'} )
            );
        });
    });
});

