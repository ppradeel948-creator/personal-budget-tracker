import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { id: 1, name: 'Food & Dining', type: 'expense', icon: '🍽️', color: '#1e40af', spent: 1250, budget: 1500, transactions: 45 },
    { id: 2, name: 'Transportation', type: 'expense', icon: '🚗', color: '#059669', spent: 850, budget: 1000, transactions: 28 },
    { id: 3, name: 'Entertainment', type: 'expense', icon: '🎬', color: '#dc2626', spent: 420, budget: 500, transactions: 18 },
    { id: 4, name: 'Utilities', type: 'expense', icon: '⚡', color: '#ea580c', spent: 380, budget: 400, transactions: 12 },
    { id: 5, name: 'Shopping', type: 'expense', icon: '🛍️', color: '#7c3aed', spent: 320, budget: 600, transactions: 22 },
    { id: 6, name: 'Healthcare', type: 'expense', icon: '🏥', color: '#0ea5e9', spent: 280, budget: 300, transactions: 8 },
    { id: 7, name: 'Education', type: 'expense', icon: '📚', color: '#059669', spent: 180, budget: 200, transactions: 5 },
    { id: 8, name: 'Salary', type: 'income', icon: '💼', color: '#059669', earned: 5000, target: 5000, transactions: 2 },
    { id: 9, name: 'Freelance', type: 'income', icon: '💻', color: '#1e40af', earned: 1200, target: 1500, transactions: 8 },
    { id: 10, name: 'Investments', type: 'income', icon: '📈', color: '#7c3aed', earned: 350, target: 500, transactions: 12 }
  ];

  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  
  const filteredCategories = activeTab === 'all' ? categories : 
                           activeTab === 'expense' ? expenseCategories : incomeCategories;

  const totalExpenseSpent = expenseCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalExpenseBudget = expenseCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalIncomeEarned = incomeCategories.reduce((sum, cat) => sum + cat.earned, 0);
  const totalIncomeTarget = incomeCategories.reduce((sum, cat) => sum + cat.target, 0);

  return (
    <div className="categories">
      <div className="container">
        <div className="categories-header">
          <h1 className="holo-text">Category Management</h1>
          <p>Organize and track your income and expense categories</p>
        </div>

        {/* Summary Cards */}
        <div className="category-summary">
          <div className="glass-card summary-card">
            <h3>Total Categories</h3>
            <div className="summary-value">{categories.length}</div>
            <div className="summary-detail">{expenseCategories.length} Expense • {incomeCategories.length} Income</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Expense Categories</h3>
            <div className="summary-value expense">${totalExpenseSpent.toLocaleString()}</div>
            <div className="summary-detail">of ${totalExpenseBudget.toLocaleString()} budgeted</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Income Categories</h3>
            <div className="summary-value income">${totalIncomeEarned.toLocaleString()}</div>
            <div className="summary-detail">of ${totalIncomeTarget.toLocaleString()} target</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Net Performance</h3>
            <div className="summary-value success">${(totalIncomeEarned - totalExpenseSpent).toLocaleString()}</div>
            <div className="summary-detail">Monthly surplus</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Categories ({categories.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'expense' ? 'active' : ''}`}
            onClick={() => setActiveTab('expense')}
          >
            Expenses ({expenseCategories.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
          >
            Income ({incomeCategories.length})
          </button>
        </div>

        {/* Add Category Button */}
        <div className="category-actions">
          <button className="neon-btn" onClick={() => setShowAddModal(true)}>
            + Add New Category
          </button>
          <button className="neon-btn">Import Categories</button>
          <button className="neon-btn">Export Data</button>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {filteredCategories.map(category => (
            <div key={category.id} className="glass-card category-card">
              <div className="category-header">
                <div className="category-icon" style={{backgroundColor: category.color}}>
                  {category.icon}
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <span className={`category-type ${category.type}`}>
                    {category.type === 'expense' ? 'Expense' : 'Income'}
                  </span>
                </div>
                <div className="category-menu">⋮</div>
              </div>

              <div className="category-stats">
                {category.type === 'expense' ? (
                  <>
                    <div className="stat-row">
                      <span>Spent:</span>
                      <span className="amount spent">${category.spent.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span>Budget:</span>
                      <span className="amount budget">${category.budget.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span>Remaining:</span>
                      <span className={`amount ${category.budget - category.spent >= 0 ? 'remaining' : 'over'}`}>
                        ${Math.abs(category.budget - category.spent).toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stat-row">
                      <span>Earned:</span>
                      <span className="amount earned">${category.earned.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span>Target:</span>
                      <span className="amount target">${category.target.toLocaleString()}</span>
                    </div>
                    <div className="stat-row">
                      <span>Progress:</span>
                      <span className="amount progress">
                        {Math.round((category.earned / category.target) * 100)}%
                      </span>
                    </div>
                  </>
                )}
                <div className="stat-row">
                  <span>Transactions:</span>
                  <span className="transaction-count">{category.transactions}</span>
                </div>
              </div>

              <div className="category-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{
                      width: category.type === 'expense' 
                        ? `${Math.min((category.spent / category.budget) * 100, 100)}%`
                        : `${Math.min((category.earned / category.target) * 100, 100)}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
                <div className="progress-label">
                  {category.type === 'expense' 
                    ? `${Math.round((category.spent / category.budget) * 100)}% of budget used`
                    : `${Math.round((category.earned / category.target) * 100)}% of target achieved`
                  }
                </div>
              </div>

              <div className="category-actions-card">
                <button className="action-btn edit">Edit</button>
                <button className="action-btn view">View Transactions</button>
                <button className="action-btn delete">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="glass-card stat-item">
            <h4>Most Used Category</h4>
            <div className="stat-value">Food & Dining</div>
            <div className="stat-detail">45 transactions</div>
          </div>
          <div className="glass-card stat-item">
            <h4>Highest Spending</h4>
            <div className="stat-value">Food & Dining</div>
            <div className="stat-detail">$1,250 this month</div>
          </div>
          <div className="glass-card stat-item">
            <h4>Budget Efficiency</h4>
            <div className="stat-value">83.5%</div>
            <div className="stat-detail">Average utilization</div>
          </div>
          <div className="glass-card stat-item">
            <h4>Income Growth</h4>
            <div className="stat-value">+12.5%</div>
            <div className="stat-detail">vs last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;