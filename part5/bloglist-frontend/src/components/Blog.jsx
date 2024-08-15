import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toUpdateBlog = async ( e ) => {
    e.preventDefault()
    updateBlog(blog)
  }

  const toDeleteBlog = async ( e ) => {
    e.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <div>
        <p data-testid="title">
          {blog.title}
        </p>
        <p>{blog.author}</p>
      </div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {
        visible && <div>
          <p>{blog.url}</p>
          <div>
            <span>
              <span data-testid="likes">
                {blog.likes}
              </span>
              <span>likes</span>
            </span>
            <button onClick={toUpdateBlog}>
              like
            </button>
          </div>
          <p>added by {blog.user.name}</p>
          {
            user.username === blog.user.username &&
            <button onClick={toDeleteBlog}>
              remove
            </button>
          }
        </div>
      }
    </div>
  )
}

export default Blog