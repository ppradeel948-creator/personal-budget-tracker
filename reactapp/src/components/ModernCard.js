import React from 'react';

const ModernCard = ({ children, className = '', hover = true, gradient = false }) => {
  const cardClass = `modern-card ${hover ? 'fade-in-up' : ''} ${gradient ? 'gradient-border' : ''} ${className}`;
  
  return (
    <div className={cardClass}>
      {children}
    </div>
  );
};

export default ModernCard;