import { UserModel, MessageModel, ToDoModel } from '../../../../models';
import handlerSeed from '../index';
import { createMocks } from 'node-mocks-http';


describe('Seed API Route', () => {
    it('should return 401 error when call this route in production', () => {
        process.env.NODE_ENV === 'production';

        const { req, res} = createMocks({ method: 'GET' })
        handlerSeed(req,res)
    })
});


