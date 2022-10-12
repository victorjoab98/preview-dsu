import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    value: number;
}

const initialState: InitialState = {
    value: 0
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        yourAction: (state, action: PayloadAction<number>) => {

        }
    }
});

export const { yourAction } = chatSlice.actions;