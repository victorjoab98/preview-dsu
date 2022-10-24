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
            state.todos = [action.payload, ...state.todos];
        },
        getTodos: (state, action: PayloadAction<ToDo[]>) => {
            state.todos = action.payload;
        },
        updateStatusTodo: (state, action: PayloadAction<ToDo>) => {
            state.todos = state.todos.map( todo => todo._id === action.payload._id ? action.payload : todo );
        },
        updateTodo: (state, action: PayloadAction<ToDo>) => {
            state.todos = state.todos.map( todo => {
                if(todo._id === action.payload._id ){
                    todo.description = action.payload.description;
                }
                return todo;
            })
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
        }
    }   
});

export const { addTodo, updateStatusTodo, updateTodo, deleteTodo, getTodos } = todosSlice.actions;
