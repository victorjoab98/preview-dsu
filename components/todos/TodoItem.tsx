import { FC, useState } from "react";

import { Avatar, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { ToDo } from "../../interfaces/"
import { useAppDispatch } from "../../store"
import { setIsDraggingTodo } from "../../store/slices/ui"
import { getDistanceNow, stringAvatar } from "../../utils"
import { ModalTodo } from "./ModalTodo"


interface Props {
  todo: ToDo
}


const TodoItem:FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [ showModalDetails, setShowModalDetails ] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', todo._id.toString());
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
          <Typography variant='body2'>{ getDistanceNow(todo.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
      <ModalTodo todo={todo} show={showModalDetails} setShow={setShowModalDetails}/>
      
    </Card>
  )
}

export default TodoItem