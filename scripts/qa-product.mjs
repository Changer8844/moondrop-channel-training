// Local browser acceptance. Never alters site files or production authorization.
// Run with the bundled Node runtime; pass --product=slug and --out=/private/tmp/qa-name.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const arg = (key, fallback) => process.argv.find(v => v.startsWith(`--${key}=`))?.slice(key.length + 3) || fallback;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = arg('product', 'mm3a');
if (!/^[a-z0-9-]+$/.test(slug)) throw Error('Invalid product slug');
const out = arg('out', `/private/tmp/moondrop-${slug}-qa`);
const smoke = process.argv.includes('--smoke');
const boardsOnly = process.argv.includes('--boards-only');
const startedAt = new Date().toISOString();
const sections = arg('sections', 'hub,core,comparison,support,reviews,gallery').split(',');
const playwright = process.env.PLAYWRIGHT_MODULE || path.resolve(path.dirname(process.execPath), '../node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(playwright));
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true });
const context = await browser.newContext({reducedMotion:'reduce'});
await context.addInitScript(() => {
  // Isolated QA context and local-file pages only; never a production session.
  if (location.protocol === 'file:') localStorage.setItem('moondropChannelTrainingAccess', JSON.stringify({version:1,expires:Date.now()+3600000}));
});
const page = await context.newPage();
page.setDefaultTimeout(8000);
const failures = [], reports = [];
page.on('pageerror', e => failures.push({state:'runtime',error:e.message}));
await fs.mkdir(out,{recursive:true});
const entry = pathToFileURL(path.join(root,'products',slug,'index.html')).href;
const sizes = arg('sizes','') ? arg('sizes','').split(',').map(s=>s.split('x').map(Number)) : smoke ? [[1440,900]] : [[1920,1080],[1440,900],[1366,768],[1024,768]];
const langs = smoke ? ['en'] : ['en','zh'];
async function ready() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(i=>i.getBoundingClientRect().width).map(i=>i.decode().catch(()=>{})));
  });
}
async function inspect(name, lang, size, screenshot = true) {
  await ready();
  const result = await page.evaluate(() => {
    const active = document.querySelector('.section-board.open,.gallery-board.open,.board.open') || document.querySelector('#trainingApp.hub-mode .training-hub') || document.querySelector('.workspace');
    const errors = [], type = [];
    for (const el of active.querySelectorAll('h1,h2,h3,.hub-section-copy>span,.panel-body,.panel-empty>p,.positioning-answer,.positioning-customer,.package-list>li,.review-copy>span,.subfeature>span')) {
      const r=el.getBoundingClientRect(), s=getComputedStyle(el);
      if (!r.width || !r.height || s.visibility==='hidden') continue;
      if (el.closest('.panel-content') && !el.closest('.detail-panel.open')) continue;
      if (el.closest('.panel-empty') && el.closest('.detail-panel.open')) continue;
      if (el.scrollWidth>el.clientWidth+2) errors.push('Text overflow: '+el.textContent.slice(0,90));
      if (el.matches('.review-intro h3,.hub-section-copy span,.panel-empty p') && el.querySelector('br')) errors.push('Forced copy break');
      type.push({text:el.textContent,font:s.fontSize,weight:s.fontWeight,width:r.width});
    }
    for(const img of active.querySelectorAll('img')) if(img.getBoundingClientRect().width && !img.naturalWidth) errors.push('Missing image: '+img.getAttribute('src'));
    if(document.documentElement.scrollWidth>innerWidth+2) errors.push('Page horizontal overflow');
    const top=document.querySelector('.support-block--package .support-copy'), bottom=document.querySelector('.support-exclusions');
    if(top && bottom && innerWidth>760 && Math.abs(top.getBoundingClientRect().x+parseFloat(getComputedStyle(top).paddingLeft)-bottom.getBoundingClientRect().x-parseFloat(getComputedStyle(bottom).paddingLeft))>2) errors.push('Support column misalignment');
    const grid=active.querySelector('.review-grid');
    if(grid?.dataset.reviewCount==='2' && innerWidth>840 && getComputedStyle(grid).gridTemplateColumns.split(' ').length!==2) errors.push('Two reviews must use two columns');
    const stage=document.getElementById('stage'), rig=document.getElementById('photoRig');
    if(stage?.getBoundingClientRect().width && rig) {
      const s=stage.getBoundingClientRect(),r=rig.getBoundingClientRect();
      if(r.x>s.x+2||r.y>s.y+2||r.right<s.right-2||r.bottom<s.bottom-2) errors.push('Stage exposes area outside original photo');
      if(document.querySelector('[data-grid-layer="background"]') && Number(getComputedStyle(stage,'::before').zIndex)>=Number(getComputedStyle(rig).zIndex)) errors.push('Background grid overlays the product photograph');
      if(document.querySelector('[data-master-view-policy="single-composite"]')) {
        const photo = rig.querySelector('.product-photo');
        if(rig.querySelectorAll('img').length!==1 || rig.querySelector('.input-views')) errors.push('Master must be one composite photograph, not separate image panels');
        if(photo?.getAttribute('src')!==window.MM3A_VIEW.masterView.image) errors.push('Story switched away from the shared master');
        if(rig.dataset.focus && Number(rig.style.getPropertyValue('--zoom'))<=1) errors.push('Selected story did not enlarge the master');
        const panel = document.querySelector('.detail-panel.open')?.getBoundingClientRect();
        const manuallyPanned = parseFloat(rig.style.getPropertyValue('--drag-x')) || parseFloat(rig.style.getPropertyValue('--drag-y'));
        const markers = manuallyPanned ? [] : rig.dataset.focus ? rig.querySelectorAll('.hotspot.active') : rig.querySelectorAll('.hotspot');
        for(const marker of markers) {
          const m=marker.getBoundingClientRect();
          if(m.left<s.left-2 || m.right>s.right+2 || m.top<s.top-2 || m.bottom>s.bottom+2) errors.push('Master hotspot clipped: '+marker.dataset.feature);
          if(panel && panel.left<m.right-2 && panel.right>m.left+2 && panel.top<m.bottom && panel.bottom>m.top) errors.push('Master hotspot obscured by detail panel');
          const label=marker.querySelector('.hotspot-label'), l=label?.getBoundingClientRect();
          if(l?.width && getComputedStyle(label).opacity==='1' && (l.left<s.left-2 || l.right>s.right+2 || l.top<s.top-2 || l.bottom>s.bottom+2)) errors.push('Master hotspot label clipped: '+marker.dataset.feature);
        }
      }
    }
    return {errors,type};
  });
  const state=`${size.join('x')}-${lang}-${name}`;
  reports.push({state,...result}); failures.push(...result.errors.map(error=>({state,error})));
  if(screenshot) await page.screenshot({path:path.join(out,`${state}.png`)});
}
try {
  for (const size of sizes) for (const lang of langs) {
    await page.setViewportSize({width:size[0],height:size[1]});
    for (const section of sections) {
      await page.goto(`${entry}?lang=${lang}${section==='hub'?'':'&section='+section}`);
      await inspect(section,lang,size);
      if(section==='gallery') {
        const cards=await page.locator('.gallery-card').count();
        if(!cards) failures.push({state:'gallery',error:'No gallery entries'});
        await page.locator('.gallery-card').first().click();
        const seen=new Set();
        for(let i=0;i<cards;i++) {
          await page.locator('#lightbox.open').waitFor(); await ready();
          const img=await page.locator('#lightboxImage').evaluate(i=>({src:i.getAttribute('src'),loaded:i.naturalWidth>0}));
          if(!img.loaded) failures.push({state:'gallery',error:'Original photo did not load'});
          seen.add(img.src); await page.locator('#lightboxNext').click();
        }
        if(seen.size!==cards) failures.push({state:'gallery',error:'Gallery navigation repeats or skips an image'});
        await page.keyboard.press('Escape');
      }
      if(section==='core') {
        const data=await page.evaluate(()=>Object.values(window).find(v=>v&&v.product&&Array.isArray(v.features)));
        const expected=data.features.filter(f=>f.hotspot!==false).length;
        if(await page.locator('.hotspot').count()!==expected) failures.push({state:'core',error:'Hotspot count differs from physical stories'});
        if(await page.locator('[data-hotspot-policy="all-stories"]').count() && expected!==data.features.length) failures.push({state:'core',error:'All-story overview is missing feature markers'});
        for(const feature of data.features) {
          await page.locator(`.feature-button[data-feature="${feature.id}"]`).click();
          await page.waitForFunction(()=>document.querySelector('.detail-panel.open'));
          await inspect(feature.id,lang,size);
          if(feature===data.features[0] && size===sizes[0]) {
            const r=await page.locator('#stage').boundingBox();
            for(const direction of [-1,1]) {
              const before=await page.locator('#photoRig').evaluate(el=>el.style.getPropertyValue('--drag-x'));
              const start = await page.evaluate(r => {
                for(const fy of [.1,.25,.5,.75,.9]) for(const fx of [.1,.25,.5,.75,.9]) {
                  const x=r.x+r.width*fx,y=r.y+r.height*fy,hit=document.elementFromPoint(x,y);
                  if(hit?.closest('#stage') && !hit.closest('.hotspot')) return {x,y};
                }
                throw Error('No unobstructed place to start photo drag');
              },r);
              await page.mouse.move(start.x,start.y); await page.mouse.down();
              // Keep synthetic pointer travel inside the browser viewport.
              await page.mouse.move(Math.max(5,Math.min(size[0]-5,start.x+direction*r.width*2)),Math.max(70,Math.min(size[1]-5,start.y+direction*r.height*2)),{steps:8}); await page.mouse.up();
              const after=await page.locator('#photoRig').evaluate(el=>el.style.getPropertyValue('--drag-x'));
              if(before===after) failures.push({state:`${size.join('x')}-${lang}-pan-${direction}`,error:'Pointer did not move the enlarged photograph'});
              await inspect(`pan-${direction}`,lang,size,false);
            }
            await page.locator('#productOverviewButton').click();
            await page.locator(`.feature-button[data-feature="${feature.id}"]`).click();
          }
          if(feature.hotspot===false && await page.locator(`.hotspot[data-feature="${feature.id}"]`).count()) failures.push({state:feature.id,error:'List-only story has a physical hotspot'});
          const frames=await page.evaluate(()=>parseInt(document.getElementById('panelMediaCount').textContent.split('/')[1]));
          for(let i=1;i<frames;i++) {
            await page.locator('#nextPanelMedia').click();
            await inspect(`${feature.id}-image${i+1}`,lang,size);
          }
          await page.locator('#panelMediaVisual').click();
          await page.locator('#lightbox.open').waitFor(); await ready();
          if(!await page.locator('#lightboxImage').evaluate(i=>i.naturalWidth>0)) failures.push({state:feature.id,error:'Full-size feature image broken'});
          await page.keyboard.press('Escape');
          await page.locator('.panel-content').evaluate(el=>el.scrollTop=el.scrollHeight);
        }
        await page.locator('#productOverviewButton').click();
        for(const hotspot of await page.locator('.hotspot').all()) {
          await hotspot.click(); await page.waitForFunction(()=>document.querySelector('.detail-panel.open'));
          const y=await page.locator('.panel-content').evaluate(el=>el.scrollTop);
          if(y!==0) failures.push({state:'feature-switch',error:'Detail scroll not reset'});
          await page.locator('#productOverviewButton').click();
        }
        await page.locator(await page.locator('#overviewClose').isVisible() ? '#overviewClose' : '#coreMenuClose').click();
        await page.waitForFunction(()=>document.querySelector('#trainingApp.hub-mode'));
      }
    }
    console.log(`Checked ${slug} ${size.join('x')} ${lang}`);
  }
  if (!boardsOnly) {
  // Keyboard activation and language retention through close/Home.
  await page.goto(`${entry}?lang=en`);
  await page.locator('[data-section="reviews"]').focus(); await page.keyboard.press('Enter');
  await page.locator('.section-board.open').waitFor(); await page.locator('#languageToggle').click();
  if(await page.locator('#sectionBoardTitle').textContent()!=='媒体评测') failures.push({state:'language',error:'Board did not localize'});
  await page.keyboard.press('Escape'); await page.waitForFunction(()=>!document.querySelector('.section-board.open'));
  if(!(await page.locator('#trainingHomeLink').getAttribute('href')).includes('lang=zh')) failures.push({state:'home',error:'Home loses language'});
  const gate=await browser.newContext(); const gated=await gate.newPage();
  await gated.goto(`${entry}?lang=en`);
  await gated.locator('#authDialog[aria-hidden="false"]').waitFor();
  const authVisible = await gated.locator('#authDialog').isVisible();
  const redirected = new URL(gated.url()).pathname === path.join(root,'index.html');
  if (!authVisible || !redirected) failures.push({state:'unauthorized-entry',error:'Expected protected-page redirect and visible login dialog'});
  reports.push({state:'unauthorized-entry',authVisible,redirected});
  await gate.close();
  }
} catch(error) {
  failures.push({state:'test-interrupted',error:error.message});
  throw error;
} finally {
  await fs.writeFile(path.join(out,'report.json'),JSON.stringify({slug,startedAt,finishedAt:new Date().toISOString(),states:reports.length,failures,reports},null,2));
  await browser.close();
}
console.log(JSON.stringify({product:slug,states:reports.length,failures,output:out},null,2));
if(failures.length) process.exitCode=1;
