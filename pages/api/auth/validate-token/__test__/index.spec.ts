import { connectToDatabase, disconnectDatabase } from '../../../../../database/db';
import handler from '../index';


jest.mock('../../../../../database/db', () => ({
    connectToDatabase: jest.fn(() => 1),
    disconnectDatabase: jest.fn(() => 0),
}));


it('test', () => {
    expect(1).toBe(1)
})
