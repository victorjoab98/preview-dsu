import { createMocks } from 'node-mocks-http';
import { ToDoModel } from '../../../../models';
import handlerApi from '../[id]';


jest.mock('../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

jest.mock('../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn()
}));

jest.mock('../../../../models');


describe('ToDo operation endpoints', () => {

    describe('Test handler /api/users', () => {
        it('should return a 400 and a message when method is not valid', async () => {
            const { req, res } = createMocks({ method: 'PUT'});
            await handlerApi(req, res);
            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Invalid method' });
        });
    });

    describe('Test UPDATE /api/users', () => {

        it('should return a 500 when an exception was triggered', async ()=>{
            const { req, res } = createMocks({ method: 'PATCH' });

            (ToDoModel.findByIdAndUpdate as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> { throw new Error('error') })
            }));

            await handlerApi(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Something went wrong while trying to update todo'});
        });

        it('should return a 404 when an ToDo was not found', async ()=>{
            const { req, res } = createMocks({ method: 'PATCH' });

            (ToDoModel.findByIdAndUpdate as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> null )
            }));

            await handlerApi(req, res);
            expect(res._getStatusCode()).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Todo not found'});
        });

        it('should return a 200 when an ToDo was updated', async ()=>{
            const body = {};
            const id = 54321;
            const { req, res } = createMocks({ method: 'PATCH', query:{id}, body  });

            (ToDoModel.findByIdAndUpdate as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> ({ 
                    _id: '123456', 
                    description: 'description', 
                    status: 'ToDo' }) )
            }));

            await handlerApi(req, res);
            expect( ToDoModel.findByIdAndUpdate ).toHaveBeenCalledWith(id, body, { new: true });
            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({ 
                _id: '123456', 
                description: 'description', 
                status: 'ToDo' 
            });
        });
    });


    describe('Test DELETE /api/users', () => {
        it('should return a 500 when an exception was triggered', async ()=>{
            const { req, res } = createMocks({ method: 'DELETE' });

            (ToDoModel.findByIdAndDelete as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> { throw new Error('error') })
            }));

            await handlerApi(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Something went wrong while trying to delete todo'});
        });

        it('should return a 404 when an ToDo was not found', async ()=>{
            const { req, res } = createMocks({ method: 'DELETE' });

            (ToDoModel.findByIdAndDelete as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> null )
            }));

            await handlerApi(req, res);
            expect(res._getStatusCode()).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Todo not found'});
        });

        it('should return a 200 when an ToDo was updated', async ()=>{
            const { req, res } = createMocks({ method: 'DELETE', query: {id: 5321}} );

            (ToDoModel.findByIdAndDelete as any).mockImplementationOnce(() => ({
                populate: jest.fn().mockImplementationOnce( ()=> ({ 
                    _id: '123456', 
                    description: 'description', 
                    status: 'ToDo' }) )
            }));

            await handlerApi(req, res);
            expect( ToDoModel.findByIdAndDelete ).toHaveBeenCalledWith(5321);
            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({ 
                _id: '123456', 
                description: 'description', 
                status: 'ToDo' 
            });
        });
    });
});