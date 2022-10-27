import { connectToDatabase, disconnectDatabase } from '../../../../../database/db';
import handler from '../index';
import { createMocks } from 'node-mocks-http';
import { verifyJWT, signToken } from '../../../../../utils/auth/jwt';
import { UserModel } from '../../../../../models';


jest.mock('../../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0),
}));

jest.mock('../../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn(),
    signToken: jest.fn(),
}));

jest.mock('../../../../../models')

describe('Validate-token handler', () => {

    describe('should execute checkJWT when methot is GET', () => {

        it('should return status 400 when user not founded', async () => {
            const {req,res} = createMocks({ method: 'GET', cookies: {
                token: 'invalid_token'
            }});

            (verifyJWT as jest.Mock).mockImplementationOnce(() => '12312312_id');
            
            
            (UserModel.findById as jest.Mock).mockImplementationOnce(() => ({
                lean: jest.fn().mockReturnValue(null)
            }))
            
            await handler(req,res);

            expect(res._getStatusCode()).toBe(400);  
            expect( res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'There is no user with that ID'})
            );
        });
        
        
        it('should handle catch error', async () => {
            
            const {req,res} = createMocks({ method: 'GET', cookies: {
                token: 'invalid_token'
            }});
            
            (verifyJWT as jest.Mock).mockImplementationOnce(() => {
                throw new Error();
            });
            
            await handler(req,res);
            
            expect(res._getStatusCode()).toBe(401);  
            
            expect( res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Invalid token'})
                );
            });
            
            it('should return status 200 with the correct response', async () => {
                const {req,res} = createMocks({ method: 'GET', cookies: {
                    token: 'valid_token'
                }});
        
                (verifyJWT as jest.Mock).mockImplementationOnce(() => '6359bc92c4ecd2e00c770c3a');
                
                
                (UserModel.findById as jest.Mock).mockImplementationOnce(() => ({
                    lean: jest.fn().mockReturnValue({
                        _id: "6359bc92c4ecd2e00c770c3a",
                        name: 'Kunjo Lee',
                        email: 'kunjo.lee@telusinternational.com',
                        password: '$2a$10$w/SIZQBwYCKNmNcH0wlIpeW/YA0ftTffafYQxF0x6QXmP.vUvojBO',
                        role: 'USER_ROLE',
                        google: true,
                        status: false,
                        __v: 0
                     })
                }));

                (signToken as jest.Mock).mockImplementationOnce(() => 'token_ready')
                
                await handler(req,res);
        
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
                        token: 'token_ready'
                    })
                );

            });
    });

    describe('Invalid handle messages request method', () => {
        it('Should return 400 error when the request method is not GET', async () => {
            const { req, res } = createMocks({ method: 'POST' });
            
            await handler(req,res);
            
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Invalid method'} )
            );
        })
    });
});
