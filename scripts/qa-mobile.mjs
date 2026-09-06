// Isolated local mobile QA. Does not modify source assets, authorization, or production.
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {localServer} from './qa-local-server.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const arg=(key,fallback)=>process.argv.find(a=>a.startsWith(`--${key}=`))?.slice(key.length+3)||fallback;
const out=arg('out','/private/tmp/moondrop-mobile-qa');
const sizes=arg('sizes','390x844').split(',').map(s=>s.split('x').map(Number));
const products=arg('products','mm3a,pill,pudding,space-travel-2,rays').split(',');
const langs=arg('langs','zh,en').split(',');
const full=process.argv.includes('--full');
const desktop=process.argv.includes('--desktop');
const sections=arg('sections','hub,core,comparison,support,reviews,gallery').split(',');
const browsers=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../node_modules/playwright/index.mjs')));
const engine=arg('engine','chromium');
const server=engine==='webkit'?await localServer(root):null;
const browser=await browsers[engine].launch({...(engine==='chromium'?{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}:{}),headless:true});
const context=await browser.newContext({hasTouch:!desktop,isMobile:!desktop,offline:!server,reducedMotion:'reduce'});
if(server)await context.route('**/*',r=>r.request().url().startsWith(server.base)?r.continue():r.abort());
await context.addInitScript(origin=>{if(location.protocol==='file:'||location.origin===origin)localStorage.setItem('moondropChannelTrainingAccess',JSON.stringify({version:1,expires:Date.now()+3600000}));},server?new URL(server.base).origin:null);
const page=await context.newPage();page.setDefaultTimeout(6000);
const failures=[],reports=[];
page.on('pageerror',e=>failures.push({state:'runtime',error:e.message}));
await fs.mkdir(out,{recursive:true});
const base=server?.base||pathToFileURL(root+'/').href;
async function ready(){await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.getAttribute('src')&&i.getBoundingClientRect().width&&i.loading!=='lazy').map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});}
async function inspect(name,{shot=true}={}){
  await ready();
  const result=await page.evaluate(desktop=>{
    const errors=[];const main=document.querySelector('.section-board.open,.board.open,.gallery-board.open')||document.querySelector('.workspace:not([hidden])')?.getBoundingClientRect().height&&document.querySelector('.workspace:not([hidden])')||document.querySelector('.training-hub,.hub-view:not([hidden])')||document.body;
    const visible=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width&&r.height&&s.visibility!=='hidden'&&s.display!=='none'&&!n.closest('[aria-hidden="true"]');};
    if(document.documentElement.scrollWidth>innerWidth+1)errors.push('Horizontal page overflow');
    if(document.body.dataset.mobileSection && !['hub','core'].includes(document.body.dataset.mobileSection) && main.getBoundingClientRect().top>120)errors.push('Blank screen before section');
    for(const n of main.querySelectorAll('h1,h2,h3,p,.hub-section-copy b,.hub-section-copy span,.feature-copy b,.story-copy b,.package-list li')){
      if(!visible(n))continue;
      if(n.scrollWidth>n.clientWidth+2)errors.push('Text overflow: '+n.textContent.slice(0,65));
      if(!desktop&&getComputedStyle(n).fontSize.replace('px','')<13)errors.push('Text too small: '+n.textContent.slice(0,65));
    }
    for(const i of main.querySelectorAll('img'))if(visible(i)&&i.loading!=='lazy'&&i.getAttribute('src')&&!i.naturalWidth)errors.push('Missing image: '+i.getAttribute('src'));
    if(desktop&&document.documentElement.classList.contains('mobile-ui'))errors.push('Mobile rules leaked into desktop');
    if(!desktop&&document.body.dataset.mobileSection==='core'){
      const stage=document.querySelector('[data-role="product-stage"]');
      if(getComputedStyle(stage).touchAction==='none')errors.push('Inline image prevents page scrolling');
      const panel=document.querySelector('.detail-panel.open');
      if(panel&&getComputedStyle(panel).position==='fixed')errors.push('Full-screen feature panel still active');
      if(panel&&panel.getBoundingClientRect().y<stage.getBoundingClientRect().bottom)errors.push('Details cover product photograph');
      if([...stage.querySelectorAll('.hotspot,.mobile-hotspot')].some(visible))errors.push('Mobile core hotspot is still visible');
      if(document.querySelector('.mobile-hotspot-layer,.mobile-proof-open')||document.querySelectorAll('.mobile-view-tools button').length!==1)errors.push('Redundant mobile image controls remain');
      const rig=stage.querySelector('.photo-rig'),camera=new DOMMatrix(getComputedStyle(rig).transform);
      // Newer rigs include a -50% centering translation; inspect their pan
      // variables instead. SPACE TRAVEL 2's accepted overview uses 1.02x.
      const x=rig.style.getPropertyValue('--pan-x'),y=rig.style.getPropertyValue('--pan-y');
      if(document.body.dataset.mobileFeature){if(camera.a<=1.03)errors.push('Story selection lost automatic image focus');}
      else if(Math.abs(camera.a-1)>0.03||Math.abs(x?parseFloat(x):camera.e)>1||Math.abs(y?parseFloat(y):camera.f)>1)errors.push('Overview did not restore the complete product');
    }
    return{errors,section:document.body.dataset.mobileSection,feature:document.body.dataset.mobileFeature,height:document.documentElement.scrollHeight};
  },desktop);
  reports.push({state:name,...result});failures.push(...result.errors.map(error=>({state:name,error})));
  if(shot)await page.screenshot({path:path.join(out,name+'.png')});
}
try{
for(const [width,height]of sizes){await page.setViewportSize({width,height});for(const lang of langs){
  for(const category of process.argv.includes('--skip-portal')?[]:['', 'true-wireless','desktop-digital']){
    await page.goto(`${base}index.html?lang=${lang}${category?'&category='+category:''}`);await inspect(`${width}-${lang}-${category||'home'}`);
  }
  for(const product of products){
    for(const section of sections.map(s=>s==='comparison'&&(product==='pill'||product==='rays')?'positioning':s)){
      await page.goto(`${base}products/${product}/index.html?lang=${lang}${section==='hub'?'':'&section='+section}`);
      await inspect(`${width}-${lang}-${product}-${section}`);
      if(section==='core'){
        const ids=await page.locator('.feature-button,.story-button').evaluateAll(ns=>ns.map(n=>n.dataset.feature));
        for(const id of full?ids:ids.slice(0,1)){
          await page.locator(`.feature-button[data-feature="${id}"],.story-button[data-feature="${id}"]`).evaluate(n=>n.click());
          await page.locator('.detail-panel.open').waitFor();
          await inspect(`${width}-${lang}-${product}-${id}`);
        }
      }
    }
    console.log(`Checked ${product} ${width} ${lang}`);
  }
}}
}catch(e){failures.push({state:'interrupted',error:e.message});console.error(e.message);}
finally{await fs.writeFile(path.join(out,'report.json'),JSON.stringify({states:reports.length,failures,reports},null,2));await browser.close();await server?.close();}
console.log(JSON.stringify({states:reports.length,failures,output:out},null,2));
if(failures.length)process.exitCode=1;
