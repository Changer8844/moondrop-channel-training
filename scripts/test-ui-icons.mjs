import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = ['mm3a', 'pill', 'pudding', 'rays', 'space-travel-2'];
const pages = ['index.html', ...products.map(slug => `products/${slug}/index.html`)];
const sources = ['app.js', ...pages, 'products/mm3a/view-data.js', 'products/pudding/view-data.js'];
for (const file of sources) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  assert.ok(!/[\u2196-\u2199\uFE0E\uFE0F]/u.test(source), `${file}: arrow must not depend on text/emoji fonts`);
  for (const tag of source.matchAll(/<(?:span|b)\b[^>]*class="[^"]*\bicon-arrow\b[^"]*"[^>]*>/g)) {
    assert.ok(tag[0].includes('aria-hidden="true"'), `${file}: decorative arrow must be hidden from screen readers`);
  }
}
for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page), 'utf8');
  const prefix = page === 'index.html' ? '' : '../../';
  assert.ok(source.includes(`href="${prefix}templates/product-training/icons.css?v=1.0.0"`), `${page}: shared vector icons missing`);
}
const css = fs.readFileSync(path.join(root, 'templates/product-training/icons.css'), 'utf8');
for (const token of ['.icon-arrow', 'background-color: currentColor', '-webkit-mask:', 'mask:', 'data:image/svg+xml', 'M5 19 19 5M5 5h14v14']) {
  assert.ok(css.includes(token), `Vector icon primitive missing ${token}`);
}
assert.ok(!/https?:\/\//.test(css.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '')), 'Icons must remain offline, without remote assets');
console.log('PASS: six pages share font-independent decorative SVG arrows; bilingual review labels contain no emoji arrows.');
