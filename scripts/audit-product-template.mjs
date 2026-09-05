import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'templates/product-training/template-contract.json'), 'utf8'));
const reviewStylesheetFile = path.join(root, 'templates/product-training/media-reviews.css');
const reviewStylesheet = fs.readFileSync(reviewStylesheetFile, 'utf8');
const featureMediaStylesheet = fs.readFileSync(path.join(root, 'templates/product-training/feature-media.css'), 'utf8');
const positioningStylesheet = fs.readFileSync(path.join(root, 'templates/product-training/positioning.css'), 'utf8');
const positioningRenderer = fs.readFileSync(path.join(root, 'templates/product-training/positioning.js'), 'utf8');
const catalog = fs.readFileSync(path.join(root, 'catalog.js'), 'utf8');
const catalogContext = { window: {} };
vm.runInNewContext(catalog, catalogContext, { timeout: 1000 });
const liveSlugs = catalogContext.window.MOONDROP_TRAINING_CATALOG.products
  .filter((product) => product.status === 'live')
  .map((product) => product.id);

const productDir = path.join(root, 'products');
const requestedSlug = process.argv.find((arg) => arg.startsWith('--product='))?.split('=')[1];
const productSlugs = fs.readdirSync(productDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(productDir, entry.name, 'index.html')))
  .map((entry) => entry.name)
  .filter((slug) => requestedSlug ? slug === requestedSlug : liveSlugs.length === 0 || liveSlugs.includes(slug))
  .sort();

const failures = [];
if (!productSlugs.length) failures.push('No matching product pages found');

const cssValuePattern = (value) => value
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  .replace(/\s+/g, '\\s*');

const cssRuleHas = (source, selector, declarations) => {
  const selectorPattern = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*');
  const match = source.match(new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`));
  if (!match) return false;
  return declarations.every(([property, value]) => new RegExp(`${property.replace(/-/g, '\\-')}\\s*:\\s*${cssValuePattern(value)}(?:\\s*;|\\s*$)`).test(match[1]));
};

const sharedReviewChecks = [
  ['.review-intro', [['min-height', contract.reviewHeroMinHeight], ['padding', contract.reviewHeroPadding]]],
  ['.review-intro-copy', [['width', contract.reviewHeroCopyWidth]]],
  ['.review-intro-product-frame', [['right', '0'], ['width', contract.reviewHeroProductWidth]]],
  ['.review-intro-product', [['object-fit', 'contain'], ['object-position', 'right center']]],
  ['.review-intro h3', [
    ['max-width', 'none'],
    ['font-size', contract.reviewHeroHeadingSize],
    ['font-weight', contract.reviewHeroHeadingWeight],
    ['letter-spacing', contract.reviewHeroHeadingLetterSpacing],
    ['line-height', contract.reviewHeroHeadingLineHeight],
    ['overflow-wrap', 'normal'],
    ['word-break', 'normal'],
    ['hyphens', 'none'],
    ['text-wrap', contract.reviewHeroHeadingTextWrap]
  ]],
  ['.review-copy h3', [['overflow-wrap', 'normal'], ['word-break', 'normal'], ['text-wrap', contract.reviewCardTitleTextWrap]]]
];

for (const [selector, declarations] of sharedReviewChecks) {
  if (!cssRuleHas(reviewStylesheet, selector, declarations)) failures.push(`shared media-review template: ${selector} drifted from template-contract.json`);
}
for (const [selector, declarations] of [
  ['.positioning-hero', [['min-height', '230px'], ['background', '#030505']]],
  ['.positioning-hero-copy', [['width', '68%']]],
  ['.positioning-hero h3', [['font-size', 'clamp(38px, 4.2vw, 66px)'], ['font-weight', '520'], ['text-wrap', 'pretty']]],
  ['.positioning-hero-art img', [['object-fit', 'contain'], ['object-position', 'right center']]],
  ['.positioning-cards', [['grid-template-columns', 'repeat(2, minmax(0, 1fr))'], ['gap', '10px']]],
  ['.positioning-card', [['padding', '24px']]]
]) {
  if (!cssRuleHas(positioningStylesheet, selector, declarations)) failures.push(`shared positioning template: ${selector} drifted`);
}
if (!positioningRenderer.includes('data-positioning-template-version="1.0.0"') || !positioningRenderer.includes('Know what the customer is comparing.') || !positioningRenderer.includes('先听懂顾客在比较什么。')) failures.push('shared positioning renderer is missing its version or bilingual heading');
for (const [selector, declarations] of [
  ['.panel-media-stage[data-layout="image"]', [['height', 'auto']]],
  ['.panel-media-stage[data-layout="image"] .panel-media-visual', [['position', 'relative'], ['height', 'auto']]],
  ['.panel-media-stage[data-layout="image"] .panel-media-image', [['width', '100%'], ['height', 'auto']]],
  ['.media-frame[data-layout="poster"] img', [['width', '100%'], ['height', 'auto']]]
]) {
  if (!cssRuleHas(featureMediaStylesheet, selector, declarations)) failures.push(`shared source-image template: ${selector} must use natural dimensions`);
}
if (!new RegExp(`@media\\s*\\(max-width:\\s*${cssValuePattern(contract.reviewHeroMobileBreakpoint)}\\)`).test(reviewStylesheet)) {
  failures.push('shared media-review template: mobile breakpoint drifted from template-contract.json');
}

for (const slug of productSlugs) {
  const file = path.join(productDir, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const localScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)]
    .map((match) => match[1].split('?')[0])
    .filter((src) => !src.startsWith('../') && !src.includes('://'));
  const copySource = html + localScripts.map((src) => {
    const scriptFile = path.join(productDir, slug, src);
    return fs.existsSync(scriptFile) ? `\n${fs.readFileSync(scriptFile, 'utf8')}` : '';
  }).join('');
  const inlineStyles = [...html.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join('\n');
  const fail = (message) => failures.push(`${slug}: ${message}`);

  if (!html.includes(`data-core-template-version="${contract.version}"`)) fail(`missing template version ${contract.version}`);
  if (!html.includes(`data-core-initial-state="${contract.initialState}"`)) fail('initial state is not declared as Overview');
  if (!html.includes(`data-core-layout="${contract.desktopLayout}"`)) fail('desktop layout is not declared as three columns');
  if (!html.includes(`data-review-template-version="${contract.reviewHeroVersion}"`)) fail(`missing media-review template version ${contract.reviewHeroVersion}`);
  if (!html.includes(`href="${contract.reviewHeroStylesheet}"`)) fail('does not load the shared media-review stylesheet after page styles');
  if (!html.includes('href="../../templates/product-training/feature-media.css?v=1.0.0"')) fail('does not load the shared natural-size source-image stylesheet');
  if (!html.includes('href="../../templates/product-training/positioning.css?v=1.0.0"') || !html.includes('src="../../templates/product-training/positioning.js?v=1.0.0"') || !html.includes('MoondropPositioning.render(')) fail('does not use the shared positioning renderer and stylesheet');
  if (/\.positioning-(?:hero|cards|card|answer|customer|proof)\b/.test(inlineStyles)) fail('locally redefines the shared positioning layout or typography');
  if (!copySource.includes(contract.reviewHeroTitleEn) || !copySource.includes(contract.reviewHeroTitleZh)) fail('media-review hero copy differs from the bilingual template');
  if (/review(?:IntroTitle|s\s*:\s*\{[^}]*introTitle)\s*:\s*["'`][^"'`]*<br\s*\/?>/i.test(copySource)) fail('media-review hero copy contains an authored line break');
  if (/\.review-(?:intro|grid|card|image-wrap|play|copy|channel)\b/.test(inlineStyles)) fail('locally redefines shared media-review layout or typography');
  if ([...html.matchAll(/--review-product-origin\s*:\s*([^;"']+)/g)].some((match) => !/^right\b/.test(match[1].trim()))) fail('review image must scale from the right edge to avoid clipping the right-hand product');

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
  if (!/(?:els\.)?detailPanel\.querySelector\(['"]\.panel-content['"]\)\.scrollTop\s*=\s*0/.test(html)) fail('feature changes do not reset the actual .panel-content scroll container');
  if (!cssRuleHas(html, '.support-copy--warranty', [['gap', '0'], ['padding', '0']])) fail('support rows do not share the same column origin');
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
  if (!/event\.target\.closest\(['"]\.hotspot['"]\)/.test(html)) fail('drag handler can intercept hotspot switching');
  for (const pattern of contract.forbiddenCopyPatterns || []) {
    if (new RegExp(pattern, 'i').test(copySource)) fail(`contains production-note copy matching /${pattern}/i`);
  }
}

if (failures.length) {
  console.error('MOONDROP product-template audit failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(`MOONDROP product-template audit passed for ${productSlugs.length} selected product page(s): ${productSlugs.join(', ')}`);
