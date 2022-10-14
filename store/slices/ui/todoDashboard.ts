import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isAddingTodo: boolean;
    isDraggingTodo: boolean;
}

const initialState: InitialState = {
    isAddingTodo: false,
    isDraggingTodo: false,
}

export const todoDashboard = createSlice({
    name: 'openMenu',
    initialState,
    reducers: {
        setIsAddingTodo: (state, action: PayloadAction<boolean>) => {
            state.isAddingTodo = action.payload;
        },
        setIsDraggingTodo: (state, action: PayloadAction<boolean>) => {
            state.isDraggingTodo = action.payload;
        }
    }
});

export const { setIsAddingTodo, setIsDraggingTodo } = todoDashboard.actions;