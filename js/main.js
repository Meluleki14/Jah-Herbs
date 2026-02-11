// ================= AGE VERIFICATION =================
document.addEventListener("DOMContentLoaded", () => {
  const ageModal = document.getElementById("age-modal");
  const ageYes = document.getElementById("age-yes");
  const ageNo = document.getElementById("age-no");

  // Check if age already verified
  if (localStorage.getItem("ageVerified") === "true") {
    ageModal.style.display = "none";
  } else {
    ageModal.style.display = "flex";
  }

  // User confirms age
  ageYes.addEventListener("click", () => {
    localStorage.setItem("ageVerified", "true");
    ageModal.style.display = "none";
  });

  // User is underage
  ageNo.addEventListener("click", () => {
    alert("You must be 18 or older to access this website.");
    window.location.href = "https://www.google.com";
  });
});


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// ================= MOBILE NAV TOGGLE =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});



// ================= SCROLL ANIMATIONS =================
const scrollElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight - offset);
};

const displayScrollElement = (el) => {
  el.classList.add('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});

// Run once on load in case some elements are already visible
handleScrollAnimation();



// ================= FAQ TOGGLE =================
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    // Close any open answer
    document.querySelectorAll('.faq-answer').forEach(a => {
      a.style.maxHeight = null;
      a.style.padding = '0 1rem';
    });

    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = "1rem";
    }
  });
});









// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and category cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryGrid = document.querySelector('.category-grid');
  
  // Store total count for each category
  const categoryCounts = {
    all: categoryCards.length,
    cannabis: document.querySelectorAll('[data-category="cannabis"]').length,
    edibles: document.querySelectorAll('[data-category="edibles"]').length,
    drinks: document.querySelectorAll('[data-category="drinks"]').length,
    rizzlers: document.querySelectorAll('[data-category="rizzlers"]').length
  };

  // Add click event to each filter button
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Add loading class for animation
      categoryGrid.classList.add('loading');
      
      // Small delay for smooth animation
      setTimeout(() => {
        // Filter cards
        let visibleCount = 0;
        
        categoryCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Remove loading class
        categoryGrid.classList.remove('loading');
        
        // Show "no results" message if no items found
        showNoResultsMessage(visibleCount, filterValue);
        
        // Update URL hash without refreshing page
        window.location.hash = filterValue;
      }, 300);
    });
  });

  // Function to show "no results" message
  function showNoResultsMessage(visibleCount, filterValue) {
    // Remove existing no-results message
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // If no items are visible, show message
    if (visibleCount === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      
      // Capitalize first letter of filter value
      const categoryName = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
      noResults.textContent = `No ${categoryName} products found`;
      
      categoryGrid.appendChild(noResults);
    }
  }

  // Initialize - check URL hash on page load
  function initializeFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const activeButton = document.querySelector(`[data-filter="${hash}"]`);
      if (activeButton) {
        activeButton.click();
      }
    }
  }

  // Run initialization
  initializeFromHash();

  // Add keyboard accessibility
  filterButtons.forEach(button => {
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', 'false');
    
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Update aria-selected when active changes
  function updateAriaSelected() {
    filterButtons.forEach(btn => {
      btn.setAttribute('aria-selected', btn.classList.contains('active'));
    });
  }

  // Add to click event
  filterButtons.forEach(button => {
    const originalClick = button.onclick;
    button.onclick = function(e) {
      if (originalClick) originalClick.call(this, e);
      updateAriaSelected();
    };
  });

  // Console log category counts for debugging
  console.log('Category Counts:', categoryCounts);
  console.log('Total Products:', categoryCards.length);
});

// Optional: Add lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all category card images
  document.querySelectorAll('.category-card img').forEach(img => {
    // Store original src as data-src for lazy loading
    const originalSrc = img.src;
    img.setAttribute('data-src', originalSrc);
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    imageObserver.observe(img);
  });
}














//slides
 class FreshSlider {
  constructor() {
    this.panels = document.querySelectorAll('.panel');
    this.bullets = document.querySelectorAll('.bullet');
    this.backBtn = document.querySelector('.back');
    this.forwardBtn = document.querySelector('.forward');
    
    this.current = 0;
    this.total = this.panels.length;
    
    this.init();
  }
  
  init() {
    // Buttons
    this.backBtn?.addEventListener('click', () => this.prev());
    this.forwardBtn?.addEventListener('click', () => this.next());
    
    // Bullets
    this.bullets.forEach((bullet, i) => {
      bullet.addEventListener('click', () => this.goTo(i));
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Touch
    let startX = 0;
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.prev();
        else this.next();
      }
    });
    
    // Auto play
    this.startAutoPlay();
    
    // Pause on hover
    document.querySelector('.main-wrapper').addEventListener('mouseenter', () => {
      clearInterval(this.autoPlay);
    });
    
    document.querySelector('.main-wrapper').addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });
  }
  
  goTo(index) {
    // Remove active class
    this.panels.forEach(panel => panel.classList.remove('live'));
    this.bullets.forEach(bullet => bullet.classList.remove('active'));
    
    // Update current
    this.current = (index + this.total) % this.total;
    
    // Add active class
    this.panels[this.current].classList.add('live');
    this.bullets[this.current].classList.add('active');
  }
  
  next() {
    this.goTo(this.current + 1);
    this.resetAutoPlay();
  }
  
  prev() {
    this.goTo(this.current - 1);
    this.resetAutoPlay();
  }
  
  startAutoPlay() {
    this.autoPlay = setInterval(() => this.next(), 5000);
  }
  
  resetAutoPlay() {
    clearInterval(this.autoPlay);
    this.startAutoPlay();
  }
}

// Start
new FreshSlider();