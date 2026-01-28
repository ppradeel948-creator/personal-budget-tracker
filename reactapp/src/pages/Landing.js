import React from 'react';
import { Link } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import CategoryQuickLinks from '../components/CategoryQuickLinks';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>💰 Personal Budget Tracker</h1>
          <h2>Take Control of Your Financial Future</h2>
          <p>Track expenses, manage budgets, and achieve your financial goals with our secure and intuitive platform.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-hero primary">Get Started Free</Link>
            <Link to="/login" className="btn-hero secondary">Sign In</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-preview">
            <div className="preview-card">
              <h4>Monthly Budget</h4>
              <div className="budget-bar">
                <div className="budget-used"></div>
              </div>
              <p>$2,450 / $3,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Budget Tracker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Analytics</h3>
              <p>Get insights into your spending patterns with detailed reports and visualizations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal Tracking</h3>
              <p>Set and track financial goals to stay motivated and achieve your dreams.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Bank-Level Security</h3>
              <p>Your financial data is protected with enterprise-grade encryption and security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multi-Device Access</h3>
              <p>Access your budget from anywhere with our responsive web application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Start Your Financial Journey Today</h2>
              <ul>
                <li>✅ Track income and expenses effortlessly</li>
                <li>✅ Create and manage multiple budgets</li>
                <li>✅ Categorize transactions automatically</li>
                <li>✅ Generate detailed financial reports</li>
                <li>✅ Set and achieve savings goals</li>
                <li>✅ Secure cloud-based storage</li>
              </ul>
              <Link to="/register" className="btn-cta">Start Free Trial</Link>
            </div>
            <div className="benefits-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h3>$2M+</h3>
                <p>Money Tracked</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security">
        <div className="container">
          <h2>🔐 Your Security is Our Priority</h2>
          <div className="security-features">
            <div className="security-item">
              <h4>256-bit SSL Encryption</h4>
              <p>All data transmitted is encrypted using industry-standard SSL technology.</p>
            </div>
            <div className="security-item">
              <h4>Secure Authentication</h4>
              <p>JWT-based authentication with secure password hashing and session management.</p>
            </div>
            <div className="security-item">
              <h4>Data Privacy</h4>
              <p>We never share your personal financial information with third parties.</p>
            </div>
            <div className="security-item">
              <h4>Regular Backups</h4>
              <p>Your data is automatically backed up and can be restored at any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Category Quick Links */}
      <CategoryQuickLinks />

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of users who have transformed their financial lives with Budget Tracker.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-cta large">Create Free Account</Link>
            <Link to="/login" className="btn-outline">Already have an account?</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;