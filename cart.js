/**
 * Bea Luxe NG - Universal Cart & Smart Recommendation Engine
 * Handles persistent localStorage cart, slide-out drawer, cross-sell recommendations,
 * and structured WhatsApp multi-item checkout.
 */

const BeaLuxeCart = (() => {
  const STORAGE_KEY = "bea_luxe_cart_v1";
  const PRIMARY_PHONE = "2348162040699";

  // Category cross-sell affinity rules
  const PAIRING_RULES = {
    "Footwear": ["Bags", "Fashion Accessories", "Unisex Wears"],
    "Unisex Wears": ["Footwear", "Perfumes", "Fashion Accessories"],
    "Bags": ["Footwear", "Fashion Accessories", "Perfumes"],
    "Perfumes": ["Fashion Accessories", "Household Items", "Unisex Wears"],
    "Fashion Accessories": ["Unisex Wears", "Perfumes", "Bags"],
    "Kitchen Items": ["Kitchen Items", "Household Items"],
    "Household Items": ["Household Items", "Perfumes", "Kitchen Items"]
  };

  // State
  let cart = [];

  // =========================================================================
  // STORAGE & STATE
  // =========================================================================
  const loadCart = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      cart = data ? JSON.parse(data) : [];
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      cart = [];
    }
    updateBadge();
    return cart;
  };

  const saveCart = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateBadge();
    renderDrawerItems();
  };

  const getCart = () => cart;

  const getTotalCount = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  // =========================================================================
  // TOAST NOTIFICATION
  // =========================================================================
  const showToast = (message) => {
    let toast = document.getElementById("cart-toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cart-toast-notification";
      toast.className = "toast-msg";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  };

  // =========================================================================
  // CART ACTIONS
  // =========================================================================
  const addToCart = (productId, quantity = 1, silent = false) => {
    if (typeof PRODUCTS === "undefined") return;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        quantity: quantity,
      });
    }

    saveCart();
    if (!silent) {
      showToast(`Added "${product.name}" to selection`);
      openDrawer();
    }
  };

  const updateQuantity = (productId, delta) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  };

  const removeFromCart = (productId) => {
    cart = cart.filter((i) => i.id !== productId);
    saveCart();
  };

  const clearCart = () => {
    cart = [];
    saveCart();
  };

  // =========================================================================
  // UI: BADGE & DRAWER
  // =========================================================================
  const updateBadge = () => {
    const count = getTotalCount();
    document.querySelectorAll(".cart-badge-count").forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "inline-flex" : "none";
      if (count > 0) {
        el.classList.add("bump");
        setTimeout(() => el.classList.remove("bump"), 300);
      }
    });

    // Update drawer item count text if present
    const drawerCountEl = document.getElementById("cart-drawer-total-count");
    if (drawerCountEl) {
      drawerCountEl.textContent = `${count} ${count === 1 ? "piece" : "pieces"}`;
    }
  };

  const openDrawer = () => {
    const drawer = document.getElementById("bea-luxe-cart-drawer");
    const overlay = document.getElementById("bea-luxe-cart-overlay");
    if (drawer && overlay) {
      renderDrawerItems();
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeDrawer = () => {
    const drawer = document.getElementById("bea-luxe-cart-drawer");
    const overlay = document.getElementById("bea-luxe-cart-overlay");
    if (drawer && overlay) {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  // Render items in slide-out drawer
  const renderDrawerItems = () => {
    const container = document.getElementById("cart-drawer-items-list");
    const footer = document.getElementById("cart-drawer-footer-actions");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛍️</div>
          <h3 class="cart-empty-title">Your selection is empty</h3>
          <p class="cart-empty-sub">Explore our curated collection to add elevated pieces to your order.</p>
          <a href="collections.html" class="btn-dark" style="margin-top: 1rem;" onclick="BeaLuxeCart.closeDrawer()">
            Browse Collections
          </a>
        </div>
      `;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    container.innerHTML = cart
      .map((item) => {
        return `
        <div class="cart-item-card" data-id="${item.id}">
          <a href="product.html?id=${encodeURIComponent(item.id)}" class="cart-item-thumb-link" onclick="BeaLuxeCart.closeDrawer()">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="cart-item-img"
              onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80'"
            >
          </a>

          <div class="cart-item-details">
            <span class="cart-item-cat">${item.category}</span>
            <h4 class="cart-item-title">
              <a href="product.html?id=${encodeURIComponent(item.id)}" onclick="BeaLuxeCart.closeDrawer()">${item.name}</a>
            </h4>
            <div class="cart-item-price-tag">Price on request</div>

            <div class="cart-item-actions-row">
              <div class="cart-stepper">
                <button class="cart-stepper-btn" onclick="BeaLuxeCart.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                <span class="cart-stepper-val">${item.quantity || 1}</span>
                <button class="cart-stepper-btn" onclick="BeaLuxeCart.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>

              <button class="cart-remove-btn" onclick="BeaLuxeCart.removeFromCart('${item.id}')" aria-label="Remove item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  };

  // =========================================================================
  // SMART RECOMMENDATIONS ("Complete The Look")
  // =========================================================================
  const getRecommendations = () => {
    if (typeof PRODUCTS === "undefined" || cart.length === 0) return [];

    const cartIds = new Set(cart.map((i) => i.id));
    const cartCategories = Array.from(new Set(cart.map((i) => i.category)));

    // Gather preferred target categories based on current items
    const targetCategories = new Set();
    cartCategories.forEach((cat) => {
      const affinities = PAIRING_RULES[cat] || [];
      affinities.forEach((affCat) => targetCategories.add(affCat));
    });

    // Find candidates in target categories not in cart
    let candidates = PRODUCTS.filter(
      (p) => !cartIds.has(p.id) && targetCategories.has(p.category)
    );

    // Prioritize featured items
    candidates.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    // Fallback if not enough candidates
    if (candidates.length < 2) {
      const extra = PRODUCTS.filter((p) => !cartIds.has(p.id) && !candidates.some((c) => c.id === p.id));
      candidates = [...candidates, ...extra];
    }

    return candidates.slice(0, 2);
  };

  const openRecommendationModal = () => {
    const recommendations = getRecommendations();

    // If no recommendations possible, proceed straight to WhatsApp
    if (recommendations.length === 0) {
      proceedToWhatsAppCheckout();
      return;
    }

    let modalOverlay = document.getElementById("bea-luxe-rec-overlay");
    if (!modalOverlay) {
      modalOverlay = document.createElement("div");
      modalOverlay.id = "bea-luxe-rec-overlay";
      modalOverlay.className = "rec-modal-overlay";
      document.body.appendChild(modalOverlay);
    }

    // Determine headline context based on cart
    const primaryCat = cart[0]?.category || "your selection";

    modalOverlay.innerHTML = `
      <div class="rec-modal-card">
        <button class="rec-close-btn" onclick="BeaLuxeCart.closeRecommendationModal()" aria-label="Close modal">✕</button>
        
        <div class="rec-modal-header">
          <span class="rec-modal-kicker">Complete Your Look</span>
          <h3 class="rec-modal-title">Recommended Pairings</h3>
          <p class="rec-modal-sub">
            Our stylists recommend pairing these complementary pieces with your chosen ${primaryCat}:
          </p>
        </div>

        <div class="rec-items-grid">
          ${recommendations.map((item) => `
            <div class="rec-item-card">
              <img 
                src="${item.image}" 
                alt="${item.name}" 
                class="rec-item-img"
                onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80'"
              >
              <div class="rec-item-details">
                <span class="rec-item-cat">${item.category}</span>
                <h4 class="rec-item-name">${item.name}</h4>
                <div class="rec-item-price">Price on request</div>
              </div>
              <button 
                class="btn-add-rec" 
                id="rec-add-btn-${item.id}"
                onclick="BeaLuxeCart.addRecommendedItem('${item.id}')"
              >
                + Add to Order
              </button>
            </div>
          `).join("")}
        </div>

        <div class="rec-modal-footer">
          <button class="btn-continue-checkout" onclick="BeaLuxeCart.proceedToWhatsAppCheckout()">
            <span>Proceed to WhatsApp Checkout</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </button>
          <button class="btn-skip-checkout" onclick="BeaLuxeCart.proceedToWhatsAppCheckout()">
            Skip and continue with current selection
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.add("open");
  };

  const closeRecommendationModal = () => {
    const modalOverlay = document.getElementById("bea-luxe-rec-overlay");
    if (modalOverlay) {
      modalOverlay.classList.remove("open");
    }
  };

  const addRecommendedItem = (productId) => {
    addToCart(productId, 1, true);
    const btn = document.getElementById(`rec-add-btn-${productId}`);
    if (btn) {
      btn.textContent = "✓ Added";
      btn.classList.add("added");
      btn.disabled = true;
    }
    showToast("Added recommendation to your selection!");
  };

  // =========================================================================
  // WHATSAPP CHECKOUT GENERATOR
  // =========================================================================
  const proceedToWhatsAppCheckout = () => {
    if (cart.length === 0) {
      showToast("Your selection is empty");
      return;
    }

    closeRecommendationModal();
    closeDrawer();

    const totalCount = getTotalCount();
    let message = `🛍️ *NEW ORDER INQUIRY — BEA LUXE NG*\n`;
    message += `----------------------------------------\n`;
    message += `Hello Bea Luxe, I would like to place an order for the following ${totalCount} ${totalCount === 1 ? 'piece' : 'pieces'} from my selection:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Category: ${item.category}\n`;
      message += `   • Ref: ${item.id}\n`;
      message += `   • Qty: ${item.quantity || 1}\n`;
      message += `   • Price: On Request\n\n`;
    });

    message += `----------------------------------------\n`;
    message += `📦 *Total Pieces:* ${totalCount}\n`;
    message += `🏷️ *Pricing & Sizing:* Inquire with Concierge\n`;
    message += `🚚 *Delivery:* Nationwide Delivery Across Nigeria\n\n`;
    message += `Please confirm availability, current pricing, and payment instructions. Thank you!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${PRIMARY_PHONE}?text=${encoded}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // =========================================================================
  // INJECT CART DRAWER & OVERLAY INTO DOM
  // =========================================================================
  const injectCartMarkup = () => {
    if (document.getElementById("bea-luxe-cart-drawer")) return;

    const overlay = document.createElement("div");
    overlay.id = "bea-luxe-cart-overlay";
    overlay.className = "cart-drawer-overlay";
    overlay.addEventListener("click", closeDrawer);

    const drawer = document.createElement("div");
    drawer.id = "bea-luxe-cart-drawer";
    drawer.className = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <div>
          <span class="cart-drawer-kicker">Bea Luxe NG</span>
          <h3 class="cart-drawer-title">Your Selection</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="cart-drawer-count-chip" id="cart-drawer-total-count">0 pieces</span>
          <button class="cart-drawer-close" onclick="BeaLuxeCart.closeDrawer()" aria-label="Close cart">✕</button>
        </div>
      </div>

      <div class="cart-drawer-body" id="cart-drawer-items-list">
        <!-- Rendered dynamically -->
      </div>

      <div class="cart-drawer-footer" id="cart-drawer-footer-actions">
        <div class="cart-drawer-assurance">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <span>Insured door-step delivery nationwide across Nigeria</span>
        </div>

        <button class="btn-checkout-wa" onclick="BeaLuxeCart.openRecommendationModal()">
          <span>Proceed to Checkout</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  };

  // Initialize
  const init = () => {
    injectCartMarkup();
    loadCart();

    // Attach listeners to cart triggers
    document.querySelectorAll(".header-cart-btn, #header-cart-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openDrawer();
      });
    });
  };

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Public API
  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCart,
    getTotalCount,
    openDrawer,
    closeDrawer,
    openRecommendationModal,
    closeRecommendationModal,
    addRecommendedItem,
    proceedToWhatsAppCheckout
  };
})();
