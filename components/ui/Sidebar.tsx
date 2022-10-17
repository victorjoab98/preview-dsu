import NextLink from 'next/link';

import { Box, CardMedia, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography, Link } from '@mui/material';
import Cookie from 'js-cookie';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setOpenMenu, changeTheme } from '../../store/slices/ui';

import { 
    HomeOutlined,
    Brightness4Outlined,
    TaskAltOutlined,
    ForumOutlined,
    PersonOutlined,
    CopyrightOutlined,
    GroupsOutlined,
} from '@mui/icons-material';


const Sidebar = () => {

    const dispatch = useAppDispatch();
    const { isOpen } = useAppSelector( state => state.openMenu);
    const { mode } = useAppSelector( state => state.theme);
    
    const handleTheme = () => {
        
        if (mode === 'light') {
            dispatch( changeTheme('dark') );
            // localStorage.setItem('theme', 'dark');
            Cookie.set('theme', 'dark')
        } else {
            dispatch( changeTheme('light') );
            Cookie.set('theme', 'light')
            // localStorage.setItem('theme', 'light')
        }
    }
    
    return (
        <Drawer
            anchor='left'
            open={ isOpen }
            ModalProps={{
                keepMounted: true, 
            }}
            onClose={ () => dispatch( setOpenMenu( false ) )}
        >
            <Box height='100%' width={250} >
                <List sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Box display='flex' alignItems='center' my={2}>                    
                        <ListItemIcon>
                            <CardMedia
                                image='/assets/asana.png'
                                component='img'
                                sx={{ width: '40px'}}
                            />
                        </ListItemIcon>                    
                        <Typography variant='h2' sx={{ fontSize: 30}}>Osono</Typography>
                    </Box>
                    <NextLink href='/' passHref>
                        <Link>
                            <ListItem button onClick={ () => dispatch( setOpenMenu(false) )}>
                                <ListItemIcon>
                                    <HomeOutlined />
                                </ListItemIcon>                    
                                <ListItemText>Home</ListItemText>
                            </ListItem>
                        </Link>
                    </NextLink>
                    <NextLink href='/todo' passHref>
                        <Link>
                            <ListItem button>
                                <ListItemIcon>
                                    <TaskAltOutlined />
                                </ListItemIcon>                    
                                <ListItemText>My tasks</ListItemText>
                            </ListItem>
                        </Link>
                    </NextLink>
                    <NextLink href='/messages' passHref>
                        <Link>
                            <ListItem button>
                                <ListItemIcon>
                                    <ForumOutlined />
                                </ListItemIcon>                    
                                <ListItemText>Messages</ListItemText>
                            </ListItem>
                        </Link>
                    </ NextLink>

                    <ListItem button onClick={ handleTheme }>
                        <ListItemIcon>
                            <Brightness4Outlined />
                        </ListItemIcon>                    
                        <ListItemText>Theme</ListItemText>
                    </ListItem>

                    <ListSubheader>Teams</ListSubheader>
                    <Divider/>
                    
                    <ListItem button>
                        <ListItemIcon>
                            <GroupsOutlined />
                        </ListItemIcon>                    
                        <ListItemText>MONGO DB TEAM</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', flexDirection: 'column' }} button>
                        <ListItemIcon >
                            <PersonOutlined
                                sx={{ height: 100, width: 100 }}
                            />
                        </ListItemIcon>                    
                        <ListItemText>USER_NAME</ListItemText>
                    </ListItem>
                    <Divider/>
                    <Box flex={ 1 }/>
                    <Box>
                        <ListItem>
                            <ListItemIcon>
                                <CopyrightOutlined />
                            </ListItemIcon>        
                            <Typography variant='caption'>
                                Alrights reserved by &copy;DSU TEAM
                            </Typography>            
                        </ListItem>
                    </Box>
                </List>
            </Box>
        </Drawer>
    )
}
export default Sidebar;