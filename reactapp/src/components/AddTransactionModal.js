import React, { useState } from 'react';
import './AddTransactionModal.css';

const AddTransactionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = JSON.parse(localStorage.getItem('categories') || '[]');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.category) {
      const transaction = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      };
      onSave(transaction);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="add-transaction-modal">
        <div className="modal-header">
          <h2>Add New Transaction</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transaction description"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories
                  .filter(cat => cat.type === formData.type)
                  .map(category => (
                    <option key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="transaction-preview">
            <h4>Transaction Preview</h4>
            <div className="preview-item">
              <span className={`amount ${formData.type}`}>
                {formData.type === 'income' ? '+' : '-'}${formData.amount || '0.00'}
              </span>
              <span className="description">{formData.description || 'Transaction description'}</span>
              <span className="category">{formData.category || 'Category'}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;