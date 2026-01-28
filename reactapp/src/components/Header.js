import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import NotificationCenter from './NotificationCenter';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h2>💰 Budget Tracker</h2>
          </Link>
        </div>
        
        <nav className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/transactions" className="nav-link">Transactions</Link>
              <Link to="/budgets" className="nav-link">Budgets</Link>

              <Link to="/analytics" className="nav-link">Analytics</Link>
              <Link to="/reports" className="nav-link">Reports</Link>
              <Link to="/integration" className="nav-link">Integrations</Link>

            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <NotificationCenter />
              <span className="user-name">Hi, {user?.firstName}</span>
              <Link to="/profile" className="btn-profile">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;