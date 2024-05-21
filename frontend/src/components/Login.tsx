import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

interface LoginResponse {
  token: string
}

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3000/login',
        {
          usernameOrEmail,
          password
        }
      )

      // Hantera inloggningssvaret (t.ex. spara token, omdirigera användaren)
      console.log('Login successful:', response.data)
      localStorage.setItem('token', response.data.token)
      window.location.href = '/dashboard'
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeUsernameOrEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(e.target.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username or Email:
            <input
              type='text'
              value={usernameOrEmail}
              onChange={handleChangeUsernameOrEmail}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              value={password}
              onChange={handleChangePassword}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
