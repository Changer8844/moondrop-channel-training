// Local-only keyboard acceptance for the shared mobile controls.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../node_modules/playwright/index.mjs')));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[],failures=[];
const check=(value,message)=>{if(!value)throw Error(message);};
try {
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,offline:true,reducedMotion:'reduce'});
  await context.addInitScript(()=>{if(location.protocol==='file:')localStorage.setItem('moondropChannelTrainingAccess',JSON.stringify({version:1,expires:Date.now()+3600000}));});
  const page=await context.newPage();page.setDefaultTimeout(5000);
  async function modalKeyboard(opener,selector,key) {
    await opener.focus();await page.keyboard.press(key);
    const modal=page.locator(selector+'.open');await modal.waitFor();
    // A single-image viewer intentionally hides previous/next buttons.
    const controls=modal.locator('button:visible:not([disabled])');
    await controls.first().focus();await page.keyboard.press('Shift+Tab');
    check(await controls.last().evaluate(n=>n===document.activeElement),selector+' backward focus trap');
    await page.keyboard.press('Tab');
    check(await controls.first().evaluate(n=>n===document.activeElement),selector+' forward focus trap');
    check(await controls.first().evaluate(n=>getComputedStyle(n).outlineStyle!=='none'),selector+' visible focus');
    await page.keyboard.press('Escape');await page.locator(selector+'.open').waitFor({state:'hidden'});
    check(await opener.evaluate(n=>n===document.activeElement),selector+' restored focus');
    check(await page.evaluate(()=>![...document.body.children].some(n=>n.inert)),selector+' restored page access');
  }
  for(const product of ['mm3a','pill','pudding','space-travel-2','rays'])for(const lang of ['zh','en']) {
    try {
      await page.goto(pathToFileURL(`${root}/products/${product}/index.html`).href+`?lang=${lang}&section=core`);
      await page.locator('.mobile-dock button').last().focus();await page.keyboard.press('Enter');
      await page.waitForFunction(()=>document.body.dataset.mobileFeature);
      const id=await page.evaluate(()=>document.body.dataset.mobileFeature);
      await modalKeyboard(page.locator('.mobile-dock button').nth(1),'.mobile-sheet','Space');
      check(await page.evaluate(()=>document.body.dataset.mobileFeature)===id,'Escape changed selected story');
      await page.locator('.mobile-view-tools button').focus();await page.keyboard.press('Enter');
      await page.waitForFunction(()=>!document.body.dataset.mobileFeature);
      check(await page.locator('.mobile-lightbox.open,.lightbox.open').count()===0,'Overview opened an image viewer');
      await page.goto(pathToFileURL(`${root}/products/${product}/index.html`).href+`?lang=${lang}&section=gallery`);
      await modalKeyboard(page.locator('.gallery-card').first(),'.mobile-lightbox','Enter');
      results.push(`${product}-${lang}`);console.log('PASS keyboard '+product+' '+lang);
    }catch(e){failures.push({product,lang,error:e.message});console.log('FAIL '+product+' '+lang+': '+e.message);}
  }
}finally{await browser.close();}
const report={passed:results.length,results,failures};
await fs.writeFile('/private/tmp/moondrop-mobile-keyboard-final.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));if(failures.length)process.exitCode=1;
