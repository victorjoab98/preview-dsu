import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isOpen: boolean;
}

const initialState: InitialState = {
    isOpen: false,
}

export const openMenuSlice = createSlice({
    name: 'openMenu',
    initialState,
    reducers: {
        setOpenMenu: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setOpenMenu } = openMenuSlice.actions;