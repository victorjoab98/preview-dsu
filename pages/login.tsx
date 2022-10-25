import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { api } from '../api';
import { isEmail } from '../utils';
import { IAuth } from '../interfaces';
import { setLogin } from '../store/slices/auth';
import { useAppDispatch } from '../store';

type FormData = {
  email: string;
  password: string;
}

const LoginPage = () => {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [ loginError, setLoginError ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState( false );
  const dispatch = useAppDispatch();


  const handleSuccess = async (credentialResponse: CredentialResponse) => {

    try {
      
      const { data } = await api.post<IAuth>('/auth/google', { google_token: credentialResponse.credential });

      const { user, token } = data; 
      Cookies.set('token', token);

      dispatch(setLogin({ isLoggedIn: true, user: user }))
      
      router.push('/');
      
    } catch (error) {
      Cookies.remove('token')
      console.log('Google Auth Error', error);
    }  
  }
  
  const onLoginUser = async ( { email, password }: FormData ) => {
    
    try {
      setLoading( true );
      setLoginError( false );
      const { data } = await api.post<IAuth>('/auth/login', { email, password });
      
      const { user, token } = data; 
      
      Cookies.set('token', token);
      
      dispatch(setLogin({ isLoggedIn: true, user: user }))
      
      router.push('/');
      reset();

    } catch (error: any) {
      Cookies.remove('token');
      setErrorMessage(error.response.data.message || 'Error with login. Try again later');
      setLoginError( true ); 
      
    } finally {
      setLoading( false );
    }
  }


   return (
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
        <Typography variant='h2' component='h2' my='2rem' fontSize='2rem'>
          Log In to Osono
        </Typography> 
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.error('something went wront while trying to connect to google')
          }}
        />
        </CardContent>
        <Divider sx={{width:'100%', marginY: '2rem'}} >or</Divider>
        <Chip
          sx={{ width: '75%', marginBottom: '2rem', display: loginError ? 'flex' : 'none'  }}
          label={ errorMessage }
          color='error'
          icon={ <ErrorOutline/> }
          />
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
          <TextField
            type='email'
            fullWidth
            label='Email address'
            { ...register('email', { 
              required: 'The email is required.',
              validate: isEmail
            }) }
            error={ !!errors.email }
            helperText={ errors.email ? errors.email.message : 'Insert your email address' }
          />
          <TextField
            sx={{ marginTop: '1rem' }}
            fullWidth
            label='password'
            type='password'
            { ...register('password', { required: 'The password is required.' }) }
            error={ !!errors.password }
            helperText={ errors.password ? errors.password.message : 'Insert your password.' }
          />
          <CardActions sx={{ my: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button type="submit" color='secondary'>Continue</Button>
            <CircularProgress sx={{ display: loading ? 'flex' : 'none' }}/>
          </CardActions>
        </form>

        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='subtitle2'>Not have an account yet?</Typography>
          <Button sx={{ paddingLeft: '3px'}} color='secondary' onClick={ ()=> router.push('/create-user') }>click here</Button>
        </Box>
        
      </Card>
    </Box>
  )
}
export default LoginPage