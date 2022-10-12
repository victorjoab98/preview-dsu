import NextLink from 'next/link';

import { AppBar, Box, Button, CardMedia, IconButton, Link, Toolbar, Typography } from '@mui/material';

import { MenuOpen } from '@mui/icons-material/';

import { useAppDispatch } from '../../store/hooks';
import { setOpenMenu } from '../../store/slices/ui';

const Navbar = () => {
    const dispatch = useAppDispatch();
    
    return (
        <AppBar color='transparent' >
            <Toolbar>

                <IconButton onClick={ () => dispatch( setOpenMenu(true) )}>
                    <MenuOpen/>
                </IconButton>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <CardMedia
                            image='/assets/calendar.png'
                            component='img'
                            sx={{ width: '40px', mx: 1}}
                        />
                        <Typography variant='h1' sx={{ display: {xs: 'none', sm: 'block'}}}>
                            To Do and Chat App
                        </Typography>
                    </Link>
                </NextLink>

                <Box flex={1}></Box>

                <NextLink href='/messages' passHref>
                    <Link>
                        <Button>Messages</Button>
                    </Link>
                </NextLink>
                <NextLink href='/todo' passHref>
                    <Link>
                        <Button>Tasks</Button>
                    </Link>
                </NextLink>
            
            </Toolbar>
        </AppBar>
    )
}
export default Navbar