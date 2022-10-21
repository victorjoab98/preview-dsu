import { createMocks } from 'node-mocks-http';
import { ToDoModel, UserModel } from '../../../../models';
import todosHandler from '../../../../pages/api/todos/index';

const mockingoose = require('mockingoose');

describe('/api/todo API Endpoint' , () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    test('should return the expected array of todos with a 200 status code.', async () => {

        mockingoose(ToDoModel).toReturn(
          [{
            "description": "Connect mongoDB with mongoose",
            "createdAt": 1666317206938,
            "status": "Done",
            "user": "634f1a0283a505369ee20daa",
          },
          {
            "description": "Learn Next.js",
            "createdAt": 1666317206938,
            "status": "ToDo",
            "user": "634f1a0283a505369ee20daa"
          }], 'find');

        const { req, res } = createMocks({ method: 'GET' });
        await todosHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData()).length).toBe(2);
        expect(JSON.parse(res._getData())[0].description ).toBe('Connect mongoDB with mongoose');
        expect(JSON.parse(res._getData())[1].description ).toBe('Learn Next.js');

    });

     
    test('should return a new todo with status ', async () => {

        mockingoose(UserModel).toReturn([{
            "_id": '634f1a0283a505369ee20daa',
            "name": 'Jaime Tuyuc',
            "email": 'jaime@gmail.com',
            "password": '1234',
            "role": 'USER_ROLE',
            "status": true  
        }], 'find' );

        const { req, res } = createMocks({ 
            method: 'POST', 
            body: { description: 'I have to implement redis.' } 
        });
        await todosHandler(req, res);

        expect(res._getStatusCode()).toBe(201);
        expect(JSON.parse(res._getData()).description ).toBe('I have to implement redis.');
        expect(JSON.parse(res._getData()).status ).toBe('ToDo');
        expect(JSON.parse(res._getData()).user.name).toBe('Jaime Tuyuc');
    });

    
    test('should return a 400 if HTTP method is invalid', async ()=>{
        const {req, res} = createMocks({
            method: 'UPDATE',
        });
        await todosHandler(req, res);
        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual(
            {
                "message": "Invalid method"
            }
        );
    })
})