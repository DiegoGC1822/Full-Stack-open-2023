import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/anecdotes"
import { useDispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const newAnecdote = useMutation({ 
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch( `created new anecdote '${newAnecdote.content}'`,5)
    },
    onError: (error) => {
      dispatch(`anecdote creation failed: ${error.response.data.error}`,5)
    } 
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length >= 5) {
      event.target.anecdote.value = ''
      newAnecdote.mutate({ content, votes: 0 }) 
    }else{
      dispatch('anecdote must be at least 5 characters long',5)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
