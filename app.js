(function () {
  const catalog = window.MOONDROP_TRAINING_CATALOG;
  const categoryGrid = document.getElementById("categoryGrid");
  const overlay = document.getElementById("categoryOverlay");
  const overlayImage = document.getElementById("overlayImage");
  const overlayProductLineup = document.getElementById("overlayProductLineup");
  const overlayKicker = document.getElementById("overlayKicker");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayDescription = document.getElementById("overlayDescription");
  const overlayProducts = document.getElementById("overlayProducts");
  const closeOverlayButton = document.getElementById("closeOverlay");
  const languageToggle = document.getElementById("languageToggle");
  const overlayLanguageToggle = document.getElementById("overlayLanguageToggle");
  const overlayHomeLink = document.getElementById("overlayHomeLink");
  const languageStorageKey = "moondropChannelTrainingLanguage";
  const initialParams = new URLSearchParams(window.location.search);
  const requestedLanguage = initialParams.get("lang");
  const navigationType = window.performance?.getEntriesByType?.("navigation")?.[0]?.type;
  const returningCategoryLanguage = initialParams.has("category") && navigationType === "back_forward"
    ? storedLanguage()
    : null;
  let currentLanguage = returningCategoryLanguage || (requestedLanguage === "zh" ? "zh" : "en");
  let activeCategoryId = null;
  let previousFocus = null;

  const localized = (value) => value[currentLanguage] || value.en;
  const currentUi = () => catalog.ui[currentLanguage];

  function storedLanguage() {
    try {
      const value = window.localStorage.getItem(languageStorageKey);
      return value === "zh" || value === "en" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function rememberLanguage() {
    try {
      window.localStorage.setItem(languageStorageKey, currentLanguage);
    } catch (error) {
      // The URL remains the fallback when storage is unavailable.
    }
  }

  function setUrlLanguage() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", currentLanguage);
      window.history.replaceState(window.history.state, "", url);
    } catch (error) {
      // Direct file opening can restrict history updates; navigation still keeps the language.
    }
  }

  function setCategoryHistory(categoryId, mode) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", currentLanguage);
    if (categoryId) url.searchParams.set("category", categoryId);
    else url.searchParams.delete("category");

    try {
      const state = categoryId ? { moondropCategory: categoryId } : null;
      window.history[`${mode}State`](state, "", url);
      return true;
    } catch (error) {
      window.location.href = url.href;
      return false;
    }
  }

  function productsForCategory(categoryId) {
    return catalog.products.filter((product) => product.categoryId === categoryId && product.status === "live");
  }

  function categoryCard(category) {
    const products = productsForCategory(category.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-card category-card--${category.id}${category.featured ? " category-card--featured" : ""}`;
    button.dataset.categoryId = category.id;
    button.setAttribute("aria-haspopup", "dialog");
    button.innerHTML = `
      <img class="category-card__image" src="${category.image}" alt="" style="object-position:${category.imagePosition}" />
      <span class="category-card__shade" aria-hidden="true"></span>
      <span class="category-card__availability${products.length ? " is-live" : ""}"></span>
      <span class="category-card__copy">
        <strong></strong>
        <span></span>
      </span>
      <span class="category-card__arrow" aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => openCategory(category.id));
    return button;
  }

  catalog.categories.forEach((category) => categoryGrid.appendChild(categoryCard(category)));

  function productCard(product) {
    const ui = currentUi();
    const rawHref = `${product.href}?lang=${currentLanguage}`;
    const href = window.MoondropAuth?.protectHref(rawHref) || rawHref;
    return `
      <a class="product-card" href="${href}">
        <span class="product-card__image-wrap">
          <img src="${product.image}" alt="${localized(product.name)}" style="object-position:${product.imagePosition}" />
        </span>
        <span class="product-card__copy">
          <span class="product-card__status"><i aria-hidden="true"></i>${ui.available}</span>
          <strong>${localized(product.name)}</strong>
          <span class="product-card__type">${localized(product.type)}</span>
          <span class="product-card__action">${ui.openTraining}<b aria-hidden="true">↗</b></span>
        </span>
      </a>`;
  }

  function lineupProduct(product, index) {
    return `
      <figure class="overlay-lineup-item overlay-lineup-item--${index + 1}">
        <img src="${product.image}" alt="" style="object-position:${product.imagePosition}" />
        <figcaption>${localized(product.name)}</figcaption>
      </figure>`;
  }

  function renderOverlay(category) {
    const ui = currentUi();
    const products = productsForCategory(category.id);
    overlayImage.src = category.image;
    overlayImage.alt = "";
    overlayImage.style.objectPosition = category.imagePosition;
    overlay.dataset.categoryId = category.id;
    overlayKicker.textContent = ui.brandKicker;
    overlayTitle.textContent = localized(category.name);
    overlayDescription.textContent = localized(category.description);
    overlay.setAttribute("aria-label", `${ui.categoryDialog}: ${localized(category.name)}`);
    closeOverlayButton.setAttribute("aria-label", ui.close);
    overlayProductLineup.innerHTML = products.map(lineupProduct).join("");
    overlayProductLineup.hidden = products.length < 2;
    overlay.classList.toggle("has-product-lineup", products.length > 1);

    if (products.length) {
      overlayProducts.className = "overlay-products has-products";
      overlayProducts.innerHTML = products.map(productCard).join("");
    } else {
      overlayProducts.className = "overlay-products is-empty";
      overlayProducts.innerHTML = `
        <div class="empty-state">
          <span class="empty-state__line" aria-hidden="true"></span>
          <h3>${ui.emptyTitle}</h3>
          <p>${ui.emptyBody}</p>
        </div>`;
    }
  }

  function openCategory(categoryId, options = {}) {
    if (!options.authenticated && window.MoondropAuth && !window.MoondropAuth.isAuthenticated()) {
      window.MoondropAuth.requireAccess(() => openCategory(categoryId, { ...options, authenticated: true }));
      return;
    }
    const category = catalog.categories.find((item) => item.id === categoryId);
    if (!category) return;
    const { historyMode = "push", focusClose = true } = options;
    activeCategoryId = categoryId;
    previousFocus = document.activeElement;
    renderOverlay(category);
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
    if (historyMode) setCategoryHistory(categoryId, historyMode);
    if (focusClose) requestAnimationFrame(() => closeOverlayButton.focus());
  }

  function hideCategory() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
    activeCategoryId = null;
    if (previousFocus) previousFocus.focus();
  }

  function closeCategory() {
    if (!overlay.classList.contains("is-open")) return;
    if (window.history.state?.moondropCategory === activeCategoryId) {
      window.history.back();
      return;
    }
    hideCategory();
    setCategoryHistory(null, "replace");
  }

  function restoreUrlState() {
    const params = new URLSearchParams(window.location.search);
    const urlLanguage = params.get("lang") === "zh" ? "zh" : "en";
    currentLanguage = storedLanguage() || urlLanguage;
    applyLanguage();

    const categoryId = params.get("category");
    if (catalog.categories.some((category) => category.id === categoryId)) {
      openCategory(categoryId, { historyMode: null, focusClose: false });
    } else {
      hideCategory();
    }
  }

  function applyLanguage() {
    const ui = currentUi();
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
    document.title = ui.documentTitle;
    document.getElementById("brandKicker").textContent = ui.brandKicker;
    document.getElementById("pageTitle").innerHTML = ui.pageTitle.replace("\n", "<br />");
    document.getElementById("tagline").textContent = ui.tagline;
    document.getElementById("selectCategory").textContent = ui.selectCategory;
    [languageToggle, overlayLanguageToggle].forEach((toggle) => {
      toggle.setAttribute("aria-label", ui.languageLabel);
      toggle.setAttribute("aria-pressed", String(currentLanguage === "zh"));
      toggle.querySelectorAll("[data-language-option]").forEach((option) => {
        option.classList.toggle("active", option.dataset.languageOption === currentLanguage);
      });
    });
    overlayHomeLink.href = `./index.html?lang=${currentLanguage}`;
    overlayHomeLink.setAttribute("aria-label", ui.home);

    catalog.categories.forEach((category) => {
      const card = categoryGrid.querySelector(`[data-category-id="${category.id}"]`);
      const products = productsForCategory(category.id);
      card.querySelector(".category-card__copy strong").textContent = localized(category.name);
      card.querySelector(".category-card__copy span").textContent = localized(category.description);
      card.querySelector(".category-card__availability").textContent = products.length ? ui.available : "";
      card.setAttribute("aria-label", localized(category.name));
    });

    if (activeCategoryId) {
      const activeCategory = catalog.categories.find((item) => item.id === activeCategoryId);
      renderOverlay(activeCategory);
    }
    window.MoondropAuth?.setLanguage(currentLanguage);
    rememberLanguage();
    setUrlLanguage();
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "zh" : "en";
    applyLanguage();
  }

  function syncLanguagePreference() {
    const latestLanguage = storedLanguage();
    if (latestLanguage && latestLanguage !== currentLanguage) {
      currentLanguage = latestLanguage;
      applyLanguage();
    }
  }

  function trapOverlayFocus(event) {
    if (event.key !== "Tab" || !overlay.classList.contains("is-open")) return;
    const focusable = Array.from(overlay.querySelectorAll("button, a[href]")).filter((element) => !element.hasAttribute("disabled"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  closeOverlayButton.addEventListener("click", closeCategory);
  languageToggle.addEventListener("click", toggleLanguage);
  overlayLanguageToggle.addEventListener("click", toggleLanguage);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCategory();
    trapOverlayFocus(event);
  });
  window.addEventListener("popstate", restoreUrlState);
  window.addEventListener("pageshow", syncLanguagePreference);
  window.addEventListener("focus", syncLanguagePreference);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) syncLanguagePreference();
  });

  applyLanguage();
  const initialCategoryId = new URLSearchParams(window.location.search).get("category");
  if (catalog.categories.some((category) => category.id === initialCategoryId)) {
    openCategory(initialCategoryId, { historyMode: null, focusClose: false });
  }
})();
