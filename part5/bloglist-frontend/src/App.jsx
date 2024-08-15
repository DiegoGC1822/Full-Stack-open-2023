import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async ( blogObject ) => {
    try{
      const result = await blogService.create(blogObject)
      setBlogs(prevBlogs => [...prevBlogs, result])
      setMessage({
        content: `added ${blogObject.title}`,
        error: false
      })
    }catch(error){
      setMessage({
        content: error.response.data.error,
        error: true
      })
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    try{
      const result = await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs(prevBlogs => {
        return prevBlogs.map(b => b.id !== blogObject.id ? b : result)
      })
      setMessage({
        content: `liked ${blogObject.title}`,
        error: false
      })
    }catch(error){
      setMessage({
        content: error.response.data.error,
        error: true
      })
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteBlog = async ( blogObject ) => {
    try{
      if(window.confirm(`Remove blog ${blogObject.title} 
        by ${blogObject.author}`)){
        await blogService.remove(blogObject.id)
        setBlogs(prevBlogs => {
          return prevBlogs.filter(b => b.id !== blogObject.id)
        })
        setMessage({
          content: `deleted ${blogObject.title}`,
          error: false
        })
      }
    }catch(error){
      setMessage({
        content: error.response.data.error,
        error: true
      })
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {
        message &&
        <Message
          message={message}
        />
      }
      {
        user?
          <div>
            <div>
              <p>{user.name} logged in</p>
              <button onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                setUser(null)
              }}>
                logout
              </button>
            </div>
            <Togglable buttonLabel="new blog">
              {({ toggleVisibility }) => (
                <BlogForm
                  addBlog={addBlog}
                  toggleVisibility={toggleVisibility}
                />
              )}
            </Togglable>
            <h2>blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            )}
          </div> :
          <LoginForm
            setUser={setUser}
            setMessage={setMessage}
          />
      }
    </div>
  )
}

export default App