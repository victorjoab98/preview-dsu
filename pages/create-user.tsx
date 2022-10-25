import { useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie';

import { api } from '../api';
import { isEmail } from '../utils';
import { IAuth } from '../interfaces';
import { ErrorOutline } from '@mui/icons-material';
import { useAppDispatch } from '../store';
import { setLogin } from '../store/slices/auth';

type FormData = {
  name:     string
  email:    string,
  password: string,
};

const CreateUserPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();


  const onSave = async ( { name, email, password }: FormData ) => {
    setShowError( false );
    setLoading( true );

    try {
      const { data } = await api.post<IAuth>('/users', { name, email, password} );
      const { user, token } = data;

      Cookies.set('token', token);
      
      dispatch(setLogin({ isLoggedIn: true, user: user }));

    } catch (error: any) { 

      console.log('Credential errors',error);
      setErrorMessage(error.response.data.message || 'Error saving the user. Try again later');
      setShowError(true);

      setTimeout(() => setShowError( false ), 3000);
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={ handleSubmit(onSave) } noValidate>
      <Box 
        height='100vh' 
        color='default'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Card 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: { xs: '80%', sm: '70%', md: '50%', lg: '30%' },
            borderRadius: '1rem',
            minHeight: '70vh',
            p: {xs: '1rem', sm: '3rem 2rem'}
          }}
        >
          <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box display='flex' justifyContent='center'>
              <CardMedia
                image='/assets/asana.png'
                component='img'
                sx={{ width: '40px'}}
              />
              <Typography variant='h1' sx={{ fontSize: 30}}>Osono</Typography>
            </Box>
          <Typography variant='h2' component='h2' my='3rem' fontSize='2rem'>
            Create your account
          </Typography> 
          </CardContent>
          <Chip
              label={ errorMessage || 'Error saving the user. Try again later' }
              color='error'
              icon={ <ErrorOutline /> }
              sx={{ display: showError ? 'flex' : 'none', mb: '1rem' }}
          />
          <TextField
            fullWidth
            label='Name'
            { ...register('name', {
              required: 'Name required',
              minLength: { value: 2, message: 'Name should be at least 2 characters'}
            })}
            error={ !!errors.name }
            helperText={ errors.name?.message }
            sx={{mb: '1rem'}}
          />
          <TextField
            type='email'
            fullWidth
            label='Email address'
            {...register('email', {
              required: 'Email required',
              validate: isEmail
            })}
            error={ !!errors.email  }
            helperText={ errors.email?.message }
            sx={{mb: '1rem'}}
          />
          <TextField
            fullWidth
            label='password'
            type='password'
            { ...register('password', {
              required: 'Password required',
              minLength: { value: 6, message: 'Password should be at least 6 characters' }
            }) }
            error={ !!errors.password }
            helperText={ errors.password?.message }
            sx={{mb: '1rem'}}
          />
          <CardActions sx={{ my: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button type='submit' color='secondary'>
              Save
            </Button>
            <CircularProgress sx={{ display: loading ? 'flex' : 'none' }}/>
          </CardActions>
        </Card>
      </Box>
    </form>
  )
}
export default CreateUserPage