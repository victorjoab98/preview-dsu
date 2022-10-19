import { api } from '../../../api';
import { ToDo } from '../../../interfaces';
import { AppThunk } from '../../store';
import { addTodo, deleteTodo, getTodos, updateStatusTodo, updateTodo } from './todosSlice';

export const saveTodoThunk = (description: string): AppThunk => {

    return async (dispatch, getState) => {
        try {
            const { data } = await api.post<ToDo>('/todos', {
                description
            });
            
            dispatch(addTodo(data));

        } catch (error) {
            console.log('Error happend while trying to save todo in frontend', error)
        }
    }
}


export const getTodosThunk = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data } = await api.get<ToDo[]>('/todos');
            dispatch( getTodos(data) )
        } catch (error) {
            console.log('Error happend while trying to getTodos in frontend', error)
        }
    }
}

export const updateTodoStatusThunk = ( todo: ToDo): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data } = await api.patch<ToDo>(`/todos/${todo._id}`, todo);
            dispatch( updateStatusTodo( data ) )
        } catch (error) {
            console.log('Error happend while trying to getTodos in frontend', error)
        }
    }
}

export const updateTodoThunk = ( todo: ToDo): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data } = await api.patch<ToDo>(`/todos/${todo._id}`, todo);
            dispatch( updateTodo( data ) )
        } catch (error) {
            console.log('Error happend while trying to getTodos in frontend', error)
        }
    }
}

export const deleteTodoThunk = ( _id: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data } = await api.delete<ToDo>(`/todos/${_id}`);
            dispatch( deleteTodo( data._id ) )
        } catch (error) {
            console.log('Error happend while trying to getTodos in frontend', error)
        }
    }
}
