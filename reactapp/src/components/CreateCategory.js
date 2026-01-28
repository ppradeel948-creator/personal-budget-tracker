import React, { useState } from 'react';
import './CreateCategory.css';

const CreateCategory = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '📁',
    type: 'expense',
    description: '',
    color: '#1e40af'
  });

  const iconOptions = ['📁', '🍽️', '🚗', '🎬', '🛍️', '🏥', '⚡', '📚', '✈️', '💪', '🏠', '🛡️', '📈', '💰', '🎯', '🔧'];
  const colorOptions = ['#1e40af', '#059669', '#dc2626', '#ea580c', '#7c3aed', '#0ea5e9', '#f59e0b', '#10b981'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
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
      <div className="create-category-modal">
        <div className="modal-header">
          <h2>Create New Category</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="form-group">
            <label>Category Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Icon</label>
            <div className="icon-selector">
              {iconOptions.map(icon => (
                <button
                  key={icon}
                  type="button"
                  className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, icon})}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-selector">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{backgroundColor: color}}
                  onClick={() => setFormData({...formData, color})}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this category"
              rows="3"
            />
          </div>

          <div className="category-preview">
            <h4>Preview</h4>
            <div className="preview-card">
              <div className="preview-icon" style={{backgroundColor: formData.color}}>
                {formData.icon}
              </div>
              <div className="preview-info">
                <h5>{formData.name || 'Category Name'}</h5>
                <span className={`preview-type ${formData.type}`}>{formData.type}</span>
                <p>{formData.description || 'Category description'}</p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;