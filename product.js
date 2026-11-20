/**
 * Bea Luxe NG - Product Detail Page Engine
 * Dynamic product rendering, breadcrumbs, specifications accordion,
 * WhatsApp concierge routing, sharing, and related products
 */

document.addEventListener("DOMContentLoaded", () => {
  const PRIMARY_PHONE = "2348162040699";
  const detailContainer = document.getElementById("product-detail-container");
  const relatedContainer = document.getElementById("related-products-grid");
  const toastEl = document.getElementById("toast-notification");

  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const siteHeader = document.querySelector(".site-header");

  // Mobile drawer & Header Scroll
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

  // Show Toast Utility
  const showToast = (message) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2800);
  };

  // Category Specification Generator
  const getProductSpecs = (item) => {
    const cat = item.category;

    switch (cat) {
      case "Unisex Wears":
        return {
          materials: "Hand-selected breathable natural fibers (European flax linen, premium combed cotton, or mulberry silk blends). Pre-washed to prevent shrinkage with reinforced seams.",
          specs: [
            { label: "Fit Type", val: "Relaxed unisex silhouette" },
            { label: "Fabric Weight", val: "Seasonless medium-heavy drape" },
            { label: "Origin", val: "Artisan hand-finished" },
            { label: "Care", val: "Gentle cold cycle or dry clean" }
          ]
        };
      case "Footwear":
        return {
          materials: "Full-grain Italian calfskin or water-treated velvety nubuck. Breathable unlined leather upper with vegetable-tanned leather insoles and Goodyear/Blake stitched soles.",
          specs: [
            { label: "Sizing", val: "True to luxury European sizing" },
            { label: "Sole Material", val: "Goodyear welted leather / Vibram tread" },
            { label: "Insole", val: "Ergonomic arch-support cork footbed" },
            { label: "Included", val: "Dual cotton dust bags & cedar horn" }
          ]
        };
      case "Bags":
        return {
          materials: "Architectural structured palmellato or supple pebbled bovine leather paired with solid brushed palladium or aged brass hardware and faille interior lining.",
          specs: [
            { label: "Closure", val: "Reinforced magnetic lock / heavy brass zip" },
            { label: "Strap", val: "Detachable & adjustable shoulder strap" },
            { label: "Compartments", val: "Padded slip pockets & zip organizer" },
            { label: "Included", val: "Protective branded dust bag" }
          ]
        };
      case "Perfumes":
        return {
          materials: "Macerated small-batch artisanal fragrance formulation containing 25% to 30% pure perfume oil concentration (Extrait / Eau de Parfum).",
          specs: [
            { label: "Concentration", val: "Extrait de Parfum / High-grade EDP" },
            { label: "Longevity", val: "12+ hours enduring sillage" },
            { label: "Flacon Volume", val: "100ml / 3.4 FL. OZ." },
            { label: "Cap", val: "Heavyweight magnetic closure" }
          ]
        };
      case "Fashion Accessories":
        return {
          materials: "Solid 925 Sterling Silver plated in 3-micron 18K gold vermeil, surgical 316L stainless steel, or Mazzucchelli bio-acetate frames with Category 3 UV400 lenses.",
          specs: [
            { label: "Composition", val: "Hypoallergenic & nickel-free" },
            { label: "Plating Standard", val: "Heavy vermeil (long-lasting wear)" },
            { label: "Engraving", val: "Discreet Bea Luxe hallmark stamp" },
            { label: "Packaging", val: "Hard-shell presentation case & velvet pouch" }
          ]
        };
      case "Kitchen Items":
        return {
          materials: "High-carbon Japanese VG-10 core Damascus steel (67 folded layers), heavy-gauge enameled cast iron, or heat-resistant thermal borosilicate glass.",
          specs: [
            { label: "Grade", val: "Professional culinary standard" },
            { label: "Heat Tolerance", val: "Oven safe up to 260°C / 500°F" },
            { label: "Handle / Grip", val: "Stabilized octagonal hardwood" },
            { label: "Care", val: "Hand wash with mild cleanser" }
          ]
        };
      case "Household Items":
        return {
          materials: "Clean-burning non-toxic coconut soy wax with wooden crackle wicks, natural honed Roman travertine stone, or pure stonewashed European flax beddings.",
          specs: [
            { label: "Craftsmanship", val: "Hand-poured / Hand-hewn natural stone" },
            { label: "Burn / Run Time", val: "65+ hours clean burn / 12h mist" },
            { label: "Safety", val: "Phthalate-free & petroleum-free" },
            { label: "Finish", val: "Natural matte organic texture" }
          ]
        };
      default:
        return {
          materials: "Premium curated lifestyle materials selected for durability, tactile pleasure, and aesthetic timelessness.",
          specs: [
            { label: "Condition", val: "Brand new, certified authentic" },
            { label: "Packaging", val: "Bea Luxe luxury gift packaging" },
            { label: "Inspection", val: "Triple-checked before dispatch" }
          ]
        };
    }
  };

  // Get product by ID
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    // Render Not Found
    detailContainer.innerHTML = `
      <div class="product-not-found reveal-fade-up">
        <h2>Piece Not Found</h2>
        <p>We couldn't locate this piece in our collection. It may have been archived, renamed, or moved.</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="collections.html" class="btn-dark">Explore All Collections</a>
          <a href="index.html" class="btn-primary">Return to Home</a>
        </div>
      </div>
    `;
    return;
  }

  // Update Page Meta
  document.title = `${product.name} — Bea Luxe NG`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", `${product.name} by Bea Luxe NG: ${product.description}`);
  }

  const specsData = getProductSpecs(product);
  const isAvailable = product.available !== false;
  const waMsg = encodeURIComponent(
    `Hello Bea Luxe, I would like to inquire about ordering the "${product.name}" (Ref: ${product.id}). Please share availability and ordering details.`
  );
  const waUrl = `https://wa.me/${PRIMARY_PHONE}?text=${waMsg}`;
  const catUrl = `collections.html?category=${encodeURIComponent(product.category)}`;

  // Render Product Detail
  detailContainer.innerHTML = `
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span class="breadcrumb-sep">/</span>
      <a href="collections.html">Collections</a>
      <span class="breadcrumb-sep">/</span>
      <a href="${catUrl}">${product.category}</a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">${product.name}</span>
    </nav>

    <!-- Main 2-Column Product Layout -->
    <div class="product-detail-grid">
      
      <!-- Left Column: Media & Trust Badges -->
      <div class="product-media-column">
        <div class="product-gallery-main">
          <div class="gallery-badge-row">
            ${product.featured ? `<span class="badge-featured">Featured Piece</span>` : ""}
            <span class="status-pill-badge ${isAvailable ? "" : "unavailable"}">
              <span class="status-pulse-dot"></span>
              ${isAvailable ? "Available" : "Sold Out"}
            </span>
          </div>

          <img 
            src="${product.image}" 
            alt="${product.name}" 
            id="main-product-img"
            onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'"
          >
        </div>

        <!-- Trust Badges Strip -->
        <div class="product-trust-strip">
          <div class="trust-badge-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <div class="trust-badge-title">100% Verified</div>
            <div class="trust-badge-desc">Hand-inspected prior to delivery</div>
          </div>

          <div class="trust-badge-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div class="trust-badge-title">Nationwide Delivery</div>
            <div class="trust-badge-desc">Insured express courier dispatch</div>
          </div>

          <div class="trust-badge-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div class="trust-badge-title">Concierge Service</div>
            <div class="trust-badge-desc">Direct styling & sizing support</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Info & Actions -->
      <div class="product-info-column">
        
        <div class="product-header-group">
          <a href="${catUrl}" class="category-tag-link">${product.category}</a>
          <h1 class="product-detail-title">${product.name}</h1>
          
          <div class="product-status-bar">
            <span>Ref: <strong>${product.id}</strong></span>
            <span>•</span>
            <span style="color: var(--forest-dark); font-weight: 500;">
              ${isAvailable ? "Ready for Immediate Dispatch" : "Temporarily Sold Out"}
            </span>
          </div>
        </div>

        <!-- Price Card -->
        <div class="price-display-card">
          <span class="price-card-label">Acquisition & Pricing</span>
          <div class="price-card-value">Price on request</div>
          <p class="price-card-subtext">
            Every piece is curated with strict attention to quality. Connect directly with our concierge on WhatsApp for current availability, custom sizing, and instant payment links.
          </p>
        </div>

        <!-- Description -->
        <div class="product-editorial-desc">
          ${product.description}
        </div>

        <!-- CTA Cluster -->
        <div class="product-cta-cluster">
          <!-- Quantity Stepper -->
          <div class="detail-quantity-row">
            <span class="detail-quantity-label">Quantity:</span>
            <div class="detail-stepper">
              <button class="detail-stepper-btn" id="detail-qty-minus" aria-label="Decrease quantity">−</button>
              <span class="detail-stepper-val" id="detail-qty-display">1</span>
              <button class="detail-stepper-btn" id="detail-qty-plus" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <!-- Add to Cart / Selection Button -->
          <button class="btn-detail-add-cart" id="btn-add-to-cart-detail">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Add to Selection / Cart</span>
          </button>

          <!-- Direct Instant Order on WhatsApp -->
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-wa-detail-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Inquire & Order on WhatsApp</span>
          </a>

          <div class="product-secondary-actions">
            <a href="tel:+2348162040699" class="btn-outline-action">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call Concierge</span>
            </a>

            <button class="btn-outline-action" id="btn-share-piece">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share Piece</span>
            </button>
          </div>
        </div>

        <!-- Accordion Details -->
        <div class="product-details-accordion">
          
          <!-- Tab 1: Materials & Craftsmanship -->
          <div class="accordion-tab open">
            <button class="accordion-trigger">
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Materials & Craftsmanship
              </span>
              <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="accordion-pane">
              <p style="margin-bottom: 0.75rem;">${specsData.materials}</p>
              <ul class="spec-list">
                ${specsData.specs.map((s) => `
                  <li>
                    <span class="spec-label">${s.label}</span>
                    <span class="spec-val">${s.val}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>

          <!-- Tab 2: Delivery & Packaging -->
          <div class="accordion-tab">
            <button class="accordion-trigger">
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                Packaging & Delivery
              </span>
              <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="accordion-pane">
              <p style="margin-bottom: 0.6rem;">
                All Bea Luxe orders are dispatched in protective, discreet packaging with branded gift presentation boxes where applicable.
              </p>
              <ul class="spec-list">
                <li>
                  <span class="spec-label">Courier Network</span>
                  <span class="spec-val">Insured nationwide express courier</span>
                </li>
                <li>
                  <span class="spec-label">Dispatch Time</span>
                  <span class="spec-val">Same day or next business morning</span>
                </li>
                <li>
                  <span class="spec-label">Tracking</span>
                  <span class="spec-val">Real-time driver / tracking link via WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tab 3: How to Order -->
          <div class="accordion-tab">
            <button class="accordion-trigger">
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
                The Bea Luxe Ordering Experience
              </span>
              <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="accordion-pane">
              <ol style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <li><strong>Direct Concierge Inquiry</strong>: Click "Inquire & Order on WhatsApp" to message our team with this piece pre-referenced.</li>
                <li><strong>Confirm Sizing & Details</strong>: We confirm specific size fits, material nuances, and delivery timelines directly with you.</li>
                <li><strong>Seamless Payment & Dispatch</strong>: Complete payment via secure bank transfer and receive immediate dispatch confirmation.</li>
              </ol>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // Accordion Event Listeners
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tab = trigger.closest(".accordion-tab");
      tab.classList.toggle("open");
    });
  });

  // Quantity Stepper & Add to Cart
  let selectedQty = 1;
  const qtyMinusBtn = document.getElementById("detail-qty-minus");
  const qtyPlusBtn = document.getElementById("detail-qty-plus");
  const qtyDisplay = document.getElementById("detail-qty-display");
  const addToCartBtn = document.getElementById("btn-add-to-cart-detail");

  qtyMinusBtn?.addEventListener("click", () => {
    if (selectedQty > 1) {
      selectedQty--;
      if (qtyDisplay) qtyDisplay.textContent = selectedQty;
    }
  });

  qtyPlusBtn?.addEventListener("click", () => {
    selectedQty++;
    if (qtyDisplay) qtyDisplay.textContent = selectedQty;
  });

  addToCartBtn?.addEventListener("click", () => {
    if (typeof BeaLuxeCart !== "undefined") {
      BeaLuxeCart.addToCart(product.id, selectedQty);
    }
  });

  // Share Piece Listener
  document.getElementById("btn-share-piece")?.addEventListener("click", () => {
    const shareData = {
      title: `${product.name} — Bea Luxe NG`,
      text: `Discover ${product.name} from the Bea Luxe NG luxury lifestyle collection.`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Product link copied to clipboard!");
      }).catch(() => {
        showToast("Unable to copy link.");
      });
    }
  });

  // Render Related Products (Same category, excluding current)
  if (relatedContainer) {
    let related = PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, 4);

    if (related.length < 4) {
      const additional = PRODUCTS.filter(
        (item) => item.id !== product.id && !related.some((r) => r.id === item.id)
      ).slice(0, 4 - related.length);
      related = [...related, ...additional];
    }

    relatedContainer.innerHTML = related
      .map((item, index) => {
        const detailUrl = `product.html?id=${encodeURIComponent(item.id)}`;
        const waCardMsg = encodeURIComponent(
          `Hello Bea Luxe, I would like to ask about "${item.name}" (Ref: ${item.id}).`
        );
        const waCardUrl = `https://wa.me/${PRIMARY_PHONE}?text=${waCardMsg}`;
        const delayClass = `delay-${(index % 4) + 1}`;

        return `
        <article class="product-card reveal-fade-up ${delayClass}">
          <div class="product-image-box">
            ${item.featured ? `<span class="badge-featured">Featured</span>` : ""}
            <a href="${detailUrl}" class="product-image-link" aria-label="View ${item.name}">
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
              <span class="product-cat-pill">${item.category}</span>
              <span class="product-status-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Available
              </span>
            </div>

            <h3 class="product-title" title="${item.name}">
              <a href="${detailUrl}" class="product-title-link">${item.name}</a>
            </h3>
            
            <div class="product-price">${item.price ? `₦${item.price.toLocaleString()}` : 'Price on request'}</div>

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
  }
});
