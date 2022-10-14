import { Box, Typography } from '@mui/material'

import styles from './Chat.module.css';
import { getFormatDistanceToNow } from '../../utils/';
import { ReduxMessage, User } from '../../interfaces';

interface Props {
  recentMessage: ReduxMessage
}

const MessageCard = ({ recentMessage }: Props) => {

  const authUser: User = {
    id: 1,
    name: 'Kunjo',
    email: 'kunjo@gamil.com'
  }
  
  const stylesValidations = () => {
    return authUser.id === recentMessage.user.id 
  }

  return (
    <Box 
      className={ styles.chat__container__message }
      sx={ stylesValidations() ? { marginLeft: 'auto'} : {}}
    >
      <Typography 
        variant='subtitle2' 
        className={ styles.chat__username}
        sx={ stylesValidations() ? { textAlign: 'right' } : {} }
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
            { getFormatDistanceToNow( recentMessage.createdAt ) } 
          </Typography>
      </Box>
    </Box>
  )
}

export default MessageCard