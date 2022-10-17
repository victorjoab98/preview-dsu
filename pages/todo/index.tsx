import { AppLayout } from '../../components/layouts'
import { TodoDashboard } from '../../components/todos'

const TodosPage = () => {
  return (
    <AppLayout pageDescription='DSU team ToDo' title='ToDo'>
        <TodoDashboard />
    </AppLayout>
  )
}
export default TodosPage