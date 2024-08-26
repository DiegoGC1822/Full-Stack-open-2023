import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const filterAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter)
  })

  const handleClick = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`,10))
  }

  return (
    <ul>
        {filterAnecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleClick(anecdote)}
          />
        ))}
    </ul>
  )
}

export default AnecdoteList