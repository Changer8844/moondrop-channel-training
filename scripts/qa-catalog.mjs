// Shared product-card acceptance, in an isolated local-only browser context.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=process.argv.find(v=>v.startsWith('--out='))?.slice(6)||'/private/tmp/moondrop-catalog-qa';
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../node_modules/playwright/index.mjs')));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({reducedMotion:'reduce',offline:true});
await context.addInitScript(()=>{if(location.protocol==='file:')localStorage.setItem('moondropChannelTrainingAccess',JSON.stringify({version:1,expires:Date.now()+3600000}));});
const page=await context.newPage(); page.setDefaultTimeout(8000);
const failures=[],reports=[];
page.on('pageerror',e=>failures.push(e.message));
await fs.mkdir(out,{recursive:true});
const home=pathToFileURL(path.join(root,'index.html')).href;
try {
  for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[390,844]]) for(const lang of ['en','zh']) {
    await page.setViewportSize({width,height});
    for(const category of ['true-wireless','wired-in-ear','desktop-digital']) {
      await page.goto(`${home}?lang=${lang}&category=${category}`);
      await page.locator('.product-card').first().waitFor();
      await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.product-card img')].map(i=>i.decode()));});
      const result=await page.locator('.product-card').evaluateAll(cards=>cards.map(card=>{
        const heading=card.querySelector('.product-card__heading'),arrow=card.querySelector('.product-card__arrow'),copy=card.querySelector('.product-card__copy');
        const r=card.getBoundingClientRect(),h=heading?.getBoundingClientRect(),a=arrow?.getBoundingClientRect();
        const errors=[];
        if(card.querySelector('.product-card__action')||/OPEN PRODUCT TRAINING|进入产品培训/i.test(card.innerText))errors.push('Visible footer action remains');
        if(!h||!a||a.y<h.y-1||a.bottom>h.bottom+1)errors.push('Arrow is not in product-name row');
        if(r.right>innerWidth+1||r.x<0||card.scrollWidth>card.clientWidth+2)errors.push('Card overflow');
        if([...copy.querySelectorAll('strong,.product-card__type')].some(e=>e.scrollWidth>e.clientWidth+2))errors.push('Copy overflow');
        if(!card.getAttribute('aria-label'))errors.push('Missing accessible action');
        return {name:card.querySelector('strong').textContent,width:r.width,height:r.height,errors};
      }));
      const state=`${width}x${height}-${lang}-${category}`;
      reports.push({state,cards:result});
      failures.push(...result.flatMap(r=>r.errors.map(error=>({state,product:r.name,error}))));
      if(category!=='wired-in-ear')await page.screenshot({path:path.join(out,`${state}.png`)});
      if(category==='desktop-digital') {
        await page.locator('.product-card[href*="products/mm3a/"]').click();
        await page.locator('#trainingApp.hub-mode').waitFor();
        if(new URL(page.url()).searchParams.get('lang')!==lang)failures.push({state,error:'Entry lost language'});
        await page.goBack();await page.locator('#categoryOverlay[aria-hidden="false"]').waitFor();
        if(new URL(page.url()).searchParams.get('category')!==category)failures.push({state,error:'Back lost category'});
      }
    }
    console.log(`Checked catalogue ${width}x${height} ${lang}`);
  }
} catch(error){failures.push(error.message);throw error;}
finally {await fs.writeFile(path.join(out,'report.json'),JSON.stringify({states:reports.length,failures,reports},null,2));await browser.close();}
console.log(JSON.stringify({states:reports.length,failures,output:out},null,2));
if(failures.length)process.exitCode=1;
