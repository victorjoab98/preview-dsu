import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDo } from '../../../interfaces'

interface InitialState {
    todos: ToDo[];
    value: number;
}

const initialState: InitialState = {
    todos: [],
    value: 0
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ToDo>) => {
            state.todos = [...state.todos, action.payload];
        },
        getTodos: (state, action: PayloadAction<ToDo[]>) => {
            state.todos = action.payload;
        },
        updateStatusTodo: (state, action: PayloadAction<ToDo>) => {
        },
        updateTodo: (state, action: PayloadAction<ToDo>) => {
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
        }
    }   
});

export const { addTodo, updateStatusTodo, updateTodo, deleteTodo, getTodos } = todosSlice.actions;