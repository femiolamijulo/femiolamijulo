// Custom image reveal animation
function initImageReveal() {
  const profileImage = document.querySelector('.profile-image');
  if (!profileImage) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imageObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  imageObserver.observe(profileImage);
}

document.addEventListener('DOMContentLoaded', initImageReveal);