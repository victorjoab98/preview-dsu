import { createMocks } from 'node-mocks-http';

import handlerGeneral, { getTodosAndMessages } from '../index';

import { verifyJWT } from '../../../../utils/auth/jwt';

jest.mock('../../../../utils/auth/jwt', () => ({
    verifyJWT: jest.fn()
}))

describe('General controllers', () => {
    describe('getTodosAndMessages', () => {

        // (verifyJWT as jest.Mock).mockImplementationOnce(() => '');

        it('Should return 404 when invalid token', async () => {

            (verifyJWT as jest.Mock).mockImplementationOnce(() => null);
            
            const { req, res} = createMocks({ method: 'GET', cookies: { token: 'invalid_token' }});

            await getTodosAndMessages( req, res );

        });


    })
})