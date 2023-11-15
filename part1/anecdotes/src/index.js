import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => (
  <>
    <button onClick={handleClick}>
      {text}
    </button>
  </>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0) 
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    let randomNumber = Math.floor(Math.random() * (6))
    setSelected(randomNumber)
  }

  const handleClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVoted = () => {
     const maxValue = Math.max(...votes)
     const mostVotedIndex = votes.indexOf(maxValue)
     return mostVotedIndex
  }
 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleClickNext} text = "next anecdote"></Button>
      <Button handleClick={handleClickVote} text = "vote"></Button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted()]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
