import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to home
      window.location.href = '/';
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="MovieHub" />
            <span>MovieHub</span>
          </Link>

          <nav className={`nav ${showMobileMenu ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            {user && (
              <Link to="/profile" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                Profile
              </Link>
            )}
          </nav>

          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="user-name">
                  {user.email.split('@')[0]}
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn login-btn">
                  Login
                </Link>
                <Link to="/signup" className="auth-btn signup-btn">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button 
            className={`mobile-menu-btn ${showMobileMenu ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
