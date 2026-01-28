import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Budget Tracker
        </Link>
      </div>
      
      {isAuthenticated && (
        <ul className="navbar-nav">
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/transactions" className="nav-link">Transactions</Link></li>
          <li><Link to="/budgets" className="nav-link">Budgets</Link></li>
          <li><Link to="/goals" className="nav-link">Goals</Link></li>
          <li><Link to="/analytics" className="nav-link">Analytics</Link></li>
          <li><Link to="/reports" className="nav-link">Reports</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <li>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </li>
        </ul>
      )}
      
      {!isAuthenticated && (
        <ul className="navbar-nav">
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;