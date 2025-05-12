/**
* Template Name: UpConstruction - v1.3.0
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /** 
   * Contact and Quote Form Event Listeners
   */
  const setupFormSubmission = (formId, actionUrl) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      let formData = new FormData(form);
      let loadingMessage = form.querySelector(".loading");
      let errorMessage = form.querySelector(".error-message");
      let successMessage = form.querySelector(".sent-message");

      loadingMessage.style.display = "block";
      errorMessage.style.display = "none";
      successMessage.style.display = "none";

      try {
        let response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        loadingMessage.style.display = "none";

        if (response.ok) {
          successMessage.style.display = "block";
          form.reset();
        } else {
          errorMessage.textContent = "Something went wrong. Please try again.";
          errorMessage.style.display = "block";
        }
      } catch (error) {
        loadingMessage.style.display = "none";
        errorMessage.textContent = "Network error. Please try again later.";
        errorMessage.style.display = "block";
      }
    });
  };

  setupFormSubmission("contactForm", "https://formspree.io/f/mwporknn");
  setupFormSubmission("quoteForm", "https://formspree.io/f/meogrqlo");
});

/* document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let form = event.target;
    let formData = new FormData(form);
    let loadingMessage = document.querySelector(".loading");
    let errorMessage = document.querySelector(".error-message");
    let successMessage = document.querySelector(".sent-message");

    // Show loading message
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    try {
        let response = await fetch("https://formspree.io/f/xvgkooly", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        let result = await response.json();

        // Hide loading
        loadingMessage.style.display = "none";

        if (result.ok) {
            successMessage.style.display = "block";
            form.reset(); // Reset form fields after successful submission
        } else {
            errorMessage.textContent = "Something went wrong. Please try again.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        loadingMessage.style.display = "none";
        errorMessage.textContent = "Network error. Please try again later.";
        errorMessage.style.display = "block";
    }
});

document.getElementById("quoteForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let form = event.target;
    let formData = new FormData(form);
    let loadingMessage = form.querySelector(".loading");
    let errorMessage = form.querySelector(".error-message");
    let successMessage = form.querySelector(".sent-message");

    // Show loading message
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    try {
        let response = await fetch("https://formspree.io/f/xkgjnnyy", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        let result = await response.json();

        // Hide loading
        loadingMessage.style.display = "none";

        if (result.ok) {
            successMessage.style.display = "block";
            form.reset(); // Reset form fields after successful submission
        } else {
            errorMessage.textContent = "Something went wrong. Please try again.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        loadingMessage.style.display = "none";
        errorMessage.textContent = "Network error. Please try again later.";
        errorMessage.style.display = "block";
    }
}); */