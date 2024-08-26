const Anecdote = ({ anecdote, handleClick }) => (
    <li>
        {anecdote.content}
        <br />
        has {anecdote.votes}
        <button onClick={handleClick}>
            vote
        </button>
    </li>
)

export default Anecdote