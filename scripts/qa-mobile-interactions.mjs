// Mobile reading acceptance in a fresh, offline local-file browser context.
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {localServer} from './qa-local-server.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const arg=(k,d)=>process.argv.find(a=>a.startsWith(`--${k}=`))?.slice(k.length+3)||d;
const out=arg('out','/private/tmp/moondrop-mobile-interactions');
const products=arg('products','mm3a,pill,pudding,space-travel-2,rays').split(',');
const browsers=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../node_modules/playwright/index.mjs')));
const engine=arg('engine','chromium');
const server=engine==='webkit'?await localServer(root):null;
const browser=await browsers[engine].launch({...(engine==='chromium'?{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}:{}),headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,offline:!server,reducedMotion:'reduce'});
if(server)await context.route('**/*',r=>r.request().url().startsWith(server.base)?r.continue():r.abort());
await context.addInitScript(origin=>{if(location.protocol==='file:'||location.origin===origin)localStorage.setItem('moondropChannelTrainingAccess',JSON.stringify({version:1,expires:Date.now()+3600000}));},server?new URL(server.base).origin:null);
const page=await context.newPage();page.setDefaultTimeout(7000);
const failures=[],passes=[];
page.on('pageerror',e=>failures.push({case:'runtime',error:e.message}));
const base=server?.base||pathToFileURL(root+'/').href;
await fs.mkdir(out,{recursive:true});
const check=(value,message)=>{if(!value)throw Error(message);};
const state=()=>page.evaluate(()=>({...document.body.dataset,y:scrollY}));
const settle=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
// Locator.tap scrolls a sticky element's original flow box into view. A real finger taps its fixed screen position.
async function tapHeader(selector){const r=await page.locator(selector).boundingBox();check(r&&r.y>=0&&r.y+r.height<=844,'Header control is not on screen');await page.touchscreen.tap(r.x+r.width/2,r.y+r.height/2);}
async function expectFeature(id){await page.waitForFunction(id=>document.body.dataset.mobileFeature===id,id);await settle();}
async function expectSection(id){await page.waitForFunction(id=>document.body.dataset.mobileSection===id,id);await settle();}
async function expectCamera(focused){
  const camera=await page.locator('.photo-rig').evaluate(n=>{const m=new DOMMatrix(getComputedStyle(n).transform),x=n.style.getPropertyValue('--pan-x'),y=n.style.getPropertyValue('--pan-y');return{zoom:m.a,x:x?parseFloat(x):m.e,y:y?parseFloat(y):m.f};});
  check(focused?camera.zoom>1.03:Math.abs(camera.zoom-1)<0.03&&Math.abs(camera.x)<1&&Math.abs(camera.y)<1,focused?'Story must automatically focus the photograph':'Overview must restore the whole photograph');
}
async function imageReady(){await page.locator('.mobile-lightbox.open').waitFor();await page.locator('.mobile-image-viewport img').evaluate(i=>i.decode());}
async function openCore(){await page.locator('[data-section="core"]').tap();await expectSection('core');}
async function pointerGesture(points){
  const client=await context.newCDPSession(page);
  for(const [type,touchPoints]of points){await client.send('Input.dispatchTouchEvent',{type,touchPoints});await new Promise(r=>setTimeout(r,35));}
  await client.detach();await settle();
}
async function test(name,run){try{await run();passes.push(name);console.log('PASS '+name);}catch(e){failures.push({case:name,error:e.stack,state:await state().catch(()=>null)});await page.screenshot({path:path.join(out,name.replace(/[^a-z0-9-]/gi,'-')+'-failure.png')}).catch(()=>{});console.log('FAIL '+name+': '+e.stack);}}
try{
for(const product of products)for(const lang of ['zh','en']){
  const url=`${base}products/${product}/index.html?lang=${lang}`;
  await test(`${product}-${lang}-reader`,async()=>{
    await page.goto(url);await openCore();
    const ids=await page.locator('.feature-button,.story-button').evaluateAll(ns=>ns.map(n=>n.dataset.feature));
    check(await page.locator('.mobile-hotspot-layer,.mobile-proof-open').count()===0,'Mobile core must not create hotspot/enlarge controls');
    check(await page.locator('.hotspot:visible').count()===0,'Desktop hotspots remain visible on mobile');
    await expectCamera(false);
    if(engine==='chromium'){
      const r=await page.locator('[data-role="product-stage"]').boundingBox(),x=r.x+r.width-8,y=Math.min(r.y+r.height-25,650);
      await pointerGesture([['touchStart',[{x,y}]],['touchMove',[{x,y:y-110}]],['touchMove',[{x,y:y-160}]],['touchEnd',[]]]);
      check((await state()).y>25,'Vertical swipe on inline image failed to scroll the page');
      await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);
    }
    // Stories are selected through readable list controls, not product dots.
    for(const id of ids){
      await page.locator(`.feature-button[data-feature="${id}"],.story-button[data-feature="${id}"]`).tap();await expectFeature(id);await expectCamera(true);
      check(await page.locator('#panelTitle').innerText(),'Missing explanation');
      await page.locator('.mobile-view-tools button').first().tap();await expectFeature('');
      await expectCamera(false);
    }
    await page.locator('.mobile-dock button').last().tap();await expectFeature(ids[0]);
    for(let i=0;i<ids.length;i++){
      if(i){await page.locator('.mobile-dock button').last().tap();await expectFeature(ids[i]);}
      await expectCamera(true);
      // Read to the bottom. Last paragraph must remain reachable above the dock.
      await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await settle();
      const readable=await page.evaluate(()=>document.querySelector('.panel-content').getBoundingClientRect().bottom<=document.querySelector('.mobile-dock').getBoundingClientRect().top+35);
      check(readable,'Dock hides the end of the explanation');
      const media=page.locator('#panelMediaVisual,.media-frame');
      if(await media.count()&&await media.isVisible()){
        const counter=page.locator('#panelMediaCount,#mediaIndex');
        const total=Number((await counter.innerText()).split('/')[1]);
        for(let j=0;j<total;j++){
          await media.locator('img').evaluateAll(async images=>{await Promise.all(images.map(i=>i.decode()));});
          await media.tap();await settle();
          check(await page.locator('.mobile-lightbox.open,.lightbox.open').count()===0,'Core evidence image must not open a manual viewer');
          if(total>1)await page.locator('#nextPanelMedia,#mediaNext').tap();
        }
        check((await state()).mobileFeature===ids[i],'Inline media carousel lost story');
      }
    }
    await page.locator('.mobile-dock button').last().tap();await expectSection('hub');
    await openCore();await page.locator('.mobile-dock button').nth(1).tap();
    await page.locator('.mobile-sheet.open').waitFor();
    check(await page.locator('.mobile-sheet-list button').count()===ids.length+1,'Incomplete contents sheet');
    await page.locator('.mobile-sheet-list button').last().tap();await expectFeature(ids.at(-1));
    await expectCamera(true);
    await page.locator('.mobile-dock button').first().tap();await expectFeature(ids.at(-2));
    await tapHeader('.top-status > .mobile-icon');await page.goBack();
    await page.locator('.mobile-sheet.open').waitFor({state:'hidden'});check((await state()).mobileFeature===ids.at(-2),'Back from sheet changes story');
    await tapHeader('.mobile-back');await expectSection('hub');
    const sections=await page.locator('.hub-section-button').evaluateAll(ns=>ns.map(n=>n.dataset.section));
    for(const section of sections.filter(s=>s!=='core')){
      await page.locator(`[data-section="${section}"]`).tap();await expectSection(section);
      await page.evaluate(()=>scrollTo(0,500));await settle();
      check(await page.locator('.topbar').evaluate(n=>Math.abs(n.getBoundingClientRect().top)<2),'Navigation header scrolls away');
      await tapHeader('.mobile-back');await expectSection('hub');
    }
    await tapHeader('.mobile-back');
    await page.locator('#categoryOverlay[aria-hidden="false"]').waitFor();
    check(await page.locator(`.product-card[href*="products/${product}/"]`).count()===1,'Return did not expose product category');
    await page.locator(`.product-card[href*="products/${product}/"]`).tap();await expectSection('hub');
  });
  await test(`${product}-${lang}-gallery`,async()=>{
    await page.goto(url+'&section=gallery');await expectSection('gallery');
    const count=await page.locator('.gallery-card').count();
    await page.locator('.gallery-card').first().tap();await imageReady();
    const sources=new Set();
    for(let i=0;i<count;i++){await imageReady();sources.add(await page.locator('.mobile-image-viewport img').getAttribute('src'));await page.locator('.mobile-image-controls button').last().tap();}
    check(sources.size===count,'Gallery repeats or omits originals');
    await page.locator('.mobile-image-controls button').nth(1).tap();
    check(Number(await page.locator('.mobile-image-viewport').getAttribute('data-zoom'))>1,'Zoom button did not enlarge');
    await page.locator('.mobile-image-controls button').nth(1).tap();
    const r=await page.locator('.mobile-image-viewport').boundingBox(),x=r.x+r.width/2,y=r.y+r.height/2;
    // Double tap, pan, reset; then horizontal swipe only at fit scale.
    await page.touchscreen.tap(x,y);await page.touchscreen.tap(x,y);await settle();
    check(Number(await page.locator('.mobile-image-viewport').getAttribute('data-zoom'))>1,'Double tap did not enlarge');
    if(engine==='chromium'){
    const before=await page.locator('.mobile-image-viewport img').evaluate(n=>n.style.transform);
    await pointerGesture([['touchStart',[{x,y}]],['touchMove',[{x:x+80,y:y+50}]],['touchEnd',[]]]);
    check(await page.locator('.mobile-image-viewport img').evaluate(n=>n.style.transform)!==before,'Zoomed image did not pan');
    await page.locator('.mobile-image-controls button').nth(1).tap();
    await pointerGesture([['touchStart',[{x:x-30,y,id:1},{x:x+30,y,id:2}]],['touchMove',[{x:x-70,y,id:1},{x:x+70,y,id:2}]],['touchEnd',[]]]);
    check(Number(await page.locator('.mobile-image-viewport').getAttribute('data-zoom'))>1,'Pinch did not enlarge');
    await page.locator('.mobile-image-controls button').nth(1).tap();
    const src=await page.locator('.mobile-image-viewport img').getAttribute('src');
    await pointerGesture([['touchStart',[{x:x+70,y}]],['touchMove',[{x:x-70,y}]],['touchEnd',[]]]);
    check(await page.locator('.mobile-image-viewport img').getAttribute('src')!==src,'Swipe did not advance image');
    }
    await page.goBack();await page.locator('.mobile-lightbox.open').waitFor({state:'hidden'});await expectSection('gallery');
  });
  await test(`${product}-${lang}-resume-language`,async()=>{
    await page.goto(url);await openCore();
    const id=await page.locator('.feature-button,.story-button').first().getAttribute('data-feature');
    await page.locator('.mobile-dock button').last().tap();await expectFeature(id);
    await page.evaluate(()=>scrollTo(0,600));await page.waitForTimeout(320);
    const oldY=(await state()).y;
    const bookmark=()=>page.evaluate(product=>JSON.parse(localStorage.getItem('moondropTrainingReading:v1'))?.products[product],product);
    check((await bookmark())?.feature===id,'Reading bookmark did not save the selected story: '+JSON.stringify(await bookmark()));
    await tapHeader('.mobile-back');await expectSection('hub');
    await page.reload();check((await bookmark())?.feature===id,'Reload overwrote the bookmark: '+JSON.stringify(await bookmark()));await page.locator('.hub-copy .mobile-resume').tap();await expectFeature(id);
    await page.waitForFunction(y=>Math.abs(scrollY-y)<25,oldY);
    await tapHeader('#languageToggle');await settle();
    check((await state()).mobileFeature===id,'Language switch lost story');
    check(await page.locator('html').getAttribute('lang')!==lang,'Language did not change');
    await page.goto(base+'index.html?lang='+lang);await page.locator('.intro-lower .mobile-resume').tap();await expectFeature(id);
    check(new URL(page.url()).pathname.includes('/'+product+'/'),'Portal resume opens wrong product');
  });
}
// Storage refusal is tested after a valid isolated access fixture; auth itself is unchanged.
await test('storage-unavailable',async()=>{
  await context.addInitScript(()=>{const get=Storage.prototype.getItem;Storage.prototype.getItem=function(k){if(k==='moondropTrainingReading:v1')throw new DOMException('Blocked','SecurityError');return get.call(this,k);};const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='moondropTrainingReading:v1')throw new DOMException('Quota','QuotaExceededError');return set.call(this,k,v);};});
  await page.goto(base+'products/mm3a/index.html?lang=en');await openCore();await page.locator('.mobile-dock button').last().tap();await page.waitForFunction(()=>!!document.body.dataset.mobileFeature);check((await state()).mobileFeature,'Storage blocked reading');
});
await test('auth-keyboard-layout',async()=>{
  const clean=await browser.newContext({viewport:{width:320,height:568},hasTouch:true,isMobile:true,offline:!server});
  if(server)await clean.route('**/*',r=>r.request().url().startsWith(server.base)?r.continue():r.abort());
  const auth=await clean.newPage();
  try{
    await auth.goto(base+'index.html?lang=en');await auth.locator('.auth-login-button').tap();await auth.locator('.auth-gate.is-open').waitFor();
    await auth.locator('.auth-form__field input').focus();
    await auth.setViewportSize({width:320,height:380});
    const inputSize=await auth.locator('.auth-form__field input').evaluate(n=>parseFloat(getComputedStyle(n).fontSize));check(inputSize>=16,'Input text may trigger unwanted iOS zoom');
    await auth.locator('.auth-form__submit').scrollIntoViewIfNeeded();
    check(await auth.locator('.auth-form__submit').evaluate(n=>{const r=n.getBoundingClientRect();return r.y>=0&&r.bottom<=innerHeight;}),'Keyboard-height viewport hides submit');
    await auth.locator('.auth-card__close').tap();await auth.locator('.auth-gate.is-open').waitFor({state:'hidden'});
    await auth.screenshot({path:path.join(out,'auth-small-viewport.png')});
  }finally{await clean.close();}
});
}finally{await fs.writeFile(path.join(out,'report.json'),JSON.stringify({passes,failures},null,2));await browser.close();await server?.close();}
console.log(JSON.stringify({passed:passes.length,failures,output:out},null,2));if(failures.length)process.exitCode=1;
