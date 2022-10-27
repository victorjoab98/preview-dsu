import handleGoogle from '../index';
import { createMocks } from 'node-mocks-http';
import { googleVerify } from '../../../../../utils/auth/google-verify';
import { UserModel } from '../../../../../models';
import { connectToDatabase, disconnectDatabase } from '../../../../../database/db';
import { signToken } from '../../../../../utils/auth/jwt';

jest.mock('../../../../../utils/auth/google-verify', () => ({
    googleVerify: jest.fn()
}));

jest.mock('../../../../../utils/auth/jwt', () => ({
    signToken: jest.fn()
}));

jest.mock('../../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));


jest.mock('../../../../../models')

describe('Auth Google API Route', () =>{
    describe('Handle Google function POST method', () => {

        it('Should return a response with its token when user is not founded in DB', async () => {
    
            const { req, res } = createMocks({ method: 'POST', body: {
                google_token: 'valid_token'
            } });
    
    
            (googleVerify as jest.Mock).mockImplementation(() => ({
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com'
            }));
    
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);
            (UserModel.create as jest.Mock).mockImplementationOnce(() => ({
                _id: "6359bc92c4ecd2e00c770c3a",
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com',
                password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                role: 'USER_ROLE',
                google: true,
                status: true,
                __v: 0
              }));
    
            (signToken as jest.Mock).mockImplementationOnce(() => 'my sign token value');
            
            
            await handleGoogle(req,res);
    
            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({
                    ok: true,
                    message: 'successfully authenticated with google',
                    user: {
                        _id: '6359bc92c4ecd2e00c770c3a',
                        name: 'Kunjo Lee',
                        email: 'kunjo.lee@telusinternational.com',
                        role: 'USER_ROLE'
                    },
                    token: 'my sign token value'
                })
            );
            
        });
    
        it('Should return a response with its token when user is founded in DB', async () => {
    
            const { req, res } = createMocks({ method: 'POST', body: {
                google_token: 'valid_token'
            } });
    
            (googleVerify as jest.Mock).mockImplementation(() => ({
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com'
            }));
    
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                _id: "6359bc92c4ecd2e00c770c3a",
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com',
                password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                role: 'USER_ROLE',
                google: true,
                status: true,
                __v: 0
            }));
    
            (signToken as jest.Mock).mockImplementationOnce(() => 'my sign token value');
            
            
            await handleGoogle(req,res);
    
            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({
                    ok: true,
                    message: 'successfully authenticated with google',
                    user: {
                        _id: '6359bc92c4ecd2e00c770c3a',
                        name: 'Kunjo Lee',
                        email: 'kunjo.lee@telusinternational.com',
                        role: 'USER_ROLE'
                    },
                    token: 'my sign token value'
                })
            );
        });
      
        it('should return 400 when user status is falsy', async () => {
    
            const { req, res } = createMocks({ method: 'POST', body: {
                google_token: 'valid_token'
            } });
    
    
            (googleVerify as jest.Mock).mockImplementation(() => ({
                name: 'Kunjo Lee',
                email: 'kunjo.lee@telusinternational.com'
            }));
    
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
    
            (signToken as jest.Mock).mockImplementationOnce(() => 'my sign token value');
    
            await handleGoogle(req,res);
    
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'User disabled. Contact your admin'} )
            );
        });
        
        it('should return 400 error invalid token', async () => {
            
            const { req, res } = createMocks({ method: 'POST', body: {
                google_token: null
            }});
        
            
            await handleGoogle(req,res);
    
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Invalid google token'} )
            );
            
        });  

        it('should handle google catch error', async () => {
            (googleVerify as any).mockImplementationOnce( () => {
                throw new Error()
            });
            const { req, res } = createMocks({ method: 'POST' });
            
            await handleGoogle( req, res);
            
            expect( res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Invalid google token'})
            );

            expect(res._getStatusCode()).toBe(400);  
        });
    });    
    
    describe('Invalid handle messages request method', () => {
        it('Should return 400 error when the request method is not GET or DELETE', async () => {
            const { req, res } = createMocks({ method: 'GET' });
            
            await handleGoogle(req,res);
            
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Invalid method'} )
            );
        })
    });
});