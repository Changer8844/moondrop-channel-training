(function () {
  const ACCESS_KEY = "moondropChannelTrainingAccess";
  const ACCESS_VERSION = 1;
  const ACCESS_DURATION = 12 * 60 * 60 * 1000;
  const PASSWORD_SHA256 = "21f5734f34856550e320d2ebe98956938ec6cfcdc569e6ebd608219ade80a894";
  const PASSWORD_FNV1A = "825ba93b";
  const FILE_ACCESS_PROOF = "st2-21f5734f";
  const copy = {
    en: {
      login: "LOGIN",
      loggedIn: "UNLOCKED",
      loginLabel: "Open channel login",
      logoutLabel: "Lock the training portal",
      kicker: "CHANNEL ACCESS",
      title: "Enter the training portal",
      description: "Enter the channel password to open product categories and training pages.",
      password: "Password",
      show: "Show password",
      hide: "Hide password",
      close: "Close login",
      cancel: "Cancel",
      submit: "Enter training",
      checking: "Checking…",
      invalid: "Incorrect password. Please try again.",
      unsupported: "This browser cannot verify the password. Please open the page in a current browser.",
      note: "Access is remembered on this browser for 12 hours."
    },
    zh: {
      login: "登录",
      loggedIn: "已解锁",
      loginLabel: "打开渠道登录",
      logoutLabel: "锁定培训系统",
      kicker: "渠道访问",
      title: "进入渠道培训系统",
      description: "输入渠道培训密码后，方可打开产品分类与培训页面。",
      password: "密码",
      show: "显示密码",
      hide: "隐藏密码",
      close: "关闭登录",
      cancel: "取消",
      submit: "进入培训",
      checking: "正在验证…",
      invalid: "密码不正确，请重新输入。",
      unsupported: "当前浏览器无法验证密码，请使用新版浏览器打开。",
      note: "本浏览器将在 12 小时内保持登录状态。"
    }
  };

  let currentLanguage = languageFromPage();
  let pendingAction = null;
  let previousFocus = null;
  let portalElements = null;

  function languageFromPage() {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (queryLanguage === "zh" || queryLanguage === "en") return queryLanguage;
    return document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function readAccess() {
    try {
      const value = JSON.parse(window.localStorage.getItem(ACCESS_KEY) || "null");
      if (value?.version === ACCESS_VERSION && Number(value.expires) > Date.now()) return true;
      window.localStorage.removeItem(ACCESS_KEY);
    } catch (error) {
      // A blocked storage area simply means the visitor signs in again.
    }
    return false;
  }

  function writeAccess() {
    try {
      window.localStorage.setItem(ACCESS_KEY, JSON.stringify({ version: ACCESS_VERSION, expires: Date.now() + ACCESS_DURATION }));
    } catch (error) {
      // The current page remains unlocked even if persistence is unavailable.
    }
  }

  function clearAccess() {
    try { window.localStorage.removeItem(ACCESS_KEY); } catch (error) { /* no-op */ }
  }

  function fileProofIsValid() {
    return window.location.protocol === "file:" && new URLSearchParams(window.location.search).get("access") === FILE_ACCESS_PROOF;
  }

  function isAuthenticated() {
    return readAccess() || fileProofIsValid();
  }

  function protectHref(href) {
    if (window.location.protocol !== "file:" || !isAuthenticated()) return href;
    try {
      const url = new URL(href, window.location.href);
      url.searchParams.set("access", FILE_ACCESS_PROOF);
      return url.href;
    } catch (error) {
      return href;
    }
  }

  function fnv1a(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  async function passwordMatches(value) {
    if (window.crypto?.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(value);
      const digest = await window.crypto.subtle.digest("SHA-256", bytes);
      const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
      return hash === PASSWORD_SHA256;
    }
    return fnv1a(value) === PASSWORD_FNV1A;
  }

  function safeNext(value) {
    if (!value || typeof value !== "string") return null;
    const decoded = value.trim();
    if (!decoded.startsWith("products/") || decoded.includes("..") || decoded.includes(":") || decoded.startsWith("//")) return null;
    return decoded;
  }

  function redirectProtectedPage() {
    const body = document.body;
    if (!body?.dataset.authProtected) return false;

    if (fileProofIsValid()) {
      writeAccess();
      try {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("access");
        window.history.replaceState(window.history.state, "", cleanUrl);
      } catch (error) { /* no-op */ }
    }

    if (isAuthenticated()) {
      document.documentElement.classList.remove("auth-protected-pending");
      return false;
    }

    const home = body.dataset.authHome || "../../index.html";
    const productPath = body.dataset.authPath || "";
    const params = new URLSearchParams(window.location.search);
    params.delete("access");
    const lang = params.get("lang") === "zh" ? "zh" : "en";
    const nextQuery = params.toString();
    const next = `${productPath}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash || ""}`;
    const loginUrl = new URL(home, window.location.href);
    loginUrl.searchParams.set("lang", lang);
    loginUrl.searchParams.set("login", "required");
    loginUrl.searchParams.set("next", next);
    window.location.replace(loginUrl.href);
    return true;
  }

  function getPortalElements() {
    if (portalElements) return portalElements;
    const dialog = document.getElementById("authDialog");
    const button = document.getElementById("loginButton");
    if (!dialog || !button) return null;
    portalElements = {
      dialog,
      button,
      buttonLabel: document.getElementById("loginButtonLabel"),
      close: document.getElementById("authClose"),
      kicker: document.getElementById("authKicker"),
      title: document.getElementById("authTitle"),
      description: document.getElementById("authDescription"),
      form: document.getElementById("authForm"),
      password: document.getElementById("authPassword"),
      passwordLabel: document.getElementById("authPasswordLabel"),
      reveal: document.getElementById("authReveal"),
      message: document.getElementById("authMessage"),
      cancel: document.getElementById("authCancel"),
      submit: document.getElementById("authSubmit"),
      note: document.getElementById("authNote")
    };
    return portalElements;
  }

  function updateButton() {
    const elements = getPortalElements();
    if (!elements) return;
    const ui = copy[currentLanguage];
    const unlocked = isAuthenticated();
    elements.button.classList.toggle("is-authenticated", unlocked);
    elements.button.setAttribute("aria-label", unlocked ? ui.logoutLabel : ui.loginLabel);
    elements.button.setAttribute("aria-pressed", String(unlocked));
    elements.buttonLabel.textContent = unlocked ? ui.loggedIn : ui.login;
  }

  function setLanguage(language) {
    currentLanguage = language === "zh" ? "zh" : "en";
    const elements = getPortalElements();
    if (!elements) return;
    const ui = copy[currentLanguage];
    elements.kicker.textContent = ui.kicker;
    elements.title.textContent = ui.title;
    elements.description.textContent = ui.description;
    elements.passwordLabel.textContent = ui.password;
    elements.reveal.setAttribute("aria-label", elements.password.type === "password" ? ui.show : ui.hide);
    elements.close.setAttribute("aria-label", ui.close);
    elements.cancel.textContent = ui.cancel;
    elements.submit.textContent = ui.submit;
    elements.note.textContent = ui.note;
    updateButton();
  }

  function openDialog(action) {
    const elements = getPortalElements();
    if (!elements) return;
    pendingAction = typeof action === "function" ? action : null;
    previousFocus = document.activeElement;
    elements.password.value = "";
    elements.password.type = "password";
    elements.message.textContent = "";
    elements.dialog.classList.add("is-open");
    elements.dialog.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-dialog-open");
    setLanguage(currentLanguage);
    window.requestAnimationFrame(() => elements.password.focus());
  }

  function clearLoginQuery() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("login");
      url.searchParams.delete("next");
      window.history.replaceState(window.history.state, "", url);
    } catch (error) { /* no-op */ }
  }

  function closeDialog() {
    const elements = getPortalElements();
    if (!elements || !elements.dialog.classList.contains("is-open")) return;
    elements.dialog.classList.remove("is-open");
    elements.dialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-dialog-open");
    pendingAction = null;
    clearLoginQuery();
    if (previousFocus?.focus) previousFocus.focus();
  }

  function requireAccess(action) {
    if (isAuthenticated()) {
      if (typeof action === "function") action();
      return true;
    }
    openDialog(action);
    return false;
  }

  async function submitPassword(event) {
    event.preventDefault();
    const elements = getPortalElements();
    if (!elements) return;
    const ui = copy[currentLanguage];
    elements.submit.disabled = true;
    elements.submit.textContent = ui.checking;
    elements.message.textContent = "";
    let matches = false;
    try {
      matches = await passwordMatches(elements.password.value);
    } catch (error) {
      elements.message.textContent = ui.unsupported;
    }
    elements.submit.disabled = false;
    elements.submit.textContent = ui.submit;

    if (!matches) {
      if (!elements.message.textContent) elements.message.textContent = ui.invalid;
      elements.password.select();
      return;
    }

    writeAccess();
    const next = safeNext(new URLSearchParams(window.location.search).get("next"));
    const action = pendingAction;
    elements.dialog.classList.remove("is-open");
    elements.dialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-dialog-open");
    pendingAction = null;
    updateButton();

    if (next) {
      window.location.href = protectHref(next);
      return;
    }
    clearLoginQuery();
    if (action) action();
  }

  function trapFocus(event) {
    const elements = getPortalElements();
    if (!elements || event.key !== "Tab" || !elements.dialog.classList.contains("is-open")) return;
    const focusable = Array.from(elements.dialog.querySelectorAll("button, input")).filter((element) => !element.disabled);
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

  function initPortal() {
    const elements = getPortalElements();
    if (!elements) return;
    setLanguage(currentLanguage);
    elements.button.addEventListener("click", () => {
      if (isAuthenticated()) {
        clearAccess();
        updateButton();
      } else {
        openDialog();
      }
    });
    elements.close.addEventListener("click", closeDialog);
    elements.cancel.addEventListener("click", closeDialog);
    elements.dialog.querySelector("[data-auth-close]").addEventListener("click", closeDialog);
    elements.form.addEventListener("submit", submitPassword);
    elements.reveal.addEventListener("click", () => {
      const ui = copy[currentLanguage];
      const reveal = elements.password.type === "password";
      elements.password.type = reveal ? "text" : "password";
      elements.reveal.setAttribute("aria-label", reveal ? ui.hide : ui.show);
      elements.password.focus();
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDialog();
      trapFocus(event);
    });
    window.addEventListener("storage", updateButton);

    const params = new URLSearchParams(window.location.search);
    if (!isAuthenticated() && params.get("login") === "required") openDialog();
  }

  window.MoondropAuth = { isAuthenticated, protectHref, requireAccess, setLanguage, logout: clearAccess };
  if (!redirectProtectedPage()) initPortal();
})();
