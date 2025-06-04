document.addEventListener('DOMContentLoaded', () => {
  try {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
      console.error('Theme toggle button not found');
      return;
    }

    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) {
      console.error('Theme icon not found');
      return;
    }

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      const initialTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', initialTheme);
      updateThemeIcon(initialTheme);
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Update theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);

      // Force a repaint to ensure styles are applied
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    });

    // Update theme icon
    function updateThemeIcon(theme) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
      }
    });

    console.log('Theme toggle initialized successfully');
  } catch (error) {
    console.error('Error initializing theme toggle:', error);
  }
}); 