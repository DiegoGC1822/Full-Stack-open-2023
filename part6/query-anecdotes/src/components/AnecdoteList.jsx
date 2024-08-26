import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { update, getAll } from "../services/anecdotes"
import { useDispatch } from "../context/NotificationContext"

const AnecdoteList = () => {

  const queryClient = useQueryClient()

  const dispatch = useDispatch()

  const result= useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  const updatedAnecdotes = useMutation({
    mutationFn: update,
    onSuccess: (uAnecdote) => {
      const anecdoteState = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], 
        anecdoteState.map(a => a.id === uAnecdote.id ? uAnecdote : a))
      dispatch(`you voted '${uAnecdote.content}'`,5)
    },
    onError: (error) => {
      dispatch(`anecdote creation failed: ${error.response.data.error}`,5)
    }
  })

  const handleVote = (anecdote) => {
    updatedAnecdotes.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>{result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList