import { api } from '../../../api';
import { Message } from '../../../interfaces';
import { AppThunk } from '../../store';
import { getChat } from './chatSlice';


export const getChatThunk = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data } = await api.get<Message[]>('/messages');
            dispatch( getChat(data) );
        } catch (error) {
            console.log('Error happend while trying to getMessages in frontend', error)
        }
    }
}

