import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryQuickLinks.css';

const CategoryQuickLinks = () => {
  const quickLinks = [
    {
      title: 'View All Categories',
      description: 'Browse and manage all expense categories',
      icon: '📂',
      path: '/dashboard',
      action: 'View Categories'
    },
    {
      title: 'Add Transaction',
      description: 'Create new transaction with category',
      icon: '💳',
      path: '/transactions',
      action: 'Add Transaction'
    },
    {
      title: 'Budget by Category',
      description: 'Set budgets for each category',
      icon: '🎯',
      path: '/budgets',
      action: 'Manage Budgets'
    },
    {
      title: 'Category Reports',
      description: 'View spending reports by category',
      icon: '📊',
      path: '/reports',
      action: 'View Reports'
    },
    {
      title: 'Category Analytics',
      description: 'Analyze spending patterns by category',
      icon: '📈',
      path: '/analytics',
      action: 'View Analytics'
    },
    {
      title: 'Import Transactions',
      description: 'Import and categorize bank transactions',
      icon: '🔗',
      path: '/integration',
      action: 'Connect Banks'
    }
  ];

  return (
    <section className="category-quick-links">
      <div className="container">
        <div className="quick-links-header">
          <h2>Category Quick Actions</h2>
          <p>Manage your financial categories efficiently</p>
        </div>

        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="quick-link-card">
              <div className="link-icon">{link.icon}</div>
              <div className="link-content">
                <h3>{link.title}</h3>
                <p>{link.description}</p>
                <span className="link-action">{link.action} →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="category-stats">
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Active Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1,272</div>
            <div className="stat-label">Categorized Transactions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Coverage Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryQuickLinks;