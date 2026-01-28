import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    username: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    
    try {
      await api.put('/users/profile', profile);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      
      <div className="card">
        <h3>Personal Information</h3>
        
        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={profile.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={profile.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={profile.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className="form-control"
              value={profile.phoneNumber}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
      
      <div className="card">
        <h3>Account Information</h3>
        <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
        <p><strong>Account Created:</strong> {user?.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Account Status:</strong> {user?.isActive ? 'Active' : 'Inactive'}</p>
      </div>
      
      <div className="card">
        <h3>Security Settings</h3>
        <p>Two-Factor Authentication: {user?.twoFactorEnabled ? '✅ Enabled' : '❌ Disabled'}</p>
        <button className="btn btn-primary">
          Change Password
        </button>
        <button className="btn btn-primary" style={{ marginLeft: '1rem' }}>
          {user?.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </button>
      </div>
    </div>
  );
};

export default Profile;