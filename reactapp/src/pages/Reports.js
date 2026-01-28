import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('summary');

  // Get demo data from localStorage or use defaults
  const getReportData = () => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    
    // If no real data, use demo data
    if (transactions.length === 0 && categories.length === 0) {
      return {
        summary: {
          totalIncome: 15750,
          totalExpenses: 8420,
          netSavings: 7330,
          budgetVariance: 12.5
        },
        categories: [
          { name: 'Food & Dining', amount: 1250, percentage: 32, trend: 'up' },
          { name: 'Transportation', amount: 850, percentage: 22, trend: 'down' },
          { name: 'Entertainment', amount: 420, percentage: 11, trend: 'up' },
          { name: 'Utilities', amount: 380, percentage: 10, trend: 'stable' },
          { name: 'Shopping', amount: 320, percentage: 8, trend: 'down' },
          { name: 'Healthcare', amount: 280, percentage: 7, trend: 'up' }
        ],
        monthlyTrends: [
          { month: 'Jan', income: 5200, expenses: 2800, savings: 2400 },
          { month: 'Feb', income: 5400, expenses: 2950, savings: 2450 },
          { month: 'Mar', income: 5150, expenses: 2670, savings: 2480 }
        ],
        transactions: [
          { date: '2024-01-15', description: 'Grocery Shopping', category: 'Food & Dining', type: 'expense', amount: 125.50 },
          { date: '2024-01-14', description: 'Salary Deposit', category: 'Salary', type: 'income', amount: 5000.00 },
          { date: '2024-01-13', description: 'Gas Station', category: 'Transportation', type: 'expense', amount: 45.00 },
          { date: '2024-01-12', description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 15.99 },
          { date: '2024-01-11', description: 'Freelance Payment', category: 'Freelance', type: 'income', amount: 800.00 }
        ]
      };
    }
    
    // Use real data
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    return {
      summary: {
        totalIncome,
        totalExpenses,
        netSavings: totalIncome - totalExpenses,
        budgetVariance: 12.5
      },
      categories: categories.filter(c => c.type === 'expense').map(c => ({
        name: c.name,
        amount: c.spent || 0,
        percentage: c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0,
        trend: 'stable'
      })),
      monthlyTrends: [
        { month: 'Jan', income: Math.round(totalIncome * 0.3), expenses: Math.round(totalExpenses * 0.3), savings: Math.round((totalIncome - totalExpenses) * 0.3) },
        { month: 'Feb', income: Math.round(totalIncome * 0.35), expenses: Math.round(totalExpenses * 0.35), savings: Math.round((totalIncome - totalExpenses) * 0.35) },
        { month: 'Mar', income: Math.round(totalIncome * 0.35), expenses: Math.round(totalExpenses * 0.35), savings: Math.round((totalIncome - totalExpenses) * 0.35) }
      ],
      transactions: transactions.slice(0, 10)
    };
  };
  
  const reportData = getReportData();

  const exportToPDF = () => {
    const content = `
FINANCIAL REPORT - ${selectedPeriod.toUpperCase()}
Generated: ${new Date().toLocaleDateString()}

SUMMARY:
Total Income: $${reportData.summary.totalIncome.toLocaleString()}
Total Expenses: $${reportData.summary.totalExpenses.toLocaleString()}
Net Savings: $${reportData.summary.netSavings.toLocaleString()}
Budget Variance: ${reportData.summary.budgetVariance}%

CATEGORY BREAKDOWN:
${reportData.categories.map(c => 
  `${c.name}: $${c.amount} (${c.percentage}%)`
).join('\n')}

MONTHLY TRENDS:
${reportData.monthlyTrends.map(m => 
  `${m.month}: Income $${m.income}, Expenses $${m.expenses}, Savings $${m.savings}`
).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const csvContent = [
      ['FINANCIAL REPORT', selectedPeriod.toUpperCase()],
      ['Generated', new Date().toLocaleDateString()],
      [],
      ['SUMMARY'],
      ['Total Income', `$${reportData.summary.totalIncome.toLocaleString()}`],
      ['Total Expenses', `$${reportData.summary.totalExpenses.toLocaleString()}`],
      ['Net Savings', `$${reportData.summary.netSavings.toLocaleString()}`],
      ['Budget Variance', `${reportData.summary.budgetVariance}%`],
      [],
      ['CATEGORIES'],
      ['Name', 'Amount', 'Percentage'],
      ...reportData.categories.map(c => [c.name, c.amount, `${c.percentage}%`]),
      [],
      ['MONTHLY TRENDS'],
      ['Month', 'Income', 'Expenses', 'Savings'],
      ...reportData.monthlyTrends.map(m => [m.month, m.income, m.expenses, m.savings])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reportTypes = [
    { id: 'summary', name: 'Financial Summary', icon: '📊' },
    { id: 'income', name: 'Income Analysis', icon: '💰' },
    { id: 'expenses', name: 'Expense Breakdown', icon: '💳' },
    { id: 'budget', name: 'Budget Performance', icon: '🎯' },
    { id: 'trends', name: 'Spending Trends', icon: '📈' },
    { id: 'goals', name: 'Savings Goals', icon: '🏆' }
  ];

  return (
    <div className="reports">
      <div className="container">
        <div className="reports-header">
          <h1 className="holo-text">Financial Reports</h1>
          <p>Comprehensive analysis of your financial performance</p>
        </div>

        {/* Report Controls */}
        <div className="report-controls">
          <div className="period-selector">
            <label>Time Period:</label>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="report-actions">
            <button className="neon-btn" onClick={exportToPDF}>Export PDF</button>
            <button className="neon-btn" onClick={exportToExcel}>Export Excel</button>
            <button className="neon-btn" onClick={() => alert('Report scheduling coming soon!')}>Schedule Report</button>
          </div>
        </div>

        {/* Report Types Grid */}
        <div className="report-types">
          {reportTypes.map(type => (
            <div 
              key={type.id} 
              className={`glass-card report-type ${selectedReport === type.id ? 'active' : ''}`}
              onClick={() => setSelectedReport(type.id)}
            >
              <div className="report-icon">{type.icon}</div>
              <h3>{type.name}</h3>
            </div>
          ))}
        </div>

        {/* Report Content */}
        <div className="report-content">
          {selectedReport === 'summary' && (
            <div className="summary-report">
              <div className="summary-cards">
                <div className="glass-card metric-card">
                  <h3>Total Income</h3>
                  <div className="metric-value income">${reportData.summary.totalIncome.toLocaleString()}</div>
                  <div className="metric-change positive">+8.5% from last period</div>
                </div>
                <div className="glass-card metric-card">
                  <h3>Total Expenses</h3>
                  <div className="metric-value expense">${reportData.summary.totalExpenses.toLocaleString()}</div>
                  <div className="metric-change negative">+3.2% from last period</div>
                </div>
                <div className="glass-card metric-card">
                  <h3>Net Savings</h3>
                  <div className="metric-value savings">${reportData.summary.netSavings.toLocaleString()}</div>
                  <div className="metric-change positive">+15.8% from last period</div>
                </div>
                <div className="glass-card metric-card">
                  <h3>Budget Variance</h3>
                  <div className="metric-value variance">{reportData.summary.budgetVariance}%</div>
                  <div className="metric-change neutral">Within target range</div>
                </div>
              </div>

              <div className="glass-card chart-container">
                <h2>Monthly Trends</h2>
                <div className="trend-chart">
                  {reportData.monthlyTrends.map((month, index) => (
                    <div key={index} className="trend-month">
                      <div className="month-label">{month.month}</div>
                      <div className="trend-bars">
                        <div className="trend-bar income" style={{height: `${(month.income / 6000) * 100}%`}}>
                          <span className="bar-value">${(month.income / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="trend-bar expense" style={{height: `${(month.expenses / 6000) * 100}%`}}>
                          <span className="bar-value">${(month.expenses / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="trend-bar savings" style={{height: `${(month.savings / 6000) * 100}%`}}>
                          <span className="bar-value">${(month.savings / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color income"></div>
                    <span>Income</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color expense"></div>
                    <span>Expenses</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color savings"></div>
                    <span>Savings</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'expenses' && (
            <div className="expense-report">
              <div className="glass-card">
                <h2>Expense Breakdown by Category</h2>
                <div className="expense-categories">
                  {reportData.categories.map((category, index) => (
                    <div key={index} className="expense-category">
                      <div className="category-header">
                        <span className="category-name">{category.name}</span>
                        <div className="category-amount">
                          <span className="amount">${category.amount}</span>
                          <span className="percentage">{category.percentage}%</span>
                        </div>
                      </div>
                      <div className="category-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${category.percentage}%`}}
                          ></div>
                        </div>
                        <div className="trend-indicator">📊</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'budget' && (
            <div className="budget-report">
              <div className="glass-card">
                <h2>Budget vs Actual Performance</h2>
                <div className="budget-performance">
                  <div className="performance-summary">
                    <div className="performance-metric">
                      <h4>Budget Adherence</h4>
                      <div className="metric-value">87.5%</div>
                    </div>
                    <div className="performance-metric">
                      <h4>Categories Over Budget</h4>
                      <div className="metric-value warning">2 of 8</div>
                    </div>
                    <div className="performance-metric">
                      <h4>Savings Rate</h4>
                      <div className="metric-value success">46.5%</div>
                    </div>
                  </div>
                  
                  <div className="budget-alerts">
                    <h3>Budget Alerts</h3>
                    <div className="alert-item warning">
                      <span className="alert-icon">⚠️</span>
                      <div className="alert-content">
                        <div className="alert-title">Food & Dining Over Budget</div>
                        <div className="alert-desc">Exceeded by $150 (15%)</div>
                      </div>
                    </div>
                    <div className="alert-item danger">
                      <span className="alert-icon">🚨</span>
                      <div className="alert-content">
                        <div className="alert-title">Entertainment Budget Critical</div>
                        <div className="alert-desc">Exceeded by $80 (23%)</div>
                      </div>
                    </div>
                    <div className="alert-item success">
                      <span className="alert-icon">✅</span>
                      <div className="alert-content">
                        <div className="alert-title">Transportation Under Budget</div>
                        <div className="alert-desc">Saved $120 (12%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;