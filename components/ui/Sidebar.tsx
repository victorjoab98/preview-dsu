import { Box, CardMedia, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';

import { 
    HomeOutlined,
    Brightness4Outlined,
    TaskAltOutlined,
    ForumOutlined,
    PersonOutlined,
    CopyrightOutlined,
    GroupsOutlined,
    CloseOutlined 
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Drawer
        anchor='left'
        open={ false }
        ModalProps={{
            keepMounted: true, 
        }}
    >
        <Box height='100%' width={250} >
            <IconButton onClick={() => {/*close*/}}>
                <CloseOutlined fontSize='large' />
            </IconButton>
            <List sx={{ display: 'flex', flexDirection: 'column', height: '90%'}}>
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
                <ListItem button>
                    <ListItemIcon>
                        <HomeOutlined />
                    </ListItemIcon>                    
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TaskAltOutlined />
                    </ListItemIcon>                    
                    <ListItemText>My tasks</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ForumOutlined />
                    </ListItemIcon>                    
                    <ListItemText>Messages</ListItemText>
                </ListItem>
                <ListItem button>
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
                <Box mt='auto'>
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