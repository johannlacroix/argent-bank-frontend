import { useDispatch, useSelector } from 'react-redux'
import { loginUser, fetchUserProfile } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      await dispatch(fetchUserProfile())
      navigate('/profile')
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            Sign In
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default SignIn
