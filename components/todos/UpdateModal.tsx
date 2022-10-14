import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { ToDoRedux } from '../../interfaces/todoRedux';
import { useAppDispatch } from '../../store';
import { updateTodo } from '../../store/slices/todos';
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
    pt: 2,
    px: 4,
    pb: 3,
};

interface Props {
    todo: ToDoRedux,
  }

export const UpdateModal: React.FC<Props> = ({ todo }) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState(todo.description);
    const [error, setError] = React.useState(false);

    React.useEffect( ()=>{ setDescription(todo.description)}, [])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setError(false);
        if (description.trim().length === 0) {
            setError(true);
            return;
        }

        const newTodo = { ...todo, description};
        setDescription(newTodo.description);
        dispatch( updateTodo(newTodo));
        handleClose();
        enqueueSnackbar('ToDo updated successfully.', {
            variant: 'success', 
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }
        });
    }

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant='outlined' color='secondary'>Update</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="child-modal-title">Update Task</h2>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        autoFocus
                        multiline
                        label='Change the description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        helperText={error && description.length === 0 ? 'Description is required' : ''}
                        error={error && description.trim().length === 0} />

                    <Box display='flex' justifyContent='space-between' sx={{ marginTop: 5 }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                        onClick={handleSave}
                        variant='outlined'
                        color='secondary'>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
            
        </React.Fragment>
    );
}
