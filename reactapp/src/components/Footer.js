import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Personal Budget Tracker</h4>
          <p>Manage your finances with ease and achieve your financial goals.</p>
        </div>
        
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/budgets">Budgets</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/integration">Integrations</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5>Features</h5>
          <ul>
            <li>Budget Planning</li>
            <li>Expense Tracking</li>
            <li>Financial Analytics</li>
            <li>Goal Management</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5>Support</h5>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 Personal Budget Tracker. All rights reserved.</p>
          <p>Secure • Private • Reliable Financial Management</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;