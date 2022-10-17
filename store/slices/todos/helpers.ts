import { users } from "../../../data/users";
import { ToDoRedux } from "../../../interfaces/todoRedux";

export const buildNewTodo = (description: string, userId: number = 1): ToDoRedux => {
    const newTodo: ToDoRedux = {
        id: Date.now(),
        title: 'Task',
        description: description,
        createdAt: JSON.stringify(new Date()),
        status: "ToDo",
        user: users[userId]
    } 
    return newTodo;
}