document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('mode-toggle');
  const tooltip = modeToggle?.querySelector('.mode-tooltip');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentMode = localStorage.getItem('mode') || (prefersDark ? 'dark' : 'light');

  // Initialize mode
  setMode(currentMode);

  // Toggle mode when button clicked
  modeToggle?.addEventListener('click', function() {
    const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  });

  // System preference listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('mode')) {
      setMode(e.matches ? 'dark' : 'light');
    }
  });

  function setMode(mode) {
    const body = document.body;
    
    if (mode === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      modeToggle?.setAttribute('aria-label', 'Switch to light mode');
      if (tooltip) tooltip.textContent = 'Switch to Light Mode';
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      modeToggle?.setAttribute('aria-label', 'Switch to dark mode');
      if (tooltip) tooltip.textContent = 'Switch to Dark Mode';
    }

    if (typeof updateParticlesForMode === 'function') {
      updateParticlesForMode(mode);
    }
  }
});