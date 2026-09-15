import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateBudgetModal from '../components/CreateBudgetModal';
import AddTransactionModal from '../components/AddTransactionModal';
import ViewReportsModal from '../components/ViewReportsModal';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const [showReports, setShowReports] = useState(false);
  
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', description: 'Salary Deposit', category: 'Income', amount: 5000, type: 'income' },
    { id: 2, date: '2024-01-14', description: 'Grocery Shopping', category: 'Food', amount: -125.50, type: 'expense' },
    { id: 3, date: '2024-01-13', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'expense' },
    { id: 4, date: '2024-01-12', description: 'Freelance Payment', category: 'Income', amount: 800, type: 'income' },
    { id: 5, date: '2024-01-11', description: 'Gas Station', category: 'Transportation', amount: -45.00, type: 'expense' }
  ]);

  const stats = [
    { title: 'Total Balance', amount: '$12,450.00', change: '+5.2%', positive: true, icon: '💰' },
    { title: 'Monthly Income', amount: '$8,500.00', change: '+12%', positive: true, icon: '📈' },
    { title: 'Monthly Expenses', amount: '$3,250.00', change: '-8%', positive: true, icon: '💸' },
    { title: 'Savings Goal', amount: '$5,000.00', progress: 78, positive: true, icon: '🎯' }
  ];

  const recentTransactions = [
    { id: 1, desc: 'Salary Deposit', amount: '+$5,000', type: 'income', date: '2024-01-15' },
    { id: 2, desc: 'Grocery Shopping', amount: '-$125.50', type: 'expense', date: '2024-01-14' },
    { id: 3, desc: 'Netflix Subscription', amount: '-$15.99', type: 'expense', date: '2024-01-13' },
    { id: 4, desc: 'Freelance Payment', amount: '+$800', type: 'income', date: '2024-01-12' },
    { id: 5, desc: 'Gas Station', amount: '-$45.00', type: 'expense', date: '2024-01-11' }
  ];

  const budgetCategories = [
    { name: 'Food & Dining', spent: 450, budget: 600, color: '#10b981' },
    { name: 'Transportation', spent: 280, budget: 400, color: '#3b82f6' },
    { name: 'Entertainment', spent: 150, budget: 200, color: '#f59e0b' },
    { name: 'Shopping', spent: 320, budget: 300, color: '#8b5cf6' }
  ];

  const handleSaveTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="heading-primary">Financial Dashboard</h1>
          <p>Welcome back! Here's your financial overview</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="custom-card stat-card animate-fadeInUp">
              <div className="stat-icon">{stat.icon}</div>
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
                  <div className="progress-custom">
                    <div className="progress-fill" style={{width: `${stat.progress}%`}}></div>
                  </div>
                  <span className="progress-text">{stat.progress}% Complete</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          {/* Recent Transactions */}
          <div className="custom-card transactions-card">
            <div className="card-header">
              <h2 className="text-gradient">Recent Transactions</h2>
              <button 
                className="btn-custom btn-outline"
                onClick={() => navigate('/transactions')}
              >
                View All
              </button>
            </div>
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
          <div className="custom-card budget-card">
            <div className="card-header">
              <h2 className="text-gradient">Budget Overview</h2>
              <button 
                className="btn-custom btn-outline"
                onClick={() => navigate('/budgets')}
              >
                Manage
              </button>
            </div>
            <div className="budget-list">
              {budgetCategories.map((category, index) => (
                <div key={index} className="budget-item">
                  <div className="budget-header">
                    <span className="budget-name">{category.name}</span>
                    <span className="budget-amount">
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  <div className="progress-custom">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: `${(category.spent / category.budget) * 100}%`,
                        background: category.color
                      }}
                    ></div>
                  </div>
                  <span className="budget-percentage">
                    {Math.round((category.spent / category.budget) * 100)}% used
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => setShowAddTransaction(true)}
            >
              <span className="action-icon">💳</span>
              <span className="action-title">Add Transaction</span>
              <span className="action-desc">Record income or expense</span>
            </button>
            <button 
              className="action-card"
              onClick={() => setShowCreateBudget(true)}
            >
              <span className="action-icon">🎯</span>
              <span className="action-title">Create Budget</span>
              <span className="action-desc">Set spending limits</span>
            </button>
            <button 
              className="action-card"
              onClick={() => setShowReports(true)}
            >
              <span className="action-icon">📄</span>
              <span className="action-title">View Reports</span>
              <span className="action-desc">Analyze your finances</span>
            </button>
            <button 
              className="action-card"
              onClick={() => navigate('/analytics')}
            >
              <span className="action-icon">📊</span>
              <span className="action-title">Analytics</span>
              <span className="action-desc">Track spending trends</span>
            </button>
          </div>
        </div>

        {/* Modals */}
        <AddTransactionModal
          isOpen={showAddTransaction}
          onClose={() => setShowAddTransaction(false)}
          onSave={handleSaveTransaction}
        />

        <CreateBudgetModal
          isOpen={showCreateBudget}
          onClose={() => setShowCreateBudget(false)}
          onSave={(budget) => {
            console.log('Budget created:', budget);
            setShowCreateBudget(false);
          }}
        />

        <ViewReportsModal
          isOpen={showReports}
          onClose={() => setShowReports(false)}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;