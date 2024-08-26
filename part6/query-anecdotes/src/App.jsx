import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { NotificationProvider } from './context/NotificationContext'

const App = () => {

  return (
    <div>
      <NotificationProvider>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </NotificationProvider>
    </div>
  )
}

export default App
