/* Shared mobile behavior. Content and product claims remain in the existing pages. */
(() => {
  'use strict';
  const query = matchMedia('(max-width: 900px), (max-height: 500px) and (pointer: coarse)');
  const root = document.documentElement;
  const storageKey = 'moondropTrainingReading:v1';
  const base = new URL('../../', document.currentScript.src);
  const text = (zh, en) => root.lang.startsWith('zh') ? zh : en;
  const el = (tag, cls, value) => { const node = document.createElement(tag); if (cls) node.className = cls; if (value != null) node.textContent = value; return node; };
  const button = (cls, value, action) => { const node = el('button', cls, value); node.type = 'button'; node.addEventListener('click', action); return node; };
  const read = () => { try { const r = JSON.parse(localStorage.getItem(storageKey)); return r?.version === 1 && r.products && typeof r.products === 'object' ? r : {version:1, products:{}}; } catch { return {version:1, products:{}}; } };
  const write = (record) => { try { localStorage.setItem(storageKey, JSON.stringify(record)); } catch { /* Reading works without persistence. */ } };
  let adapter, previous, frame, initial = true, restorePending = false;
  let dock, sheet, lightbox, back, menu, resume, viewTools, languageBar, sheetStories = false;
  const languageBars = [];
  const imageAttributes = [];
  let modal = null, modalFocus, pendingClose, inertNodes = [], lastImageTap = 0;
  let imageItems = [], imageIndex = 0, imageScale = 1, imageX = 0, imageY = 0;
  let imageView, imageElement, imageCaption, imageCounter, imagePrev, imageNext, imageReset;
  const pointers = new Map(); let gesture;
  root.classList.toggle('mobile-ui', query.matches);

  function state() { return adapter?.state(); }
  function placeLanguageControls() {
    languageBars.forEach(({toggle, slot, bar}) => {
      if (query.matches) bar.append(toggle);
      else slot.after(toggle);
    });
  }
  function createLanguageBar(toggle, parent = document.body) {
    const slot = document.createComment('Desktop language control position');
    toggle.before(slot);
    const bar = el('div', 'mobile-only mobile-language-bar');
    // Existing product language handlers replace the URL state. Keep the
    // active overlay marker so closing it still consumes exactly one entry.
    bar.addEventListener('click', () => {
      if (modal) history.replaceState({...history.state, mobileOverlay:true}, '', location.href);
    });
    parent.append(bar);
    languageBars.push({toggle, slot, bar});
    placeLanguageControls();
    return bar;
  }
  function closeButton(action) {
    const node = button('mobile-icon', '', action);
    node.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    return node;
  }
  function notify() { if (!frame) frame = requestAnimationFrame(() => { frame = 0; sync(); }); }
  function scrollStart() { requestAnimationFrame(() => window.scrollTo({top:0, behavior:'instant'})); }
  function savePosition() {
    if (!query.matches || !adapter || initial || restorePending) return;
    const s = state();
    if (s.section === 'hub') return;
    const record = read();
    record.products[adapter.id] = {section:s.section, feature:s.feature || null, lang:s.lang, y:Math.max(0, window.scrollY), title:adapter.title(), updatedAt:Date.now()};
    record.latest = adapter.id;
    write(record);
  }
  function resumeReading(record) {
    if (!record) return;
    const valid = adapter.sections().some(s => s.id === record.section);
    if (!valid) return;
    restorePending = true;
    adapter.navigate(record.section);
    if (record.section === 'core' && adapter.features().some(f => f.id === record.feature)) adapter.select(record.feature);
    notify();
    const y = record.lang === state().lang && Number.isFinite(record.y) ? record.y : 0;
    // Decode only the active reading surface before restoring its scroll position.
    requestAnimationFrame(async () => {
      const scope = record.section === 'core' ? document.querySelector('.workspace') : document.querySelector('.board.open,.section-board.open,.gallery-board.open');
      await Promise.race([Promise.all([...scope?.querySelectorAll('img') || []].filter(i => i.getAttribute('src')).map(i => i.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 1200))]);
      requestAnimationFrame(() => { window.scrollTo({top:y, behavior:'instant'}); restorePending = false; savePosition(); });
    });
  }
  function resumeLabel(record) {
    const section = adapter?.sections().find(s => s.id === record.section);
    const feature = adapter?.features().find(f => f.id === record.feature);
    return [record.title || adapter?.title(), feature?.title || section?.title].filter(Boolean).join(' · ');
  }
  function updateResume() {
    if (!resume) return;
    const record = read().products[adapter.id];
    resume.hidden = !record || !adapter.sections().some(s => s.id === record.section);
    if (!resume.hidden) {
      resume.replaceChildren(el('span', '', text('继续上次阅读', 'Continue reading')), el('small', '', resumeLabel(record)));
    }
  }
  function setInert(open) {
    if (open) {
      inertNodes = [...document.body.children].filter(n => !n.matches('.mobile-sheet,.mobile-lightbox,script,style,link')).map(n => [n, n.inert]);
      inertNodes.forEach(([n]) => n.inert = true);
    } else { inertNodes.forEach(([n, value]) => n.inert = value); inertNodes = []; }
  }
  function openModal(node) {
    if (modal) return;
    modal = node; modalFocus = document.activeElement;
    setInert(true); document.body.classList.add('mobile-modal-open');
    (node === sheet ? node.querySelector('.mobile-sheet-card') : node).append(languageBar);
    languageBar.inert = false; dock.hidden = true;
    node.classList.add('open'); node.setAttribute('aria-hidden', 'false');
    history.pushState({...history.state, mobileOverlay:true}, '', location.href);
    node.querySelector('button')?.focus({preventScroll:true});
  }
  function dismissModal() {
    if (!modal) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.append(languageBar);
    modal = null; pointers.clear(); gesture = null;
    document.body.classList.remove('mobile-modal-open'); setInert(false);
    notify();
    modalFocus?.focus({preventScroll:true});
    const action = pendingClose; pendingClose = null; action?.();
  }
  function closeModal(action) {
    if (!modal) { action?.(); return; }
    pendingClose = action;
    if (history.state?.mobileOverlay) history.back(); else dismissModal();
  }
  function openMenu(stories = false) {
    sheetStories = stories;
    const s = state();
    const heading = sheet.querySelector('h2'), list = sheet.querySelector('.mobile-sheet-list');
    heading.textContent = stories ? text('选择卖点', 'Choose a selling point') : text('培训目录', 'Training menu');
    list.replaceChildren();
    const add = (label, active, action) => {
      const b = button('', label, () => closeModal(() => { savePosition(); action(); notify(); scrollStart(); }));
      b.setAttribute('aria-current', String(active)); list.append(b);
    };
    if (stories) {
      add(text('产品总览', 'Product overview'), !s.feature, () => adapter.overview());
      adapter.features().forEach((f, i) => add(`${String(i + 1).padStart(2, '0')}  ${f.title}`, s.feature === f.id, () => adapter.select(f.id)));
    } else {
      add(text('产品培训首页', 'Product training home'), s.section === 'hub', () => adapter.navigate('hub'));
      adapter.sections().forEach(item => add(item.title, s.section === item.id, () => adapter.navigate(item.id)));
    }
    sheet.querySelector('.mobile-icon').setAttribute('aria-label', text('关闭目录', 'Close menu'));
    openModal(sheet);
  }
  function navigateBack() {
    savePosition();
    if (state().section !== 'hub') { adapter.navigate('hub'); notify(); scrollStart(); return; }
    const url = new URL(`index.html?lang=${state().lang}&category=${adapter.category}`, base);
    location.href = window.MoondropAuth?.protectHref(url.href) || url.href;
  }
  function chooseFeature(id) {
    savePosition(); adapter.select(id); notify(); scrollStart();
  }
  function syncImageAttributes() {
    // Product renderers may refresh labels on story/language changes. Remember
    // those desktop values before presenting non-interactive mobile images.
    imageAttributes.forEach(item => {
      const current = item.node.getAttribute(item.name);
      if (query.matches) {
        if (!item.applied || current !== item.mobile) item.desktop = current;
        item.mobile = item.value(); item.applied = true;
        if (item.mobile == null) item.node.removeAttribute(item.name);
        else item.node.setAttribute(item.name, item.mobile);
      } else if (item.applied) {
        if (current === item.mobile) {
          if (item.desktop == null) item.node.removeAttribute(item.name);
          else item.node.setAttribute(item.name, item.desktop);
        }
        item.applied = false;
      }
    });
  }
  function imageTransform() {
    const w=imageView.clientWidth,h=imageView.clientHeight;
    const ratio=imageElement.naturalWidth / imageElement.naturalHeight || 1;
    const fitW=Math.min(w,h*ratio),fitH=Math.min(h,w/ratio);
    const limitX=Math.max(0,(fitW*imageScale-w)/2),limitY=Math.max(0,(fitH*imageScale-h)/2);
    imageX=Math.max(-limitX,Math.min(limitX,imageX)); imageY=Math.max(-limitY,Math.min(limitY,imageY));
    imageElement.style.transform=`translate(${imageX}px,${imageY}px) scale(${imageScale})`;
    imageReset.textContent=imageScale>1?text('还原', 'Reset'):text('放大', 'Zoom in');
    imageView.dataset.zoom=String(imageScale);
  }
  function renderImage() {
    const item=imageItems[imageIndex]; imageScale=1; imageX=imageY=0;
    lightbox.setAttribute('aria-label',text('高清图片','Full-size image'));
    imageElement.src=item.image; imageElement.alt=item.title || '';
    imageCaption.textContent=item.title || ''; imageCounter.textContent=`${imageIndex+1} / ${imageItems.length}`;
    imagePrev.hidden=imageNext.hidden=imageItems.length<2;
    imagePrev.setAttribute('aria-label',text('上一张图片','Previous image')); imageNext.setAttribute('aria-label',text('下一张图片','Next image'));
    lightbox.querySelector('.mobile-icon').setAttribute('aria-label',text('关闭图片','Close image'));
    imageTransform();
  }
  function stepImage(direction) { imageIndex=(imageIndex+direction+imageItems.length)%imageItems.length; renderImage(); }
  function showImages(items, index=0) {
    if (!items?.length) return;
    imageItems=items; imageIndex=Math.max(0,Math.min(items.length-1,index)); renderImage(); openModal(lightbox);
  }
  function createOverlays() {
    sheet=el('div','mobile-sheet'); sheet.setAttribute('aria-hidden','true');
    const card=el('section','mobile-sheet-card'); card.setAttribute('role','dialog'); card.setAttribute('aria-modal','true'); card.setAttribute('aria-labelledby','mobileMenuTitle');
    const head=el('div','mobile-sheet-head'),title=el('h2'); title.id='mobileMenuTitle';
    head.append(title,closeButton(()=>closeModal())); card.append(head,el('div','mobile-sheet-list'));sheet.append(card);
    sheet.addEventListener('click',e=>{if(e.target===sheet)closeModal();});
    lightbox=el('section','mobile-lightbox'); lightbox.setAttribute('role','dialog'); lightbox.setAttribute('aria-modal','true'); lightbox.setAttribute('aria-label',text('高清图片','Full-size image')); lightbox.setAttribute('aria-hidden','true');
    const imageHead=el('div','mobile-lightbox-header');imageCounter=el('span');imageHead.append(imageCounter,closeButton(()=>closeModal()));
    imageView=el('div','mobile-image-viewport');imageElement=el('img');imageElement.draggable=false;imageElement.addEventListener('load',imageTransform);imageView.append(imageElement);
    const foot=el('div','mobile-lightbox-footer'),controls=el('div','mobile-image-controls');imageCaption=el('div','mobile-image-caption');
    imagePrev=button('','←',()=>stepImage(-1));imageNext=button('','→',()=>stepImage(1));imageReset=button('','',()=>{imageScale=imageScale>1?1:2.5;imageX=imageY=0;imageTransform();});
    controls.append(imagePrev,imageReset,imageNext);foot.append(imageCaption,controls);lightbox.append(imageHead,imageView,foot);document.body.append(sheet,lightbox);
    const distance=()=>{const [a,b]=[...pointers.values()];return a&&b?Math.hypot(a.x-b.x,a.y-b.y):0;};
    imageView.addEventListener('pointerdown',e=>{
      e.preventDefault();imageView.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===1)gesture={startX:e.clientX,startY:e.clientY,x:imageX,y:imageY,time:Date.now(),pinched:false};
      if(pointers.size===2)gesture={...gesture,distance:distance(),scale:imageScale,pinched:true};
    });
    imageView.addEventListener('pointermove',e=>{
      if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===2&&gesture.distance)imageScale=Math.min(5,Math.max(1,gesture.scale*distance()/gesture.distance));
      else if(pointers.size===1&&imageScale>1&&!gesture.pinched){imageX=gesture.x+e.clientX-gesture.startX;imageY=gesture.y+e.clientY-gesture.startY;}
      imageTransform();
    });
    imageView.addEventListener('pointerup',e=>{
      if(!gesture)return;
      const dx=e.clientX-gesture.startX,dy=e.clientY-gesture.startY;
      if(pointers.size===1&&!gesture.pinched){
        if(imageScale===1&&Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3&&imageItems.length>1)stepImage(dx<0?1:-1);
        else if(Math.hypot(dx,dy)<8&&Date.now()-gesture.time<300){
          if(Date.now()-lastImageTap<330){imageScale=imageScale>1?1:2.5;imageX=imageY=0;imageTransform();lastImageTap=0;}else lastImageTap=Date.now();
        }
      }
      pointers.delete(e.pointerId);if(!pointers.size)gesture=null;
    });
    imageView.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);if(!pointers.size)gesture=null;});
  }
  function mount(config) {
    adapter=config;
    createOverlays();
    const topbar=document.querySelector('.topbar'),status=document.querySelector('.top-status');
    back=button('mobile-only mobile-icon mobile-back','',navigateBack); menu=button('mobile-only mobile-icon','',()=>openMenu());
    back.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12H4m7-7-7 7 7 7"/></svg>';
    menu.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    topbar.prepend(back);status.append(menu);
    dock=el('nav','mobile-only mobile-dock'); dock.setAttribute('aria-label',text('卖点导航','Selling-point navigation'));
    dock.append(button('','',()=>{
      const list=adapter.features(),i=list.findIndex(f=>f.id===state().feature);
      if(i>0)chooseFeature(list[i-1].id);else{savePosition();adapter.overview();notify();scrollStart();}
    }),button('','',()=>openMenu(true)),button('','',()=>{
      const list=adapter.features(),i=list.findIndex(f=>f.id===state().feature);
      if(i<list.length-1)chooseFeature(list[i+1].id);else{savePosition();adapter.navigate('hub');notify();scrollStart();}
    }));
    languageBar=createLanguageBar(document.getElementById('languageToggle'));
    languageBar.prepend(dock);
    viewTools=el('div','mobile-only mobile-view-tools');
    viewTools.append(button('mobile-text-button','',()=>{savePosition();adapter.overview();notify();scrollStart();}));
    const stage=document.querySelector('[data-role="product-stage"]');stage.after(viewTools);
    imageAttributes.push({node:stage,name:'aria-label',value:()=>text('产品图片，随所选卖点自动聚焦', 'Product photograph, automatically focused on the selected selling point')});
    const master=stage.querySelector('img');
    const imageReady=()=>{if(master.naturalWidth)stage.style.setProperty('--mobile-master-ratio',master.naturalWidth/master.naturalHeight);notify();};
    master.addEventListener('load',imageReady);imageReady();
    const proofFrame=document.querySelector('#panelMediaVisual,.media-frame');
    if(proofFrame?.matches('button')){
      for(const [name,value] of [['role',()=> 'group'],['tabindex',()=> '-1'],['title',()=> null],['aria-label',()=> null]]){
        imageAttributes.push({node:proofFrame,name,value});
      }
    }
    resume=button('mobile-only mobile-resume','',()=>resumeReading(read().products[adapter.id]));document.querySelector('.hub-copy').append(resume);
    // Selection still runs the product's existing camera preset. No mobile
    // hotspot or manual drag/fullscreen action competes with vertical reading.
    stage.addEventListener('pointerdown',e=>{if(query.matches)e.stopImmediatePropagation();},true);
    document.addEventListener('click',e=>{
      if(!query.matches)return;
      const gallery=e.target.closest('.gallery-card');
      const media=e.target.closest('#panelMediaVisual,.media-frame');
      if(gallery){e.preventDefault();e.stopImmediatePropagation();const cards=[...gallery.parentElement.querySelectorAll('.gallery-card')];showImages(adapter.gallery(),cards.indexOf(gallery));}
      else if(media){e.preventDefault();e.stopImmediatePropagation();}
    },true);
    const params=new URLSearchParams(location.search);const record=read().products[adapter.id];
    sync(); initial=false;
    if(params.get('resume')==='1'){
      params.delete('resume');const url=new URL(location.href);url.search=params.toString();history.replaceState(history.state,'',url);
      if(record)resumeReading(record);
    }
  }
  function sync() {
    if(!adapter)return;
    const s=state();
    if(query.matches)try{localStorage.setItem('moondropChannelTrainingLanguage',s.lang);}catch{}
    document.body.dataset.mobileSection=s.section;document.body.dataset.mobileFeature=s.feature||'';
    dock.hidden=s.section!=='core'||Boolean(modal);
    dock.setAttribute('aria-label',text('卖点导航','Selling-point navigation'));
    const index=adapter.features().findIndex(f=>f.id===s.feature);
    dock.children[0].textContent=index>0?text('← 上一项','← Previous'):text('产品总览','Overview');
    dock.children[1].textContent=text('目录','Contents');
    dock.children[2].textContent=index===adapter.features().length-1?text('培训目录','Training menu'):index<0?text('开始学习 →','Start →'):text('下一项 →','Next →');
    back.setAttribute('aria-label',s.section==='hub'?text('返回产品分类','Back to category'):text('返回产品培训首页','Back to product training'));
    menu.setAttribute('aria-label',text('打开培训目录','Open training menu'));
    viewTools.hidden=!s.feature;
    viewTools.children[0].textContent=text('完整产品','Full product');
    syncImageAttributes();
    if(query.matches && previous && (s.section!==previous.section||s.feature!==previous.feature)&&!restorePending){scrollStart();}
    // Keep the original desktop content order; mobile uses explicit CSS order for legacy detail blocks.
    document.querySelector('#specText')?.closest('.panel-section')?.classList.add('mobile-proof');
    document.querySelector('#sayText')?.closest('.panel-section')?.classList.add('mobile-sales-line');
    updateResume();
    if(previous && s.lang!==previous.lang){
      if(modal===sheet)openMenu(sheetStories);
      if(modal===lightbox){imageItems=adapter.gallery();renderImage();}
    }
    previous={...s};
    if(query.matches&&!initial&&!restorePending)savePosition();
  }
  function portal() {
    if(adapter||!window.MOONDROP_TRAINING_CATALOG)return;
    createLanguageBar(document.getElementById('languageToggle'));
    createLanguageBar(document.getElementById('overlayLanguageToggle'),document.getElementById('categoryOverlay'));
    const buttonNode=button('mobile-only mobile-resume','',()=>{
      const records=read(),r=records.products[records.latest],p=window.MOONDROP_TRAINING_CATALOG.products.find(p=>p.id===records.latest&&p.status==='live');
      if(!r||!p)return;
      const url=new URL(p.href,base);url.searchParams.set('lang',root.lang.startsWith('zh')?'zh':'en');url.searchParams.set('resume','1');
      const go=()=>location.href=window.MoondropAuth?.protectHref(url.href)||url.href;
      if(window.MoondropAuth&&!window.MoondropAuth.isAuthenticated())window.MoondropAuth.requireAccess(go);else go();
    });
    document.querySelector('.intro-lower').prepend(buttonNode);
    const update=()=>{const records=read(),r=records.products[records.latest],p=window.MOONDROP_TRAINING_CATALOG.products.find(p=>p.id===records.latest&&p.status==='live');buttonNode.hidden=!r||!p;if(!buttonNode.hidden)buttonNode.replaceChildren(el('span','',text('继续上次阅读','Continue reading')),el('small','',p.name[root.lang.startsWith('zh')?'zh':'en']));};
    new MutationObserver(update).observe(root,{attributes:true,attributeFilter:['lang']});window.addEventListener('pageshow',update);update();
  }
  window.addEventListener('popstate',e=>{
    if(modal){
      e.stopImmediatePropagation();
      const url=new URL(location.href);url.searchParams.set('lang',state().lang);
      history.replaceState(history.state,'',url);
      dismissModal();
    }
  },true);
  window.addEventListener('keydown',e=>{
    if(!modal)return;
    if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();closeModal();}
    if(e.key==='Tab'){
      const items=[...modal.querySelectorAll('button,a[href]')].filter(n=>!n.hidden&&!n.closest('[hidden]')),first=items[0],last=items.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
    if(modal===lightbox&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();stepImage(e.key==='ArrowLeft'?-1:1);}
  },true);
  let scrollTimer;
  window.addEventListener('scroll',()=>{if(!query.matches||modal)return;clearTimeout(scrollTimer);scrollTimer=setTimeout(savePosition,250);},{passive:true});
  window.addEventListener('pagehide',savePosition);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)savePosition();});
  window.addEventListener('resize',()=>{notify();if(modal===lightbox)imageTransform();});
  query.addEventListener('change',()=>{root.classList.toggle('mobile-ui',query.matches);placeLanguageControls();if(!query.matches&&modal)closeModal();notify();});
  document.addEventListener('DOMContentLoaded',portal);
  function preview(image) {
    if (!query.matches) return image;
    const url=new URL(image,location.href);
    const key=decodeURIComponent(url.pathname.slice(base.pathname.length));
    const thumbnail=window.MOONDROP_MOBILE_PREVIEWS?.[key];
    return thumbnail ? new URL(thumbnail,base).href : image;
  }
  window.MoondropMobile={mount,notify,preview,isMobile:()=>query.matches};
})();
