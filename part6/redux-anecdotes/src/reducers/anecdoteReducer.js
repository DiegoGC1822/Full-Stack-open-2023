import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    const anecdotes = await anecdoteService.getAll()
    return anecdotes
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content)
    return newAnecdote
  }
)

export const addVote = createAsyncThunk(
  'anecdotes/addVote',
  async (anecdote) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    return updatedAnecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload.sort((a, b) => b.votes - a.votes)
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(addVote.fulfilled, (state, action) => {
        const id = action.payload.id
        const searchedAnecdote = state.find((a) => a.id === id)
        const votedAnecdote = { ...searchedAnecdote, votes: searchedAnecdote.votes + 1 }
        return state
        .map((anecdote) =>
          anecdote.id !== id ? anecdote : votedAnecdote
        )
        .sort((a, b) => b.votes - a.votes)
      })
  }
})

export default anecdoteSlice.reducer