import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCategory from '../components/CreateCategory';
import AddTransactionModal from '../components/AddTransactionModal';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const stats = [
    { title: 'Total Balance', amount: '$12,450.00', change: '+5.2%', positive: true },
    { title: 'Monthly Income', amount: '$8,500.00', change: '+12%', positive: true },
    { title: 'Monthly Expenses', amount: '$3,250.00', change: '-8%', positive: true },
    { title: 'Savings Goal', amount: '$5,000.00', progress: 78, positive: true }
  ];

  const recentTransactions = [
    { id: 1, desc: 'Salary Deposit', amount: '+$5,000', type: 'income', date: '2024-01-15' },
    { id: 2, desc: 'Grocery Shopping', amount: '-$125.50', type: 'expense', date: '2024-01-14' },
    { id: 3, desc: 'Netflix Subscription', amount: '-$15.99', type: 'expense', date: '2024-01-13' },
    { id: 4, desc: 'Freelance Payment', amount: '+$800', type: 'income', date: '2024-01-12' },
    { id: 5, desc: 'Gas Station', amount: '-$45.00', type: 'expense', date: '2024-01-11' }
  ];

  const budgetCategories = [
    { name: 'Food & Dining', spent: 450, budget: 600, color: '#8b5cf6' },
    { name: 'Transportation', spent: 280, budget: 400, color: '#06b6d4' },
    { name: 'Entertainment', spent: 150, budget: 200, color: '#f59e0b' },
    { name: 'Shopping', spent: 320, budget: 300, color: '#ec4899' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="holo-text">Financial Dashboard</h1>
          <p>Welcome back! Here's your financial overview</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card stat-card fade-in">
              <div className="stat-header">
                <h3>{stat.title}</h3>
                {stat.change && (
                  <span className={`change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="stat-amount">{stat.amount}</div>
              {stat.progress && (
                <div className="progress-container">
                  <div className="cyber-progress">
                    <div className="cyber-progress-fill" style={{width: `${stat.progress}%`}}></div>
                  </div>
                  <span className="progress-text">{stat.progress}% Complete</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          {/* Recent Transactions */}
          <div className="glass-card transactions-card">
            <h2 className="gradient-text">Recent Transactions</h2>
            <div className="transactions-list">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-desc">{transaction.desc}</span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overview */}
          <div className="glass-card budget-card">
            <h2 className="gradient-text">Budget Overview</h2>
            <div className="budget-list">
              {budgetCategories.map((category, index) => (
                <div key={index} className="budget-item">
                  <div className="budget-header">
                    <span className="budget-name">{category.name}</span>
                    <span className="budget-amount">
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  <div className="cyber-progress">
                    <div 
                      className="cyber-progress-fill" 
                      style={{
                        width: `${(category.spent / category.budget) * 100}%`,
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="neon-btn"
            onClick={() => setShowAddTransaction(true)}
          >
            Add Transaction
          </button>
          <button 
            className="neon-btn"
            onClick={() => setShowCreateBudget(true)}
          >
            Create Budget
          </button>
          <button 
            className="neon-btn"
            onClick={() => navigate('/reports')}
          >
            View Reports
          </button>
        </div>

        {/* Add Transaction Modal */}
        {showAddTransaction && (
          <AddTransactionModal
            onClose={() => setShowAddTransaction(false)}
            onSave={(transaction) => {
              // Save transaction to localStorage
              const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
              const newTransactions = [transaction, ...existingTransactions];
              localStorage.setItem('transactions', JSON.stringify(newTransactions));
              
              // Update category spending
              const categories = JSON.parse(localStorage.getItem('categories') || '[]');
              const updatedCategories = categories.map(cat => {
                if (cat.name === transaction.category) {
                  return {
                    ...cat,
                    spent: cat.spent + (transaction.type === 'expense' ? transaction.amount : -transaction.amount),
                    count: cat.count + 1
                  };
                }
                return cat;
              });
              localStorage.setItem('categories', JSON.stringify(updatedCategories));
              
              console.log('Transaction saved:', transaction);
              setShowAddTransaction(false);
            }}
          />
        )}

        {/* Create Budget Modal */}
        {showCreateBudget && (
          <CreateCategory
            onClose={() => setShowCreateBudget(false)}
            onSave={(category) => {
              console.log('Budget category created:', category);
              setShowCreateBudget(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;