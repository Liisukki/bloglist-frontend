import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={() => updateBlogLikes({ ...blog, likes: blog.likes + 1 })}>
              like
            </button>
          </p>
          <p>Added by: {blog.user?.name || 'unknown'}</p>
          {/* Show delete button only if the logged-in user is the blog's owner */}
          {user && user.username === blog.user.username && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
