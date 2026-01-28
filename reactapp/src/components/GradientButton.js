import React from 'react';

const GradientButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseClass = 'btn-modern';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  
  const buttonClass = `${baseClass} ${variantClass} ${sizeClass} ${className}`;
  
  return (
    <button 
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GradientButton;