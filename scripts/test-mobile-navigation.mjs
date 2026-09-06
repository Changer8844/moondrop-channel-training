// Pure DOM doubles: verifies node ownership and handlers, not rendered layout.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../templates/product-training/mobile-training.js', import.meta.url), 'utf8');
function extract(name) {
  const start = source.indexOf('  function ' + name + '(');
  assert.ok(start >= 0, name);
  const end = source.indexOf('\n  }', start);
  return source.slice(start, end + 4);
}
function node() {
  return {
    children: [], parentElement: null, inert: false,
    append(...items) {
      for (const item of items) {
        if (item.parentElement) item.parentElement.children.splice(item.parentElement.children.indexOf(item), 1);
        this.children.push(item); item.parentElement = this;
      }
    },
    before(item) { const p = this.parentElement; p.children.splice(p.children.indexOf(this), 0, item); item.parentElement = p; },
    after(item) {
      if (item.parentElement) item.parentElement.children.splice(item.parentElement.children.indexOf(item), 1);
      const p = this.parentElement; p.children.splice(p.children.indexOf(this) + 1, 0, item); item.parentElement = p;
    },
    classList: {add() {}, remove() {}}, setAttribute() {}, focus() {}, addEventListener(type, action) { this[type] = action; },
    querySelector() { return node(); }
  };
}
const body = node(), header = node(), category = node(), headerToggle = node(), overlayToggle = node(), sibling = node();
body.append(header, category); header.append(headerToggle, sibling); category.append(overlayToggle);
let clicks = 0;
headerToggle.click = () => clicks++;
const context = {
  query: {matches:true}, languageBars: [], el:node, document:{body, createComment:node, activeElement:headerToggle},
  modal:null, sheet:node(), dock:node(), setInert() {}, history:{pushState() {}, replaceState(value) { this.state=value; }}, location:{href:'test'},
  pointers:{clear() {}}, pendingClose:null, notify() {}
};
vm.runInNewContext(['placeLanguageControls','createLanguageBar','openModal','dismissModal'].map(extract).join('\n'), context);
const bar = context.createLanguageBar(headerToggle);
context.createLanguageBar(overlayToggle, category);
assert.equal(headerToggle.parentElement, bar);
assert.equal(overlayToggle.parentElement.parentElement, category, 'Category language stays within its dialog focus scope');
headerToggle.click(); assert.equal(clicks, 1, 'Original handler is retained');
context.query.matches = false; context.placeLanguageControls();
assert.equal(headerToggle.parentElement, header);
assert.equal(header.children.at(-1), sibling, 'Desktop order is restored');
assert.equal(overlayToggle.parentElement, category);
context.query.matches = true; context.placeLanguageControls();
context.languageBar = bar;
const viewer = node();
context.openModal(viewer);
assert.equal(bar.parentElement, viewer, 'Language stays reachable inside the active dialog');
assert.equal(bar.inert, false); assert.equal(context.dock.hidden, true);
bar.click(); assert.equal(context.history.state.mobileOverlay, true, 'Language changes preserve the overlay history marker');
context.dismissModal();
assert.equal(bar.parentElement, body);
assert.equal(context.modal, null);
assert.equal(bar.children.filter(n => n === headerToggle).length, 1, 'Never duplicate the language button');
assert.match(source, /m6 6 12 12M18 6 6 18/, 'Close icon uses a symmetric SVG');
console.log('PASS: mobile footer placement, original language handlers, category/modal ownership and desktop restoration.');
