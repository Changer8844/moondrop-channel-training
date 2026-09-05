/* One positioning renderer for every product. Product data supplies only cards and imagery. */
window.MoondropPositioning = (() => {
  const escape = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const copy = {
    en: { title: 'Know what the customer is comparing.', intro: 'Ask what the customer uses now, then answer with one clear difference and one proof point.' },
    zh: { title: '先听懂顾客在比较什么。', intro: '先问顾客现在使用哪类耳机，再用一个差异和一个证据回答。' }
  };
  function render({ language, cards, image, imageAlt, campaign = false, scale = 1, origin = 'right center' }) {
    const words = copy[language] || copy.en;
    return `<section class="positioning-hero" data-positioning-template-version="1.0.0">
      <div class="positioning-hero-copy"><h3>${words.title}</h3><p>${words.intro}</p></div>
      <div class="positioning-hero-art${campaign ? ' positioning-hero-art--campaign' : ''}" style="--positioning-scale:${Number(scale) || 1};--positioning-origin:${escape(origin)}"><img src="${escape(image)}" alt="${escape(imageAlt)}" /></div>
    </section><div class="positioning-cards">${cards.map((card) => `<article class="positioning-card">
      <h3>${escape(card.title)}</h3>
      ${card.customer ? `<p class="positioning-customer">${escape(card.customer)}</p>` : ''}
      <p class="positioning-answer">${escape(card.answer)}</p>
      ${card.proof ? `<div class="positioning-proof">${escape(card.proof)}</div>` : ''}
    </article>`).join('')}</div>`;
  }
  return { render };
})();
