import { Box, Typography } from '@mui/material'

import styles from './Chat.module.css';
import { getDistanceNow } from '../../utils/';
import { Message } from '../../interfaces';
import { authUser, authAdmin } from '../../data/users';

interface Props {
  recentMessage: Message
}

const MessageCard = ({ recentMessage }: Props) => {

  
  const stylesValidations = () => {
    return authUser._id === recentMessage.user._id 
  }

  return (
    <Box 
      className={ styles.chat__container__message }
      sx={ stylesValidations() ? { marginLeft: 'auto'} : {}}
    >
      <Typography 
        variant='subtitle2' 
        className={ styles.chat__username}
        sx={ stylesValidations() ? { textAlign: 'left' } : {} }
      >
        {recentMessage.user.name.toUpperCase()}
      </Typography>
      <Box 
        className={ styles.chat__message }
        sx={ stylesValidations() ? { backgroundColor: '#e56564'} : {} }
      >
          <Typography variant='body1'>
            { recentMessage.text }
          </Typography>
          <Typography variant='caption' className={ styles.chat__date }>
            { getDistanceNow( recentMessage.createdAt ) } 
          </Typography>
      </Box>
    </Box>
  )
}

export default MessageCard