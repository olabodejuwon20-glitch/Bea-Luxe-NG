/**
 * Bea Luxe NG - Clean Interactive Engine
 * Matched with Base44 layout structure
 */

document.addEventListener("DOMContentLoaded", () => {
  let activeCategory = "All";
  let activeSearch = "";

  const PRIMARY_PHONE = "2348162040699";
  const productsContainer = document.getElementById("products-grid-container");
  const searchInput = document.getElementById("catalogue-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const viewAllBtn = document.getElementById("view-all-prod-btn");

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isVisible = mobileMenu.style.display === "block";
      mobileMenu.style.display = isVisible ? "none" : "block";
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
      });
    });
  }

  // Format currency
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return `<div class="product-price on-request">Price on request</div>`;
    }
    return `<div class="product-price">₦${price.toLocaleString()}</div>`;
  };

  // Render Product Grid
  const renderProducts = () => {
    if (!productsContainer) return;

    const filtered = PRODUCTS.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const q = activeSearch.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="color: var(--text-muted); font-size: 1rem;">No pieces found in this category.</p>
          <button class="btn-dark" style="margin-top: 1rem;" id="reset-filter-btn">View all pieces</button>
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
      .map((item) => {
        const waMsg = encodeURIComponent(
          `Hello Bea Luxe, I would like to ask about ${item.name}.`
        );
        const waUrl = `https://wa.me/${PRIMARY_PHONE}?text=${waMsg}`;
        const isAvailable = item.available !== false;

        return `
        <article class="product-card">
          <div class="product-image-box">
            ${item.featured ? `<span class="badge-featured">Featured</span>` : ""}
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80'"
            >
          </div>

          <div class="product-info">
            <div class="product-meta-row">
              <span>${item.category}</span>
              <span>
                <span class="status-dot ${isAvailable ? "" : "unavailable"}"></span>
                ${isAvailable ? "Available" : "Sold out"}
              </span>
            </div>

            <h3 class="product-title">${item.name}</h3>
            <p class="product-desc">${item.description}</p>
            
            ${formatPrice(item.price)}

            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-wa-card">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </article>
      `;
      })
      .join("");
  };

  const updateActiveFilterBtn = () => {
    filterButtons.forEach(btn => {
      if (btn.getAttribute("data-filter") === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-filter");
      updateActiveFilterBtn();
      renderProducts();
    });
  });

  // Top 8 category tiles click handlers
  document.querySelectorAll(".cat-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const cat = tile.getAttribute("data-cat");
      if (cat) {
        activeCategory = cat;
        updateActiveFilterBtn();
        renderProducts();
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // View all link
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", (e) => {
      e.preventDefault();
      activeCategory = "All";
      activeSearch = "";
      if (searchInput) searchInput.value = "";
      updateActiveFilterBtn();
      renderProducts();
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value;
      renderProducts();
    });
  }

  // Initial render
  renderProducts();
});
