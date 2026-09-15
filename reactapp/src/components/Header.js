import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import ThemeSelector from './ThemeSelector';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h2>💰 Budget Tracker</h2>
          </Link>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Dashboard
              </Link>
              <Link 
                to="/transactions" 
                className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                💳 Transactions
              </Link>
              <Link 
                to="/budgets" 
                className={`nav-link ${isActive('/budgets') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🎯 Budgets
              </Link>
              <Link 
                to="/analytics" 
                className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                📈 Analytics
              </Link>
              <Link 
                to="/reports" 
                className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                📄 Reports
              </Link>
              <Link 
                to="/integration" 
                className={`nav-link ${isActive('/integration') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🔗 Integrations
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          <ThemeSelector />
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user?.firstName}</span>
              <Link to="/profile" className="btn-profile" onClick={() => setMobileMenuOpen(false)}>
                ⚙️ Profile
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                🔑 Login
              </Link>
              <Link to="/register" className="btn-register">
                ✨ Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;