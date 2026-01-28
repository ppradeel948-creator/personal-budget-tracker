import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  // const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [activeInsight, setActiveInsight] = useState('spending');

  const aiInsights = {
    spending: [
      { type: 'warning', title: 'Unusual Spending Pattern', desc: 'Your food expenses increased 35% this month vs average', action: 'Review dining habits' },
      { type: 'success', title: 'Great Progress!', desc: 'Transportation costs down 20% due to remote work', action: 'Continue current pattern' },
      { type: 'info', title: 'Seasonal Trend', desc: 'Utility bills typically rise 15% in winter months', action: 'Budget accordingly' }
    ],
    predictions: [
      { metric: 'Monthly Expenses', current: 3250, predicted: 3420, confidence: 87 },
      { metric: 'Savings Goal', current: 2400, predicted: 2650, confidence: 92 },
      { metric: 'Budget Variance', current: 12.5, predicted: 8.3, confidence: 78 }
    ],
    recommendations: [
      { title: 'Optimize Food Budget', impact: '$180/month', desc: 'Cook 2 more meals at home weekly' },
      { title: 'Automate Savings', impact: '$300/month', desc: 'Set up automatic transfer on payday' },
      { title: 'Review Subscriptions', impact: '$45/month', desc: '3 unused subscriptions detected' }
    ]
  };

  const spendingTrends = [
    { month: 'Jul', food: 1200, transport: 800, entertainment: 400, utilities: 350, shopping: 300 },
    { month: 'Aug', food: 1150, transport: 750, entertainment: 450, utilities: 380, shopping: 320 },
    { month: 'Sep', food: 1300, transport: 700, entertainment: 380, utilities: 360, shopping: 280 },
    { month: 'Oct', food: 1250, transport: 850, entertainment: 420, utilities: 390, shopping: 350 },
    { month: 'Nov', food: 1400, transport: 650, entertainment: 500, utilities: 410, shopping: 400 },
    { month: 'Dec', food: 1650, transport: 600, entertainment: 600, utilities: 450, shopping: 550 }
  ];

  const financialHealth = {
    score: 78,
    factors: [
      { name: 'Savings Rate', score: 85, status: 'excellent' },
      { name: 'Budget Adherence', score: 72, status: 'good' },
      { name: 'Debt Management', score: 90, status: 'excellent' },
      { name: 'Emergency Fund', score: 65, status: 'fair' },
      { name: 'Investment Diversity', score: 55, status: 'needs improvement' }
    ]
  };

  return (
    <div className="analytics">
      <div className="container">
        <div className="analytics-header">
          <h1 className="holo-text">AI-Powered Analytics</h1>
          <p>Advanced insights and predictions for your financial future</p>
        </div>

        {/* Financial Health Score */}
        <div className="glass-card health-score-card">
          <div className="health-score-header">
            <h2>Financial Health Score</h2>
            <div className="score-circle">
              <div className="score-value">{financialHealth.score}</div>
              <div className="score-label">Good</div>
            </div>
          </div>
          <div className="health-factors">
            {financialHealth.factors.map((factor, index) => (
              <div key={index} className="factor-item">
                <div className="factor-info">
                  <span className="factor-name">{factor.name}</span>
                  <span className={`factor-status ${factor.status.replace(' ', '-')}`}>
                    {factor.status}
                  </span>
                </div>
                <div className="factor-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${factor.score}%`}}
                    ></div>
                  </div>
                  <span className="factor-score">{factor.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Tabs */}
        <div className="insights-tabs">
          <button 
            className={`tab-btn ${activeInsight === 'spending' ? 'active' : ''}`}
            onClick={() => setActiveInsight('spending')}
          >
            🧠 Smart Insights
          </button>
          <button 
            className={`tab-btn ${activeInsight === 'predictions' ? 'active' : ''}`}
            onClick={() => setActiveInsight('predictions')}
          >
            🔮 Predictions
          </button>
          <button 
            className={`tab-btn ${activeInsight === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveInsight('recommendations')}
          >
            💡 Recommendations
          </button>
        </div>

        {/* AI Insights Content */}
        <div className="insights-content">
          {activeInsight === 'spending' && (
            <div className="insights-grid">
              {aiInsights.spending.map((insight, index) => (
                <div key={index} className={`glass-card insight-card ${insight.type}`}>
                  <div className="insight-header">
                    <div className={`insight-icon ${insight.type}`}>
                      {insight.type === 'warning' && '⚠️'}
                      {insight.type === 'success' && '✅'}
                      {insight.type === 'info' && 'ℹ️'}
                    </div>
                    <h3>{insight.title}</h3>
                  </div>
                  <p className="insight-desc">{insight.desc}</p>
                  <button className="insight-action">{insight.action}</button>
                </div>
              ))}
            </div>
          )}

          {activeInsight === 'predictions' && (
            <div className="predictions-grid">
              {aiInsights.predictions.map((pred, index) => (
                <div key={index} className="glass-card prediction-card">
                  <h3>{pred.metric}</h3>
                  <div className="prediction-values">
                    <div className="current-value">
                      <span className="label">Current</span>
                      <span className="value">${pred.current.toLocaleString()}</span>
                    </div>
                    <div className="predicted-value">
                      <span className="label">Predicted</span>
                      <span className="value">${pred.predicted.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="confidence-meter">
                    <span className="confidence-label">Confidence: {pred.confidence}%</span>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill" 
                        style={{width: `${pred.confidence}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeInsight === 'recommendations' && (
            <div className="recommendations-grid">
              {aiInsights.recommendations.map((rec, index) => (
                <div key={index} className="glass-card recommendation-card">
                  <div className="rec-header">
                    <h3>{rec.title}</h3>
                    <div className="impact-badge">{rec.impact}</div>
                  </div>
                  <p className="rec-desc">{rec.desc}</p>
                  <div className="rec-actions">
                    <button className="neon-btn">Apply</button>
                    <button className="btn-outline">Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advanced Charts */}
        <div className="advanced-charts">
          <div className="glass-card trend-analysis">
            <h2>Spending Trend Analysis</h2>
            <div className="trend-chart-container">
              <div className="trend-chart">
                {spendingTrends.map((month, index) => (
                  <div key={index} className="trend-month">
                    <div className="month-label">{month.month}</div>
                    <div className="trend-stack">
                      <div className="stack-bar food" style={{height: `${(month.food / 2000) * 100}%`}}></div>
                      <div className="stack-bar transport" style={{height: `${(month.transport / 2000) * 100}%`}}></div>
                      <div className="stack-bar entertainment" style={{height: `${(month.entertainment / 2000) * 100}%`}}></div>
                      <div className="stack-bar utilities" style={{height: `${(month.utilities / 2000) * 100}%`}}></div>
                      <div className="stack-bar shopping" style={{height: `${(month.shopping / 2000) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="trend-legend">
                <div className="legend-item"><div className="legend-color food"></div>Food</div>
                <div className="legend-item"><div className="legend-color transport"></div>Transport</div>
                <div className="legend-item"><div className="legend-color entertainment"></div>Entertainment</div>
                <div className="legend-item"><div className="legend-color utilities"></div>Utilities</div>
                <div className="legend-item"><div className="legend-color shopping"></div>Shopping</div>
              </div>
            </div>
          </div>

          <div className="glass-card goal-tracker">
            <h2>Smart Goal Tracking</h2>
            <div className="goals-list">
              <div className="goal-item">
                <div className="goal-info">
                  <h4>Emergency Fund</h4>
                  <p>Target: $10,000 by Dec 2024</p>
                </div>
                <div className="goal-progress">
                  <div className="progress-circle">
                    <div className="circle-progress" style={{'--progress': '65%'}}>
                      <span>65%</span>
                    </div>
                  </div>
                  <div className="goal-details">
                    <span className="current">$6,500</span>
                    <span className="remaining">$3,500 to go</span>
                  </div>
                </div>
              </div>
              
              <div className="goal-item">
                <div className="goal-info">
                  <h4>Vacation Fund</h4>
                  <p>Target: $5,000 by Jun 2024</p>
                </div>
                <div className="goal-progress">
                  <div className="progress-circle">
                    <div className="circle-progress" style={{'--progress': '40%'}}>
                      <span>40%</span>
                    </div>
                  </div>
                  <div className="goal-details">
                    <span className="current">$2,000</span>
                    <span className="remaining">$3,000 to go</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;