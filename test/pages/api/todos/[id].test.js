import { createMocks } from 'node-mocks-http';
import { ToDoModel } from '../../../../models';
import todosHandler from '../../../../pages/api/todos/[id]';

const mockingoose = require('mockingoose');

describe('/api/todo API Endpoint' , () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    test('should return the deleted todo with a 200 status code.', async () => {
        
        const { req, res } = createMocks({ method: 'DELETE', query: { id: '5f9f1a0283a505369ee20daa' } });
        mockingoose(ToDoModel).toReturn(
            {
                "description": "Connect mongoDB with mongoose",
                "createdAt": 1666317206938,
                "status": "Done",
                "user": "634f1a0283a505369ee20daa",
            }, 'findOneAndDelete');

        await todosHandler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData()).description ).toBe('Connect mongoDB with mongoose');
    });



    test('should return the updated todo with a 200 status code.', async () => {
        
        const { req, res } = createMocks({ 
            method: 'PATCH', 
            query: { id: '5f9f1a0283a505369ee20daa' },
            body: { description:'Mongoose is connected with mongodb.', status: 'Done' }
        });

        mockingoose(ToDoModel).toReturn(
            {
                '_id': '5f9f1a0283a505369ee20daa',
                "description": "Mongoose is connected with mongodb.",
                "createdAt": 1666317206938,
                "status": "Done",
                "user": "634f1a0283a505369ee20daa",
            }, 'findOneAndUpdate');

        await todosHandler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData()).description ).toBe('Mongoose is connected with mongodb.');
        expect(JSON.parse(res._getData()).status ).toBe('Done');
    });


});