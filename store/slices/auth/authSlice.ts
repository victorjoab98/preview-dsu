import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthGlobal } from '../../../interfaces/';

interface InitialState {
    auth: AuthGlobal;
}

const initialState: InitialState = {
    auth: {
        isLoggedIn: false,
        user: null
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<AuthGlobal>) => {
            state.auth = action.payload;
        },
        setLogout: (state) => {
            state.auth = {
                isLoggedIn: false,
                user: null
            }
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;