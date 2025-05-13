document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('mode-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentMode = localStorage.getItem('mode') || (prefersDark ? 'dark' : 'light');

  // Initialize mode
  setMode(currentMode);

  // Toggle mode when button clicked
  if (modeToggle) {
    modeToggle.addEventListener('click', function() {
      const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      setMode(newMode);
      localStorage.setItem('mode', newMode);
    });
  }

  // System preference listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const newMode = e.matches ? 'dark' : 'light';
    if (!localStorage.getItem('mode')) {
      setMode(newMode);
    }
  });

  // Set active nav link
  setActiveNavLink();
});

function setMode(mode) {
  const body = document.body;
  const modeToggle = document.getElementById('mode-toggle');
  
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    if (modeToggle) modeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    if (modeToggle) modeToggle.textContent = '🌙';
  }

  if (typeof updateParticlesForMode === 'function') {
    updateParticlesForMode(mode);
  }
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = link.getAttribute('href');
    
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
      if (linkPath === '#about' || linkPath === './' || linkPath === '/') {
        link.classList.add('active');
      }
    }
    else if (linkPath && currentPath.includes(linkPath.split('/').pop())) {
      link.classList.add('active');
    }
  });
}