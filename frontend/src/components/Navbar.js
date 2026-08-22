import { Link } from 'react-router-dom';
import { isLoggedIn, clearAuth } from '../services/api';

function Navbar() {
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          TechNews
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {loggedIn ? (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="btn-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin/login">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
