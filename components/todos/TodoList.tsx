import { List, Paper } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { ToDoStatus } from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateStatusTodo } from '../../store/slices/todos'
import { setIsDraggingTodo } from '../../store/slices/ui'
import TodoItem from './TodoItem'
import styles from './TodoList.module.css'

interface Props {
  status: ToDoStatus
}

export const TodoList:FC<Props> = ({status}) => {

  const isDraggingTodo = useAppSelector( (state) => state.todoDashboard.isDraggingTodo );
  const dispatch = useAppDispatch();
  const todos = useAppSelector( (state) => state.todos.todos );
  const todosByStatus = useMemo( () => todos.filter( todo => todo.status === status ), [todos]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onDropTodo = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text/plain');
    const todo = todos.find( todo => todo._id === id )!;
    const updateTodo = { ...todo, status: status };
    dispatch( updateStatusTodo( updateTodo ) );
    dispatch( setIsDraggingTodo(false) );
  }

  if (todosByStatus.length === 0) return null; 
  
  return (
    <div onDrop={onDropTodo} onDragOver={onDragOver} >
        <Paper className={ styles.todo__custom__scrollbar } sx={{ height: 'calc(100vh)', overflow: 'scroll', backgroundColor: 'transparent', padding: '0.5rem'}}>
            <List sx={{ opacity: isDraggingTodo ? 0.3 : 1, transition: 'all .3s'}}>
              {
                todosByStatus.map( todo => (
                  <TodoItem key={todo._id} todo={todo} />
                  ))
              }
            </List>
        </Paper>
    </div>
  )
}
