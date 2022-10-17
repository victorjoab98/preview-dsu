import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, ReduxMessage, User } from '../../../interfaces';


interface InitialState {
    messages: ReduxMessage[];
}


const initialState: InitialState = {
    messages: [
        {
            createdAt: 1665714566735,
            id: 5,
            text: 'que tal todos',
            user: {
                id: 2,
                email: 'v@gmail.com',
                name: 'Victor morales'
            }
        },
        {
            createdAt: 1665714566735,
            id: 8,
            text: 'Morning team!!!',
            user: {
                id: 3,
                email: 'ja@gmail.com',
                name: 'Jaime'
            },
        },
    ]
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ReduxMessage>) => {
            state.messages = [...state.messages, action.payload];
        },
        removeMessages: (state, action: PayloadAction<[]>) => {  
            state.messages = action.payload;
        },
    }
});

export const { addMessage, removeMessages } = chatSlice.actions;