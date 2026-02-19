jQuery( document ).ready(function( $ ) {


	"use strict";


    
        $(function() {
            $( "#tabs" ).tabs();
        });


        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });       

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
          } else {
            $("header").removeClass("background-header");
          }
        });
		if ($('.owl-testimonials').length) {
            $('.owl-testimonials').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 2,
                        margin: 30
                    }
                }
            });
        }
        if ($('.owl-partners').length) {
            $('.owl-partners').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 4,
                        margin: 30
                    }
                }
            });
        }

        $(".Modern-Slider").slick({
            autoplay:true,
            autoplaySpeed:10000,
            speed:600,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
        });

        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }

        $(window).scroll(function(){

          if(visible($('.count-digit')))
            {
              if($('.count-digit').hasClass('counter-loaded')) return;
              $('.count-digit').addClass('counter-loaded');
              
        $('.count-digit').each(function () {
          var $this = $(this);
          jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter));
            }
          });
        });
        }
    })
 
});











// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and category cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryGrid = document.querySelector('.category-grid');
  
  // Create container for no results message
  const noResultsDiv = document.createElement('div');
  noResultsDiv.className = 'no-results';
  noResultsDiv.style.display = 'none';
  categoryGrid.appendChild(noResultsDiv);
  
  // Store total count for each category
  const categoryCounts = {
    all: categoryCards.length,
    cannabis: document.querySelectorAll('[data-category="cannabis"]').length,
    edibles: document.querySelectorAll('[data-category="edibles"]').length,
    drinks: document.querySelectorAll('[data-category="drinks"]').length,
    rizzlers: document.querySelectorAll('[data-category="rizzlers"]').length
  };
  
  // Function to show no results message
  function showNoResultsMessage(visibleCount, filterValue) {
    if (visibleCount === 0) {
      const categoryName = filterValue === 'all' ? 'products' : filterValue;
      noResultsDiv.innerHTML = `
        <p>😢 No ${categoryName} found</p>
        <button class="reset-filters" onclick="resetFilters()">View All Products</button>
      `;
      noResultsDiv.style.display = 'block';
    } else {
      noResultsDiv.style.display = 'none';
    }
  }
  
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
  
  // Reset filters function
  window.resetFilters = function() {
    // Trigger click on All Products button
    document.querySelector('[data-filter="all"]').click();
  };
  
  // Check URL hash on page load
  if (window.location.hash) {
    const filterValue = window.location.hash.substring(1);
    const targetButton = document.querySelector(`[data-filter="${filterValue}"]`);
    if (targetButton) {
      targetButton.click();
    }
  }
});






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
















