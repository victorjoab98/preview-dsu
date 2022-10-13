import { MoreVert } from '@mui/icons-material'
import {  Box, Card, CardContent, CardHeader, CardMedia, IconButton, TextField } from '@mui/material'
import { Message } from './';
import { SendOutlined } from '@mui/icons-material/';

import style from './Chat.module.css';


const ChatCard = () => {
  return (
      <Card 
        sx={{ 
          height: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '0', sm: '1rem'}
        }}
        
      > 
        <CardHeader
          avatar={
            <CardMedia
              component='img'
              image='/assets/chatLogo.png'
            />
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title='MONGO DB'
          subheader='DSU chat team'
        />
        <CardContent 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overFlowY: 'auto',
            flex: 1,
          }}
          className={ style.chat__custom__scrollbar}
        >
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </CardContent>
        <Box display='flex' alignItems='center'>
          <TextField
            color='primary'
            label='Message'
            fullWidth
          >
          </TextField>
          <IconButton>
            <SendOutlined />
          </IconButton>
        </Box>
      </Card>
  )
}
export default ChatCard