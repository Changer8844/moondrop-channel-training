import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'templates/product-training/template-contract.json'), 'utf8'));
const catalog = fs.readFileSync(path.join(root, 'catalog.js'), 'utf8');
const liveSlugs = [...catalog.matchAll(/id:\s*['"]([^'"]+)['"][\s\S]*?href:\s*['"](?:\.\/)?products\/([^/]+)\/index\.html['"][\s\S]*?status:\s*['"]live['"]/g)]
  .map((match) => match[2]);

const productDir = path.join(root, 'products');
const productSlugs = fs.readdirSync(productDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(productDir, entry.name, 'index.html')))
  .map((entry) => entry.name)
  .filter((slug) => liveSlugs.length === 0 || liveSlugs.includes(slug))
  .sort();

const failures = [];

const cssValuePattern = (value) => value
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  .replace(/\s+/g, '\\s*');

for (const slug of productSlugs) {
  const file = path.join(productDir, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const contentFile = path.join(productDir, slug, 'content.js');
  const copySource = html + (fs.existsSync(contentFile) ? `\n${fs.readFileSync(contentFile, 'utf8')}` : '');
  const fail = (message) => failures.push(`${slug}: ${message}`);

  if (!html.includes(`data-core-template-version="${contract.version}"`)) fail(`missing template version ${contract.version}`);
  if (!html.includes(`data-core-initial-state="${contract.initialState}"`)) fail('initial state is not declared as Overview');
  if (!html.includes(`data-core-layout="${contract.desktopLayout}"`)) fail('desktop layout is not declared as three columns');

  for (const role of contract.requiredRoles) {
    if (!html.includes(`data-role="${role}"`)) fail(`missing required role ${role}`);
  }
  for (const className of contract.requiredClasses) {
    if (!new RegExp(`class=["'][^"']*\\b${className}\\b`).test(html)) fail(`missing required class ${className}`);
  }

  if (/openFeature\s*\(\s*features\s*\[\s*0\s*\]/.test(html) || /renderFeature\s*\(\s*data\.features\s*\[\s*0\s*\]/.test(html)) {
    fail('automatically opens the first feature instead of Overview');
  }
  if (!/function\s+resetOverview\s*\(/.test(html)) fail('missing resetOverview controller');
  if (!/grid-template-columns\s*:\s*minmax\(236px,\s*272px\)\s+minmax\(520px,\s*1fr\)\s+minmax\(332px,\s*390px\)/.test(html)) fail('desktop column sizes drifted from the SPACE TRAVEL 2 template');
  if (!/\.hotspot\s*\{[^}]*width:\s*36px;[^}]*height:\s*36px;/.test(html)) fail('hotspot size drifted from the SPACE TRAVEL 2 template');
  if (!/\.hotspot-label\s*\{[^}]*left:\s*38px;/.test(html)) fail('hotspot label spacing drifted from the SPACE TRAVEL 2 template');
  if (!/height:\s*clamp\(190px,\s*20vh,\s*240px\)/.test(html)) fail('feature media frame size drifted from the SPACE TRAVEL 2 template');
  if (!new RegExp(`\\.support-block--package\\s*\\{[^}]*grid-template-columns\\s*:\\s*${cssValuePattern(contract.supportPackageColumns)}`).test(html)) fail('package row columns drifted from the product template');
  if (!new RegExp(`\\.support-copy--warranty\\s*\\{[^}]*grid-template-columns\\s*:\\s*${cssValuePattern(contract.supportWarrantyColumns)}`).test(html)) fail('warranty row columns drifted from the product template');
  if (!new RegExp(`\\.hub-section-button\\s*\\{[^}]*position\\s*:\\s*relative[^}]*grid-template-columns\\s*:\\s*${cssValuePattern(contract.hubSectionColumns)}`).test(html)) fail('hub card text column drifted from the product template');
  if (!/\.hub-section-arrow\s*\{[^}]*position\s*:\s*absolute/.test(html)) fail('hub card arrow still consumes text width');
  for (const selector of ['b', 'span']) {
    const copyRule = new RegExp(`\\.hub-section-copy\\s+${selector}\\s*\\{[^}]*max-width\\s*:\\s*${cssValuePattern(contract.hubSectionCopyMaxWidth)}[^}]*overflow-wrap\\s*:\\s*normal[^}]*word-break\\s*:\\s*normal[^}]*text-wrap\\s*:\\s*${cssValuePattern(contract.hubSectionTextWrap)}`);
    if (!copyRule.test(html)) fail(`hub card ${selector === 'b' ? 'title' : 'subtitle'} wrapping drifted from the product template`);
  }
  for (const selector of ['h2', 'p']) {
    const emptyCopyRule = new RegExp(`\\.panel-empty\\s+${selector}\\s*\\{[^}]*max-width\\s*:\\s*${cssValuePattern(contract.panelEmptyCopyMaxWidth)}[^}]*overflow-wrap\\s*:\\s*normal[^}]*word-break\\s*:\\s*normal[^}]*text-wrap\\s*:\\s*${cssValuePattern(contract.panelEmptyTextWrap)}`);
    if (!emptyCopyRule.test(html)) fail(`empty-state ${selector === 'h2' ? 'heading' : 'body'} wrapping drifted from the product template`);
  }
  if (/<h2[^>]*id=["']emptyTitle["'][^>]*>[^<]*<br\s*\/?>/i.test(html)) fail('empty-state heading contains an authored line break');
  if (/emptyTitle\s*:\s*["'`][^"'`]*<br\s*\/?>/i.test(copySource)) fail('localized empty-state heading contains an authored line break');
  if (/\.gallery-heading\s+p\s*\{/i.test(html) && !/\.gallery-heading\s+p\s*\{[^}]*max-width\s*:\s*none[^}]*overflow-wrap\s*:\s*normal[^}]*word-break\s*:\s*normal[^}]*text-wrap\s*:\s*pretty/i.test(html)) {
    fail('gallery instruction is capped before using its available row width');
  }
  if (!new RegExp(`\\.review-copy\\s+h3\\s*\\{[^}]*letter-spacing\\s*:\\s*-.01em[^}]*overflow-wrap\\s*:\\s*normal[^}]*word-break\\s*:\\s*normal[^}]*text-wrap\\s*:\\s*${cssValuePattern(contract.reviewCardTitleTextWrap)}`).test(html)) {
    fail('review-card title wrapping drifted from the product template');
  }
  if (!/event\.target\.closest\(['"]\.hotspot['"]\)/.test(html)) fail('drag handler can intercept hotspot switching');
  for (const pattern of contract.forbiddenCopyPatterns || []) {
    if (new RegExp(pattern, 'i').test(copySource)) fail(`contains production-note copy matching /${pattern}/i`);
  }
}

if (failures.length) {
  console.error('MOONDROP product-template audit failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(`MOONDROP product-template audit passed for ${productSlugs.length} live product page(s): ${productSlugs.join(', ')}`);
