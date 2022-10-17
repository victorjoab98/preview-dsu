import { ChatCard } from '../../components/chat'
import { AppLayout } from '../../components/layouts'

const MessagesPage = () => {
  return (
    <AppLayout pageDescription='DSU team chat' title='CHAT'>
        <ChatCard />
    </AppLayout>
  )
}
export default MessagesPage