// Theme Management Utility
export const themes = {
  custom: {
    name: 'Custom Professional',
    file: 'custom-theme.css',
    description: 'Modern professional theme with deep ocean blue and emerald green',
  },
  modern: {
    name: 'Ultra Modern',
    file: 'modern-theme.css', 
    description: 'Ultra-modern design with professional business colors',
  },
  classic: {
    name: 'Classic Finance',
    file: 'theme.css',
    description: 'Classic financial theme with green accent colors',
  }
};

export const applyTheme = (themeName) => {
  // Remove existing theme stylesheets
  const existingThemes = document.querySelectorAll('link[data-theme]');
  existingThemes.forEach(link => link.remove());
  
  // Apply new theme
  const theme = themes[themeName];
  if (theme) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/styles/${theme.file}`;
    link.setAttribute('data-theme', themeName);
    document.head.appendChild(link);
    
    // Save theme preference
    localStorage.setItem('selectedTheme', themeName);
    
    return true;
  }
  return false;
};

export const getCurrentTheme = () => {
  return localStorage.getItem('selectedTheme') || 'custom';
};

export const initializeTheme = () => {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
};

// Theme toggle component data
export const themeOptions = [
  {
    value: 'custom',
    label: 'Custom Professional',
    colors: ['#0f172a', '#10b981', '#f59e0b'],
    preview: 'Modern professional with deep blues and emerald accents'
  },
  {
    value: 'modern', 
    label: 'Ultra Modern',
    colors: ['#1e40af', '#059669', '#dc2626'],
    preview: 'Ultra-modern business theme with professional colors'
  },
  {
    value: 'classic',
    label: 'Classic Finance', 
    colors: ['#00b894', '#fdcb6e', '#e17055'],
    preview: 'Traditional finance theme with green and gold'
  }
];

// Dark mode utilities
export const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  return isDark;
};

export const initializeDarkMode = () => {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  return isDark;
};