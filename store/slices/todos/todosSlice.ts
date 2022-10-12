import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    value: number;
}

const initialState: InitialState = {
    value: 0
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        yourAction: (state, action: PayloadAction<number>) => {

        }
    }
});

export const { yourAction } = todosSlice.actions;