import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToDoRedux } from '../../interfaces/todoRedux';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../store';
import { deleteTodo } from '../../store/slices/todos';
import { UpdateModal } from './UpdateModal';
import { useSnackbar } from 'notistack';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  todo: ToDoRedux,
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalTodo: React.FC<Props> = ({todo, show, setShow}) => {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const createdAt = new Date(JSON.parse(todo.createdAt)).toLocaleString('en-US');

  React.useEffect(() => {
    if(show){
      handleOpen();
    }
  }, [show]);

  React.useEffect(() => {
    if(open === false){
      setShow(false);
    }
  }, [open]);

  const handleDelete = () => {
    if( confirm('Are you sure you want to delete this todo?')){
      dispatch(deleteTodo(todo.id));
      handleClose();
      enqueueSnackbar('ToDo deleted successfully.', {
        variant: 'error', 
        autoHideDuration: 3000,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'left'
        }
    });
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            { todo.description }
          </Typography>
          
          <Box display='flex' justifyContent='flex-start'>
            <Typography id="modal-modal-description" sx={{opacity: 0.6, marginRight: 1}}>
              Status: 
            </Typography>
            <Typography id="modal-modal-description">
              {todo.status}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='flex-start'>
            <Typography id="modal-modal-description" sx={{opacity: 0.6, marginRight: 1}}>
              Reporter: 
            </Typography>
            <Typography id="modal-modal-description">
              {todo.user.name}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='flex-start'>
            <Typography id="modal-modal-description" sx={{opacity: 0.6, marginRight: 1}}>
              Created: 
            </Typography>
            <Typography id="modal-modal-description">
              {createdAt}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='space-between' sx={{ marginTop: 5}}>
            <UpdateModal todo={todo}/>
            <Button variant='outlined' color='error' onClick={()=>handleDelete()}>Delete</Button>
          </Box>
          
        </Box>
      </Modal>
    </div>
  );
}
