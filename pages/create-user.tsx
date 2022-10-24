import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from '@mui/material'

import { useForm } from 'react-hook-form'
import { api } from '../api';
import { isEmail } from '../utils';

type FormData = {
  name:     string
  email:    string,
  password: string,
};

const CreateUserPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSave = async ( { name, email, password }: FormData ) => {

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
            <TextField
              fullWidth
              label='Name'
              { ...register('name', {
                required: 'Name required'
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
          <CardActions sx={{ my: '1rem'}}>
            <Button
              color='secondary'
              type='submit'
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  )
}
export default CreateUserPage