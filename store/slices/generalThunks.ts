import { api } from "../../api";
import { Message, ToDo } from "../../interfaces";
import { AppThunk } from "../store";
import { getChat } from "./chat";
import { getTodos } from "./todos";

export const getAppDataThunk = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { data: dataTodos } = await api.get<ToDo[]>('/todos');
            const { data: dataMessages } = await api.get<Message[]>('/messages');


            console.log(dataTodos)
            console.log(dataMessages)

            dispatch( getTodos(dataTodos) );
            dispatch( getChat(dataMessages) );

        } catch (error) {
            console.log('Error happend while trying to get Messages and todos in frontend', error)
        }
    }
}

