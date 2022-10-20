import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, ReduxMessage, User } from '../../../interfaces';


interface InitialState {
    messages: Message[];
}


const initialState: InitialState = {
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload];
        },
        getChat: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        removeMessages: (state, action: PayloadAction<[]>) => {  
            state.messages = action.payload;
        },
    }
});

export const { getChat,addMessage, removeMessages } = chatSlice.actions;