import { Card, CardHeader, Grid } from "@mui/material"
import { NewTodo } from "./NewTodo"
import { TodoList } from "./TodoList"

const TodoDashboard = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
            <Card sx={{ height: 'calc(100vh - 100px)'}}>
                <CardHeader title='ToDo' />
                <NewTodo/>
                <TodoList status='ToDo'/>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
            <Card sx={{ height: 'calc(100vh - 100px)'}}> 
                <CardHeader title='In Progress' />
                <TodoList status='In Progress' />
            </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
            <Card sx={{ height: 'calc(100vh - 100px)'}}>
                <CardHeader title='Complete' />
                <TodoList status='Done'/>
            </Card>
        </Grid>
    </Grid>
  )
}

export default TodoDashboard