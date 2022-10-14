import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todosRedux } from '../../../data/todosRedux';
import { ToDoRedux } from '../../../interfaces/todoRedux';

interface InitialState {
    todos: ToDoRedux[];
    value: number;
}

const initialState: InitialState = {
    todos: todosRedux,
    value: 0
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ToDoRedux>) => {
            state.todos.push(action.payload);
        },
        updateStatusTodo: (state, action: PayloadAction<ToDoRedux>) => {
            state.todos = state.todos.map( todo => {
                if(todo.id === action.payload.id) {
                    todo.status = action.payload.status;
                }
                return todo;
            })
        },
        updateTodo: (state, action: PayloadAction<ToDoRedux>) => {
            state.todos = state.todos.map( todo => {
                if(todo.id === action.payload.id ){
                    todo.description = action.payload.description;
                }
                return todo;
            })
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter( todo => todo.id !== action.payload);
        }
    }   
});

export const { addTodo, updateStatusTodo, updateTodo, deleteTodo } = todosSlice.actions;