import { createMocks } from 'node-mocks-http';
import { UserModel } from '../../../../models';
import { signToken } from '../../../../utils/auth/jwt';
import handlerUser from '../index';

jest.mock('../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

jest.mock('../../../../models');

jest.mock('../../../../utils/auth/jwt', () => ({
    signToken: jest.fn()
}));

describe('User operation endpoints', () => {

    describe('Test handler /api/users', () => {
        it('should return a 400 and a message when method is not valid', async () => {
            const { req, res } = createMocks({ method: 'PUT'});
            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Invalid method' });
        });
    });

    describe('Post /api/users', () => {

        it('should return a 400 and a message when password is less than 6 characters', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'Victor',
                        email: 'victor@email.com',
                        password: '12345'
            }});
            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData().message).toBe('password should be at least 6 characteres'); 
        });

        it('should return a 400 and a message when name is less than 2 characters', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'V',
                        email: 'victor@email.com',
                        password: '123456'
            }});
            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData().message).toBe('Name should be at least 2 characteres'); 
        });

        it('should return a 400 and a message when email is invalid', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'victor',
                        email: 'victor_emailcom',
                        password: '123456'
            }});
            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData().message).toBe('Invalid email'); 
        });

        it('should return a 400 and a message when email already exists', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'Victor',
                        email: 'victor@email.com',
                        password: '123456'
            }});

            ( UserModel.findOne as jest.Mock ).mockImplementationOnce(() => ({
                _id: "63584c723c2d5fc7dce97ea2",
                name: "Victor Chamale",
                email: "victor@email.com",
            }));
            
            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData().message).toBe('That email is already in use, try another one');
        });

        it('should return a 200 and match with respose when user is created', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'Victor',
                        email: 'victor@email.com',
                        password: '123456'
            }});

            ( signToken as jest.Mock ).mockImplementationOnce(() => 'fake_token');
            ( UserModel.create as jest.Mock ).mockImplementationOnce(() => ({
                message: 'User saved successfully',
                ok: true,
                user: {
                    name: 'Victor',
                    email : 'victor@email.com',
                },
                token: 'fake_token',
            }));
            await handlerUser(req, res);

            expect(res._getStatusCode()).toBe(200);            
            expect(res._getJSONData()).toEqual({
                message: 'User saved successfully',
                ok: true,
                user: {
                    name: 'Victor',
                    email : 'victor@email.com',
                },
                token: 'fake_token',
            });
        });

        it('should throw an exeption when try to save user', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'Victor',
                        email: 'victor@email.com',
                        password: '123456'
            }});

            ( UserModel.create as jest.Mock ).mockImplementationOnce(() => {
                throw new Error('Error');
            });

            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData().message).toBe('Something went wrong while trying to save the user');
        });

        it('should throw an exeption when something goes wrong', async () => {
            const { req, res } = createMocks({ method: 'POST', body: {
                        name: 'Victor',
                        email: 'victor@email.com',
                        password: '123456'
            }});

            ( UserModel.findOne as jest.Mock ).mockImplementationOnce(() => {
                throw new Error('Error');
            });

            await handlerUser(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData().message).toBe('Something went wrong while trying to save the user');
        });
    });

});