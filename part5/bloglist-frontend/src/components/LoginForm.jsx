import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = ({ setUser, setMessage }) => {

  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = async ( e ) => {
    e.preventDefault()
    try{
      const user = await loginService.login( credentials )
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify( user ) )
      blogService.setToken( user.token )
      setUser( user )
      setCredentials({ username: '', password: '' })
      setMessage({
        content: `Welcome ${user.name}`,
        error: false
      })
    } catch (exception) {
      setMessage({
        content: 'Wrong credentials',
        error: true
      })
    }

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={ credentials.username }
            placeholder='username'
            name="Username"
            onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={ credentials.password }
            name="Password"
            placeholder='password'
            onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm