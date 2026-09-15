import React, { useState, useEffect } from 'react';
import { themeOptions, applyTheme, getCurrentTheme, toggleDarkMode, initializeDarkMode } from '../utils/themeUtils';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsDarkMode(initializeDarkMode());
  }, []);

  const handleThemeChange = (themeName) => {
    if (applyTheme(themeName)) {
      setCurrentTheme(themeName);
      setIsOpen(false);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = toggleDarkMode();
    setIsDarkMode(newDarkMode);
  };

  return (
    <div className="theme-selector" style={selectorStyles.container}>
      <div className="theme-controls" style={selectorStyles.controls}>
        {/* Theme Dropdown */}
        <div className="theme-dropdown" style={selectorStyles.dropdown}>
          <button 
            className="btn-custom btn-outline"
            onClick={() => setIsOpen(!isOpen)}
            style={selectorStyles.button}
          >
            <span>🎨</span>
            {themeOptions.find(t => t.value === currentTheme)?.label}
            <span className={`arrow ${isOpen ? 'up' : 'down'}`} style={isOpen ? selectorStyles.arrowUp : selectorStyles.arrowDown}>▼</span>
          </button>
          
          {isOpen && (
            <div className="dropdown-menu" style={selectorStyles.dropdownMenu}>
              {themeOptions.map((theme) => (
                <div 
                  key={theme.value}
                  className={`dropdown-item ${currentTheme === theme.value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.value)}
                  style={{
                    ...selectorStyles.dropdownItem,
                    ...(currentTheme === theme.value ? selectorStyles.dropdownItemActive : {})
                  }}
                >
                  <div className="theme-preview" style={selectorStyles.themePreview}>
                    <div className="color-palette" style={selectorStyles.colorPalette}>
                      {theme.colors.map((color, index) => (
                        <div 
                          key={index}
                          className="color-dot"
                          style={{
                            ...selectorStyles.colorDot,
                            backgroundColor: color
                          }}
                        />
                      ))}
                    </div>
                    <div className="theme-info" style={selectorStyles.themeInfo}>
                      <div className="theme-name" style={selectorStyles.themeName}>{theme.label}</div>
                      <div className="theme-desc" style={selectorStyles.themeDesc}>{theme.preview}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button 
          className="dark-mode-toggle"
          onClick={handleDarkModeToggle}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={selectorStyles.darkModeToggle}
        >
          <span className="toggle-icon" style={selectorStyles.toggleIcon}>
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </div>
  );
};

const selectorStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  dropdown: {
    position: 'relative'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    minWidth: '300px',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000,
    marginTop: '0.5rem'
  },
  dropdownItem: {
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid #e2e8f0'
  },
  dropdownItemActive: {
    background: 'rgba(16, 185, 129, 0.1)',
    borderLeft: '3px solid #10b981'
  },
  themePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  colorPalette: {
    display: 'flex',
    gap: '0.25rem'
  },
  colorDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid #e2e8f0'
  },
  themeInfo: {
    flex: 1
  },
  themeName: {
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: '0.25rem'
  },
  themeDesc: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  arrowDown: {
    transition: 'transform 0.2s ease',
    fontSize: '0.75rem'
  },
  arrowUp: {
    transition: 'transform 0.2s ease',
    fontSize: '0.75rem',
    transform: 'rotate(180deg)'
  },
  darkModeToggle: {
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  toggleIcon: {
    fontSize: '1.2rem'
  }
};

export default ThemeSelector;