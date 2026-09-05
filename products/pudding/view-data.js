window.PUDDING_VIEW = (() => {
  const galleryItems = [
    { image: 'assets/hd-gallery/01-three-color-full.jpg', title: 'Three-color product family', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/02-three-color-staggered.jpg', title: 'Staggered three-color lineup', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/03-three-color-row.jpg', title: 'Front three-color lineup', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/04-three-color-closed-open.jpg', title: 'Transparent charging cases', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/05-yellow.jpg', title: 'Yellow colorway', meta: 'Product · Yellow' },
    { image: 'assets/hd-gallery/06-light.jpg', title: 'Light colorway', meta: 'Product · Light' },
    { image: 'assets/hd-gallery/07-dark.jpg', title: 'Dark colorway', meta: 'Product · Dark' },
    { image: 'assets/hd-gallery/08-driver-detail.png', title: 'Earbud faceplate and ear-tip detail', meta: 'Detail · Earbud exterior' },
    { image: 'assets/hd-gallery/09-open-top.jpg', title: 'Charging cases from above', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/10-front-colorways.jpg', title: 'Front colorway comparison', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/11-overhead.jpg', title: 'Overhead product composition', meta: 'Product · Three colorways' },
    { image: 'assets/hd-gallery/12-lid-detail.jpg', title: 'Transparent lid detail', meta: 'Detail · Charging case' }
  ];

  const languagePacks = {
    en: {
      ui: {
        documentTitle: 'PUDDING · HD Photo Channel Training',
        brandKicker: 'MOONDROP · CHANNEL TRAINING', languageLabel: '切换至中文', trainingHome: 'Training home',
        storyEyebrow: 'Six core sales stories', storyHeadline: 'Learn it by<br />touching it.',
        productOverview: 'Overview', overviewButton: 'Return to training menu',
        viewKicker: 'Real-photo inspection field', overviewTitle: 'Product overview',
        master: 'MAIN VIEW', masterNumber: 'MAIN VIEW / HD', masterLabel: 'FRONT · PRODUCT FAMILY', focusNumber: 'FOCUS',
        stageAria: 'Select a product signal to inspect its detail', dragStageAria: 'Drag the enlarged product to find another signal, or use the feature list.', masterState: 'PRODUCT OVERVIEW',
        emptyKicker: 'START HERE', emptyTitle: 'Choose one selling point.',
        emptyBody: 'Learn the customer benefit, demonstration, recommended line, and key proof.',
        showLabel: 'Show it', sayLabel: 'Sales line', specLabel: 'Core proof', sourcePrefix: 'Source: ',
        previous: '← Previous story', next: 'Next story →', previousMedia: 'Previous feature image', nextMedia: 'Next feature image',
        galleryKicker: 'MOONDROP · SOURCE PHOTOGRAPHY · 12 FILES', galleryTitle: 'PUDDING HD Image Library',
        galleryIntro: 'Choose an image for customer demonstrations, colorway comparison, product detail, or follow-up. Select any image to open the original high-resolution file.',
        closeDetail: 'Return to training menu', closeGallery: 'Close HD image library', closeFullscreen: 'Close full-screen image',
        previousImage: 'Previous image', nextImage: 'Next image', openFeature: 'Open', openImage: 'Open high-resolution image:',
        masterAlt: 'Complete PUDDING product family with three colorways, open charging cases, and earbuds'
      },
      viewLabels: {
        'adaptive-anc': 'ANC · REAL-TIME ADAPTATION', sound: 'SOUND · DRIVER & CODEC', transparency: 'FIT · SEAL & AWARENESS',
        calls: 'CALLS · MICROPHONE PROCESSING', battery: 'DAILY · BATTERY & GAMING', app: 'APP · TUNING & DEVICES'
      },
      panelCaptions: {}, features: {}, gallery: galleryItems
    },
    zh: {
      ui: {
        documentTitle: 'PUDDING · 高清产品渠道培训',
        brandKicker: 'MOONDROP · 渠道培训', languageLabel: 'Switch to English', trainingHome: '返回培训首页',
        storyEyebrow: '六个核心销售卖点', storyHeadline: '点击产品，<br />掌握卖点。',
        productOverview: '产品总览', overviewButton: '返回培训菜单',
        viewKicker: '实拍产品检视区', overviewTitle: '产品总览',
        master: '主图', masterNumber: '主图 / 高清', masterLabel: '正面 · 三色产品全貌', focusNumber: '聚焦',
        stageAria: '点击产品卖点查看对应细节', dragStageAria: '拖曳放大后的产品画面寻找其他光点，也可以使用左侧卖点列表。', masterState: '产品总览',
        emptyKicker: '从这里开始', emptyTitle: '选择一个核心卖点。',
        emptyBody: '查看顾客利益、现场演示、推荐话术和关键证据。',
        showLabel: '现场展示', sayLabel: '推荐话术', specLabel: '关键证据', sourcePrefix: '资料来源：',
        previous: '← 上一个卖点', next: '下一个卖点 →', previousMedia: '上一张卖点图片', nextMedia: '下一张卖点图片',
        galleryKicker: 'MOONDROP · 产品高清素材 · 12 张', galleryTitle: 'PUDDING 高清图库',
        galleryIntro: '选择图片用于顾客演示、配色对比、结构细节或后续跟进。点击任意图片即可查看高清原图。',
        closeDetail: '返回培训菜单', closeGallery: '关闭高清图库', closeFullscreen: '关闭全屏图片',
        previousImage: '上一张图片', nextImage: '下一张图片', openFeature: '打开', openImage: '打开高清图片：',
        masterAlt: 'PUDDING 三种配色、打开的充电盒与耳机完整产品组合图'
      },
      viewLabels: {
        'adaptive-anc': '降噪 · 实时自适应', sound: '声音 · 单元与编码', transparency: '佩戴 · 密封与通透',
        calls: '通话 · 麦克风处理', battery: '日用 · 续航与游戏', app: 'App · 调音与设备'
      },
      panelCaptions: {},
      features: {
        'adaptive-anc': {
          chapter: '自适应降噪', label: '实时适配佩戴状态', title: '环境变化，降噪也持续调整', kicker: '实时自适应 ANC',
          subfeatures: [
            { label: '顾客利益', text: '面对地铁、飞机或办公室空调等持续噪声时，帮助顾客获得更安静的专注环境。' },
            { label: '工作方式', text: '持续检测耳内噪声，并结合真实佩戴状态更新降噪补偿。' },
            { label: '准确预期', text: '官方标注最大降噪深度最高可达 54 dB，实际效果受密封、佩戴和环境影响。' }
          ],
          body: 'PUDDING 持续检测耳内噪声，并随真实佩戴状态调整降噪补偿，帮助减少学习、工作和出行中的持续背景噪声。选对耳塞、保持密封仍然很重要。',
          show: '先选合适耳塞并正确佩戴，再用稳定低频背景声比较关闭、ANC 和通透三种状态。',
          say: '“它会持续检测耳内噪声，并按你真实的佩戴状态调整降噪。”',
          spec: '实时自适应 ANC · 最大降噪深度最高可达 54 dB · 效果受佩戴与环境影响',
          source: '水月雨 PUDDING 官方产品页；Micro Center PUDDING 培训材料第 4、10 页'
        },
        sound: {
          chapter: '声音', label: '10mm 动圈 + LHDC', title: '低失真声音，也能按喜好调校', kicker: '动圈单元与高清无线',
          subfeatures: [
            { label: '驱动单元', text: '10mm 宽频低失真动圈，采用钛晶球顶与 N52 磁体。' },
            { label: '测量调校', text: '结合 B&K 5128 测量系统与 VDSF 目标曲线进行调校。' },
            { label: '无线编码', text: '兼容设备可使用 LHDC；其他设备仍可使用 AAC 或 SBC。' }
          ],
          body: '10mm 动圈采用钛晶球顶与 N52 磁体，结合低失真结构和 VDSF 目标曲线调校，呈现清晰的人声与音乐细节。兼容设备还可使用 LHDC。',
          show: '在相同音量下播放熟悉的人声和鼓点；手机兼容时展示 LHDC，不兼容时用 AAC 或 SBC 正常演示。',
          say: '“10mm 动圈、低失真结构和目标曲线调校共同工作，兼容手机还可以使用 LHDC。”',
          spec: '10mm 动圈 · 钛晶球顶 · N52 磁体 · THD ≤ 0.05% · LHDC 需兼容设备',
          source: '水月雨 PUDDING 官方产品页；Micro Center PUDDING 培训材料第 4、6 页'
        },
        transparency: {
          chapter: '佩戴与通透', label: '入耳密封 + 自然通透', title: '需要隔音，也能随时听见周围', kicker: '佩戴与自然通透',
          subfeatures: [
            { label: '稳固入耳', text: '入耳式结构与大中小三组耳塞，提供稳定佩戴和被动隔音基础。' },
            { label: '自然通透', text: '需要听见同事、广播或附近环境时，可恢复周围声音。' },
            { label: '日常操作', text: '支持佩戴检测与触控提示音。通透帮助环境感知，但不等于交通安全保证。' }
          ],
          body: '入耳密封负责稳定与隔音，需要交流或留意广播时再切换通透，减少反复摘下耳机。',
          show: '确认左右耳和耳塞尺寸，低音量播放音乐，再切换通透并在顾客正前方正常说话。',
          say: '“入耳式负责稳定和隔音，需要听见周围时，再切换自然通透。”',
          spec: '入耳式佩戴 · 大 / 中 / 小号耳塞 · 自然通透 · 多麦克风补偿',
          source: '水月雨 PUDDING 官方产品页；Micro Center PUDDING 培训材料第 4、9 页'
        },
        calls: {
          chapter: '通话', label: '硬件加速 AI ENC', title: '让通话对方更清楚地听见你', kicker: 'AI 通话降噪',
          subfeatures: [
            { label: '通话利益', text: '抑制麦克风拾取的环境噪声，帮助对方理解说话内容。' },
            { label: '硬件处理', text: 'NPU 为 AI 环境噪声处理提供硬件加速。' },
            { label: '不要混淆', text: 'ANC 改善自己听到的环境；AI ENC 改善对方收到的声音。' }
          ],
          body: '硬件加速 AI ENC 用于抑制麦克风信号中的环境噪声，帮助对方在咖啡店、通勤和开放办公室等场景中听清说话内容。ANC 则负责减少自己听到的噪声，两者作用不同。',
          show: '确认使用耳机麦克风进行真实通话，保持背景噪声和说话音量一致，请接收端反馈人声清晰度。手机录音软件可能走不同麦克风链路，不作为通话效果的替代。',
          say: '“ANC 改善你听到的环境，AI ENC 处理麦克风信号，让对方更容易听清你。”',
          spec: '硬件加速 AI ENC · NPU 通话降噪 · 实际效果受环境噪声和说话音量影响',
          source: '水月雨 PUDDING 官方产品页；Micro Center PUDDING 培训材料第 4 页'
        },
        battery: {
          chapter: '续航与游戏', label: '单次 12.5h · 游戏模式', title: '长时间使用，也能切换低延迟模式', kicker: '续航与低延迟',
          subfeatures: [
            { label: '耳机续航', text: '官方测试条件下，AAC 播放单次约 12.5 小时。' },
            { label: '搭配充电盒', text: '搭配充电盒最长约 41 小时。测试条件为 50% 音量、AAC 编码。' },
            { label: '游戏模式', text: '最低延迟官方标注约 60ms，实际结果受设备和环境影响。' }
          ],
          body: '较长的单次续航减少工作和出行中的充电中断，充电盒负责后续补电；需要更快声画响应时可切换游戏模式。实际续航受音量、降噪、编码和使用方式影响。',
          show: '展示当前电量，再在节奏或动作游戏中切换音乐模式与游戏模式，不承诺所有手机达到同一延迟。',
          say: '“耳机负责长时间单次使用，充电盒负责后续补电，游戏模式则优先更快响应。”',
          spec: '单次约 12.5 小时 · 搭配充电盒最长约 41 小时（AAC）· 游戏模式最低约 60ms · Bluetooth 6.0',
          source: '水月雨 PUDDING 官方规格与续航页面；Micro Center PUDDING 培训材料第 6 页'
        },
        app: {
          chapter: 'App 与设备', label: '10 段 PEQ · 双设备', title: '声音、操作和日常设备，由你掌控', kicker: 'MOONDROP APP 与连接',
          subfeatures: [
            { label: '个人调音', text: '10 段参数均衡与 Sound Target ID 支持更精细的个性化。' },
            { label: '调音分享', text: '可在 MOONDROP App 中探索官方与用户分享的调音配置。' },
            { label: '日常控制', text: '可自定义触控与降噪循环，并结合兼容设备使用双设备连接。' }
          ],
          body: '用 10 段参数均衡调整声音，尝试分享调音，并自定义触控。双设备连接方便在手机与电脑之间切换，但不表示两台设备同时混音播放。',
          show: '先在手机蓝牙列表连接 PUDDING，再在 MOONDROP App 内展示 PEQ、分享调音与触控设置，并演示手机和电脑切换。需要重新配对时，按培训指引同时长按左右触控区直至提示音。',
          say: '“声音和操作按喜好设定，手机与电脑之间切换，也不用反复配对。”',
          spec: 'MOONDROP App · 10 段参数均衡 · Sound Target ID · 调音分享 · 自定义控制 · 双设备连接',
          source: '水月雨 PUDDING 官方产品页；Micro Center PUDDING 培训材料第 6、7 页'
        }
      },
      gallery: [
        { title: '三色完整产品组合', meta: '产品 · 三种配色' },
        { title: '三色错落摆放', meta: '产品 · 三种配色' },
        { title: '三色正面阵列', meta: '产品 · 三种配色' },
        { title: '三色透明充电盒', meta: '产品 · 三种配色' },
        { title: '黄色款产品图', meta: '产品 · 黄色' },
        { title: '浅色款产品图', meta: '产品 · 浅色' },
        { title: '深色款产品图', meta: '产品 · 深色' },
        { title: '耳机面板与耳塞细节', meta: '细节 · 耳机外观' },
        { title: '三色充电盒俯视', meta: '产品 · 三种配色' },
        { title: '三色正面对比', meta: '产品 · 三种配色' },
        { title: '俯拍产品构图', meta: '产品 · 三种配色' },
        { title: '透明上盖细节', meta: '细节 · 充电盒' }
      ]
    }
  };

  const portalLanguagePacks = {
    en: {
      hubKicker: 'MOONDROP · PUDDING', hubTitle: 'PUDDING',
      hubIntro: 'A real-time adaptive ANC TWS for commuting, focus, calls, and multi-device daily use.',
      hubMenuKicker: 'CHOOSE A TOPIC', sectionClose: 'Back to PUDDING training',
      sections: {
        core: { tag: 'SELL', title: 'Core Selling Points', subtitle: 'Customer benefits, demonstrations, and key proof' },
        comparison: { tag: 'POSITION', title: 'Product Positioning', subtitle: 'Who it fits and how it compares' },
        support: { tag: 'OWNERSHIP', title: 'Package & After-sales', subtitle: 'Package contents and warranty periods' },
        reviews: { tag: 'REVIEWS', title: 'Media Reviews', subtitle: 'Real reviews, one click away' },
        gallery: { tag: 'ASSETS', title: 'HD Image Library', subtitle: 'Design, colorways, and product details' }
      },
      boards: {
        comparison: { kicker: '', title: 'Product Positioning', introTitle: 'Know what the customer is comparing.', intro: 'Ask what the customer uses now, then answer with one clear difference and one proof point.' },
        support: { kicker: 'PACKAGE & WARRANTY', title: 'Package & After-sales', introTitle: 'Product and charging cases', intro: 'Use the verified list below for the complete standard package. Paper documents and service cards can vary by region or batch.', packageLabel: 'IN THE BOX', packageTitle: 'Standard package contents', warrantyLabel: 'WARRANTY', warrantyTitle: 'Warranty periods', exclusions: 'WHEN SERVICE IS REQUESTED' },
        reviews: { kicker: '', title: 'Media Reviews', introTitle: 'Real reviews, one click away', intro: '', open: 'Open full review ↗' }
      }
    },
    zh: {
      hubKicker: 'MOONDROP · PUDDING / 布丁', hubTitle: 'PUDDING',
      hubIntro: '面向通勤、学习、通话与多设备日常的实时自适应降噪真无线耳机。',
      hubMenuKicker: '选择培训内容', sectionClose: '返回 PUDDING 培训',
      sections: {
        core: { tag: '卖点', title: '核心卖点', subtitle: '顾客利益、现场演示与关键证据' },
        comparison: { tag: '定位', title: '产品定位', subtitle: '适合谁，以及应该跟谁比较' },
        support: { tag: '售后', title: '包装与售后', subtitle: '包装清单与保修期限' },
        reviews: { tag: '评测', title: '媒体评测', subtitle: '真实评测，一键直达' },
        gallery: { tag: '素材', title: '高清图库', subtitle: '配色、结构与产品细节' }
      },
      boards: {
        comparison: { kicker: '', title: '产品定位', introTitle: '先听懂顾客在比较什么。', intro: '先问顾客现在使用哪类耳机，再用一个差异和一个证据回答。' },
        support: { kicker: '包装与保修', title: '包装与售后', introTitle: '产品与充电盒', intro: '完整标准包装以清单为准；纸质文件与服务卡可能因地区或批次不同。', packageLabel: '包装内容', packageTitle: '标准包装清单', warrantyLabel: '保修期限', warrantyTitle: '保修期限', exclusions: '顾客提出售后问题时' },
        reviews: { kicker: '', title: '媒体评测', introTitle: '真实评测，一键直达', intro: '', open: '查看完整评测 ↗' }
      }
    }
  };

  return {
    masterView: {
      id: 'master', index: 0, image: 'assets/hd-gallery/overview.jpg',
      alt: 'Complete PUDDING product family with three colorways, open charging cases, and earbuds',
      label: 'PRODUCT OVERVIEW', preset: { x: 0, y: 0, zoom: 1, yaw: 0, pitch: 0 }
    },
    masterHotspots: {
      'adaptive-anc': [20, 42], sound: [79, 51], transparency: [11, 42], calls: [38, 23], battery: [80, 68], app: [55, 66]
    },
    featureViews: {
      'adaptive-anc': { id: 'adaptive-anc', index: 1, label: 'ANC · REAL-TIME ADAPTATION', hotspot: [20, 42], preset: { x: 29, y: 8, zoom: 1.28 } },
      sound: { id: 'sound', index: 2, label: 'SOUND · DRIVER & CODEC', hotspot: [79, 51], preset: { x: -27, y: -1, zoom: 1.28 } },
      transparency: { id: 'transparency', index: 3, label: 'FIT · SEAL & AWARENESS', hotspot: [11, 42], preset: { x: 38, y: 8, zoom: 1.28 } },
      calls: { id: 'calls', index: 4, label: 'CALLS · MICROPHONE PROCESSING', hotspot: [38, 23], preset: { x: 12, y: 27, zoom: 1.28 } },
      battery: { id: 'battery', index: 5, label: 'DAILY · BATTERY & GAMING', hotspot: [80, 68], preset: { x: -29, y: -18, zoom: 1.28 } },
      app: { id: 'app', index: 6, label: 'APP · TUNING & DEVICES', hotspot: [55, 66], preset: { x: -5, y: -16, zoom: 1.28 } }
    },
    featureMedia: {
      'adaptive-anc': {
        en: [
          { image: 'assets/official/en/03.jpg', fit: 'contain', caption: 'Official ANC diagram: real-time monitoring and adaptive compensation.' },
          { image: 'assets/hd-gallery/13-fit-black.jpg', fit: 'contain', caption: 'Original photo: dark PUDDING fitted to an acoustic measurement ear.' }
        ],
        zh: [
          { image: 'assets/official/cn/03-3.jpg', fit: 'contain', caption: '官方降噪示意：实时检测耳内噪声并更新补偿。' },
          { image: 'assets/hd-gallery/13-fit-black.jpg', fit: 'contain', caption: '原图：深色 PUDDING 佩戴于声学测量耳。' }
        ]
      },
      sound: {
        en: [
          { image: 'assets/official/en/06.jpg', fit: 'contain', caption: 'Official driver graphic: 10mm dynamic driver, LHDC and Sound Target ID.' },
          { image: 'assets/hd-gallery/08-driver-detail.png', fit: 'contain', caption: 'Original photo: yellow earbud faceplates and silicone ear tips; not an internal driver diagram.' }
        ],
        zh: [
          { image: 'assets/official/cn/05-6.jpg', fit: 'contain', caption: '官方单元图：10mm 动圈、LHDC 与 Sound Target ID。' },
          { image: 'assets/hd-gallery/08-driver-detail.png', fit: 'contain', caption: '原图：黄色耳机面板与硅胶耳塞，不是内部单元结构图。' }
        ]
      },
      transparency: {
        en: [
          { image: 'assets/official/en/04.jpg', fit: 'contain', caption: 'Official natural-transparency graphic.' },
          { image: 'assets/hd-gallery/14-fit-yellow.jpg', fit: 'contain', caption: 'Original photo: yellow PUDDING fitted to an acoustic measurement ear.' }
        ],
        zh: [
          { image: 'assets/official/cn/04-4.jpg', fit: 'contain', caption: '官方自然通透模式说明图。' },
          { image: 'assets/hd-gallery/14-fit-yellow.jpg', fit: 'contain', caption: '原图：黄色 PUDDING 佩戴于声学测量耳。' }
        ]
      },
      calls: {
        en: [
          { image: 'assets/official/en/10.jpg', fit: 'contain', caption: 'Official AI ENC graphic: NPU-accelerated noise reduction for calls.' }
        ],
        zh: [
          { image: 'assets/official/cn/13-10.jpg', fit: 'contain', caption: '官方 NPU 硬件加速 AI 通话降噪与触控说明图。' }
        ]
      },
      battery: {
        en: [
          { image: 'assets/official/en/12.jpg', fit: 'contain', caption: 'Official battery graphic: about 12.5 hours per charge and up to 41 hours with the case, using AAC at 50% volume.' },
          { image: 'assets/official/en/13.jpg', fit: 'contain', caption: 'Official game-mode graphic: latency down to approximately 60 ms.' },
          { image: 'assets/hd-gallery/09-open-top.jpg', fit: 'contain', caption: 'Original top view: earbuds seated in all three charging cases.' }
        ],
        zh: [
          { image: 'assets/official/cn/07-11.jpg', fit: 'contain', caption: '官方续航与游戏模式图。续航按英文官方说明保守表述为单次约 12.5 小时、搭配充电盒最长约 41 小时，不相加。' },
          { image: 'assets/hd-gallery/09-open-top.jpg', fit: 'contain', caption: '原图：三色充电盒中的耳机俯视图。' }
        ]
      },
      app: {
        en: [
          { image: 'assets/official/en/07.jpg', fit: 'contain', caption: 'Official App interface: second-generation DSP and 10-band parametric EQ.' },
          { image: 'assets/official/en/08.jpg', fit: 'contain', caption: 'Official shared-tuning interface.' },
          { image: 'assets/official/en/14.jpg', fit: 'contain', caption: 'Official overview of MOONDROP App features for PUDDING.' }
        ],
        zh: [
          { image: 'assets/official/cn/10-7.jpg', fit: 'contain', caption: '官方 App 界面：第二代 DSP 与 10 段参数均衡。' },
          { image: 'assets/official/cn/08-8.jpg', fit: 'contain', caption: '官方分享调音界面。' },
          { image: 'assets/official/cn/11-12.jpg', fit: 'contain', caption: '官方 MOONDROP App 功能说明图。' }
        ]
      }
    },
    galleryItems,
    languagePacks,
    portalLanguagePacks
  };
})();
