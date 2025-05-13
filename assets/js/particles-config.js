// assets/js/particles-config.js
function updateParticlesForMode(mode) {
  if (typeof particlesJS !== 'function') return;

  // Get particle count from CSS variable (default 80, 40 on mobile)
  const particleCount = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--particle-count')) || 80;

  const config = {
    particles: {
      number: { 
        value: particleCount, 
        density: { enable: true, value_area: 800 } 
      },
      color: {
        value: mode === 'dark'
          ? ["#7FFFD4", "#5F9EA0", "#00CED1"]  // Light colors for dark mode
          : ["#034f40", "#5F9EA0", "#028476"]  // Darker colors for light mode
      },
      shape: { type: "circle" },
      opacity: {
        value: 0.7,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1 }
      },
      size: {
        value: 4,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1 }
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: mode === 'dark' ? "#7FFFD4" : "#cdece3",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        bubble: { 
          distance: 100, 
          size: 8, 
          duration: 0.3,
          color: mode === 'dark' ? "#7FFFD4" : "#034f40"
        },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  };

  // Destroy existing particles before reinitializing
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  particlesJS("particles-js", config);
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', function() {
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  updateParticlesForMode(currentMode);
});

// Export for Node.js environment if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { updateParticlesForMode };
}