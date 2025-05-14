function updateParticlesForMode(mode) {
  if (typeof particlesJS !== 'function') return;

  const particleCount = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--particle-count')
  ) || 80;

  const config = {
    particles: {
      number: {
        value: particleCount,
        density: { enable: true, value_area: 800 }
      },
      color: {
        value: mode === 'dark'
          ? ["#7FFFD4", "#5F9EA0", "#00CED1"]
          : ["#034f40", "#5F9EA0", "#028476"]
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
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: ["bubble", "connect", "grab"]
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        ondiv: {
          selectors: ["header", "footer"],
          enable: false,
          mode: "repulse"
        }
      },
      modes: {
        bubble: {
          distance: 100,
          size: 8,
          duration: 0.3,
          opacity: 0.8,
          color: mode === 'dark' ? "#7FFFD4" : "#034f40"
        },
        push: {
          particles_nb: 6,
          quantity: 3
        },
        connect: {
          distance: 150,
          links: { opacity: 0.5 },
          radius: 150
        },
        grab: {
          distance: 150,
          links: {
            opacity: 0.3,
            color: mode === 'dark' ? "#7FFFD4" : "#034f40"
          }
        },
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    },
    retina_detect: true
  };

  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  particlesJS("particles-js", config);

  // Sync mouse position for better interactivity
  document.addEventListener('mousemove', function (e) {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const pJS = window.pJSDom[0].pJS;
      pJS.interactivity.mouse.pos_x = e.clientX;
      pJS.interactivity.mouse.pos_y = e.clientY;
    }
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', function () {
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  updateParticlesForMode(currentMode);
});

// Re-init on resize
window.addEventListener('resize', function () {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    updateParticlesForMode(currentMode);
  }
});
