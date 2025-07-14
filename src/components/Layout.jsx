import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate, Outlet, Link } from "react-router-dom";

function Layout() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleGoToProfile = () => {
    navigate("/user"); // ou "/user" si tu préfères
  };

  const handleGoToSettings = () => {
    // Tu pourras rediriger ici plus tard
    console.log("Redirection vers paramètres à implémenter");
  };

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

        <div className="main-nav-user-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {token ? (
            <>
              {/* vers le profil */}
              <span
                className="main-nav-item"
                onClick={handleGoToProfile}
                style={{ cursor: "pointer" }}
              >
                {user?.userName}
              </span>

              <i
                className="fa fa-user-circle main-nav-item"
                onClick={handleGoToProfile}
                style={{ cursor: "pointer" }}
              ></i>

              {/* paramètres */}
              <i
                className="fa fa-cog main-nav-item"
                onClick={handleGoToSettings}
                style={{ cursor: "pointer" }}
              ></i>

              {/* Logout */}
              <i
                className="fa fa-power-off main-nav-item"
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "#42b983" }}
              ></i>
            </>
          ) : (
            <Link className="main-nav-item" to="/signin">
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
  );
}

export default Layout;
