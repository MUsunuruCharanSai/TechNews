import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { isLoggedIn, clearAuth } from '../services/api';

function Navbar() {
  const loggedIn = isLoggedIn();
  const { darkMode, toggleTheme } = useTheme();

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
          <button onClick={toggleTheme} className="btn-link theme-btn">
            {darkMode ? 'Light' : 'Dark'}
          </button>
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
