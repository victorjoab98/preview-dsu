import { createMocks } from 'node-mocks-http';
import { ToDoModel, UserModel } from '../../../../models';
import { verifyJWT } from '../../../../utils/auth/jwt';
import apiHandlerTodo from '../index';


jest.mock('../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

jest.mock('../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn()
}));

jest.mock('../../../../models');


describe('ToDo Get and Post endpoints', () => {

    describe('Test handler /api/users', () => {
        it('should return a 400 and a message when method is not valid', async () => {
            const { req, res } = createMocks({ method: 'PUT'});
            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Invalid method' });
        });
    });

    describe('Test GET /api/users', () => {

        it('should return a 500 and a message when token is not valid', async () => {
            (verifyJWT as jest.Mock).mockImplementationOnce(() => null);
            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'fake_token' } });
            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Token no valid, take a look at your cookies '});
        });

        it('should return 500 status code when user is not found', async () => {

            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'my_token' } });
            
            (verifyJWT as jest.Mock).mockImplementationOnce(() => ({ id: '123456' }));
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => null);

            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'something went wrong while trying to get todos'});
        });

        it('should return todos when user has USER role', async () => {

            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'my_token' } });
            
            (verifyJWT as jest.Mock).mockImplementationOnce(() => ({ id: '123456' }));
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                "_id": '634f1a0283a505369ee20daa',
                "name": 'Victor Morales',
                "email": 'victor@gmail.com',
                "password": '1234',
                "role": 'USER_ROLE',
                "status": true  
            }));

            (ToDoModel.find as jest.Mock).mockImplementationOnce(() => ({
                sort: jest.fn().mockImplementationOnce(() => ({
                    populate: jest.fn().mockReturnValue([{
                        "description": "Connect mongoDB with mongoose",
                        "createdAt": 1666317206938,
                        "status": "Done",
                        "user": "634f1a0283a505369ee20daa",
                      }])
                }))
            }));

            await apiHandlerTodo(req, res);
           
            expect(res._getStatusCode()).toBe(200);
            expect( ToDoModel.find ).toHaveBeenCalledWith({ user: '634f1a0283a505369ee20daa' });
            expect(res._getJSONData().length ).toBe(1);
        });

        it('should return todos when user has ADMIN role', async () => {

            const { req, res } = createMocks({ method: 'GET', cookies: { token: 'my_token' } });
            
            (verifyJWT as jest.Mock).mockImplementationOnce(() => ({ id: '123456' }));
            (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
                "_id": '634f1a0283a505369ee20daa',
                "name": 'Victor Morales',
                "email": 'victor@gmail.com',
                "password": '1234',
                "role": 'ADMIN_ROLE',
                "status": true  
            }));

            (ToDoModel.find as jest.Mock).mockImplementationOnce(() => ({
                sort: jest.fn().mockImplementationOnce(() => ({
                    populate: jest.fn().mockReturnValue([{
                        "description": "Connect mongoDB with mongoose",
                        "createdAt": 1666317206938,
                        "status": "Done",
                        "user": "634f1a0283a505369ee20daa",
                      }])
                }))
            }));

            await apiHandlerTodo(req, res);
           
            expect(res._getStatusCode()).toBe(200);
            expect( ToDoModel.find ).toHaveBeenCalled();
            expect(res._getJSONData().length ).toBe(1);
        });
    });


    describe('Test POST /api/users', () => {

        it('should return a 500 and a message when token is not valid', async () => {
            (verifyJWT as jest.Mock).mockImplementationOnce(() => null);
            const { req, res } = createMocks({ method: 'POST', cookies: { token: 'fake_token' } });
            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Token no valid, take a look at your cookies '});
        });

        it('should return the new todo', async () => {
            const { req, res } = createMocks({ 
                method: 'POST', 
                body: { description: 'Connect mongoDB with mongoose'},  
                cookies: { token: 'my_token' } 
            });
            (verifyJWT as jest.Mock).mockImplementationOnce(() => ({ id: '123456' }));

          
            (ToDoModel.populate as jest.Mock).mockImplementationOnce(() => ({
                save: jest.fn().mockImplementationOnce(() => ({
                        "description": "Connect mongoDB with mongoose",
                        "createdAt": 1666317206938,
                        "status": "ToDo",
                        "user": "123456",
                      }
                    )
                )
            }));

            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(201);
        });

        it('shoult trigger a 500 when something went wrong', async () => {
            const { req, res } = createMocks({ 
                method: 'POST', 
                body: { description: 'Connect mongoDB with mongoose'},  
                cookies: { token: 'my_token' } 
            });
            (verifyJWT as jest.Mock).mockImplementationOnce(() => ({ id: '123456' }));
            ( UserModel.findOne as jest.Mock ).mockImplementationOnce(() => { throw new Error('Something went wrong from test') });

            await apiHandlerTodo(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'something went wrong while trying to save todos' });
        });

    });

});