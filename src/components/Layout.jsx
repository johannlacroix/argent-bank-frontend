import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useNavigate, Outlet, Link } from 'react-router-dom'

function Layout() {
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {token ? (
  <button className="main-nav-item" onClick={handleLogout}>
    <i className="fa fa-user-circle"></i>
    Sign Out
  </button>
) : (
  <Link className="main-nav-item" to="/login">
    <i className="fa fa-user-circle"></i>
    Sign In
  </Link>
)}

        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  )
}

export default Layout
