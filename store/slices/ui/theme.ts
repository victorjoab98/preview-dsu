import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

type modeType = 'dark' | 'light'

interface InitialState {
    mode: modeType | string;
}

const initialState: InitialState = {
    mode: Cookie.get('theme') || 'light'
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