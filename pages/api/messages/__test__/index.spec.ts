import messagesHandler, { getMessages, deleteMessages } from '../index';
import { createMocks } from 'node-mocks-http';
import { UserModel, MessageModel } from '../../../../models';
// import { connectToDatabase, disconnectDatabase } from '../../../../database/db';

import { verifyJWT } from '../../../../utils/auth/jwt';

// mock jsonwebtoken library | verifyJWT which is my dependency

// Estoy recreando todas los metodos de esta libreria.

jest.mock('../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

jest.mock('../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn()
}));

jest.mock('../../../../models');


// Spy solo aplica propiedades a lo que ya existe, y las espia, para ver si fueron llamadas, etc.

// Los mocks alteran todo el comportamiento, y yo decido la nueva funcionalidad, como crear de nuevo mi user model

describe('messages controllers', () => {

    describe('Handler Messages', () => {
        it ('Shoud call getMessages when req.method is GET', () => {
            const { req,res } = createMocks({ method: 'GET' });
            

            messagesHandler( req, res );

        });

        it ('Shoud call getMessages when req.method is GET', () => {
            const { req,res } = createMocks({ method: 'DELETE' });
            

            messagesHandler( req, res );

        });
    });

    describe('getMessages', () => {

        it('should return 400 error when invalid token', async () => {
            // (verifyJWT as  any ).mockImplementationOnce(() => 'invalid')
            (verifyJWT as jest.Mock).mockImplementationOnce(() => null);
            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'my_fake_token' } });

            await getMessages(req,res);

            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Token no valid, take a look at your cookies'})
            );
            
        });

        it('Shold return 500 status when user not founded ', async () => {

            // verifyJWT siempre retorna 123456
            (verifyJWT as jest.Mock).mockImplementationOnce( () => '123456' );

            // findOne en esta prueba siempre retorna null;
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);
            
            const { req, res } = createMocks({ method: 'GET' });
            
            await getMessages( req, res)
            
            expect(res._getStatusCode()).toBe(500);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'User not founded'})
            );
        })
        
    it('should return User messages with the USER_ROLE', async () => {
        (verifyJWT as jest.Mock).mockImplementationOnce( () => '123456' );
        
        (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
            _id: "63584c723c2d5fc7dce97ea2",
            name: "Test 1",
            email: "test@gmail.com",
            password: "$2a$10$zPauG59AXkKLza04oYeBHu7K0Q/IMcgYJdge8Kph4TOKr5jOZ.Lj.",
            role: "USER_ROLE",
            google: true,
            status: true,
            __v: 0
        }));
            
        (MessageModel.find as jest.Mock).mockImplementationOnce(() => ({
            populate: jest.fn().mockReturnValue([
                {
                    _id: "63584cc03c2d5fc7dce97ebb",
                    text: "myUser test",
                    createdAt: 1666731200365,
                    status: "active",
                    user: {
                        _id: "63584caa3c2d5fc7dce97ead",
                        email: "out@gmail.com",
                        google: false,
                        __v: 0
                    },
                    __v: 0
                },
            ])
        }));
            
        const { req, res } = createMocks({ method: 'GET' });
        
        await getMessages( req, res);
        
        expect( res._getJSONData() ).toEqual([
            {
                _id: "63584cc03c2d5fc7dce97ebb",
                text: "myUser test",
                createdAt: 1666731200365,
                status: "active",
                user: {
                    _id: "63584caa3c2d5fc7dce97ead",
                    email: "out@gmail.com",
                    google: false,
                    __v: 0
                },
                __v: 0
            },
        ]);
            
        expect(res._getStatusCode()).toBe(200);

        });        
        
    it('should return User messages with the ADMIN_ROLE', async () => {
        (verifyJWT as jest.Mock).mockImplementationOnce( () => '123456' );
        
        (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
            _id: "63584c723c2d5fc7dce97ea2",
            name: "Test 1",
            email: "test@gmail.com",
            password: "$2a$10$zPauG59AXkKLza04oYeBHu7K0Q/IMcgYJdge8Kph4TOKr5jOZ.Lj.",
            role: "ADMIN_ROLE",
            google: true,
            status: true,
            __v: 0
        }));
            
        (MessageModel.find as jest.Mock).mockImplementationOnce(() => ({
            populate: jest.fn().mockReturnValue([
                {
                    _id: "63584cc03c2d5fc7dce97ebb",
                    text: "myUser test",
                    createdAt: 1666731200365,
                    status: "active",
                    user: {
                        _id: "63584caa3c2d5fc7dce97ead",
                        email: "out@gmail.com",
                        google: false,
                        __v: 0
                    },
                    __v: 0
                },
            ])
        }));
            
        const { req, res } = createMocks({ method: 'GET' });
        
        await getMessages( req, res);
        
        expect( res._getJSONData() ).toEqual([
            {
                _id: "63584cc03c2d5fc7dce97ebb",
                text: "myUser test",
                createdAt: 1666731200365,
                status: "active",
                user: {
                    _id: "63584caa3c2d5fc7dce97ead",
                    email: "out@gmail.com",
                    google: false,
                    __v: 0
                },
                __v: 0
            },
        ]);
            
        expect(res._getStatusCode()).toBe(200);

        });        
        
        it('should handle getMessages error', async () => {
            (verifyJWT as any).mockImplementationOnce( () => {
                throw new Error()
            });
            const { req, res } = createMocks({ method: 'GET' });
            
            await getMessages( req, res);
            
            expect( res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'something went wrong while trying to get messages'})
            );

            expect(res._getStatusCode()).toBe(500);  
        })
    });

    describe('Delete messages', () => {
        it('Should update messages status from active to deleted', async () => {
            (MessageModel.updateMany as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockReturnValue('fake data deleted')
            }));
            
            const { req,res } = createMocks({ method: 'DELETE' });

            await deleteMessages(req,res);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Messages deleted successfully'})
            );        
        });

        it('Should handle deleteMessages error', async () => {
            (MessageModel.updateMany as any).mockImplementationOnce(() => {
                throw new Error()
            });

            const { req, res } = createMocks({ method: 'DELETE' });
            await deleteMessages( req, res );

            expect(res._getJSONData()).toEqual((
                expect.objectContaining({ message: 'Something went wrong while trying to delete Messages'})
            ));
        });
    });

    describe('Invalid handle google request method', () => {
        it('Should return 400 error when the request method is not POST', async () => {
            const { req, res } = createMocks({ method: 'POST' });
            
            await messagesHandler(req,res);
            
            expect(res._getStatusCode()).toBe(400);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining( { message: 'Invalid method'} )
            );
        })
    });
});