// Analytics must cover each entry page while keeping previews and other sites untracked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'analytics.js'), 'utf8');
const entries = ['index.html', ...['chu3', 'edge2', 'mm3a', 'pill', 'pudding', 'rays', 'space-travel-2'].map(p => `products/${p}/index.html`)];
for (const entry of entries) {
  const html = fs.readFileSync(path.join(root, entry), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]*analytics\.js[^\"]*)"[^>]*><\/script>/g)];
  assert.equal(scripts.length, 1, `${entry}: include analytics exactly once`);
  assert.equal(path.resolve(root, path.dirname(entry), scripts[0][1].split('?')[0]), path.join(root, 'analytics.js'));
  assert(html.indexOf(scripts[0][0]) < html.lastIndexOf('</body>'), `${entry}: loader must be inside body`);
}
const base = 'https://changer8844.github.io';
for (const [url, enabled] of [
  [`${base}/moondrop-channel-training/`, true],
  [`${base}/moondrop-channel-training/products/chu3/index.html?lang=zh&section=core`, true],
  ['file:///tmp/index.html', false],
  ['http://127.0.0.1:61136/moondrop-channel-training/', false],
  ['http://localhost/moondrop-channel-training/', false],
  ['http://changer8844.github.io/moondrop-channel-training/', false],
  ['https://example.com/moondrop-channel-training/', false],
  [`${base}/another-project/`, false],
  [`${base}/moondrop-channel-training-other/`, false]
]) {
  const nodes = [];
  vm.runInNewContext(source, {location: new URL(url), document: {
    createElement: tag => {assert.equal(tag, 'script'); return {dataset: {}};},
    body: {appendChild: node => nodes.push(node)}
  }});
  assert.equal(nodes.length, Number(enabled), url);
  if (enabled) {
    assert.equal(nodes[0].src, 'https://static.cloudflareinsights.com/beacon.min.js');
    assert.equal(nodes[0].type, 'module');
    assert.equal(nodes[0].async, true);
    assert.deepEqual(JSON.parse(nodes[0].dataset.cfBeacon), {token: '1e410da33b464564857a8eb604eea7a2', spa: false});
  }
}
console.log('PASS: 8 entry pages and 9 production/preview boundary cases');
