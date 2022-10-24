import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from '@mui/material'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { api } from '../api';

const LoginPage = () => {

  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      
      const { data } = await api.post('/auth/google', { google_token: credentialResponse.credential });

      console.log('data ', data)

    } catch (error) {
      
      console.log('errrr a ver', error)
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
          <TextField
            fullWidth
            label='Email address'
            name='email'
            helperText='Insert your email address'
          />
          <TextField
            fullWidth
            label='password'
            name='password'
            helperText='Insert your password'
            // value={ '' }
            // error={ isTouched && pass.length === 0 }
            type='password'
            // onChange={ handleChange }
            // onBlur={ () => setIsTouched( true ) }
            required
          />
        <CardActions sx={{ my: '1rem'}}>
          <Button color='secondary'>Continue</Button>
        </CardActions>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='subtitle2'>Not have an account yet?</Typography>
          {/* onClick={()=> navigate('/create-user')} */}
          <Button sx={{ paddingLeft: '3px'}} color='secondary' onClick={ ()=> router.push('/create-user') }>click here</Button>
        </Box>
        
      </Card>
    </Box>
  )
}
export default LoginPage