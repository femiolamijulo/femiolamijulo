const isNewsPage = window.location.pathname.includes("/sections/");
const isGitHubPages = window.location.hostname === "femiolamijulo.github.io";

// Set base path for images depending on environment and page
const BASE_PATH = isGitHubPages
  ? "/femiolamijulo/assets/news_photos/"
  : (isNewsPage ? "../assets/news_photos/" : "assets/news_photos/");

const THUMB_PATH = isGitHubPages
  ? "/femiolamijulo/assets/thumbnails/"
  : (isNewsPage ? "../assets/thumbnails/" : "assets/thumbnails/");

const allNewsItems = [
  {
    title: "Award for Outstanding Leadership",
    img: BASE_PATH + "Outstanding.webp",
    alt: "Outstanding Leadership Award in Urban Planning",
    url: "https://www.gsd.harvard.edu/urban-planning-design/fellowships-prizes-and-travel-programs/award-for-outstanding-leadership-in-urban-planning-and-urban-design/",
    description: "Recipient of the 2024 Award for Outstanding Leadership in Urban Planning and Urban Design.",
    source: "Harvard GSD",
    tags: ["award"]
  },
  {
    title: "Transforming Everett's Industrial Core",
    img: THUMB_PATH + "everett.gif",
    alt: "Everett Redevelopment",
    url: "https://www.hks.harvard.edu/faculty-research/policy-topics/cities-communities/when-proposing-redevelopment-ideas-abandoned-95",
    description: "Field Lab proposal on mixed-use redevelopment that won the 2024 Esri Innovation Prize.",
    source: "Harvard Kennedy School",
    tags: ["everett", "award"]
  },
  {
    title: "Rappaport Connects: Alumni Spotlight",
    img: BASE_PATH + "Rappaport.webp",
    alt: "Rappaport Interview",
    url: "https://www.youtube.com/watch?v=SP8k8oyuAMc",
    description: "Interviewed on planning, equity, and GIS during and after Harvard.",
    source: "Rappaport Institute",
    tags: ["storytelling"]
  },
  {
    title: "2024 Esri Innovation Award",
    img: BASE_PATH + "EIP_award.webp",
    alt: "Esri Innovation Award",
    url: "https://gis.harvard.edu/news/2024-eip-award-winner",
    description: "Recognized for using geospatial storytelling in equity-focused planning.",
    source: "Harvard CGA",
    tags: ["award"]
  },
  {
    title: "Harvard CGA March 2024 Update",
    img: BASE_PATH + "Everett_HKS.webp",
    alt: "CGA 2024 News Archive",
    url: "https://gis.harvard.edu/news/archive/2024-03",
    description: "Work on spatial storytelling featured in the Center for Geographic Analysis’ spring roundup.",
    source: "Harvard CGA",
    tags: ["storytelling", "award"]
  },
  
  {
    title: "Presentation at Everett City Hall",
    img: BASE_PATH + "everett_independent.webp",
    alt: "City Hall Presentation",
    url: "https://everettindependent.com/2023/05/10/harvard-kennedy-students-present-at-city-hall/",
    description: "Shared green corridor concepts with local officials and residents.",
    source: "Everett Independent",
    tags: ["everett"]
  },
  {
    title: "Everett Community Presentation",
    img: BASE_PATH + "everett_advocate.webp",
    alt: "Everett Community Presentation",
    url: "https://advocatenews.net/everett/news/harvard-kennedy-school-students-present-at-city-hall/",
    description: "Featured in the Advocate for presenting mixed-use corridor concepts to local leaders in Everett, MA.",
    source: "Advocate News",
    tags: ["everett"]
  },
  {
    title: "GreenEconomiX: SDG Project Spotlight",
    img: BASE_PATH + "GLC.webp",
    alt: "GreenEconomiX SDG Project",
    url: "https://www.leadership-challenge.org/sdg-projects/greeneconomix%3A-minimizing-barriers%2C-maximizing-impact",
    description: "Recognized by the Leadership Challenge for work on minimizing barriers to green infrastructure in Africa.",
    source: "Leadership Challenge",
    tags: ["award", "storytelling"]
  },
  {
    title: "Harvard HCIP Fellowship",
    img: BASE_PATH + "Headshot.webp",
    alt: "HCIP Fellowship Announcement",
    url: "https://www.hks.harvard.edu/centers/mrcbg/programs/hcip/fellows",
    description: "Selected as a 2024 Fellow of the Harvard Climate and Infrastructure Policy Program.",
    source: "Harvard M-RCBG",
    tags: ["award", "everett"]
  },
  {
    title: "Stories We Should Tell",
    img: BASE_PATH + "Stories_we_should_tell.webp",
    alt: "Storytelling Exhibit",
    url: "https://www.gsd.harvard.edu/exhibition/stories-we-should-tell/",
    description: "Featured in a GSD exhibit uplifting African and diasporic spatial storytelling.",
    source: "Harvard GSD",
    tags: ["storytelling"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container =
    document.getElementById("news-container") ||
    document.getElementById("homepage-highlights");

  if (!container) return;

  const isHomepage = (
    container.id === "homepage-highlights" ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname.endsWith("/femiolamijulo/") ||
    window.location.pathname === "/femiolamijulo/index.html"
  );

  // Homepage shows 3, news page shows all (but may hide some initially)
  const initialLoadCount = isHomepage ? 3 : allNewsItems.length;
  const itemsToRender = allNewsItems.slice(0, initialLoadCount);

  // Inject all items (but news page will hide extras via CSS/JS)
  allNewsItems.forEach(item => {
    const article = document.createElement("article");
    article.className = "news-item";
    article.setAttribute("data-tags", item.tags.join(" "));
    article.setAttribute("role", "listitem");

    article.innerHTML = `
      <img src="${item.img}" alt="${item.alt}" loading="lazy" width="300" height="200">
      <div class="news-content">
        <h3><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h3>
        <p>${item.description}<br><em>Source: ${item.source}</em></p>
      </div>
    `;

    container.appendChild(article);
  });

  // Homepage: Only show first 3 items
  if (isHomepage) {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
      if (index >= 3) {
        item.style.display = 'none';
      }
    });
  }

  // Scroll reveal (unchanged)
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach((el) => observer.observe(el));

  // Filtering + batching only on news page
  if (!isHomepage) {
    const filterButtons = document.querySelectorAll('.filter-button[data-tag]');
    const newsItems = document.querySelectorAll('.news-item');
    const noNews = document.querySelector('.no-news');
    const viewMoreButton = document.getElementById('view-more-button');
    const ITEMS_PER_BATCH = 3;

    function updateVisibility() {
      let visibleCount = 0;
      let shown = 0;

      newsItems.forEach(item => {
        if (item.classList.contains('visible')) {
          visibleCount++;
          if (shown < ITEMS_PER_BATCH) {
            item.style.display = '';
            shown++;
          } else {
            item.style.display = 'none';
          }
          item.removeAttribute('hidden');
        } else {
          item.setAttribute('hidden', 'true');
          item.style.display = 'none';
        }
      });

      noNews.classList.toggle('visible', visibleCount === 0);
      viewMoreButton.style.display = (visibleCount > ITEMS_PER_BATCH) ? 'inline-block' : 'none';
    }

    function revealNextBatch() {
      let shown = 0;
      newsItems.forEach(item => {
        if (item.classList.contains('visible') && item.style.display === 'none') {
          item.style.display = '';
          shown++;
          if (shown >= ITEMS_PER_BATCH) return;
        }
      });

      const remaining = Array.from(newsItems).filter(item =>
        item.classList.contains('visible') && item.style.display === 'none'
      );
      viewMoreButton.style.display = remaining.length > 0 ? 'inline-block' : 'none';
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.dataset.tag;
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        newsItems.forEach(item => {
          const tags = item.dataset.tags.toLowerCase().split(' ');
          if (tag === 'all' || tags.includes(tag)) {
            item.classList.add('visible');
          } else {
            item.classList.remove('visible');
          }
        });

        updateVisibility();
      });
    });

    // Initialize - show all items by default on news page
    newsItems.forEach(item => item.classList.add('visible'));
    updateVisibility();
    
    viewMoreButton.addEventListener('click', revealNextBatch);
  }
});