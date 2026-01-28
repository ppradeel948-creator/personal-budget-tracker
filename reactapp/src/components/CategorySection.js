import React, { useState } from 'react';
import CreateCategory from './CreateCategory';
import './CategorySection.css';

const CategorySection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [
    { id: 1, name: 'Food & Dining', icon: '🍽️', description: 'Restaurants, groceries, and meal expenses', count: 245, budget: 800, spent: 650, type: 'expense' },
    { id: 2, name: 'Transportation', icon: '🚗', description: 'Gas, public transport, and vehicle costs', count: 128, budget: 400, spent: 320, type: 'expense' },
    { id: 3, name: 'Entertainment', icon: '🎬', description: 'Movies, games, and leisure activities', count: 89, budget: 300, spent: 280, type: 'expense' },
    { id: 4, name: 'Shopping', icon: '🛍️', description: 'Clothing, electronics, and retail purchases', count: 156, budget: 500, spent: 420, type: 'expense' },
    { id: 5, name: 'Healthcare', icon: '🏥', description: 'Medical bills, insurance, and wellness', count: 67, budget: 200, spent: 150, type: 'expense' },
    { id: 6, name: 'Utilities', icon: '⚡', description: 'Electricity, water, internet, and phone bills', count: 45, budget: 250, spent: 230, type: 'expense' },
    { id: 7, name: 'Salary', icon: '💼', description: 'Monthly salary and wages', count: 12, budget: 5000, spent: 5000, type: 'income' },
    { id: 8, name: 'Freelance', icon: '💻', description: 'Freelance work and consulting', count: 8, budget: 1500, spent: 1200, type: 'income' },
    { id: 9, name: 'Investments', icon: '📈', description: 'Dividends and investment returns', count: 15, budget: 500, spent: 350, type: 'income' },
    { id: 10, name: 'Business', icon: '🏢', description: 'Business income and profits', count: 6, budget: 2000, spent: 1800, type: 'income' }
  ];
  });

  // Save categories to localStorage whenever categories change
  React.useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  const itemsPerPage = 6;



  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = categories.slice(startIndex, startIndex + itemsPerPage);
  
  // Auto-navigate to last page when new category is added
  React.useEffect(() => {
    const newTotalPages = Math.ceil(categories.length / itemsPerPage);
    if (newTotalPages > totalPages && categories.length > 12) {
      setCurrentPage(newTotalPages);
    }
  }, [categories.length, totalPages, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateCategory = (newCategory) => {
    const category = {
      ...newCategory,
      id: Date.now(),
      count: 0,
      budget: 0,
      spent: 0
    };
    setCategories(prev => [...prev, category]);
    console.log('Category created:', category);
  };

  const handleEditCategory = (category) => {
    const newName = prompt('Edit category name:', category.name);
    const newBudget = prompt(`Edit ${category.type === 'income' ? 'target' : 'budget'} amount:`, category.budget);
    
    if (newName && newBudget) {
      setCategories(prev => prev.map(cat => 
        cat.id === category.id 
          ? { ...cat, name: newName.trim(), budget: parseFloat(newBudget) || 0 }
          : cat
      ));
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  return (
    <section className="category-section">
      <div className="container">
        <div className="category-header">
          <div className="header-content">
            <h2>Expense Categories</h2>
            <p>Organize your spending with our comprehensive category system</p>
          </div>
          <button 
            className="create-category-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Category
          </button>
        </div>

        <div className="categories-grid">
          {currentCategories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <div className="category-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEditCategory(category)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <h3>{category.name}</h3>
              <div className="category-type-badge">
                <span className={`type-badge ${category.type}`}>
                  {category.type === 'income' ? '💰 Income' : '💳 Expense'}
                </span>
              </div>
              <p>{category.description}</p>
              <div className="category-stats">
                <div className="budget-summary">
                  <div className="budget-row">
                    <span>{category.type === 'income' ? 'Target' : 'Budget'}: ${category.budget}</span>
                    <span>{category.type === 'income' ? 'Earned' : 'Spent'}: ${category.spent}</span>
                  </div>
                  <div className="budget-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${Math.min((category.spent / category.budget) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {Math.round((category.spent / category.budget) * 100)}% {category.type === 'income' ? 'achieved' : 'used'}
                    </span>
                  </div>
                </div>
                <span className="transaction-count">{category.count} transactions</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button 
            className="page-btn prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button 
            className="page-btn next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>

        <div className="category-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <h4>{categories.length}</h4>
              <p>Total Categories</p>
            </div>
            <div className="stat-item">
              <h4>{categories.reduce((sum, cat) => sum + cat.count, 0)}</h4>
              <p>Total Transactions</p>
            </div>
            <div className="stat-item">
              <h4>100%</h4>
              <p>Coverage</p>
            </div>
          </div>
        </div>

        {showCreateModal && (
          <CreateCategory
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreateCategory}
          />
        )}
      </div>
    </section>
  );
};

export default CategorySection;