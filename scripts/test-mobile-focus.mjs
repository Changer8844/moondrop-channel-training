// Source-level unit checks only: no browser, network, page navigation or rendering.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function functionSource(source,name){
  const start=source.match(new RegExp(`^([ \\t]*)function ${name}\\(`,'m'));
  assert.ok(start,`Missing function ${name}`);
  const end=source.indexOf('\n'+start[1]+'}',start.index);
  assert.ok(end>start.index,`Missing closing brace for ${name}`);
  return source.slice(start.index,end+start[1].length+2);
}
const node=()=>({
  dataset:{},classList:{toggle(){},remove(){}},setAttribute(){},
  style:{setProperty(k,v){this[k]=String(v);}}
});
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
const widths=[320,360,390,430,768,844];
let focusChecks=0,overviewChecks=0;

for(const product of ['mm3a','pill','pudding','space-travel-2','rays']){
  const html=read(`products/${product}/index.html`),dataContext={window:{}};
  vm.runInNewContext(read(`products/${product}/content.js`),dataContext);
  const legacy=['pill','rays'].includes(product);
  let views,master;
  if(legacy){
    views=dataContext.window[`MOONDROP_${product.toUpperCase()}_DATA`].features;
    assert.match(html,/select: id => focusFeature\(id, false\)/);
    assert.match(functionSource(html,'renderFeature'),/setFocusedView\(feature, animate\)/);
  }else{
    let viewData;
    if(product==='space-travel-2'){
      const declarations=['masterView','featureViews'].map(name=>{
        const match=html.match(new RegExp(`const ${name} = \\{[\\s\\S]*?\\n      \\};`));
        assert.ok(match,`Missing ${name}`);return match[0];
      }).join('\n');
      viewData=vm.runInNewContext(declarations+'\n({masterView,featureViews})');
    }else{
      vm.runInNewContext(read(`products/${product}/view-data.js`),dataContext);
      viewData=dataContext.window[product.toUpperCase()+'_VIEW'];
    }
    views=Object.values(viewData.featureViews);master=viewData.masterView;
    assert.match(html,/select: id => openFeature\(id, \{instant:true\}\)/);
    assert.match(functionSource(html,'openFeature'),/focusMaster\(view, id, options.instant\)/);
    assert.match(functionSource(html,'resetOverview'),/focusMaster\(masterView, null, false\)/);
  }
  assert.equal(views.length,6,product+' retains six stories');
  for(const width of widths){
    const w=width-32,h=w/1.5,rig=node(),stage=node();
    Object.assign(rig,{offsetWidth:w,offsetHeight:h});
    Object.assign(stage,{clientWidth:w,clientHeight:h});
    const context={photoRig:rig,stage,activePreset:{},drag:{x:0,y:0},productPhoto:{},masterView:master,
      requestAnimationFrame:f=>f(),window:{requestAnimationFrame:f=>f()},
      currentPack:()=>({ui:{masterAlt:'Original product'}}),updateViewIndicator(){},updateHotspots(){},
      document:{documentElement:node()},ui:key=>key,updateStoryState(){},renderProgress(){}};
    context.els={photoRig:rig,stageWindow:stage};
    for(const name of ['viewerTitle','viewerSubtitle','viewerCount','viewerFooterNote','detailPanel','workspace'])context.els[name]=node();
    const methods=legacy?['dragBounds','setFocusedView','resetOverview']:['applyPreset','resetDragOffset','focusMaster'];
    vm.runInNewContext(methods.map(name=>functionSource(html,name)).join('\n'),context);
    for(const view of views){
      if(legacy){
        context.setFocusedView(view,false);
        const {zoom,x,y}=view.focus;
        assert.ok(zoom>1.03);near(Number(rig.dataset.zoom),zoom);
        near(context.drag.x,-(x/100-.5)*w*(zoom-1));
        near(context.drag.y,-(y/100-.5)*h*(zoom-1));
        assert.match(rig.style.transform,/scale\(/);
        context.resetOverview();near(Number(rig.dataset.zoom),1);
        near(context.drag.x,0);near(context.drag.y,0);
      }else{
        context.focusMaster(view,view.id,true);
        const {zoom,x,y}=view.preset,limit=(zoom-1)*50;
        assert.ok(zoom>1.03);near(Number(rig.style['--zoom']),zoom);
        const clamp=value=>product==='space-travel-2'?value:Math.max(-limit,Math.min(limit,value));
        near(parseFloat(rig.style['--pan-x']),clamp(x));near(parseFloat(rig.style['--pan-y']),clamp(y));
        assert.equal(context.productPhoto.src,master.image);
        context.focusMaster(master,null,true);
        near(Number(rig.style['--zoom']),master.preset.zoom);
        near(parseFloat(rig.style['--pan-x']),0);near(parseFloat(rig.style['--pan-y']),0);
      }
      focusChecks++;overviewChecks++;
    }
  }
}

const mobile=read('templates/product-training/mobile-training.js');
let selected;
const selection={adapter:{select:id=>selected=id},savePosition(){},notify(){},scrollStart(){}};
vm.runInNewContext(functionSource(mobile,'chooseFeature'),selection);
selection.chooseFeature('inputs');assert.equal(selected,'inputs');
// Mobile attributes must not leave desktop images with altered semantics.
const attrs=new Map([['aria-label','Drag the product']]);
const image={getAttribute:k=>attrs.get(k)??null,setAttribute:(k,v)=>attrs.set(k,v),removeAttribute:k=>attrs.delete(k)};
const semantics={query:{matches:true},imageAttributes:[{node:image,name:'aria-label',value:()=> 'Automatically focused product'}]};
vm.runInNewContext(functionSource(mobile,'syncImageAttributes'),semantics);
semantics.syncImageAttributes();assert.equal(attrs.get('aria-label'),'Automatically focused product');
image.setAttribute('aria-label','拖曳产品');semantics.syncImageAttributes();
semantics.query.matches=false;semantics.syncImageAttributes();assert.equal(attrs.get('aria-label'),'拖曳产品');
assert.doesNotMatch(mobile,/mobile-hotspot|mobile-proof-open|showImages\(adapter\.media|showImages\(\[adapter\.master/);

// Exercise the real mount/menu callbacks with small event/element doubles.
// This tests routing, not DOM layout, touch hardware or browser navigation.
function control(tag='div'){
  const attributes=new Map(),listeners=new Map();
  return {tag,children:[],listeners,style:{setProperty(){}},
    append(...children){this.children.push(...children);},
    prepend(...children){this.children.unshift(...children);},
    replaceChildren(...children){this.children=children;},after(){},
    addEventListener(type,handler){listeners.set(type,handler);},
    setAttribute:(key,value)=>attributes.set(key,value),
    getAttribute:key=>attributes.get(key)??null,
    removeAttribute:key=>attributes.delete(key),matches:selector=>selector===tag};
}
const routeChecks=[];
for(const lang of ['zh','en']){
  let current={section:'core',feature:null,lang},overviews=0;
  const ids=['drivers','bass','desktop','monitoring','inputs','peq'];
  const stage=control(),masterImage=control('img'),proof=control('button'),docEvents=new Map();
  masterImage.naturalWidth=1800;masterImage.naturalHeight=1200;
  stage.querySelector=()=>masterImage;
  stage.setAttribute('aria-label','Drag product');
  proof.setAttribute('title','Open image');proof.setAttribute('aria-label','Open proof');
  const elements={'.topbar':control(),'.top-status':control(),'.hub-copy':control(),
    '[data-role="product-stage"]':stage,'#panelMediaVisual,.media-frame':proof};
  const sheetParts={'h2':control(),'.mobile-sheet-list':control(),'.mobile-icon':control('button')};
  const menuSheet={querySelector:selector=>sheetParts[selector]};
  const item={image:'original.jpg',title:'Original'};
  const config={id:'mm3a',category:'desktop-digital',state:()=>current,
    features:()=>ids.map(id=>({id,title:id})),sections:()=>[{id:'core',title:'Core'}],
    overview(){overviews++;current.feature=null;},select:id=>current.feature=id,
    navigate:section=>current.section=section,gallery:()=>[item],
    master(){assert.fail('Core master must not open a manual viewer');},
    media(){assert.fail('Core evidence must not open a manual viewer');}};
  const context={query:{matches:true},imageAttributes:[],sheet:menuSheet,
    el:tag=>control(tag),button:(cls,label,action)=>Object.assign(control('button'),{action}),
    document:{body:control(),getElementById:()=>control('button'),querySelector:selector=>elements[selector],addEventListener:(type,fn)=>docEvents.set(type,fn)},
    text:(zh,en)=>lang==='zh'?zh:en,state:()=>current,savePosition(){},notify(){},scrollStart(){},
    createOverlays(){},createLanguageBar:()=>control(),sync(){},read:()=>({products:{}}),resumeReading(){},
    openModal(){},closeModal:action=>action?.(),
    showImages(items,index){assert.equal(items[0],item);assert.equal(index,0);context.galleryOpens++;},
    galleryOpens:0,URLSearchParams,location:{search:''}};
  vm.runInNewContext(['mount','chooseFeature','openMenu','syncImageAttributes'].map(name=>functionSource(mobile,name)).join('\n'),context);
  context.navigateBack=()=>{};
  context.mount(config);
  assert.equal(context.viewTools.children.length,1,'Only the full-product action remains');
  for(const id of ids){context.dock.children[2].action();assert.equal(current.feature,id);}
  context.dock.children[2].action();assert.equal(current.section,'hub');
  current={section:'core',feature:ids[0],lang};
  context.dock.children[0].action();assert.equal(current.feature,null);
  context.openMenu(true);
  assert.equal(sheetParts['.mobile-sheet-list'].children.length,7,'Contents retains every story and overview');
  for(const [index,id] of ids.entries()){
    sheetParts['.mobile-sheet-list'].children[index+1].action();assert.equal(current.feature,id);
  }
  context.viewTools.children[0].action();assert.equal(current.feature,null);assert.equal(overviews,2);
  const event=target=>({target,prevented:false,stopped:false,
    preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}});
  const proofTarget={closest:selector=>selector==='#panelMediaVisual,.media-frame'?proof:null};
  const evidenceEvent=event(proofTarget);docEvents.get('click')(evidenceEvent);
  assert.equal(evidenceEvent.stopped,true);assert.equal(context.galleryOpens,0);
  const carouselEvent=event({closest:()=>null});docEvents.get('click')(carouselEvent);
  assert.equal(carouselEvent.stopped,false,'Evidence carousel buttons retain their native actions');
  const swipe=event(stage);stage.listeners.get('pointerdown')(swipe);
  assert.equal(swipe.stopped,true);assert.equal(swipe.prevented,false,'Inline images must permit page scrolling');
  const card={parentElement:{querySelectorAll:()=>[card]}};
  const galleryTarget={closest:selector=>selector==='.gallery-card'?card:null};
  docEvents.get('click')(event(galleryTarget));assert.equal(context.galleryOpens,1);
  context.syncImageAttributes();assert.equal(proof.getAttribute('tabindex'),'-1');
  assert.equal(proof.getAttribute('title'),null);assert.equal(proof.getAttribute('role'),'group');
  context.query.matches=false;context.syncImageAttributes();
  assert.equal(proof.getAttribute('title'),'Open image');assert.equal(proof.getAttribute('aria-label'),'Open proof');
  assert.equal(proof.getAttribute('tabindex'),null);assert.equal(proof.getAttribute('role'),null);
  const desktopClick=event(proofTarget);docEvents.get('click')(desktopClick);assert.equal(desktopClick.stopped,false);
  const desktopDrag=event(stage);stage.listeners.get('pointerdown')(desktopDrag);assert.equal(desktopDrag.stopped,false);
  routeChecks.push({lang,contentsStories:6,navigation:'passed',inlineImages:'passed',gallery:'passed',desktopRestoration:'passed'});
}
console.log(JSON.stringify({products:5,stories:30,simulatedWidths:widths,focusChecks,overviewChecks,sharedSelection:'passed',desktopLabelRestoration:'passed',routeChecks,rendered:false},null,2));
