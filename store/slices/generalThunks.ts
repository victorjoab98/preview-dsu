import { api } from "../../api";
import { Message, ToDo } from "../../interfaces";
import { AppThunk } from "../store";
import { getChat } from "./chat";
import { getTodos } from "./todos";

export const getAppDataThunk = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            
            const { data } = await api.get<{todos: ToDo[], messages: Message[]}>('/general');
            const { todos, messages} = data;
            
            dispatch( getTodos(todos) );
            dispatch( getChat(messages) );
        } catch (error) {
            console.log('Error happend while trying to get Messages and todos in frontend', error)
        }
    }
}

