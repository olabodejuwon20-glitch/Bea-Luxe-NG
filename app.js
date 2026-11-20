/**
 * Bea Luxe NG - Interactive Engine with Animations
 * Scroll reveals, header scroll shadow, animated mobile drawer, product grid
 */

document.addEventListener("DOMContentLoaded", () => {
  let activeCategory = "All";
  let activeSearch = "";

  const PRIMARY_PHONE = "2348162040699";
  const productsContainer = document.getElementById("products-grid-container");
  const searchInput = document.getElementById("catalogue-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const viewAllBtn = document.getElementById("view-all-prod-btn");
  const siteHeader = document.querySelector(".site-header");

  // ======================================================================
  // 1. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
  // ======================================================================
  const revealElements = document.querySelectorAll(".reveal-fade-up");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: instantly show all elements
    revealElements.forEach((el) => el.classList.add("active"));
  }

  // ======================================================================
  // 2. HEADER SCROLL SHADOW
  // ======================================================================
  let lastScrollY = 0;
  let ticking = false;

  const onScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (siteHeader) {
          if (lastScrollY > 10) {
            siteHeader.classList.add("scrolled");
          } else {
            siteHeader.classList.remove("scrolled");
          }
        }

        // Active nav link based on scroll position
        updateActiveNav();

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // ======================================================================
  // 3. ACTIVE NAV LINK ON SCROLL
  // ======================================================================
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // ======================================================================
  // 4. ANIMATED MOBILE DRAWER
  // ======================================================================
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("open");
        document.body.style.overflow = "";
      } else {
        mobileDrawer.classList.add("open");
        mobileToggle.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });

    // Close drawer when a nav link is clicked
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ======================================================================
  // 5. FORMAT CURRENCY
  // ======================================================================
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return `<div class="product-price">₦15,000</div>`;
    }
    return `<div class="product-price">₦${price.toLocaleString()}</div>`;
  };

  // ======================================================================
  // 6. RENDER PRODUCT GRID (Homepage Curated Highlights)
  // ======================================================================
  const HOMEPAGE_LIMIT = 8;

  const renderProducts = () => {
    if (!productsContainer) return;

    let filtered = PRODUCTS.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const q = activeSearch.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    // If "All" is active with no search query, prioritize featured pieces & cap at 8
    if (activeCategory === "All" && activeSearch.trim() === "") {
      filtered = filtered
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .slice(0, HOMEPAGE_LIMIT);
    } else if (filtered.length > HOMEPAGE_LIMIT && activeSearch.trim() === "") {
      filtered = filtered.slice(0, HOMEPAGE_LIMIT);
    }

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="color: var(--text-muted); font-size: 1rem;">No pieces found matching this search.</p>
          <button class="btn-dark" style="margin-top: 1rem;" id="reset-filter-btn">Reset filter</button>
        </div>
      `;
      document.getElementById("reset-filter-btn")?.addEventListener("click", () => {
        activeCategory = "All";
        activeSearch = "";
        if (searchInput) searchInput.value = "";
        updateActiveFilterBtn();
        renderProducts();
      });
      return;
    }

    productsContainer.innerHTML = filtered
      .map((item, index) => {
        const waMsg = encodeURIComponent(
          `Hello Bea Luxe, I would like to inquire about "${item.name}" (Ref: ${item.id}).`
        );
        const waUrl = `https://wa.me/${PRIMARY_PHONE}?text=${waMsg}`;
        const detailUrl = `product.html?id=${encodeURIComponent(item.id)}`;
        const isAvailable = item.available !== false;
        const delayClass = `delay-${(index % 4) + 1}`;

        return `
        <article class="product-card reveal-fade-up ${delayClass}">
          <div class="product-image-box">
            ${item.featured ? `<span class="badge-featured">Featured</span>` : ""}
            <a href="${detailUrl}" class="product-image-link" aria-label="View details for ${item.name}">
              <img 
                src="${item.image}" 
                alt="${item.name}" 
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80'"
              >
            </a>
          </div>

          <div class="product-info">
            <div class="product-meta-row">
              <a href="collections.html?category=${encodeURIComponent(item.category)}" class="product-cat-pill">${item.category}</a>
              <span class="product-status-verified ${isAvailable ? "" : "soldout"}">
                ${isAvailable ? `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Available
                ` : `
                  <span class="status-dot unavailable"></span>
                  Sold out
                `}
              </span>
            </div>

            <h3 class="product-title" title="${item.name}">
              <a href="${detailUrl}" class="product-title-link">${item.name}</a>
            </h3>
            
            ${formatPrice(item.price)}

            <div class="product-card-actions">
              <a href="${detailUrl}" class="btn-card-details">
                <span>Details</span>
                <span style="font-size: 0.9em;">→</span>
              </a>
              <button class="btn-card-add-cart" onclick="BeaLuxeCart.addToCart('${item.id}', 1)" title="Add to Selection">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>+ Cart</span>
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // Re-observe dynamically rendered product cards for scroll-reveal
    const newRevealEls = productsContainer.querySelectorAll(".reveal-fade-up");
    if ("IntersectionObserver" in window) {
      const productObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              productObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );
      newRevealEls.forEach((el) => productObserver.observe(el));
    } else {
      newRevealEls.forEach((el) => el.classList.add("active"));
    }
  };

  // ======================================================================
  // 7. FILTER BUTTONS
  // ======================================================================
  const updateActiveFilterBtn = () => {
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-filter");
      updateActiveFilterBtn();
      renderProducts();
    });
  });

  // ======================================================================
  // 8. CATEGORY TILE CLICK HANDLERS (Navigate to Collections Page)
  // ======================================================================
  document.querySelectorAll(".cat-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const cat = tile.getAttribute("data-cat");
      if (cat && cat !== "All") {
        window.location.href = `collections.html?category=${encodeURIComponent(cat)}`;
      } else {
        window.location.href = "collections.html";
      }
    });
  });

  // ======================================================================
  // 9. VIEW ALL LINK
  // ======================================================================
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", (e) => {
      // Let standard link navigation to collections.html take place
    });
  }

  // ======================================================================
  // 10. SEARCH INPUT
  // ======================================================================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value;
      renderProducts();
    });
  }

  // ======================================================================
  // 11. SMOOTH SCROLL FOR ALL ANCHOR LINKS
  // ======================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ======================================================================
  // 12. HERO BANNER SLIDESHOW
  // ======================================================================
  const initHeroSlider = () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.getElementById("hero-prev-btn");
    const nextBtn = document.getElementById("hero-next-btn");
    const sliderContainer = document.getElementById("hero-slider");

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval = null;

    const showSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;

      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(i);
        resetAutoplay();
      });
    });

    const startAutoplay = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoplay);
      sliderContainer.addEventListener("mouseleave", startAutoplay);
    }

    startAutoplay();
  };

  // ======================================================================
  // INITIAL RENDER
  // ======================================================================
  initHeroSlider();
  renderProducts();
});
