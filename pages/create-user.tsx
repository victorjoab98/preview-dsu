import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from '@mui/material'

const CreateUserPage = () => {

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
          Create your account
        </Typography> 
        </CardContent>
          <TextField
            fullWidth
            label='Name'
            name='name'
            helperText='Insert your name'
          />
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
      </Card>
    </Box>
  )
}
export default CreateUserPage