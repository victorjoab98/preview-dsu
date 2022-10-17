import { Avatar, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { ToDoRedux } from "../../interfaces/todoRedux"
import { useAppDispatch } from "../../store"
import { setIsDraggingTodo } from "../../store/slices/ui"
import { formatDistance, stringAvatar } from "../../utils"
import { ModalTodo } from "./ModalTodo"


interface Props {
  todo: ToDoRedux
}

const TodoItem:FC<Props> = ({ todo }) => {
  
  const dispatch = useAppDispatch();
  const [ showModalDetails, setShowModalDetails ] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', todo.id.toString());
    dispatch( setIsDraggingTodo(true) );
  }
  
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch( setIsDraggingTodo(false) );
  }

  return (
    
    <Card
      onClick={()=>setShowModalDetails(true)}
      sx={{ mb: 2}} 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line'}}>{ todo.description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent:'space-between', paddingRight: 2}}>
          <Avatar {...stringAvatar(todo.user.name)} />
          <Typography variant='body2'>{ formatDistance(todo.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
      <ModalTodo todo={todo} show={showModalDetails} setShow={setShowModalDetails}/>
      
    </Card>
  )
}

export default TodoItem