import { Grid } from '@mui/material';

import { ChatCard } from '../components/chat/';
import { AppLayout } from '../components/layouts';
import { TodoDashboard } from '../components/todos';

export default function Home() {

  return (
    <AppLayout title='Osono' pageDescription='DSU Todo & Chat Application '>
      <Grid container spacing={2}>
          <Grid item xs={12} md={ 7} >
            <TodoDashboard/>
          </Grid>
          <Grid item xs={12} md={5}>
            <ChatCard />
          </Grid>
      </Grid>
      
    </AppLayout>
  )
}
