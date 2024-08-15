import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0
    }

    render(<Blog blog={blog} />)
    expect(screen.getByText('title')).toBeDefined()
    expect(screen.getByText('author')).toBeDefined()
    expect(screen.queryByText('url')).toBeNull()
    expect(screen.queryByText('0')).toBeNull()
})

test('clicking the button shows url and likes', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: { 
            name: 'test',
            username: 'test' 
        }
    }

    const user = userEvent.setup()
    render(<Blog blog={blog} user={blog.user}/>)

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('url')).toBeDefined()
    expect(screen.getByText('likes')).toBeDefined()
})

test('calls updateBlog twice when the like button is clicked twice', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: {
            username: 'user1',
            name: 'User One'
        }
    }

    const mockUpdateBlog = vi.fn()

    render(
        <Blog 
            blog={blog} 
            updateBlog={mockUpdateBlog}
            user={blog.user} 
        />
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})