import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    goalName: '',
    goalType: 'SAVINGS',
    targetAmount: '',
    currentAmount: '0',
    targetDate: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/goals', formData);
      setGoals([...goals, response.data]);
      setFormData({
        goalName: '',
        goalType: 'SAVINGS',
        targetAmount: '',
        currentAmount: '0',
        targetDate: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateProgress = (current, target) => {
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  };

  if (loading) {
    return <div className="loading">Loading goals...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Financial Goals</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Create New Goal</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Goal Name</label>
              <input
                type="text"
                name="goalName"
                className="form-control"
                value={formData.goalName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Goal Type</label>
              <select
                name="goalType"
                className="form-control"
                value={formData.goalType}
                onChange={handleChange}
                required
              >
                <option value="SAVINGS">Savings</option>
                <option value="DEBT_PAYOFF">Debt Payoff</option>
                <option value="INVESTMENT">Investment</option>
                <option value="EMERGENCY_FUND">Emergency Fund</option>
                <option value="MAJOR_PURCHASE">Major Purchase</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Amount</label>
              <input
                type="number"
                name="targetAmount"
                className="form-control"
                value={formData.targetAmount}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Amount</label>
              <input
                type="number"
                name="currentAmount"
                className="form-control"
                value={formData.currentAmount}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Date</label>
              <input
                type="date"
                name="targetDate"
                className="form-control"
                value={formData.targetDate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Create Goal
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Your Goals</h3>
        {goals.length > 0 ? (
          <div className="dashboard-grid">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              return (
                <div key={goal.id} className="card">
                  <h4>{goal.goalName}</h4>
                  <p><strong>Type:</strong> {goal.goalType}</p>
                  <p><strong>Target:</strong> ${goal.targetAmount?.toFixed(2)}</p>
                  <p><strong>Current:</strong> ${goal.currentAmount?.toFixed(2)}</p>
                  <p><strong>Target Date:</strong> {new Date(goal.targetDate).toLocaleDateString()}</p>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '0.5rem' 
                    }}>
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '10px', 
                      backgroundColor: '#e0e0e0', 
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${progress}%`, 
                        height: '100%', 
                        backgroundColor: progress >= 100 ? '#27ae60' : '#3498db',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                  
                  {goal.isAchieved && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.5rem', 
                      backgroundColor: '#d4edda', 
                      color: '#155724', 
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}>
                      🎉 Goal Achieved!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No goals found. Set your first financial goal!</p>
        )}
      </div>
    </div>
  );
};

export default Goals;