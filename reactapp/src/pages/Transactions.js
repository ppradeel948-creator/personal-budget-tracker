import React, { useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [filter, setFilter] = useState('all');
  
  const transactions = [
    { id: 1, date: '2024-01-15', description: 'Salary Deposit', category: 'Income', amount: 5000, type: 'income' },
    { id: 2, date: '2024-01-14', description: 'Grocery Shopping - Walmart', category: 'Food', amount: -125.50, type: 'expense' },
    { id: 3, date: '2024-01-13', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'expense' },
    { id: 4, date: '2024-01-12', description: 'Freelance Web Design', category: 'Income', amount: 800, type: 'income' },
    { id: 5, date: '2024-01-11', description: 'Gas Station - Shell', category: 'Transportation', amount: -45.00, type: 'expense' },
    { id: 6, date: '2024-01-10', description: 'Coffee Shop', category: 'Food', amount: -12.50, type: 'expense' },
    { id: 7, date: '2024-01-09', description: 'Online Course', category: 'Education', amount: -99.99, type: 'expense' },
    { id: 8, date: '2024-01-08', description: 'Dividend Payment', category: 'Income', amount: 150, type: 'income' },
    { id: 9, date: '2024-01-07', description: 'Electric Bill', category: 'Utilities', amount: -89.50, type: 'expense' },
    { id: 10, date: '2024-01-06', description: 'Restaurant Dinner', category: 'Food', amount: -67.80, type: 'expense' }
  ];

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' || t.type === filter
  );

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="transactions">
      <div className="container">
        <div className="transactions-header">
          <h1 className="holo-text">Transaction History</h1>
          <p>Track and manage all your financial transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="glass-card summary-card">
            <h3>Total Income</h3>
            <div className="amount income">${totalIncome.toLocaleString()}</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Total Expenses</h3>
            <div className="amount expense">${totalExpenses.toLocaleString()}</div>
          </div>
          <div className="glass-card summary-card">
            <h3>Net Balance</h3>
            <div className={`amount ${totalIncome - totalExpenses >= 0 ? 'income' : 'expense'}`}>
              ${(totalIncome - totalExpenses).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Transactions
          </button>
          <button 
            className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
            onClick={() => setFilter('income')}
          >
            Income
          </button>
          <button 
            className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
            onClick={() => setFilter('expense')}
          >
            Expenses
          </button>
        </div>

        {/* Transactions Table */}
        <div className="glass-card transactions-table">
          <div className="table-header">
            <h2 className="gradient-text">Recent Transactions</h2>
            <button className="neon-btn">Add Transaction</button>
          </div>
          
          <div className="transactions-list">
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-row">
                <div className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-category">{transaction.category}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </div>
                <div className="transaction-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;