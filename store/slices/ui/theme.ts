import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modeType = 'dark' | 'light'

interface InitialState {
    mode: modeType;
}

const initialState: InitialState = {
    mode: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<modeType>) => {
            state.mode = action.payload
        }
    }
});

export const { changeTheme } = themeSlice.actions;