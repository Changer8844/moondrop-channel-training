/* Shared language selector for the portal and product training pages. */
(() => {
  'use strict';

  const languages = [
    ['zh', '中文'],
    ['en', 'English'],
    ['de', 'Deutsch'],
    ['es', 'Español'],
    ['pt', 'Português'],
    ['fr', 'Français'],
    ['it', 'Italiano'],
    ['ru', 'Русский']
  ];
  const codes = new Set(languages.map(([code]) => code));
  const normalize = (value) => codes.has(value) ? value : 'en';

  window.MoondropLanguage = { languages, normalize };

  function enhance(select) {
    if (!(select instanceof HTMLSelectElement)) return;
    const queryLanguage = normalize(new URLSearchParams(window.location.search).get('lang'));
    select.value = queryLanguage;
    select.addEventListener('change', (event) => {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', normalize(event.target.value));
      window.location.assign(url.href);
    });
  }

  function run() {
    document.querySelectorAll('select.language-toggle').forEach(enhance);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
