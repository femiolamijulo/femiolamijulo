// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Set last updated date
  document.getElementById("last-updated").innerHTML =
    `<b>Last Updated:</b> ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;

  // Initialize scroll reveal for all elements
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Render homepage highlights (only if the container exists)
  const highlightContainer = document.getElementById("homepage-highlights");
  if (highlightContainer && typeof allNewsItems !== "undefined") {
    allNewsItems.slice(0, 3).forEach(item => {
      const article = document.createElement("article");
      article.className = "news-item visible";
      article.setAttribute("data-tags", item.tags.join(" "));
      article.setAttribute("role", "listitem");

      article.innerHTML = `
        <img src="${item.img}" alt="${item.alt}" loading="lazy" width="300" height="200">
        <div class="news-content">
          <h3><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h3>
          <p>${item.description}<br><em>Source: ${item.source}</em></p>
        </div>
      `;

      highlightContainer.appendChild(article);
    });
  }
});
