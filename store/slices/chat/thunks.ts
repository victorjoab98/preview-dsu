import { api } from '../../../api';
import { Message } from '../../../interfaces';
import { AppThunk } from '../../store';
import { getChat, removeMessages } from './chatSlice';


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

export const remoteChatThunk = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await api.delete('/messages');
            dispatch( removeMessages('deleted') );
        } catch (error) {
            console.log('Error happend while trying to remove chats in frontend', error)
        }
    }
}