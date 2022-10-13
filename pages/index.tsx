import { Grid, Typography } from '@mui/material';
import { ChatCard } from '../components/chat/';
import { AppLayout } from '../components/layouts';

export default function Home() {
  return (
    <AppLayout title='Osono' pageDescription='DSU Todo & Chat Application '>
      <Grid container>
          <Grid item xs={12} md={ 7} >
            <Typography variant='h2'>Here todo</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <ChatCard />
          </Grid>
      </Grid>
    </AppLayout>
  )
}
