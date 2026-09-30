// Product-only content: all language bodies come from copy.js; no English fallback.
window.CHU3_DATA = (() => {
  const ids = ['sound','fit','connections','cable','care'];
  const positions = [[50,44],[39,46],[50,44],[67,31],[67,51]];
  const accents = ['lime','orange','cyan','blue','violet'];
  const source = 'MOONDROP · 2026-08-26 / Micro Center · 2026-09-10';
  const localize = (story) => {
    const [chapter,label,title,body,points,show,say,spec] = story;
    return {chapter,label,hotspotLabel:chapter,kicker:chapter,title,body,subfeatures:points.map(([label,text])=>({label,text})),show,say,spec,source};
  };
  const localizedFeatures = Object.fromEntries(Object.entries(window.CHU3_COPY).map(([lang,copy])=>[lang,Object.fromEntries(ids.map((id,i)=>[id,localize(copy.stories[i])]))]));
  return {
    product:{name:'CHU III'},
    features:ids.map((id,i)=>({id,position:{x:positions[i][0],y:positions[i][1]},accent:accents[i],hotspot:!['sound','connections','care'].includes(id),...localizedFeatures.en[id]})),
    localizedFeatures,
    prices:[['USD','24.99'],['EUR','29.99'],['GBP','24.99'],['CAD','38.99'],['INR','2699'],['AUD','38.99'],['MYR','115'],['KRW','38999'],['TWD','880'],['PHP','1689'],['SGD','40.99'],['IDR','490000'],['THB','909'],['VND','715000'],['BDT','3365'],['MXN','599'],['RUB','2299']],
    portal:{
      sections:['core','comparison','support','reviews','gallery'].map(id=>({id})),
      campaign:{product:'assets/campaign/black-silver-original.jpg'},
      comparisons:Object.fromEntries(Object.entries(window.CHU3_COPY).map(([lang,c])=>[lang,c.comparisons.map(([title,customer,answer,proof])=>({title,customer,answer,proof}))])),
      support:{...Object.fromEntries(Object.entries(window.CHU3_COPY).map(([lang,c])=>[lang,c.support])),contentsImage:'assets/hd-gallery/DSC_6839.jpg',imageAlt:Object.fromEntries(Object.entries(window.CHU3_COPY).map(([lang,c])=>[lang,c.packageAlt]))},
      reviews:[
        {title:'MOONDROP CHU III : Great Sound For Only $25!',channel:'Gamesky',url:'https://www.youtube.com/watch?v=-j45hjpgbas',image:'assets/reviews/-j45hjpgbas.jpg'},
        {title:'Can the Most Popular $20 IEM Get Any Better?',channel:'crinacle',url:'https://www.youtube.com/watch?v=5e80Y_RcLzs',image:'assets/reviews/5e80Y_RcLzs.jpg'},
        {title:'A BRUTALLY HONEST Moondrop Chu 3 REVIEW (vs CHU 2, BUNNY, WANER, ZERO 2 & more)',channel:'Jay Audio',url:'https://www.youtube.com/watch?v=Ihq9r0_qAnc',image:'assets/reviews/Ihq9r0_qAnc.jpg'}
      ]
    }
  };
})();
