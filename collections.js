/**
 * Bea Luxe NG - Collections Page Engine
 * Handles dynamic filtering, category tabs, instant search, sorting, and URL sync
 */

document.addEventListener("DOMContentLoaded", () => {
  const PRIMARY_PHONE = "2348162040699";
  const productsContainer = document.getElementById("collections-grid-container");
  const searchInput = document.getElementById("collections-search");
  const sortSelect = document.getElementById("collections-sort");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resultsCountEl = document.getElementById("results-count-text");
  const spotlightBanner = document.getElementById("category-spotlight");
  const spotlightTitle = document.getElementById("spotlight-title");
  const spotlightDesc = document.getElementById("spotlight-desc");
  const clearFilterBtn = document.getElementById("clear-filter-btn");

  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const siteHeader = document.querySelector(".site-header");

  // Category Curatorial Descriptions
  const CATEGORY_EDITORIALS = {
    "Unisex Wears": "Tailored European flax linen, raw silk layering pieces, and heavyweight organic cotton coordinates designed for fluid, effortless dressing.",
    "Footwear": "Handcrafted Belgian loafers, Italian Nappa trainers, and weather-resistant nubuck boots built with Goodyear and Blake construction.",
    "Bags": "Architectural top-handles, travel holdalls, and minimalist crossbodies tailored from pebbled calfskin and British waxed canvas.",
    "Perfumes": "Artisanal fragrances crafted at 25-30% high oil concentrations with aged Assam oud, Calabrian bergamot, and Bourbon vanilla for enduring sillage.",
    "Fashion Accessories": "18K Gold Vermeil jewelry, Italian bio-acetate eyewear, and 16-momme mulberry silk squares crafted to elevate everyday ensembles.",
    "Kitchen Items": "Culinary instruments including 67-layer Damascus chef knives, enameled heavy cast iron braisers, and precision digital kettles.",
    "Household Items": "Finishing touches for modern spaces — natural unfilled travertine stone bookends, clean coconut-soy candles, and cordless ambient lamps."
  };

  // Parse initial state from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get("category") || "All";
  let activeSearch = urlParams.get("q") || "";
  let activeSort = "featured";

  // If search was in URL, set input
  if (searchInput && activeSearch) {
    searchInput.value = activeSearch;
  }

  // ======================================================================
  // 1. MOBILE DRAWER & HEADER SCROLL
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

    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (siteHeader) {
      if (window.scrollY > 10) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
  }, { passive: true });

  // ======================================================================
  // 2. FORMAT PRICE
  // ======================================================================
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return `<div class="product-price on-request">Price on request</div>`;
    }
    return `<div class="product-price">₦${price.toLocaleString()}</div>`;
  };

  // ======================================================================
  // 3. UPDATE URL SEARCH PARAMS
  // ======================================================================
  const syncUrl = () => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (activeSearch.trim()) params.set("q", activeSearch.trim());
    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, "", newQuery);
  };

  // ======================================================================
  // 4. RENDER SPOTLIGHT BANNER
  // ======================================================================
  const renderSpotlight = () => {
    if (!spotlightBanner) return;
    if (activeCategory !== "All" && CATEGORY_EDITORIALS[activeCategory]) {
      spotlightBanner.style.display = "flex";
      spotlightTitle.textContent = activeCategory;
      spotlightDesc.textContent = CATEGORY_EDITORIALS[activeCategory];
    } else {
      spotlightBanner.style.display = "none";
    }
  };

  // ======================================================================
  // 5. UPDATE ACTIVE FILTER BUTTON
  // ======================================================================
  const updateActiveFilterButtons = () => {
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  // ======================================================================
  // 6. RENDER COLLECTIONS GRID
  // ======================================================================
  const renderCollections = () => {
    if (!productsContainer) return;

    let items = PRODUCTS.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const q = activeSearch.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    // Apply Sorting
    if (activeSort === "name-asc") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === "name-desc") {
      items.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // "featured" default: featured items first, then alphabetical
      items.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    // Update count display
    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <strong>${items.length}</strong> of <strong>${PRODUCTS.length}</strong> pieces`;
    }

    renderSpotlight();
    syncUrl();

    if (items.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1.5rem; background: #ffffff; border: 1px solid var(--border-light); border-radius: var(--radius-sm);">
          <p style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--forest-dark); margin-bottom: 0.5rem;">No pieces found</p>
          <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 420px; margin: 0 auto 1.5rem;">We couldn't find any pieces matching your current filters. Try resetting or searching for another keyword.</p>
          <button class="btn-dark" id="collections-reset-btn">View All ${PRODUCTS.length} Pieces</button>
        </div>
      `;
      document.getElementById("collections-reset-btn")?.addEventListener("click", () => {
        activeCategory = "All";
        activeSearch = "";
        if (searchInput) searchInput.value = "";
        updateActiveFilterButtons();
        renderCollections();
      });
      return;
    }

    productsContainer.innerHTML = items
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
              <span style="cursor: pointer;" onclick="window.filterByCat('${item.category}')">${item.category}</span>
              <span>
                <span class="status-dot ${isAvailable ? "" : "unavailable"}"></span>
                ${isAvailable ? "Available" : "Sold out"}
              </span>
            </div>

            <h3 class="product-title">
              <a href="${detailUrl}" class="product-title-link">${item.name}</a>
            </h3>
            <p class="product-desc">${item.description}</p>
            
            ${formatPrice(item.price)}

            <div class="product-card-actions">
              <a href="${detailUrl}" class="btn-card-details">
                <span>View Details</span>
                <span style="font-size: 0.9em;">→</span>
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn-wa-card" title="Ask on WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // Trigger reveal observer
    const newCards = productsContainer.querySelectorAll(".reveal-fade-up");
    if ("IntersectionObserver" in window) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            cardObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
      newCards.forEach((c) => cardObserver.observe(c));
    } else {
      newCards.forEach((c) => c.classList.add("active"));
    }
  };

  // Helper exposed to inline click
  window.filterByCat = (category) => {
    activeCategory = category;
    updateActiveFilterButtons();
    renderCollections();
    document.getElementById("collections-filter-bar")?.scrollIntoView({ behavior: "smooth" });
  };

  // Event Listeners for Filter Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-filter");
      updateActiveFilterButtons();
      renderCollections();
    });
  });

  // Search Listener with Debounce
  let searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        activeSearch = e.target.value;
        renderCollections();
      }, 200);
    });
  }

  // Sort Listener
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderCollections();
    });
  }

  // Clear Filter Button
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", () => {
      activeCategory = "All";
      updateActiveFilterButtons();
      renderCollections();
    });
  }

  // Initial render
  updateActiveFilterButtons();
  renderCollections();
});
