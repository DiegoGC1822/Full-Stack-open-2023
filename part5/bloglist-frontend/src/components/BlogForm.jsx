import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ addBlog, toggleVisibility }) => {

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const toAddBlog = async ( e ) => {
    e.preventDefault()
    addBlog(blog)
    toggleVisibility()
    setBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={toAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={blog.title}
            placeholder='title'
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blog.author}
            placeholder='author'
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blog.url}
            placeholder='url'
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm