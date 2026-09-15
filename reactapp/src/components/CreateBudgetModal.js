import React, { useState } from 'react';
import './Modal.css';

const CreateBudgetModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    description: ''
  });

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Utilities', 
    'Health', 'Education', 'Shopping', 'Travel', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const budget = {
      ...formData,
      id: Date.now(),
      budgetAmount: parseFloat(formData.budgetAmount),
      spent: 0,
      remaining: parseFloat(formData.budgetAmount)
    };
    onSave(budget);
    setFormData({
      category: '',
      budgetAmount: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content custom-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-gradient">Create New Budget</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-custom"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Budget Amount ($)</label>
            <input
              type="number"
              name="budgetAmount"
              value={formData.budgetAmount}
              onChange={handleChange}
              className="input-custom"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-custom"
              placeholder="Add notes about this budget..."
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-custom btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-custom btn-secondary">
              Create Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBudgetModal;