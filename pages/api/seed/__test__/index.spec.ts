import { UserModel, MessageModel, ToDoModel } from '../../../../models';
import handlerSeed from '../index';
import { createMocks } from 'node-mocks-http';

jest.mock('../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0)
}));

describe('Seed API Route', () => {
    
    it('should return 401 error when call this route in production', async () => {
        process.env = Object.assign(process.env, {
            NODE_ENV: 'production',
        });
        const { req, res} = createMocks({ method: 'GET' })
        await handlerSeed(req,res)

        expect(res._getStatusCode()).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'This route is not allowed in production' });
    });

    it('should return 500 status code when something was wrong.', async () => {
        process.env = Object.assign(process.env, {
            NODE_ENV: 'development',
        });

        const { req, res } = createMocks({ method: 'GET' });
        (UserModel.deleteMany as jest.Mock) = jest.fn(() => { throw new Error('Something was wrong from tests') });
        await handlerSeed(req, res);
        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Something went wront, contact your admin' });
    });

    it('should return 200 and a message when call this route in development', async () => {
        process.env = Object.assign(process.env, {
            NODE_ENV: 'development',
        });

        (UserModel.deleteMany as jest.Mock) = jest.fn(() => Promise.resolve(1));
        (MessageModel.deleteMany as jest.Mock) = jest.fn(() => Promise.resolve(1));
        (ToDoModel.deleteMany as jest.Mock) = jest.fn(() => Promise.resolve(1));

        (UserModel.insertMany as jest.Mock) = jest.fn(() => Promise.resolve(1));
        (MessageModel.insertMany as jest.Mock) = jest.fn(() => Promise.resolve(1));
        (ToDoModel.insertMany as jest.Mock) = jest.fn(() => Promise.resolve(1));


        const { req, res} = createMocks({ method: 'GET' })
        await handlerSeed(req,res)

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Seeders were inserted successfuly.' });
    });
});


