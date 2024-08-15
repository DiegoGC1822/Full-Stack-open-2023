import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls toAddBlog with correct details', async () => {
  const mockAddBlog = vi.fn()
  const mockToggle = vi.fn()

  render(<BlogForm addBlog={mockAddBlog} toggleVisibility={mockToggle}/>)

  const user = userEvent.setup()
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  await user.type(title, 'title')
  await user.type(author, 'author')
  await user.type(url, 'url')
  await user.click(screen.getByText('create'))

  expect(mockAddBlog)
    .toBeCalledWith({ 
      title: 'title', 
      author: 'author', 
      url: 'url' 
    })
})