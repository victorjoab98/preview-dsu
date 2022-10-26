import { createMocks } from 'node-mocks-http';

import handlerGeneral, { getTodosAndMessages } from '../index';

import { verifyJWT } from '../../../../utils/auth/jwt';
import { MessageModel, UserModel, ToDoModel } from '../../../../models';
import { findNonSerializableValue } from '@reduxjs/toolkit';

jest.mock('../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn()
}))

jest.mock('../../../../models')

describe('General controllers', () => {
    describe('getTodosAndMessages', () => {

        // (verifyJWT as jest.Mock).mockImplementationOnce(() => '');

        it('Should return 404 when invalid token', async () => {

            (verifyJWT as jest.Mock).mockImplementationOnce(() => null);
            
            const { req, res} = createMocks({ method: 'GET', cookies: { token: 'invalid_token' }});
            
            await getTodosAndMessages( req, res );
            
        });
        
        it('Should return Error 500 when user not founded', async () => {
            (verifyJWT as jest.Mock).mockImplementationOnce(() => '123456');

            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);

            const { req, res} = createMocks({ method: 'GET' });

            await getTodosAndMessages(req, res);

            expect(res._getStatusCode()).toBe(500);

            expect(res._getJSONData()).toEqual(
                expect.objectContaining({ message: 'User not founded'})
            );
        });

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
            
            (ToDoModel.find as jest.Mock).mockImplementationOnce(() => ({
                sort: jest.fn().mockReturnValue(() => ({
                    populate: jest.fn().mockReturnValue(() => [{
                        _id: "63595c643605a8e9300d53a6",
                        description: "hey",
                        createdAt: 1666800740592,
                        status: "ToDo",
                        user: {
                            _id: "635954c3dac760807ae92273",
                            email: "ku@gmail.com",
                            google: false,
                            __v: 0
                        },
                        __v: 0                        
                    }])
                })),
            }));

        const { req, res } = createMocks({ method: 'GET' });
        
        await getTodosAndMessages( req, res);

        // expect( res._getJSONData() ).toEqual([
        //     {
        //         _id: "63584cc03c2d5fc7dce97ebb",
        //         text: "myUser test",
        //         createdAt: 1666731200365,
        //         status: "active",
        //         user: {
        //             _id: "63584caa3c2d5fc7dce97ead",
        //             email: "out@gmail.com",
        //             google: false,
        //             __v: 0
        //         },
        //         __v: 0
        //     },
        // ]);
            
        // expect(res._getStatusCode()).toBe(200);

        });

    })
})