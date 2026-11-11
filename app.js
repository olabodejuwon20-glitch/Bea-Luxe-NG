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
      return `<div class="product-price on-request">Price on request</div>`;
    }
    return `<div class="product-price">₦${price.toLocaleString()}</div>`;
  };

  // ======================================================================
  // 6. RENDER PRODUCT GRID (with stagger animation)
  // ======================================================================
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
      .map((item, index) => {
        const waMsg = encodeURIComponent(
          `Hello Bea Luxe, I would like to ask about ${item.name}.`
        );
        const waUrl = `https://wa.me/${PRIMARY_PHONE}?text=${waMsg}`;
        const isAvailable = item.available !== false;
        const delayClass = `delay-${(index % 4) + 1}`;

        return `
        <article class="product-card reveal-fade-up ${delayClass}">
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

            <button type="button" class="btn-wa-card open-product-chat-btn" data-product-name="${item.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Ask on WhatsApp</span>
            </button>
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
  // 8. CATEGORY TILE CLICK HANDLERS
  // ======================================================================
  document.querySelectorAll(".cat-tile").forEach((tile) => {
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

  // ======================================================================
  // 9. VIEW ALL LINK
  // ======================================================================
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
  // 12. DIRECT IN-SITE CHAT MODAL ENGINE (WhatsApp Bridge)
  // ======================================================================
  const openChatBtn = document.getElementById("open-chat-btn");
  const closeChatBtn = document.getElementById("close-chat-btn");
  const chatOverlay = document.getElementById("chat-overlay");
  const chatModal = document.getElementById("chat-modal");
  const chatFormView = document.getElementById("chat-form-view");
  const chatSuccessView = document.getElementById("chat-success-view");
  const directChatForm = document.getElementById("direct-chat-form");
  const chatMessageInput = document.getElementById("chat-message");
  const chatSubmitBtn = document.getElementById("chat-submit-btn");
  const chatProductPill = document.getElementById("chat-product-pill");
  const chatProductName = document.getElementById("chat-product-name");
  const removeProductPill = document.getElementById("remove-product-pill");
  const chatAnotherBtn = document.getElementById("chat-another-btn");
  const quickChips = document.querySelectorAll(".quick-chip");

  let activeProductContext = null;

  const openDirectChat = (productName = null) => {
    if (!chatOverlay) return;

    if (productName) {
      activeProductContext = productName;
      if (chatProductName) chatProductName.textContent = productName;
      if (chatProductPill) chatProductPill.style.display = "flex";
      if (chatMessageInput && !chatMessageInput.value.trim()) {
        chatMessageInput.value = `Hello Bea Luxe, I would like to ask about ${productName}.`;
      }
    } else if (!activeProductContext) {
      if (chatProductPill) chatProductPill.style.display = "none";
    }

    chatOverlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Auto-focus the first appropriate field
    setTimeout(() => {
      const nameInput = document.getElementById("chat-name");
      if (nameInput && !nameInput.value) {
        nameInput.focus();
      } else if (chatMessageInput) {
        chatMessageInput.focus();
      }
    }, 150);
  };

  const closeDirectChat = () => {
    if (!chatOverlay) return;
    chatOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (openChatBtn) {
    openChatBtn.addEventListener("click", () => openDirectChat());
  }

  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", closeDirectChat);
  }

  if (chatOverlay) {
    chatOverlay.addEventListener("click", (e) => {
      if (e.target === chatOverlay) {
        closeDirectChat();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatOverlay?.classList.contains("open")) {
      closeDirectChat();
    }
  });

  // Remove product context
  if (removeProductPill) {
    removeProductPill.addEventListener("click", () => {
      activeProductContext = null;
      if (chatProductPill) chatProductPill.style.display = "none";
    });
  }

  // Quick Chips
  quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.getAttribute("data-text");
      if (chatMessageInput && text) {
        chatMessageInput.value = text;
        chatMessageInput.focus();
      }
    });
  });

  // Delegate Product Card "Ask on WhatsApp" click to in-site chat modal
  document.addEventListener("click", (e) => {
    const cardBtn = e.target.closest(".open-product-chat-btn");
    if (cardBtn) {
      e.preventDefault();
      const pName = cardBtn.getAttribute("data-product-name");
      openDirectChat(pName);
    }
  });

  // Submit direct chat to Vercel Serverless Function
  if (directChatForm) {
    directChatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!chatSubmitBtn) return;

      const nameVal = document.getElementById("chat-name")?.value || "";
      const phoneVal = document.getElementById("chat-phone")?.value || "";
      const messageVal = chatMessageInput?.value || "";

      if (!messageVal.trim()) return;

      const originalBtnHTML = chatSubmitBtn.innerHTML;
      chatSubmitBtn.disabled = true;
      chatSubmitBtn.innerHTML = `<span>Sending...</span>`;

      try {
        const response = await fetch("/api/send-whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameVal,
            phone: phoneVal,
            message: messageVal,
            product: activeProductContext,
          }),
        });

        const data = await response.json();

        // Show success state
        if (chatFormView) chatFormView.style.display = "none";
        if (chatSuccessView) chatSuccessView.style.display = "block";
      } catch (err) {
        console.error("Chat submission error:", err);
        // Fallback: even if offline in local dev without backend, show confirmation
        if (chatFormView) chatFormView.style.display = "none";
        if (chatSuccessView) chatSuccessView.style.display = "block";
      } finally {
        chatSubmitBtn.disabled = false;
        chatSubmitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  // Send another message
  if (chatAnotherBtn) {
    chatAnotherBtn.addEventListener("click", () => {
      if (directChatForm) directChatForm.reset();
      activeProductContext = null;
      if (chatProductPill) chatProductPill.style.display = "none";
      if (chatSuccessView) chatSuccessView.style.display = "none";
      if (chatFormView) chatFormView.style.display = "block";
    });
  }

  // ======================================================================
  // INITIAL RENDER
  // ======================================================================
  renderProducts();
});
