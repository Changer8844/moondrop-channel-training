// CHU III acceptance: complete localized bodies and unchanged user-supplied SRPs.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'/private/tmp/chu3-qa-content';
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../node_modules/playwright/index.mjs')));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({offline:true,reducedMotion:'reduce'});
await context.addInitScript(()=>{if(location.protocol==='file:')localStorage.setItem('moondropChannelTrainingAccess',JSON.stringify({version:1,expires:Date.now()+3600000}));});
const page=await context.newPage(),reports=[],failures=[];
page.on('pageerror',e=>failures.push(e.message));
await fs.mkdir(out,{recursive:true});
const entry=pathToFileURL(path.join(root,'products/chu3/index.html')).href;
const expected=[['USD','24.99'],['EUR','29.99'],['GBP','24.99'],['CAD','38.99'],['INR','2699'],['AUD','38.99'],['MYR','115'],['KRW','38999'],['TWD','880'],['PHP','1689'],['SGD','40.99'],['IDR','490000'],['THB','909'],['VND','715000'],['BDT','3365'],['MXN','599'],['RUB','2299']];
const languages=['zh','en','de','es','pt','fr','it','ru'];
async function ready(){await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.getBoundingClientRect().width&&i.loading!=='lazy'&&i.src).map(i=>i.decode()));});}
async function layout(){return page.evaluate(()=>{
 const active=document.querySelector('.section-board.open')||document.querySelector('.training-hub');const errors=[];
 for(const el of active.querySelectorAll('h1,h2,h3,p,summary,th,td,.hub-section-copy b,.hub-section-copy span')){const r=el.getBoundingClientRect();if(r.width&&el.scrollWidth>el.clientWidth+2)errors.push('Overflow: '+el.textContent.slice(0,60));}
 if(document.documentElement.scrollWidth>innerWidth+1)errors.push('Page overflow');
 return errors;
});}
try{
 // Switch the actual selector while retaining the positioning route.
 await page.goto(entry+'?lang=en&section=comparison');
 for(const lang of languages){
  await page.locator('#languageToggle').selectOption(lang);
  await page.waitForFunction(lang=>document.documentElement.lang.split('-')[0]===lang,lang);
  if(!await page.locator('.regional-prices').evaluate(e=>e.open)){await page.locator('.regional-prices summary').focus();await page.keyboard.press('Enter');}
  assert(await page.locator('.regional-prices').evaluate(e=>e.open),'Keyboard did not open prices');
  assert.deepEqual(await page.locator('.regional-prices tbody tr').evaluateAll(rows=>rows.map(r=>[...r.children].map(c=>c.textContent))),expected);
  assert.equal(new URL(page.url()).searchParams.get('section'),'comparison');
  const content=await page.evaluate(lang=>({actual:[...document.querySelectorAll('.positioning-answer')].map(n=>n.textContent),expected:CHU3_COPY[lang].comparisons.map(c=>c[2]),title:document.querySelector('.regional-prices summary').textContent,label:CHU3_COPY[lang].prices[0]}),lang);
  assert.deepEqual(content.actual,content.expected);assert.equal(content.title,content.label);
  reports.push({case:'language-price-retention',lang,rows:17});
 }
 for(const lang of languages){
  await page.goto(entry+`?lang=${lang}&section=core`);
  const copy=await page.evaluate(lang=>CHU3_COPY[lang],lang);
  assert.equal(copy.stories.length,5);assert.equal(copy.galleryTitles.length,12);assert.equal(copy.reviewNotes.length,6);
  const ids=await page.locator('.feature-button').evaluateAll(ns=>ns.map(n=>n.dataset.feature));
  assert.deepEqual(await page.locator('.hotspot').evaluateAll(ns=>ns.map(n=>n.dataset.feature)),ids,'Every CHU III story must be reachable from the overview photograph');
  for(const [i,id] of ids.entries()){
   await page.locator('#productOverviewButton').click();
   await page.locator(`.hotspot[data-feature="${id}"]`).focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('.hotspot.active').getAttribute('data-feature'),id,'Keyboard opened the wrong story');
   for(const [selector,index] of [['#panelTitle',2],['#panelBody',3],['#panelShow',5],['#panelSay',6],['#panelSpec',7],['#panelPhotoCaption',8]])assert.equal(await page.locator(selector).textContent(),copy.stories[i][index]);
   const photo=page.locator('#panelMediaVisual img');
   const expectedPhoto=['campaign/black-silver-original','hd-gallery/DSC_0279','hd-gallery/DSC_6742','hd-gallery/DSC_6712','hd-gallery/DSC_6765'][i];
   assert.equal(await photo.getAttribute('src'),`assets/${expectedPhoto}.jpg`,'Story photograph does not match the inspected subject');
  }
  await page.goto(entry+`?lang=${lang}&section=support`);
  assert.deepEqual(await page.locator('.package-list li').allTextContents(),copy.support.contents);
  assert.equal(await page.locator('.support-block--warranty .support-policy').textContent(),copy.support.policy);
  await page.goto(entry+`?lang=${lang}&section=reviews`);
  assert.deepEqual(await page.locator('.chu3-review-note').allTextContents(),copy.reviewNotes);
  assert.equal(await page.locator('.review-card').count(),6);
  const reviewLinks=await page.locator('.review-card').evaluateAll(ns=>ns.map(n=>n.href));
  assert.equal(new Set(reviewLinks).size,6,'Reviews must link to six distinct videos');
  await page.goto(entry+`?lang=${lang}&section=gallery`);
  assert.deepEqual(await page.locator('.gallery-card-copy b').allTextContents(),copy.galleryTitles);
  assert.deepEqual(await page.locator('[data-gallery-group]').allTextContents(),copy.groups);
  assert.equal(copy.groups.length,2);
  const gallery=await page.evaluate(()=>CHU3_VIEW.galleryItems.map(i=>i.image));
  assert.equal(gallery.length,12);
  assert(!gallery.some(src=>/DSC_6839|DSC_6843/.test(src)),'Packaging must stay out of the gallery');
  reports.push({case:'full-localized-body',lang,stories:5,modules:5});
 }
 // Recheck the two changed hero layouts and the expanded price table.
 for(const lang of languages){
  const sizes=['zh','en'].includes(lang)?[[1920,1080],[1440,900],[1366,768],[1024,768],[320,568],[390,844],[430,932]]:[[1440,900],[390,844]];
  for(const [width,height] of sizes){
   await page.setViewportSize({width,height});
   for(const section of ['hub','comparison']){
    await page.goto(entry+`?lang=${lang}&section=${section}`);await ready();
    if(section==='comparison'){
     const fit=await page.locator('.positioning-hero-art img').evaluate(i=>getComputedStyle(i).objectFit);assert.equal(fit,'contain');
     await page.screenshot({path:path.join(out,`${width}-${lang}-comparison-hero.png`)});
     await page.locator('.regional-prices summary').click();
     await page.locator('.regional-prices').scrollIntoViewIfNeeded();
    }
    const errors=await layout();assert.deepEqual(errors,[]);
    if(section==='comparison'){
     const r=await page.locator('.regional-prices').boundingBox();assert(r.x>=0&&r.x+r.width<=width+1);
     assert.deepEqual(await page.locator('.regional-prices tbody tr').evaluateAll(rows=>rows.map(r=>[...r.children].map(c=>c.textContent))),expected);
    }
    await page.screenshot({path:path.join(out,`${width}-${lang}-${section}.png`)});
    reports.push({case:'layout-and-prices',lang,width,section});
   }
  }
 }
}catch(e){failures.push(e.stack);throw e;}
finally{await fs.writeFile(path.join(out,'report.json'),JSON.stringify({cases:reports.length,failures,reports},null,2));await browser.close();}
console.log(JSON.stringify({cases:reports.length,failures,out}));
