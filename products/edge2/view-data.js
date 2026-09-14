window.EDGE2_VIEW = (() => {
  const entries = [
  [
    "DSC_6268",
    "White headphones, three-quarter view",
    "白色耳机斜侧全貌"
  ],
  [
    "DSC_6275",
    "White headphones, front angle",
    "白色耳机正面角度"
  ],
  [
    "DSC_6282",
    "White earcup and physical controls",
    "白色耳罩与实体按键细节"
  ],
  [
    "DSC_6298",
    "White headphones, angled view",
    "白色耳机倾斜全貌"
  ],
  [
    "DSC_6355",
    "Black headphones, three-quarter view",
    "黑色耳机斜侧全貌"
  ],
  [
    "DSC_6360",
    "Black headphones, angled view",
    "黑色耳机倾斜全貌"
  ],
  [
    "DSC_6380",
    "Black headphones, front view",
    "黑色耳机正面全貌"
  ],
  [
    "DSC_1113",
    "Exterior packaging: two colorways",
    "外包装展示：黑白两款"
  ],
  [
    "DSC_1130",
    "Black headphones with exterior packaging",
    "黑色耳机与外包装实拍"
  ],
  [
    "DSC_1135",
    "White headphones with exterior packaging",
    "白色耳机与外包装实拍"
  ]
];
  const image = (name) => `assets/hd-gallery/${name}.jpg`;
  const galleryItems = entries.map(([file,title]) => ({ image:image(file), title, meta:'EDGE2 · Original photograph', width:file.startsWith('DSC_11')?3840:2560, height:file.startsWith('DSC_11')?2560:3840 }));
  const languagePacks = {
    en: { ui: {
      documentTitle:'EDGE2 · Channel Training', brandKicker:'MOONDROP · CHANNEL TRAINING', languageLabel:'切换至中文', trainingHome:'Training home',
      storyEyebrow:'SIX CORE SALES STORIES', storyHeadline:'Explore the product.', productOverview:'Overview', overviewButton:'Return to training menu',
      overviewTitle:'Product overview', master:'MAIN VIEW', stageAria:'Choose a product hotspot or a story from the list', dragStageAria:'Drag the enlarged photograph or choose another story from the list',
      emptyKicker:'START HERE', emptyTitle:'Choose one selling point.', emptyBody:'Learn the customer benefit, demonstration, recommended line, and key proof.',
      showLabel:'Show it', sayLabel:'Sales line', specLabel:'Core proof', sourcePrefix:'Source: ', previous:'← Previous story', next:'Next story →', previousMedia:'Previous feature image', nextMedia:'Next feature image',
      galleryKicker:'MOONDROP · SOURCE PHOTOGRAPHY · 10 FILES', galleryTitle:'EDGE2 HD Image Library', galleryIntro:'Ten original product and packaging photographs. Select an image to view the original file.',
      closeDetail:'Return to training menu', closeGallery:'Close HD image library', closeFullscreen:'Close full-screen image', previousImage:'Previous image', nextImage:'Next image', openFeature:'Open', openImage:'Open high-resolution image:', masterAlt:'EDGE2 white headphones, complete original transparent photograph'
    }, viewLabels:{}, features:{}, gallery:galleryItems },
    zh: { ui: {
      documentTitle:'EDGE2 · 渠道培训', brandKicker:'MOONDROP · 渠道培训', languageLabel:'Switch to English', trainingHome:'返回培训首页',
      storyEyebrow:'六个核心销售卖点', storyHeadline:'认识产品，掌握卖点。', productOverview:'产品总览', overviewButton:'返回培训菜单',
      overviewTitle:'产品总览', master:'主图', stageAria:'点击产品热点或选择左侧卖点', dragStageAria:'拖曳放大的原图，或使用左侧卖点列表',
      emptyKicker:'从这里开始', emptyTitle:'选择一个核心卖点。', emptyBody:'查看顾客利益、现场演示、推荐话术和关键证据。',
      showLabel:'现场展示', sayLabel:'推荐话术', specLabel:'关键证据', sourcePrefix:'资料来源：', previous:'← 上一个卖点', next:'下一个卖点 →', previousMedia:'上一张卖点图片', nextMedia:'下一张卖点图片',
      galleryKicker:'MOONDROP · 产品高清素材 · 10 张', galleryTitle:'EDGE2 高清图库', galleryIntro:'七张产品照与三张包装 / 产品实拍。点击任意图片查看高清原图。',
      closeDetail:'返回培训菜单', closeGallery:'关闭高清图库', closeFullscreen:'关闭全屏图片', previousImage:'上一张图片', nextImage:'下一张图片', openFeature:'打开', openImage:'打开高清图片：', masterAlt:'EDGE2 白色耳机完整透明原图'
    }, viewLabels:{}, features:window.EDGE2_DATA.localizedFeatures.zh, gallery:entries.map(([, ,title]) => ({title,meta:'EDGE2 · 产品原图'})) }
  };
  const portalLanguagePacks = {
    en: {
      hubKicker:'MOONDROP · EDGE2', hubTitle:'EDGE2', hubIntro:'Adaptive ANC headphones for commuting, study, travel and computer listening.', sectionClose:'Back to EDGE2 training',
      sections:{
        core:{tag:'SELL',title:'Core Selling Points',subtitle:'Customer benefits, demonstrations, and key proof'},
        comparison:{tag:'POSITION',title:'Product Positioning',subtitle:'Who it fits and how it compares'},
        support:{tag:'OWNERSHIP',title:'Package & After-sales',subtitle:'Package contents and warranty periods'},
        reviews:{tag:'REVIEWS',title:'Media Reviews',subtitle:'Real reviews, one click away'},
        gallery:{tag:'ASSETS',title:'HD Image Library',subtitle:'Product and packaging originals'}
      },
      boards:{comparison:{title:'Product Positioning'},support:{title:'Package & After-sales',packageLabel:'IN THE BOX',packageTitle:'Standard package contents',warrantyLabel:'WARRANTY',warrantyTitle:'Warranty periods',exclusions:'WHEN SERVICE IS REQUESTED'},reviews:{title:'Media Reviews',introTitle:'Real reviews, one click away',open:'Open full review <span class="icon-arrow" aria-hidden="true"></span>'}}
    },
    zh: {
      hubKicker:'MOONDROP · EDGE2', hubTitle:'羽翼2 · EDGE2', hubIntro:'为通勤、学习办公、旅行与电脑聆听准备的自适应降噪头戴耳机。', sectionClose:'返回 EDGE2 培训',
      sections:{
        core:{tag:'卖点',title:'核心卖点',subtitle:'顾客利益、现场演示与关键证据'},
        comparison:{tag:'定位',title:'产品定位',subtitle:'适合谁，以及应该跟谁比较'},
        support:{tag:'售后',title:'包装与售后',subtitle:'包装清单与保修期限'},
        reviews:{tag:'评测',title:'媒体评测',subtitle:'真实评测，一键直达'},
        gallery:{tag:'素材',title:'高清图库',subtitle:'产品全貌、细节与包装实拍'}
      },
      boards:{comparison:{title:'产品定位'},support:{title:'包装与售后',packageLabel:'包装内容',packageTitle:'标准包装清单',warrantyLabel:'保修期限',warrantyTitle:'保修期限',exclusions:'顾客提出售后问题时'},reviews:{title:'媒体评测',introTitle:'真实评测，一键直达',open:'查看完整评测 <span class="icon-arrow" aria-hidden="true"></span>'}}
    }
  };
  const presets = {"sound": {"x": -11, "y": -18, "zoom": 1.65}, "anc": {"x": 18, "y": -13, "zoom": 1.65}, "calls": {"x": -25, "y": -11, "zoom": 1.65}, "connections": {"x": -18, "y": -24, "zoom": 1.65}, "comfort": {"x": -22, "y": -2, "zoom": 1.65}, "battery": {"x": 0, "y": 27, "zoom": 1.3}};
  const overviewPreset = {x:0,y:0,zoom:1};
  const masterHotspots = Object.fromEntries(window.EDGE2_DATA.features.map(f => [f.id,[f.position.x,f.position.y]]));
  const featureViews = Object.fromEntries(window.EDGE2_DATA.features.map((f,i) => [f.id,{id:f.id,index:i+1,label:f.chapter,hotspot:masterHotspots[f.id],preset:presets[f.id]}]));
  const featureMedia = {
  "sound": {
    "en": [
      {
        "image": "assets/official/en-04.jpg",
        "fit": "contain",
        "caption": "Official 40 mm wood-dome driver illustration. Internal construction, not an exterior photograph."
      },
      {
        "image": "assets/official/en-05.jpg",
        "fit": "contain",
        "caption": "Official independent acoustic cavity illustration; codec information in the original poster remains conditional."
      },
      {
        "image": "assets/official/en-07.jpg",
        "fit": "contain",
        "caption": "Official VDSF response chart measured with B&K 5128; laboratory data."
      },
      {
        "image": "assets/official/en-15.jpg",
        "fit": "contain",
        "caption": "Original app PEQ illustration: filter, frequency, gain and Q. Interface language is as supplied by MOONDROP."
      },
      {
        "image": "assets/official/en-16.jpg",
        "fit": "contain",
        "caption": "Official tuning community illustration; verify current app and firmware availability."
      },
      {
        "image": "assets/official/en-17.jpg",
        "fit": "contain",
        "caption": "Official Sound Target ID illustration; sound preferences, not a hearing assessment."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-04.jpg",
        "fit": "contain",
        "caption": "官方 40 mm 原木球顶单元结构图，展示内部构造。"
      },
      {
        "image": "assets/official/cn-05.jpg",
        "fit": "contain",
        "caption": "官方独立声学腔体结构原图。"
      },
      {
        "image": "assets/official/cn-07.jpg",
        "fit": "contain",
        "caption": "官方 VDSF 频响原图，使用 B&K 5128 测量，属于实验室数据。"
      },
      {
        "image": "assets/official/cn-16.jpg",
        "fit": "contain",
        "caption": "官方 App PEQ 原始界面示意，可调滤波器、频率、增益和 Q。"
      },
      {
        "image": "assets/official/cn-17.jpg",
        "fit": "contain",
        "caption": "官方调音社区原始示意，使用时核对当前 App 和固件支持。"
      },
      {
        "image": "assets/official/cn-18.jpg",
        "fit": "contain",
        "caption": "官方声音偏好档案示意，不是听力评估。"
      }
    ]
  },
  "anc": {
    "en": [
      {
        "image": "assets/official/en-08.jpg",
        "fit": "contain",
        "caption": "Official adaptive ANC illustration. The improvement is a manufacturer laboratory comparison with EDGE."
      },
      {
        "image": "assets/official/en-10.jpg",
        "fit": "contain",
        "caption": "Official transparency-mode illustration; compare nearby speech on the actual unit."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-08.jpg",
        "fit": "contain",
        "caption": "官方自适应降噪原图；升级幅度来自厂商与 EDGE 的实验室比较。"
      },
      {
        "image": "assets/official/cn-09.jpg",
        "fit": "contain",
        "caption": "官方降噪对比曲线及 24.4% 测试说明，G.R.A.S. 45CA，宽频带加权评估。"
      },
      {
        "image": "assets/official/cn-11.jpg",
        "fit": "contain",
        "caption": "官方通透模式原图，现场通过身边人声比较体验。"
      }
    ]
  },
  "calls": {
    "en": [
      {
        "image": "assets/official/en-09.jpg",
        "fit": "contain",
        "caption": "Official microphone and beamforming illustration. The marked MIC positions identify the real voice-pickup locations."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-10.jpg",
        "fit": "contain",
        "caption": "官方麦克风与波束成形示意，MIC 标记对应语音拾取位置。"
      }
    ]
  },
  "connections": {
    "en": [
      {
        "image": "assets/official/en-06.jpg",
        "fit": "contain",
        "caption": "Official wireless-codec poster. LDAC / LHDC require a compatible source and the appropriate app setting."
      },
      {
        "image": "assets/official/en-12.jpg",
        "fit": "contain",
        "caption": "Official USB digital-audio illustration. “Zero” refers to wireless transmission delay, not total system latency."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-06.jpg",
        "fit": "contain",
        "caption": "官方无线编码原图；LDAC / LHDC 需兼容音源与对应 App 设置。"
      },
      {
        "image": "assets/official/cn-13.jpg",
        "fit": "contain",
        "caption": "官方 USB 数字音频原图；“零”指无线传输延迟，不等于整机全链路零延迟。"
      }
    ]
  },
  "comfort": {
    "en": [
      {
        "image": "assets/official/en-18.jpg",
        "fit": "contain",
        "caption": "Official angled memory-foam pad illustration; fit varies by listener."
      },
      {
        "image": "assets/official/en-19.jpg",
        "fit": "contain",
        "caption": "Official stainless-steel folding hinge illustration."
      },
      {
        "image": "assets/official/en-11.jpg",
        "fit": "contain",
        "caption": "Official capacitive wear-detection illustration; the function can be disabled in the app."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-20.jpg",
        "fit": "contain",
        "caption": "官方非平行面记忆海绵耳垫原图，实际贴合因人而异。"
      },
      {
        "image": "assets/official/cn-21.jpg",
        "fit": "contain",
        "caption": "官方不锈钢伸缩折叠转轴原图。"
      },
      {
        "image": "assets/official/cn-12.jpg",
        "fit": "contain",
        "caption": "官方电容式佩戴检测原图，可在 App 内关闭。"
      }
    ]
  },
  "battery": {
    "en": [
      {
        "image": "assets/official/en-17.jpg",
        "fit": "contain",
        "caption": "Official battery and fast-charge figures. About 50 hours with AAC and ANC on; runtime varies with settings and conditions."
      }
    ],
    "zh": [
      {
        "image": "assets/official/cn-19.jpg",
        "fit": "contain",
        "caption": "官方续航与快充原图。约 50 小时基于 AAC、ANC 开启条件，实际时长随设置和环境变化。"
      }
    ]
  }
};
  return {masterView:{id:'master',index:0,image:'assets/campaign/white.png',label:'PRODUCT OVERVIEW',preset:overviewPreset},masterHotspots,featureViews,featureMedia,galleryItems,languagePacks,portalLanguagePacks};
})();
