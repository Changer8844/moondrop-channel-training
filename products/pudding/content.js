window.PUDDING_DATA = {
  product: {
    name: 'PUDDING',
    eyebrow: 'MOONDROP · CHANNEL TRAINING',
    strapline: 'Adaptive quiet, personalized sound, and everyday flexibility.',
    intro: 'Real-time adaptive ANC, a 10mm dynamic driver, LHDC, long battery life, and app-based personalization in a compact in-ear TWS.',
    version: 'Training portal · 01'
  },
  colorways: {
    dark: { label: 'Dark', image: 'assets/hd-gallery/07-dark.jpg', alt: 'Dark PUDDING earbuds and charging case' },
    light: { label: 'Light', image: 'assets/hd-gallery/06-light.jpg', alt: 'Light PUDDING earbuds and charging case' },
    yellow: { label: 'Yellow', image: 'assets/hd-gallery/05-yellow.jpg', alt: 'Yellow PUDDING earbuds and charging case' }
  },
  features: [
    {
      id: 'adaptive-anc', chapter: 'Adaptive ANC', label: 'Real-time fit-aware noise control', title: 'Adaptive quiet for changing environments', kicker: 'REAL-TIME ADAPTIVE ANC',
      position: { x: 26, y: 36 }, focus: { x: 26, y: 36, zoom: 1.48 }, accent: 'lime',
      subfeatures: [
        { label: 'Customer benefit', text: 'Helps reduce steady noise on trains, planes, and in air-conditioned offices.' },
        { label: 'How it works', text: 'Continuously monitors in-ear noise and updates ANC compensation for the actual fit.' },
        { label: 'Expectation', text: 'MOONDROP states a maximum depth up to 54 dB; results vary with seal, fit, and environment.' }
      ],
      body: 'PUDDING monitors in-ear noise and adjusts its ANC compensation as the fit changes, helping reduce steady background noise during study, work, and travel. The ear-tip seal still matters.',
      show: 'Fit the correct ear tips, then compare ANC off, ANC on, and transparency against a steady low-frequency background noise.',
      say: '“It keeps checking the noise inside your ear and adjusts the ANC to the way you are actually wearing it.”',
      spec: 'Real-time adaptive ANC · maximum depth up to 54 dB · fit and environment dependent',
      source: 'MOONDROP PUDDING official product page; Micro Center PUDDING training deck, pp. 4 and 10'
    },
    {
      id: 'sound', chapter: 'Sound', label: '10mm driver + LHDC', title: 'Low-distortion sound with personal tuning', kicker: 'DRIVER & HI-RES WIRELESS',
      position: { x: 43, y: 61 }, focus: { x: 43, y: 61, zoom: 1.62 }, accent: 'orange',
      subfeatures: [
        { label: 'Driver', text: '10mm wide-band low-distortion dynamic driver with a titanium-coated dome and N52 magnet.' },
        { label: 'Tuning', text: 'Developed with B&K 5128 measurement and the VDSF target response.' },
        { label: 'Wireless option', text: 'LHDC is available on compatible devices; AAC and SBC remain available elsewhere.' }
      ],
      body: 'A titanium-coated dome and N52 magnet power the 10mm dynamic driver. Low-distortion construction and VDSF target tuning support clear vocals and musical detail; compatible devices can also use LHDC.',
      show: 'Play a familiar vocal-and-drum track at matched volume. If the phone supports LHDC, show the codec setting; otherwise demonstrate with AAC or SBC.',
      say: '“The 10mm driver, low-distortion structure, and measured target tuning work together; compatible phones can also use LHDC.”',
      spec: '10mm dynamic driver · titanium-coated dome · N52 magnet · THD ≤ 0.05% · LHDC on compatible devices',
      source: 'MOONDROP PUDDING official product page; Micro Center PUDDING training deck, pp. 4 and 6'
    },
    {
      id: 'transparency', chapter: 'Fit & awareness', label: 'In-ear seal + natural transparency', title: 'Isolation when needed, awareness when wanted', kicker: 'FIT & TRANSPARENCY',
      position: { x: 70, y: 38 }, focus: { x: 70, y: 38, zoom: 1.5 }, accent: 'cyan',
      subfeatures: [
        { label: 'Secure fit', text: 'An in-ear design and S/M/L ear tips support stability and passive isolation.' },
        { label: 'Natural transparency', text: 'Brings nearby sound back when the customer needs to hear people or announcements.' },
        { label: 'Everyday control', text: 'Wear detection and audible touch feedback support daily operation. Transparency is not a guarantee of traffic safety.' }
      ],
      body: 'The in-ear fit provides the foundation for stability and isolation. Transparency is the quick switch for conversations and announcements without repeatedly removing the earbuds.',
      show: 'Confirm left and right, select the best-sealing ear tips, play music quietly, then switch transparency on while speaking in front of the customer.',
      say: '“The in-ear fit gives you stability and isolation; transparency brings the room back when you need it.”',
      spec: 'In-ear fit · S/M/L ear tips · natural transparency mode · multi-microphone compensation',
      source: 'MOONDROP PUDDING official product page; Micro Center PUDDING training deck, pp. 4 and 9'
    },
    {
      id: 'calls', chapter: 'Calls', label: 'Hardware-accelerated AI ENC', title: 'Help the other person hear your voice more clearly', kicker: 'AI CALL NOISE REDUCTION',
      position: { x: 78, y: 64 }, focus: { x: 78, y: 64, zoom: 1.58 }, accent: 'violet',
      subfeatures: [
        { label: 'Call-side benefit', text: 'Reduces background noise picked up by the microphones during calls.' },
        { label: 'Hardware support', text: 'An NPU accelerates AI environmental-noise processing.' },
        { label: 'Do not confuse', text: 'ANC improves what the wearer hears; AI ENC improves what the other person receives.' }
      ],
      body: 'Hardware-accelerated AI ENC reduces noise in the microphone signal to help the other person understand speech in cafés, on commutes, and in open offices. ANC serves a different purpose: reducing the noise you hear.',
      show: 'Make a real call using the earbud microphone. Keep the background noise and speaking level consistent, then ask the receiving person how clearly they can hear. A phone voice recorder may use a different microphone path.',
      say: '“ANC changes what you hear; AI ENC works on the microphone signal so the other person can hear you more clearly.”',
      spec: 'Hardware-accelerated AI ENC · NPU call-noise processing · real results vary with noise and voice level',
      source: 'MOONDROP PUDDING official product page; Micro Center PUDDING training deck, p. 4'
    },
    {
      id: 'battery', chapter: 'Battery & gaming', label: '12.5h per charge · game mode', title: 'Long sessions with a faster gaming mode', kicker: 'BATTERY & LOW LATENCY',
      position: { x: 59, y: 28 }, focus: { x: 59, y: 28, zoom: 1.46 }, accent: 'blue',
      subfeatures: [
        { label: 'Earbuds', text: 'About 12.5 hours of AAC playback per earbud charge under stated test conditions.' },
        { label: 'With the charging case', text: 'Up to about 41 hours with the case. Tested at 50% volume with AAC.' },
        { label: 'Gaming mode', text: 'Minimum latency is stated at about 60 ms; device and environment affect actual results.' }
      ],
      body: 'Long earbud battery life reduces charging breaks during work or travel. The case recharges the earbuds between sessions; game mode prioritizes faster audiovisual response. Volume, ANC, codec, and usage affect actual battery life.',
      show: 'Show battery status, then switch from music mode to game mode in a rhythm or action game. Do not promise identical latency on every phone.',
      say: '“The earbuds are built for long sessions, the case handles the next charges, and game mode prioritizes a faster response.”',
      spec: 'Approx. 12.5h per charge · up to approx. 41h with case (AAC) · game mode down to approx. 60 ms · Bluetooth 6.0',
      source: 'MOONDROP PUDDING official specification and battery pages; Micro Center PUDDING training deck, p. 6'
    },
    {
      id: 'app', chapter: 'App & devices', label: '10-band PEQ · dual device', title: 'Your sound, controls, and daily devices', kicker: 'MOONDROP APP & CONNECTIVITY',
      position: { x: 30, y: 68 }, focus: { x: 30, y: 68, zoom: 1.56 }, accent: 'lime',
      subfeatures: [
        { label: 'Personal tuning', text: '10-band parametric EQ and Sound Target ID support more precise personalization.' },
        { label: 'Shared profiles', text: 'Official and community tuning profiles can be explored in the MOONDROP App.' },
        { label: 'Daily control', text: 'Customize touch actions and ANC cycling, and use dual-device connection where supported.' }
      ],
      body: 'Personalize the sound with 10-band parametric EQ, explore shared tunings, and customize touch controls. Dual-device connection makes it easier to switch between a phone and computer; it does not mix their audio.',
      show: 'Pair PUDDING in the phone Bluetooth menu, then open its page in the MOONDROP App. Demonstrate PEQ, shared tunings, touch settings, and a switch between phone and computer. For re-pairing, hold both touch areas until the prompt tone, as shown in the training guide.',
      say: '“Set the sound and controls to your taste, then switch between your phone and computer without repeated pairing.”',
      spec: 'MOONDROP App · 10-band parametric EQ · Sound Target ID · shared profiles · custom controls · dual-device connection',
      source: 'MOONDROP PUDDING official product page; Micro Center PUDDING training deck, pp. 6 and 7'
    }
  ],
  comparison: [
    { label: 'Vs wired earphones', text: 'Adds wireless freedom, ANC, transparency, calls, dual-device use, and app control; wired earphones still avoid charging.' },
    { label: 'Vs open-ear earphones', text: 'Prioritizes isolation and ANC, with transparency available when awareness is needed.' },
    { label: 'Vs over-ear ANC', text: 'More compact and pocketable; fit preference still determines the better choice.' },
    { label: 'Vs fixed ANC TWS', text: 'Updates compensation around the actual in-ear noise and seal instead of relying on one fixed setting.' }
  ],
  portal: {
    sections: [
      { id: 'core', kind: 'core', accent: 'lime' },
      { id: 'comparison', kind: 'board', accent: 'orange' },
      { id: 'support', kind: 'board', accent: 'cyan' },
      { id: 'reviews', kind: 'board', accent: 'violet' },
      { id: 'gallery', kind: 'gallery', accent: 'blue' }
    ],
    campaign: {
      hero: 'assets/campaign/hub-hero-black.png',
      portrait: 'assets/hd-gallery/13-fit-black.jpg',
      mark: 'assets/hd-gallery/08-driver-detail.png'
    },
    comparisons: {
      en: [
        { title: 'Compared with wired earphones', customer: '“I already have wired earphones.”', answer: 'PUDDING adds wireless freedom, automatic reconnection, ANC, transparency, AI call noise reduction, dual-device use, and app control. A wired earphone still makes sense for someone who does not want to charge and wants to avoid wireless codec or latency limits.', proof: 'Wireless freedom · ANC / transparency · dual device · app control; wired needs no charging' },
        { title: 'Compared with open-ear earphones', customer: '“I want to hear my surroundings all the time.”', answer: 'Open-ear models prioritize continuous awareness. PUDDING prioritizes an in-ear seal and ANC for isolation, then lets the customer switch to transparency when outside sound is needed.', proof: 'Open-ear: always open · PUDDING: seal + ANC + switchable transparency' },
        { title: 'Compared with over-ear ANC', customer: '“I need noise canceling without carrying a large headset.”', answer: 'PUDDING is smaller, pocketable, and easier to use one ear at a time. An over-ear model may still suit someone who dislikes an in-ear seal or mainly listens at a desk.', proof: 'Pocketable · single-ear use · fit preference decides' },
        { title: 'Compared with fixed-setting ANC TWS', customer: '“What does adaptive ANC change?”', answer: 'PUDDING monitors actual in-ear noise and updates compensation to reduce the mismatch a fixed setting can create across different fits. The result still depends on the ear-tip seal and environment.', proof: 'Real-time monitoring · dynamic compensation · seal still matters' }
      ],
      zh: [
        { title: '对比基础有线耳机', customer: '“我已经有一副有线耳机。”', answer: 'PUDDING 增加无线自由、自动回连、ANC、通透、AI 通话降噪、双设备和 App 控制；如果顾客不愿充电，或希望避开无线编码与延迟限制，有线耳机仍有价值。', proof: '无线便利 · ANC / 通透 · 双设备 · App；有线无需充电' },
        { title: '对比 OWS / 开放式耳机', customer: '“我希望一直听见环境声音。”', answer: 'OWS 更偏向持续开放感知；PUDDING 通过入耳密封和 ANC 提供更强隔音，需要听见外界时再切换通透。', proof: 'OWS 持续开放；PUDDING 隔音 + ANC + 可切换通透' },
        { title: '对比头戴式降噪耳机', customer: '“我需要降噪，但不想每天带大耳机。”', answer: 'PUDDING 更小、更轻、可放入口袋并支持单耳使用；头戴式可能更适合不接受入耳佩戴或长时间桌面使用的人。', proof: '便携 · 单耳使用；佩戴偏好决定选择' },
        { title: '对比固定参数 ANC 真无线', customer: '“自适应降噪和普通 ANC 有什么区别？”', answer: 'PUDDING 会结合真实佩戴与耳道噪声更新补偿，目标是减少固定参数在不同佩戴条件下的偏差；实际效果仍取决于密封和环境。', proof: '实时检测 · 动态补偿 · 佩戴密封仍重要' }
      ]
    },
    support: {
      packageImage: 'assets/support/pudding-package-original.jpg',
      contentsImage: 'assets/support/pudding-package-original.jpg',
      imageAlt: {
        en: 'PUDDING retail box, yellow earbuds, charging case and illustrated card',
        zh: 'PUDDING 零售包装盒、黄色耳机、充电盒与插画卡片'
      },
      en: {
        contents: ['PUDDING earbuds and charging case', 'S / M / L ear tips', 'USB-C charging cable', 'User manual', 'Certificate of conformity', 'After-sales card, prompt card and service card'],
        packageNote: 'The photo shows the retail box and product; not every accessory is pictured. Paper items may vary by region or batch; confirm the local retail box.',
        periods: [['PUDDING main unit', '1 year'], ['Charging case', '1 year'], ['Packaged accessories', '90 days']],
        policy: 'For a non-human-induced performance failure within the warranty period, follow the service process that applies in the purchase region and sales channel.',
        exclusions: ['Unauthorized modification, disassembly, or repair', 'Accidental or human-caused damage, including liquid ingress, drops, deformation, or corrosion', 'Expired coverage', 'Force majeure, including fire, earthquake, or flood']
      },
      zh: {
        contents: ['PUDDING 耳机与充电盒', '大 / 中 / 小号耳塞', 'USB-C 充电线', '用户手册', '合格证', '售后卡、提示卡与服务卡'],
        packageNote: '图片展示零售包装与产品，未展示全部配件。纸质文件与卡片组合可能因地区或批次不同，请以当地实物为准。',
        periods: [['PUDDING 主机', '1 年'], ['充电盒', '1 年'], ['包装配件', '90 天']],
        policy: '保修期内出现非人为性能故障时，请按购买地区与销售渠道适用的售后流程处理。',
        exclusions: ['未经授权的改装、拆卸或维修', '进液、跌落、变形、腐蚀等人为或意外损坏', '超过保修期限', '火灾、地震、洪水等不可抗力造成的损坏']
      }
    },
    reviews: [
      { channel: 'The Headphone Show', title: 'A $50 S-Tier True Wireless Earphone??', url: 'https://www.youtube.com/watch?v=OOFdmdHvOKc', image: 'assets/reviews/headphone-show-youtube.jpg' },
      { channel: 'Gamesky', title: '$49 Earbuds That Sound Excellent! : MOONDROP Pudding', url: 'https://www.youtube.com/watch?v=cEdY9TCDdXA', image: 'assets/reviews/gamesky-youtube.jpg' },
      { channel: 'Super* Review', title: 'Their best TWS. But... Moondrop Pudding review', url: 'https://www.youtube.com/watch?v=lkSFPb1piYY', image: 'assets/reviews/super-review-youtube.jpg' },
      { channel: 'ATechReviews', title: 'Moondrop Pudding', url: 'https://www.youtube.com/watch?v=7FYGnkjVrLs', image: 'assets/reviews/atechreviews-youtube.jpg' },
      { channel: 'ian fann', title: 'MOONDROP Pudding True Wireless Earbuds (TWS) | Review', url: 'https://www.youtube.com/watch?v=yIocGSK72x8', image: 'assets/reviews/ian-fann-youtube.jpg' },
      { channel: 'Scarbir', title: 'Moondrop Pudding review: Budget audiophile playground!', url: 'https://www.scarbir.com/tws/moondrop-pudding-review', image: 'assets/reviews/scarbir-review.webp' }
    ]
  }
};
