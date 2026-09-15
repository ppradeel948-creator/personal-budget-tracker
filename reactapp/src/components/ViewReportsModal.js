import React, { useState } from 'react';
import './Modal.css';

const ViewReportsModal = ({ isOpen, onClose, transactions }) => {
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  if (!isOpen) return null;

  // Calculate report data
  const calculateReport = () => {
    const filtered = transactions.filter(t => {
      const tDate = new Date(t.date);
      const selectedDate = new Date(selectedMonth);
      return tDate.getMonth() === selectedDate.getMonth() && 
             tDate.getFullYear() === selectedDate.getFullYear();
    });

    const income = filtered.filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filtered.filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const categoryBreakdown = {};
    filtered.filter(t => t.type === 'expense').forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + Math.abs(t.amount);
    });

    return { income, expenses, net: income - expenses, categoryBreakdown, transactionCount: filtered.length };
  };

  const report = calculateReport();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large custom-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-gradient">Financial Reports</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Report Controls */}
          <div className="report-controls">
            <div className="form-group">
              <label>Report Period</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="input-custom"
              >
                <option value="monthly">Monthly Report</option>
                <option value="quarterly">Quarterly Report</option>
                <option value="yearly">Yearly Report</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="input-custom"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="report-summary">
            <div className="report-card">
              <div className="report-label">Total Income</div>
              <div className="report-value income">${report.income.toFixed(2)}</div>
            </div>
            <div className="report-card">
              <div className="report-label">Total Expenses</div>
              <div className="report-value expense">${report.expenses.toFixed(2)}</div>
            </div>
            <div className="report-card">
              <div className="report-label">Net Balance</div>
              <div className={`report-value ${report.net >= 0 ? 'income' : 'expense'}`}>
                ${report.net.toFixed(2)}
              </div>
            </div>
            <div className="report-card">
              <div className="report-label">Transactions</div>
              <div className="report-value">{report.transactionCount}</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="category-breakdown">
            <h3>Expense Breakdown by Category</h3>
            {Object.keys(report.categoryBreakdown).length > 0 ? (
              <div className="category-list">
                {Object.entries(report.categoryBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => {
                    const percentage = (amount / report.expenses * 100).toFixed(1);
                    return (
                      <div key={category} className="category-item">
                        <div className="category-info">
                          <span className="category-name">{category}</span>
                          <span className="category-amount">${amount.toFixed(2)}</span>
                        </div>
                        <div className="category-bar">
                          <div 
                            className="category-bar-fill" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="category-percentage">{percentage}%</div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="no-data">No expense data available for this period</p>
            )}
          </div>

          {/* Export Options */}
          <div className="report-actions">
            <button className="btn-custom btn-outline">
              📊 Export as PDF
            </button>
            <button className="btn-custom btn-outline">
              📈 Export as Excel
            </button>
            <button className="btn-custom btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReportsModal;