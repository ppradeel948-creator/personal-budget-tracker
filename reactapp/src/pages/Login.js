import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { mockAuthService as authService } from '../services/mockAuthService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      const response = await authService.login(formData);
      dispatch(loginSuccess(response));
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>💰 Budget Tracker</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your finances</p>
        </div>
        
        {error && <div className="error-alert">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;