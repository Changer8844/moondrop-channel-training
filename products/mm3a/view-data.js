window.MM3A_VIEW = (() => {
  const entries = [
    ['DSC_2593', 'Complete stereo pair', '完整立体声音箱组合'],
    ['DSC_2561', 'Silk-dome tweeter', '丝膜球顶高音细节'],
    ['DSC_2571', 'Three-quarter view of the stereo pair', '立体声音箱组合斜俯视'],
    ['DSC_2559', 'Side passive radiator', '侧面被动辐射器'],
    ['DSC_2788', 'Angled desktop placement', '桌面倾斜摆位'],
    ['DSC_2580', 'Low-angle stereo pair', '低角度立体声组合'],
    ['PHI_0971', 'Desktop stereo with a laptop', '笔记本桌面立体声系统'],
    ['PHI_1009', 'Speaker pair on a dark set', '黑底音箱组合'],
    ['PHI_1459', 'Master and partner rear panels', '主副箱背面接口'],
    ['PHI_1304', 'Stereo pair in an acoustic room', '声学房间中的立体声音箱'],
    ['DSC_2784', 'Stereo pair beside a desktop screen', '显示器两侧的桌面音箱'],
    ['DSC_2607', 'Pair with connecting cables', '音箱与连接线']
  ];
  const image = (name) => `assets/hd-gallery/${name}.jpg`;
  const galleryItems = entries.map(([file,title]) => ({ image:image(file), title, meta:'MM3A · Original photograph', ...(file === 'PHI_1304' ? {position:'50% 78%'} : {}) }));
  const languagePacks = {
    en: { ui: {
      documentTitle:'MM3A · Channel Training', brandKicker:'MOONDROP · CHANNEL TRAINING', languageLabel:'切换至中文', trainingHome:'Training home',
      storyEyebrow:'SIX CORE SALES STORIES', storyHeadline:'Explore the product.', productOverview:'Overview', overviewButton:'Return to training menu',
      overviewTitle:'Product overview', master:'MAIN VIEW', stageAria:'Choose a product hotspot or a story from the list', dragStageAria:'Drag the enlarged photograph or choose another story from the list',
      emptyKicker:'START HERE', emptyTitle:'Choose one selling point.', emptyBody:'Learn the customer benefit, demonstration, recommended line, and key proof.',
      showLabel:'Show it', sayLabel:'Sales line', specLabel:'Core proof', sourcePrefix:'Source: ', previous:'← Previous story', next:'Next story →', previousMedia:'Previous feature image', nextMedia:'Next feature image',
      galleryKicker:'MOONDROP · SOURCE PHOTOGRAPHY · 12 FILES', galleryTitle:'MM3A HD Image Library', galleryIntro:'Original product, driver-detail, and desktop photographs. Select any image to view the original file.',
      closeDetail:'Return to training menu', closeGallery:'Close HD image library', closeFullscreen:'Close full-screen image', previousImage:'Previous image', nextImage:'Next image', openFeature:'Open', openImage:'Open high-resolution image:', masterAlt:'MM3A front and side on the left, complete master rear panel on the right, composited on one continuous background'
    }, viewLabels:{}, features:{}, gallery:galleryItems },
    zh: { ui: {
      documentTitle:'MM3A · 渠道培训', brandKicker:'MOONDROP · 渠道培训', languageLabel:'Switch to English', trainingHome:'返回培训首页',
      storyEyebrow:'六个核心销售卖点', storyHeadline:'认识产品，掌握卖点。', productOverview:'产品总览', overviewButton:'返回培训菜单',
      overviewTitle:'产品总览', master:'主图', stageAria:'点击产品热点或选择左侧卖点', dragStageAria:'拖曳放大的原图，或使用左侧卖点列表',
      emptyKicker:'从这里开始', emptyTitle:'选择一个核心卖点。', emptyBody:'查看顾客利益、现场演示、推荐话术和关键证据。',
      showLabel:'现场展示', sayLabel:'推荐话术', specLabel:'关键证据', sourcePrefix:'资料来源：', previous:'← 上一个卖点', next:'下一个卖点 →', previousMedia:'上一张卖点图片', nextMedia:'下一张卖点图片',
      galleryKicker:'MOONDROP · 产品高清素材 · 12 张', galleryTitle:'MM3A 高清图库', galleryIntro:'精选产品全貌、单元细节与桌面场景原图。点击任意图片即可查看高清原图。',
      closeDetail:'返回培训菜单', closeGallery:'关闭高清图库', closeFullscreen:'关闭全屏图片', previousImage:'上一张图片', nextImage:'下一张图片', openFeature:'打开', openImage:'打开高清图片：', masterAlt:'MM3A 合成总览：左侧正面与侧面，右侧主箱完整背面，共用连续背景'
    }, viewLabels:{}, features:window.MM3A_DATA.localizedFeatures.zh, gallery:entries.map(([, ,title]) => ({title,meta:'MM3A · 产品原图'})) }
  };
  const portalLanguagePacks = {
    en: {
      hubKicker:'MOONDROP · MM3A', hubTitle:'MM3A', hubIntro:'A compact active stereo pair for music, desktop media, and your everyday sources.', sectionClose:'Back to MM3A training',
      sections:{
        core:{tag:'SELL',title:'Core Selling Points',subtitle:'Customer benefits, demonstrations, and key proof'},
        comparison:{tag:'POSITION',title:'Product Positioning',subtitle:'Who it fits and how it compares'},
        support:{tag:'OWNERSHIP',title:'Package & After-sales',subtitle:'Package contents and warranty periods'},
        reviews:{tag:'REVIEWS',title:'Media Reviews',subtitle:'Real reviews, one click away'},
        gallery:{tag:'ASSETS',title:'HD Image Library',subtitle:'Drivers, placement, and connections'}
      },
      boards:{comparison:{title:'Product Positioning'},support:{title:'Package & After-sales',packageLabel:'IN THE BOX',packageTitle:'Standard package contents',warrantyLabel:'WARRANTY',warrantyTitle:'Warranty periods',exclusions:'WHEN SERVICE IS REQUESTED'},reviews:{title:'Media Reviews',introTitle:'Real reviews, one click away',open:'Open full review <span class="icon-arrow" aria-hidden="true"></span>'}}
    },
    zh: {
      hubKicker:'MOONDROP · MM3A', hubTitle:'MM3A', hubIntro:'为桌面音乐、影音与日常多音源准备的紧凑型有源立体声音箱。', sectionClose:'返回 MM3A 培训',
      sections:{
        core:{tag:'卖点',title:'核心卖点',subtitle:'顾客利益、现场演示与关键证据'},
        comparison:{tag:'定位',title:'产品定位',subtitle:'适合谁，以及应该跟谁比较'},
        support:{tag:'售后',title:'包装与售后',subtitle:'包装清单与保修期限'},
        reviews:{tag:'评测',title:'媒体评测',subtitle:'真实评测，一键直达'},
        gallery:{tag:'素材',title:'高清图库',subtitle:'单元、摆位与连接细节'}
      },
      boards:{comparison:{title:'产品定位'},support:{title:'包装与售后',packageLabel:'包装内容',packageTitle:'标准包装清单',warrantyLabel:'保修期限',warrantyTitle:'保修期限',exclusions:'顾客提出售后问题时'},reviews:{title:'媒体评测',introTitle:'真实评测，一键直达',open:'查看完整评测 <span class="icon-arrow" aria-hidden="true"></span>'}}
    }
  };
  const presets = {
    drivers:{x:20,y:0,zoom:1.4},
    bass:{x:32,y:-9,zoom:1.65},
    desktop:{x:22,y:-22,zoom:1.45},
    monitoring:{x:25,y:-13,zoom:1.5},
    inputs:{x:-28,y:7,zoom:1.7},
    peq:{x:-30,y:20,zoom:1.85}
  };
  const overviewPreset = {x:0,y:0,zoom:1};
  const masterHotspots = Object.fromEntries(window.MM3A_DATA.features.filter(f => f.hotspot !== false).map(f => [f.id,[f.position.x,f.position.y]]));
  const featureViews = Object.fromEntries(window.MM3A_DATA.features.map((f,i) => [f.id,{id:f.id,index:i+1,label:f.chapter,hotspot:masterHotspots[f.id],preset:presets[f.id] || overviewPreset}]));
  const media = {
    drivers:[['DSC_2553','Front view: the silk-dome tweeter above the larger aluminum-cone woofer.','正面原图：上方丝膜球顶高音，下方铝盆低音。'],['DSC_2561','Close-up of the silk-dome tweeter.','丝膜球顶高音的原图特写。']],
    bass:[['DSC_2559','Close-up of the passive radiator on the cabinet side.','箱体侧面被动辐射器特写。']],
    desktop:[['DSC_2788','Side view of the angled baffle and desk placement.','侧面观察前障板倾角与桌面摆位。'],['PHI_0971','A stereo pair placed around a laptop.','笔记本两侧的立体声音箱摆位。']],
    inputs:[['PHI_1467','Master rear panel: volume/input knob, Pair button and source connections.','主箱背面：音量/输入旋钮、Pair 按钮及音源接口。'],['PHI_1459','First connection: powered right master and left partner, joined with the supplied Z-DIN4 cable.','初次连接：右主箱与左副箱，通过随附 Z-DIN4 线连接。']]
  };
  const featureMedia = Object.fromEntries(Object.entries(media).map(([id,items]) => [id,{en:items.map(([file,caption])=>({image:image(file),fit:'contain',caption})),zh:items.map(([file,,caption])=>({image:image(file),fit:'contain',caption}))}]));
  const evidence = (file, en, zh) => ({en:{image:`assets/evidence/${file}.png`,fit:'contain',caption:en},zh:{image:`assets/evidence/${file}.png`,fit:'contain',caption:zh}});
  const response = evidence('response','Manufacturer response illustration, supplied company introduction p. 71. Lab data, not a measurement of your room.','企业介绍第 71 页的厂商响应曲线原图。属于实验室数据，不是当前房间的实测结果。');
  const distortion = evidence('distortion','Manufacturer distortion illustration from the same page; separate from frequency response.','同页厂商失真测量原图，与频响是不同指标。');
  const peq = evidence('peq-interface','Original USB-mode DSP/PEQ interface illustration, company introduction p. 71. Frequency, gain and Q are adjustable; not a live device screenshot.','企业介绍第 71 页的 USB 模式 DSP/PEQ 原始界面示意，可调频率、增益和 Q；并非当前连接设备的截图。');
  featureMedia.monitoring = {en:[response.en,distortion.en],zh:[response.zh,distortion.zh]};
  featureMedia.peq = {en:[peq.en],zh:[peq.zh]};
  return { masterView:{id:'master',index:0,image:'assets/campaign/master-front-rear.png',label:'PRODUCT OVERVIEW',preset:overviewPreset},masterHotspots,featureViews,featureMedia,galleryItems,languagePacks,portalLanguagePacks };
})();
