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

for (const slug of productSlugs) {
  const file = path.join(productDir, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
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
  if (!/event\.target\.closest\(['"]\.hotspot['"]\)/.test(html)) fail('drag handler can intercept hotspot switching');
}

if (failures.length) {
  console.error('MOONDROP product-template audit failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(`MOONDROP product-template audit passed for ${productSlugs.length} live product page(s): ${productSlugs.join(', ')}`);
