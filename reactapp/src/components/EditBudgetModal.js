import React, { useState } from 'react';
import './EditBudgetModal.css';

const EditBudgetModal = ({ budget, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: budget.name,
    allocated: budget.allocated,
    spent: budget.spent,
    color: budget.color
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBudget = {
      ...budget,
      ...formData,
      remaining: formData.allocated - formData.spent
    };
    onSave(updatedBudget);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'allocated' || name === 'spent' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="edit-budget-modal">
        <div className="modal-header">
          <h2>Edit Budget Category</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="budget-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Allocated Amount</label>
              <input
                type="number"
                name="allocated"
                value={formData.allocated}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Spent Amount</label>
              <input
                type="number"
                name="spent"
                value={formData.spent}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="budget-preview">
            <h4>Budget Summary</h4>
            <div className="preview-stats">
              <div className="stat">
                <span>Allocated:</span>
                <span>${formData.allocated}</span>
              </div>
              <div className="stat">
                <span>Spent:</span>
                <span>${formData.spent}</span>
              </div>
              <div className="stat">
                <span>Remaining:</span>
                <span className={formData.allocated - formData.spent >= 0 ? 'positive' : 'negative'}>
                  ${formData.allocated - formData.spent}
                </span>
              </div>
              <div className="stat">
                <span>Usage:</span>
                <span>{Math.round((formData.spent / formData.allocated) * 100) || 0}%</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgetModal;