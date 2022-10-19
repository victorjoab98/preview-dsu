import { api } from '../../../api';
import { ToDo } from '../../../interfaces';
import { AppThunk } from '../../store';
import { addTodo, getTodos } from './todosSlice';

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
