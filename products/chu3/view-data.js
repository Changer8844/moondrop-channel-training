window.CHU3_VIEW = (() => {
  const chineseUI = {
  "documentTitle": "竹3 CHU III · 渠道培训",
  "brandKicker": "MOONDROP · 渠道培训",
  "languageLabel": "Switch to English",
  "trainingHome": "返回培训首页",
  "storyHeadline": "认识产品，掌握卖点。",
  "productOverview": "产品总览",
  "overviewButton": "返回培训菜单",
  "overviewTitle": "产品总览",
  "master": "主图",
  "stageAria": "点击产品热点或选择左侧卖点",
  "dragStageAria": "拖曳放大的原图，或使用左侧卖点列表",
  "emptyKicker": "从这里开始",
  "emptyTitle": "选择一个核心卖点。",
  "emptyBody": "查看顾客利益、现场演示、推荐话术和关键证据。",
  "showLabel": "现场展示",
  "sayLabel": "推荐话术",
  "specLabel": "关键证据",
  "sourcePrefix": "资料来源：",
  "previous": "← 上一个卖点",
  "next": "下一个卖点 →",
  "previousMedia": "上一张卖点图片",
  "nextMedia": "下一张卖点图片",
  "galleryKicker": "MOONDROP · 产品高清素材 · 14 张",
  "galleryTitle": "竹3 CHU III 高清图库",
  "closeDetail": "返回培训菜单",
  "closeGallery": "关闭高清图库",
  "closeFullscreen": "关闭全屏图片",
  "previousImage": "上一张图片",
  "nextImage": "下一张图片",
  "openFeature": "打开",
  "openImage": "打开高清图片："
};
  const basePortal = {
  "en": {
    "hubKicker": "MOONDROP · CHU III",
    "hubTitle": "CHU III",
    "sectionClose": "Back to CHU III training",
    "sections": {
      "core": {
        "tag": "SELL",
        "title": "Core Selling Points",
        "subtitle": "Customer benefits, demonstrations, and key proof"
      },
      "comparison": {
        "tag": "POSITION",
        "title": "Product Positioning",
        "subtitle": "Who it fits and how it compares"
      },
      "support": {
        "tag": "OWNERSHIP",
        "title": "Package & After-sales",
        "subtitle": "Package contents and warranty periods"
      },
      "reviews": {
        "tag": "REVIEWS",
        "title": "Media Reviews",
        "subtitle": "Real reviews, one click away"
      },
      "gallery": {
        "tag": "ASSETS",
        "title": "HD Image Library",
        "subtitle": "Product and packaging originals"
      }
    },
    "boards": {
      "comparison": {
        "title": "Product Positioning"
      },
      "support": {
        "title": "Package & After-sales",
        "packageLabel": "IN THE BOX",
        "packageTitle": "Standard package contents",
        "warrantyLabel": "WARRANTY",
        "warrantyTitle": "Warranty periods",
        "exclusions": "WHEN SERVICE IS REQUESTED"
      },
      "reviews": {
        "title": "Media Reviews",
        "introTitle": "Real reviews, one click away",
        "open": "Open full review <span class=\"icon-arrow\" aria-hidden=\"true\"></span>"
      }
    }
  },
  "zh": {
    "hubKicker": "MOONDROP · CHU III",
    "hubTitle": "竹3 · CHU III",
    "sectionClose": "返回竹3培训",
    "sections": {
      "core": {
        "tag": "卖点",
        "title": "核心卖点",
        "subtitle": "顾客利益、现场演示与关键证据"
      },
      "comparison": {
        "tag": "定位",
        "title": "产品定位",
        "subtitle": "适合谁，以及应该跟谁比较"
      },
      "support": {
        "tag": "售后",
        "title": "包装与售后",
        "subtitle": "包装清单与保修期限"
      },
      "reviews": {
        "tag": "评测",
        "title": "媒体评测",
        "subtitle": "真实评测，一键直达"
      },
      "gallery": {
        "tag": "素材",
        "title": "高清图库",
        "subtitle": "产品全貌、细节与包装实拍"
      }
    },
    "boards": {
      "comparison": {
        "title": "产品定位"
      },
      "support": {
        "title": "包装与售后",
        "packageLabel": "包装内容",
        "packageTitle": "标准包装清单",
        "warrantyLabel": "保修期限",
        "warrantyTitle": "保修期限",
        "exclusions": "顾客提出售后问题时"
      },
      "reviews": {
        "title": "媒体评测",
        "introTitle": "真实评测，一键直达",
        "open": "查看完整评测 <span class=\"icon-arrow\" aria-hidden=\"true\"></span>"
      }
    }
  }
};
  const files = ['DSC_6654','DSC_6712','DSC_6765','DSC_6783','DSC_6742','DSC_6747','DSC_2737','DSC_2749','DSC_8594','DSC_8627','DSC_0157','DSC_0279','DSC_6839','DSC_6843'];
  const galleryItems = files.map((file,i)=>({image:`assets/hd-gallery/${file}.jpg`,title:window.CHU3_COPY.en.galleryTitles[i],meta:'CHU III',group:i<10?0:i<12?1:2,width:[0,1,2,3,12].includes(i)?3840:i===10||i===11?3413:2560,height:[0,1,2,3,12].includes(i)?2560:i===10||i===11?5120:3840}));
  const languagePacks = {}, portalLanguagePacks = {};
  for (const [lang,c] of Object.entries(window.CHU3_COPY)) {
    const system = window.MoondropLanguage.ui(lang);
    const ui = lang==='zh' ? {...chineseUI} : {...system.product};
    Object.assign(ui,{storyEyebrow:c.storyEyebrow,masterAlt:c.masterAlt,galleryIntro:c.galleryIntro,galleryKicker:`MOONDROP · ${c.original} · 14`,galleryTitle:`CHU III · ${lang==='zh'?'高清图库':(system.product.galleryTitle||'HD Image Library')}`});
    languagePacks[lang]={ui,features:window.CHU3_DATA.localizedFeatures[lang],viewLabels:{master:ui.overviewTitle,...Object.fromEntries(window.CHU3_DATA.features.map((f,i)=>[f.id,c.stories[i][0]]))},gallery:galleryItems.map((item,i)=>({...item,title:c.galleryTitles[i],meta:`${c.groups[item.group]} · ${c.original}`}))};
    portalLanguagePacks[lang]={...(basePortal[lang]||system.portal),hubKicker:'MOONDROP · CHU III',hubTitle:lang==='zh'?'竹3 · CHU III':'CHU III',hubIntro:c.intro};
  }
  const masterHotspots = Object.fromEntries(window.CHU3_DATA.features.map(f=>[f.id,[f.position.x,f.position.y]]));
  const presets = {sound:{x:0,y:7,zoom:1.7},fit:{x:16,y:6,zoom:1.8},connections:{x:0,y:5,zoom:1.45},cable:{x:-18,y:22,zoom:1.7},care:{x:-20,y:0,zoom:1.8}};
  const featureViews = Object.fromEntries(window.CHU3_DATA.features.map((f,i)=>[f.id,{id:f.id,index:i+1,label:f.chapter,hotspot:masterHotspots[f.id],preset:presets[f.id]}]));
  const media = ['assets/campaign/black-silver-original.jpg','assets/hd-gallery/DSC_0279.jpg','assets/hd-gallery/DSC_6742.jpg','assets/hd-gallery/DSC_6712.jpg','assets/hd-gallery/DSC_6839.jpg'];
  const featureMedia = Object.fromEntries(window.CHU3_DATA.features.map((f,i)=>[f.id,Object.fromEntries(Object.entries(window.CHU3_COPY).map(([lang,c])=>[lang,[{image:media[i],fit:'contain',caption:c.stories[i][8]}]]))]));
  return {masterView:{id:'master',index:0,image:'assets/campaign/master-original.jpg',label:'CHU III',preset:{x:0,y:0,zoom:1}},masterHotspots,featureViews,featureMedia,galleryItems,languagePacks,portalLanguagePacks};
})();
