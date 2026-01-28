import React, { useState } from 'react';
import CreateCategory from '../components/CreateCategory';
import EditBudgetModal from '../components/EditBudgetModal';
import './Budgets.css';

const Budgets = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : [
    { id: 1, name: 'Food & Dining', allocated: 800, spent: 650, remaining: 150, color: '#8b5cf6' },
    { id: 2, name: 'Transportation', allocated: 400, spent: 320, remaining: 80, color: '#06b6d4' },
    { id: 3, name: 'Entertainment', allocated: 300, spent: 280, remaining: 20, color: '#f59e0b' },
    { id: 4, name: 'Shopping', allocated: 500, spent: 420, remaining: 80, color: '#ec4899' },
    { id: 5, name: 'Utilities', allocated: 250, spent: 230, remaining: 20, color: '#f97316' },
    { id: 6, name: 'Healthcare', allocated: 200, spent: 150, remaining: 50, color: '#a855f7' }
  ];
  });

  // Save budgets to localStorage whenever budgets change
  React.useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = budgets.reduce((sum, b) => sum + b.remaining, 0);

  return (
    <div className="budgets">
      <div className="container">
        <div className="budgets-header">
          <h1 className="holo-text">Budget Management</h1>
          <p>Plan and track your spending across different categories</p>
        </div>

        {/* Budget Summary */}
        <div className="budget-summary">
          <div className="glass-card summary-card">
            <h3>Total Allocated</h3>
            <div className="amount primary">${totalAllocated.toLocaleString()}</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Total Spent</h3>
            <div className="amount expense">${totalSpent.toLocaleString()}</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Remaining</h3>
            <div className="amount success">${totalRemaining.toLocaleString()}</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Budget Usage</h3>
            <div className="amount info">{Math.round((totalSpent / totalAllocated) * 100)}%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="budget-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Budget Content */}
        <div className="budget-content">
          {activeTab === 'overview' && (
            <div className="budget-overview">
              <div className="glass-card budget-chart">
                <h2 className="gradient-text">Monthly Budget Breakdown</h2>
                <div className="chart-container">
                  <div className="donut-chart">
                    <div className="chart-center">
                      <div className="chart-value">${totalSpent}</div>
                      <div className="chart-label">Total Spent</div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    {budgets.map(budget => (
                      <div key={budget.id} className="legend-item">
                        <div className="legend-color" style={{backgroundColor: budget.color}}></div>
                        <span className="legend-name">{budget.name}</span>
                        <span className="legend-value">${budget.spent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="budget-categories">
              <div className="categories-header">
                <h2 className="gradient-text">Budget Categories</h2>
                <button 
                  className="neon-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Category
                </button>
              </div>
              <div className="categories-grid">
                {budgets.map(budget => (
                  <div key={budget.id} className="glass-card category-card">
                    <div className="category-header">
                      <h3>{budget.name}</h3>
                      <div className="category-status">
                        {budget.remaining > 0 ? (
                          <span className="status-good">On Track</span>
                        ) : (
                          <span className="status-warning">Over Budget</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="category-amounts">
                      <div className="amount-row">
                        <span>Allocated:</span>
                        <span className="amount">${budget.allocated}</span>
                      </div>
                      <div className="amount-row">
                        <span>Spent:</span>
                        <span className="amount spent">${budget.spent}</span>
                      </div>
                      <div className="amount-row">
                        <span>Remaining:</span>
                        <span className={`amount ${budget.remaining >= 0 ? 'remaining' : 'over'}`}>
                          ${budget.remaining}
                        </span>
                      </div>
                    </div>

                    <div className="category-progress">
                      <div className="cyber-progress">
                        <div 
                          className="cyber-progress-fill" 
                          style={{
                            width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%`,
                            background: budget.remaining >= 0 ? 
                              `linear-gradient(90deg, ${budget.color}, ${budget.color}aa)` :
                              'linear-gradient(90deg, #ff0080, #ff6b35)'
                          }}
                        ></div>
                      </div>
                      <div className="progress-label">
                        {Math.round((budget.spent / budget.allocated) * 100)}% Used
                      </div>
                    </div>

                    <div className="category-actions">
                      <button 
                        className="action-btn edit"
                        onClick={() => setEditingBudget(budget)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => {
                          if (window.confirm(`Delete ${budget.name} budget?`)) {
                            setBudgets(prev => prev.filter(b => b.id !== budget.id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="budget-analytics">
              <div className="analytics-grid">
                <div className="glass-card analytics-card">
                  <h3>Spending Trends</h3>
                  <div className="trend-chart">
                    <div className="trend-bars">
                      {[85, 92, 78, 95, 88, 76, 82].map((value, index) => (
                        <div key={index} className="trend-bar">
                          <div 
                            className="bar-fill" 
                            style={{height: `${value}%`}}
                          ></div>
                          <span className="bar-label">W{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card analytics-card">
                  <h3>Budget Alerts</h3>
                  <div className="alerts-list">
                    <div className="alert warning">
                      <span className="alert-icon">⚠️</span>
                      <div className="alert-content">
                        <div className="alert-title">Entertainment Budget</div>
                        <div className="alert-message">93% of budget used</div>
                      </div>
                    </div>
                    <div className="alert danger">
                      <span className="alert-icon">🚨</span>
                      <div className="alert-content">
                        <div className="alert-title">Utilities Budget</div>
                        <div className="alert-message">92% of budget used</div>
                      </div>
                    </div>
                    <div className="alert success">
                      <span className="alert-icon">✅</span>
                      <div className="alert-content">
                        <div className="alert-title">Transportation</div>
                        <div className="alert-message">Within budget limits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showAddModal && (
          <CreateCategory
            onClose={() => setShowAddModal(false)}
            onSave={(newCategory) => {
              const newBudget = {
                id: Date.now(),
                name: newCategory.name,
                allocated: 0,
                spent: 0,
                remaining: 0,
                color: newCategory.color
              };
              setBudgets(prev => [...prev, newBudget]);
              setShowAddModal(false);
            }}
          />
        )}

        {editingBudget && (
          <EditBudgetModal
            budget={editingBudget}
            onClose={() => setEditingBudget(null)}
            onSave={(updatedBudget) => {
              setBudgets(prev => prev.map(b => 
                b.id === updatedBudget.id ? updatedBudget : b
              ));
              setEditingBudget(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Budgets;