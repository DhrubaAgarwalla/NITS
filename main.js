/* ==========================================================================
   NITS-FIIE GLOBAL INTERACTIVE LOGIC (ES6 JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- PREMIUM DYNAMIC TOP PAGE LOADER ---
  const loader = document.createElement('div');
  loader.id = 'page-preloader';
  document.body.prepend(loader);

  // Progressive simulation
  setTimeout(() => {
    loader.style.transform = 'scaleX(0.4)';
  }, 40);
  setTimeout(() => {
    loader.style.transform = 'scaleX(0.75)';
  }, 180);

  const completeLoad = () => {
    if (document.getElementById('page-preloader')) {
      loader.style.transform = 'scaleX(1)';
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 350);
      }, 100);
    }
  };

  // Listen to full window load
  window.addEventListener('load', completeLoad);
  // Fail-safe in case load event already fired or is delayed
  setTimeout(completeLoad, 1200);
  

  // --- STICKY HEADER & SCROLL HANDLING ---
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially in case page is refreshed while scrolled

  // --- MOBILE DRAWER NAVIGATION & MOBILE SUB-DROPDOWNS ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    // Mobile submenu toggle
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Only run on mobile viewport
        if (window.innerWidth <= 768) {
          const parentItem = link.parentElement;
          const hasDropdown = parentItem.querySelector('.dropdown-menu');

          if (hasDropdown) {
            // Prevent navigating on mobile viewport to allow dropdown expansion
            e.preventDefault();
            parentItem.classList.toggle('active-mobile-dropdown');
          }
        }
      });
    });
  }

  // Close mobile drawer when clicking non-dropdown links
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
      }
    });
  });

  // --- NAVIGATION ACTIVE LINK HIGHLIGHTER ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    // Standard links
    const link = item.querySelector('.nav-link');
    if (link) {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath) {
        item.classList.add('active');
      }
    }

    // Dropdown links check
    const sublinks = item.querySelectorAll('.dropdown-link');
    sublinks.forEach(sublink => {
      const sublinkPath = sublink.getAttribute('href');
      if (sublinkPath === currentPath) {
        item.classList.add('active');
        sublink.style.color = 'var(--secondary)';
        sublink.style.fontWeight = '700';
      }
    });
  });

  // --- GLOBAL SEARCH MODAL UTILITIES ---
  const searchBtns = document.querySelectorAll('.search-btn');
  const searchModal = document.querySelector('.search-modal');
  const searchClose = document.querySelector('.search-modal-close');
  const searchField = document.querySelector('.search-field');

  if (searchModal && searchBtns.length > 0) {
    searchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        searchModal.classList.add('active');
        body.classList.add('no-scroll');
        setTimeout(() => searchField && searchField.focus(), 300);
      });
    });

    const closeSearch = () => {
      searchModal.classList.remove('active');
      body.classList.remove('no-scroll');
      if (searchField) searchField.value = '';
    };

    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }

    // Close on pressing Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    // Dummy submission handling
    const searchForm = searchModal.querySelector('form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchField ? searchField.value.trim() : '';
        if (query) {
          alert(`Searching NITS-FIIE archives for: "${query}"...\n(Search integration simulation complete)`);
          closeSearch();
        }
      });
    }
  }

  // --- GOVERNANCE TABS SWITCHER (ABOUT PAGE) ---
  const tabButtons = document.querySelectorAll('.gov-tab-btn');
  const tabPanels = document.querySelectorAll('.gov-tab-panel');

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        // Remove active state
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active state
        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // --- DYNAMIC STARTUP & TECH FILTERING (INCUBATION & IP PAGES) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length > 0 && portfolioCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        portfolioCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            // Subtle transition back in
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- NEWSLETTER SUBSCRIPTION SIMULATOR ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email) {
        alert(`Thank you for subscribing to NITS-FIIE newsletter with: ${email}!`);
        if (emailInput) emailInput.value = '';
      }
    });
  }

  // --- CONTACT FORM SUBMISSION SIMULATOR ---
  const contactForm = document.querySelector('.contact-form-section form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && email && subject && message) {
        alert(`Thank you, ${name}! Your message regarding "${subject}" has been submitted to NITS-FIIE.\nWe will respond to you shortly at ${email}.`);
        contactForm.reset();
      } else {
        alert('Please fill out all fields before submitting.');
      }
    });
  }

  // --- SCROLL REVEAL Progressive ANIMATIONS ---
  const revealElements = document.querySelectorAll('.pillar-card, .news-card, .section-title-wrapper, .stat-item, .contact-wrapper, .portfolio-card, .team-card');
  
  revealElements.forEach(el => el.classList.add('scroll-reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
