import { useState } from "react";

import { Box, Button, TextField } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';

import { useAppDispatch, useAppSelector } from "../../store";

import { saveTodoThunk } from "../../store/slices/todos";
import { setIsAddingTodo } from "../../store/slices/ui";

export const NewTodo = () => {

  const isAddingTodo = useAppSelector( (state) => state.todoDashboard.isAddingTodo );
  const [ description, setDescription ] = useState('');
  const [ error, setError ] = useState(false);
  const dispatch = useAppDispatch();


  const handleSave = () => {
    if( description.trim().length === 0 ) {
      setError(true);
      return;
    }

    dispatch( saveTodoThunk(description) );
    dispatch( setIsAddingTodo(false) )
    setDescription('');
  }

  const handleCancel = () => {
    dispatch(setIsAddingTodo(false));
    setError(false);
  }

  return (

    <Box sx={{ marginBottom: 2, paddingX: 2}}>
      {
        isAddingTodo 
        ? (
            <>
                <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                autoFocus
                multiline
                label='New Task'
                value={description}
                onChange={ (e) => setDescription(e.target.value) }
                helperText={ error && description.length === 0 ? 'Description is required' : '' }
                error={ error && description.trim().length === 0 }/>

                <Box display='flex' justifyContent='space-between'>
                    <Button variant='text'
                    onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant='outlined'
                        color='secondary'
                        endIcon={<SaveIcon />}>
                            Save
                    </Button>
                </Box>
            </>
        )
        :
        (
            <Button
                startIcon={<AddBoxIcon/>}
                fullWidth
                variant='outlined'
                onClick={()=>dispatch(setIsAddingTodo(true))}>
                    Add Task
            </Button>
        )

    }
        

        
    </Box>
  )
}
