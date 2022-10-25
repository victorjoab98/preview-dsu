import { getMessages } from '../index';
import { createMocks } from 'node-mocks-http';
import { UserModel, MessageModel } from '../../../../models';
import { connectToDatabase, disconnectDatabase } from '../../../../database/db';

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
    describe('getMessages', () => {

        it('should return 400 error when invalid token', async () => {
            // (verifyJWT as  any ).mockImplementationOnce(() => 'invalid')
            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'my_fake_token' } });

            await getMessages(req,res);

            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'Token no valid, take a look at your cookies'})
            );
            
        });



        it('Shold return 500 status when user not founded ', async () => {

            // verifyJWT siempre retorna 123456
            (verifyJWT as any).mockImplementationOnce( () => '123456' );

            // findOne en esta prueba siempre retorna null;
            (UserModel.findOne as any).mockImplementationOnce(() => null);
            
            const { req, res } = createMocks({ method: 'GET' });
            
            await getMessages( req, res)
            
            expect(res._getStatusCode()).toBe(500);
            
            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'User not founded'})
                );
            })
            
            it('should return User messages with the USER_ROLE', async () => {
                (verifyJWT as any).mockImplementationOnce( () => '123456' );
                
                (UserModel.findOne as any).mockImplementationOnce(() => ({
                    _id: "63584c723c2d5fc7dce97ea2",
                    name: "Test 1",
                    email: "test@gmail.com",
                    password: "$2a$10$zPauG59AXkKLza04oYeBHu7K0Q/IMcgYJdge8Kph4TOKr5jOZ.Lj.",
                    role: "USER_ROLE",
                    google: true,
                    status: true,
                    __v: 0
                }));
                
                (MessageModel.find as any).mockImplementationOnce(() => ({
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
            
            it('should handle error', async () => {
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
    });