import { Box, Typography } from '@mui/material'

import styles from './Chat.module.css';

const Message = () => {
  return (
    <Box className={ styles.chat__container__message }>
        <Typography variant='subtitle2' className={ styles.chat__username}>
          {'User_Name'.toUpperCase()}
        </Typography>
        <Box className={ styles.chat__message }>
            <Typography variant='body1'>
              Hello This is a message we have
            </Typography>
            <Typography variant='caption' className={ styles.chat__date }>
               5 mins ago
            </Typography>
        </Box>
    </Box>
  )
}
export default Message