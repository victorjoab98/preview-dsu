import { useEffect, useRef, useState } from 'react';

import io from 'socket.io-client';

import {  Box, Card, CardContent, CardHeader, CardMedia, IconButton, TextField } from '@mui/material';
import { DeleteForeverOutlined, SendOutlined } from '@mui/icons-material';

import { Message } from '../../interfaces/';

import { MessageCard } from './';
import { useAppSelector, useAppDispatch } from '../../store';
import { addMessage, removeMessages } from '../../store/slices/chat';

import style from './Chat.module.css';
import { authAdmin, authUser } from '../../data/users';
import { getAppDataThunk } from '../../store/slices/generalThunks';


let socket: any;

const ChatCard = () => {
  
  const [inputValue, setInputValue] = useState<string>('');
  const [touched, setTouched] = useState(false);
  const { messages } = useAppSelector(state => state.chat );
  const dispatch = useAppDispatch();
  const scroll = useRef<HTMLDivElement>();
  
  
  useEffect(() => {
    dispatch(getAppDataThunk());
  }, []);
  
  
  useEffect(() => {
      
    const initialSocket = async () => {
      await fetch('/api/socket');
      
      socket = io();

      socket.on('newMessage', (payload: Message) => {
        dispatch(addMessage(payload));
      });
      
    }
    
    initialSocket();
  }, []);
  
  const onSave = async ( e: any ) => {
    if ( !inputValue.trim() ) return;

    const newMessage: any = {
      createdAt: Date.now(),
      text: inputValue,
      user: authAdmin,
      status: 'active'
    }
    
    socket.emit('createMessage', newMessage);
    
    setInputValue('');

  }

    useEffect(() => {
      let cardMessages = document.getElementById('messagesContent')!;
      cardMessages.scrollTop = cardMessages.scrollHeight;      

    }, [messages]);
  
  const onDelete = () => {
    if ( confirm('Do you want to delete the whole conversation?')) {
      dispatch( removeMessages([]) )
      setTouched(false);
    } 
  }

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
            <IconButton
              onClick={ onDelete }
            >
              <DeleteForeverOutlined />
            </IconButton>
          }
          title='MONGO DB'
          subheader='DSU chat team'
        />
        <CardContent 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflowY: 'scroll',
          }}
          className={ style.chat__custom__scrollbar}
          id='messagesContent'
          > 
            {
              messages.map( (message,i) => (
                <MessageCard key={ i } recentMessage={ message }/>
              ))
            }
          <Box ref={ scroll } />
        </CardContent>
        <Box display='flex' alignItems='center'>
          <TextField
            color='primary'
            label='Message'
            onBlur={ () => setTouched( true ) }
            error={ touched && inputValue.trim().length === 0 }
            value={ inputValue }
            onChange={ (e) => setInputValue( e.target.value ) }
            fullWidth
            onKeyUp={ (e) => {
              if (e.code === 'Enter') {
                onSave(e)
              }
            } }
          />
          <IconButton
            disabled={ inputValue.trim().length === 0 }
            onClick={ onSave }
          >
            <SendOutlined />
          </IconButton>
        </Box>
      </Card>
  )
}
export default ChatCard