import React, { useState } from 'react';
import './Balance.css';

const Balance = () => {
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [timeframe, setTimeframe] = useState('30d');

  const accounts = [
    { id: 'chase_checking', name: 'Chase Checking', balance: 5420.50, type: 'checking', change: +245.30, apy: 0.01 },
    { id: 'chase_savings', name: 'Chase Savings', balance: 12750.00, type: 'savings', change: +125.00, apy: 0.45 },
    { id: 'paypal', name: 'PayPal', balance: 1250.75, type: 'payment', change: -67.25, apy: 0 },
    { id: 'investment', name: 'Investment Account', balance: 8950.25, type: 'investment', change: +425.80, apy: 7.2 }
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalChange = accounts.reduce((sum, acc) => sum + acc.change, 0);
  const avgAPY = accounts.filter(acc => acc.apy > 0).reduce((sum, acc) => sum + acc.apy, 0) / accounts.filter(acc => acc.apy > 0).length;

  const balanceHistory = [
    { date: '2024-01-01', balance: 27500 },
    { date: '2024-01-05', balance: 27750 },
    { date: '2024-01-10', balance: 27200 },
    { date: '2024-01-15', balance: 28100 },
    { date: '2024-01-20', balance: 28371 }
  ];

  const cashFlow = {
    inflow: 6500,
    outflow: 3250,
    net: 3250,
    projectedNext: 3450
  };

  const financialGoals = [
    { name: 'Emergency Fund', target: 15000, current: 8500, priority: 'high' },
    { name: 'House Down Payment', target: 50000, current: 12750, priority: 'medium' },
    { name: 'Vacation Fund', target: 5000, current: 2000, priority: 'low' }
  ];

  return (
    <div className="balance">
      <div className="container">
        <div className="balance-header">
          <h1 className="holo-text">Advanced Balance Overview</h1>
          <p>Comprehensive view of your financial position and projections</p>
        </div>

        {/* Total Balance Card */}
        <div className="glass-card total-balance-card">
          <div className="balance-main">
            <div className="balance-info">
              <h2>Total Net Worth</h2>
              <div className="total-amount">${totalBalance.toLocaleString()}</div>
              <div className={`balance-change ${totalChange >= 0 ? 'positive' : 'negative'}`}>
                {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString()} this month
              </div>
            </div>
            <div className="balance-chart">
              <div className="mini-chart">
                {balanceHistory.map((point, index) => (
                  <div 
                    key={index} 
                    className="chart-bar" 
                    style={{height: `${(point.balance / 30000) * 100}%`}}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="balance-metrics">
            <div className="metric">
              <span className="metric-label">Average APY</span>
              <span className="metric-value">{avgAPY.toFixed(2)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Monthly Growth</span>
              <span className="metric-value">+{((totalChange / totalBalance) * 100).toFixed(2)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Liquidity Ratio</span>
              <span className="metric-value">68%</span>
            </div>
          </div>
        </div>

        {/* Account Breakdown */}
        <div className="accounts-section">
          <div className="section-header">
            <h2>Account Breakdown</h2>
            <div className="account-filters">
              <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                <option value="all">All Accounts</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
                <option value="investment">Investment</option>
              </select>
            </div>
          </div>

          <div className="accounts-grid">
            {accounts.map(account => (
              <div key={account.id} className="glass-card account-card">
                <div className="account-header">
                  <div className="account-info">
                    <h3>{account.name}</h3>
                    <span className={`account-type ${account.type}`}>{account.type}</span>
                  </div>
                  <div className="account-menu">⋮</div>
                </div>
                
                <div className="account-balance">
                  <div className="balance-amount">${account.balance.toLocaleString()}</div>
                  <div className={`balance-change ${account.change >= 0 ? 'positive' : 'negative'}`}>
                    {account.change >= 0 ? '+' : ''}${Math.abs(account.change).toLocaleString()}
                  </div>
                </div>

                <div className="account-details">
                  {account.apy > 0 && (
                    <div className="detail-row">
                      <span>APY:</span>
                      <span className="apy-rate">{account.apy}%</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span>30-day change:</span>
                    <span className={account.change >= 0 ? 'positive' : 'negative'}>
                      {((account.change / account.balance) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="account-actions">
                  <button className="action-btn">Transfer</button>
                  <button className="action-btn">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow Analysis */}
        <div className="cash-flow-section">
          <div className="glass-card cash-flow-card">
            <h2>Cash Flow Analysis</h2>
            <div className="cash-flow-visual">
              <div className="flow-item inflow">
                <div className="flow-icon">📈</div>
                <div className="flow-info">
                  <span className="flow-label">Monthly Inflow</span>
                  <span className="flow-amount positive">${cashFlow.inflow.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-item outflow">
                <div className="flow-icon">📉</div>
                <div className="flow-info">
                  <span className="flow-label">Monthly Outflow</span>
                  <span className="flow-amount negative">${cashFlow.outflow.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-item net">
                <div className="flow-icon">💰</div>
                <div className="flow-info">
                  <span className="flow-label">Net Cash Flow</span>
                  <span className="flow-amount positive">${cashFlow.net.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="cash-flow-projection">
              <h4>Next Month Projection</h4>
              <div className="projection-amount">${cashFlow.projectedNext.toLocaleString()}</div>
              <div className="projection-confidence">85% confidence</div>
            </div>
          </div>
        </div>

        {/* Financial Goals */}
        <div className="goals-section">
          <div className="glass-card goals-card">
            <h2>Financial Goals Progress</h2>
            <div className="goals-list">
              {financialGoals.map((goal, index) => (
                <div key={index} className="goal-item">
                  <div className="goal-header">
                    <div className="goal-info">
                      <h4>{goal.name}</h4>
                      <span className={`priority ${goal.priority}`}>{goal.priority} priority</span>
                    </div>
                    <div className="goal-amount">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${(goal.current / goal.target) * 100}%`}}
                      ></div>
                    </div>
                    <div className="progress-stats">
                      <span className="progress-percent">
                        {Math.round((goal.current / goal.target) * 100)}%
                      </span>
                      <span className="remaining-amount">
                        ${(goal.target - goal.current).toLocaleString()} remaining
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="glass-card metric-card">
              <h3>Debt-to-Asset Ratio</h3>
              <div className="metric-value">12.5%</div>
              <div className="metric-status good">Excellent</div>
            </div>
            
            <div className="glass-card metric-card">
              <h3>Savings Rate</h3>
              <div className="metric-value">35.2%</div>
              <div className="metric-status good">Above Average</div>
            </div>
            
            <div className="glass-card metric-card">
              <h3>Emergency Fund Ratio</h3>
              <div className="metric-value">2.6x</div>
              <div className="metric-status warning">Needs Improvement</div>
            </div>
            
            <div className="glass-card metric-card">
              <h3>Investment Allocation</h3>
              <div className="metric-value">31.8%</div>
              <div className="metric-status good">Well Balanced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;