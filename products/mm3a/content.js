// Source-led MM3A copy. The supplied training deck is the primary reference.
window.MM3A_DATA = (() => {
  const source = (pages) => `Micro Center MM3A training, 2026-09-02, pp. ${pages}`;
  const zhSource = (pages) => `Micro Center MM3A 培训材料，2026-09-02，第 ${pages} 页`;
  const company = 'MOONDROP company and product introduction, 2026-08-06, p. 71';
  const zhCompany = '水月雨企业及产品介绍 260806，第 71 页';
  const stories = [
    {
      id: 'drivers', accent: 'lime', position: { x: 31.6, y: 37.6 }, focus: { x: 31.6, y: 37.6, zoom: 1.4 },
      chapter: 'Two-way sound', label: 'Silk dome + aluminum cone', title: 'Hear the voice and the instruments separately', kicker: 'TWO-WAY DRIVERS',
      body: 'A dedicated tweeter handles the upper frequencies, while the woofer covers the lower range. Start with a familiar vocal recording so the customer can listen for the voice, cymbals, and bass rather than judge by driver size alone.',
      subfeatures: [{ label: 'High frequencies', text: 'A 0.65-inch silk-dome tweeter handles the upper range.' }, { label: 'Lower frequencies', text: 'A 3-inch aluminum-cone woofer works with the tweeter as a two-way system.' }],
      show: 'Point out the small upper tweeter and larger lower woofer. Play a familiar vocal track at a comfortable level, with both speakers at the same distance from the listener.',
      say: '“The small upper driver and the larger lower driver divide the work. Listen to how the voice sits separately from the instruments.”',
      spec: '0.65-inch silk-dome tweeter · 3-inch aluminum-cone woofer · two-way design', source: source('4, 6'),
      zh: { chapter: '两分频声音', label: '丝膜高音 + 铝盆低音', title: '听清人声，也听清乐器的层次', kicker: '两分频单元',
        body: '高音单元负责较高频段，低音单元负责较低频段。先用熟悉的人声录音，让顾客听人声、镲片与低音之间的区别，不只看单元尺寸。',
        subfeatures: [{ label: '高频部分', text: '0.65 英寸丝膜球顶高音，负责较高频段。' }, { label: '中低频部分', text: '3 英寸铝盆低音，与高音单元组成两分频系统。' }],
        show: '指出上方小高音和下方大低音，让左右音箱与听者距离接近，再以舒适音量播放熟悉的人声歌曲。',
        say: '“上面的小单元和下面的大单元分工合作，你可以留意人声和伴奏是否容易分辨。”',
        spec: '0.65 英寸丝膜球顶高音 · 3 英寸铝盆低音 · 两分频', source: zhSource('4、6') }
    },
    {
      id: 'bass', accent: 'orange', position: { x: 17.8, y: 55.7 }, focus: { x: 17.8, y: 55.7, zoom: 1.65 },
      chapter: 'Compact bass', label: 'Opposed passive radiators', title: 'More bass support in a compact cabinet', kicker: 'DUAL PASSIVE RADIATORS',
      body: 'The side panels include horizontally opposed passive radiators. Air pressure from the powered woofer moves these unpowered diaphragms, helping the compact cabinet reproduce low frequencies.',
      subfeatures: [{ label: 'What you can see', text: 'The oval side diaphragm is a passive radiator, not another electrically driven woofer.' }, { label: 'Set expectations', text: 'Bass also depends on placement and room acoustics. Keep the radiators clear and try different positions.' }],
      show: 'Point to the side radiator without touching it. Play a track with distinct bass notes, then compare two sensible desk positions at the same volume.',
      say: '“The side radiators help this small cabinet with the bass. We can try the placement at your desk rather than assume one position suits every room.”',
      spec: 'Horizontally opposed dual passive radiators · compact 3-inch system', source: source('4, 6'),
      zh: { chapter: '小箱体低频', label: '水平对置双被动辐射器', title: '小箱体，也有低频设计的配合', kicker: '双被动辐射器',
        body: '箱体侧面配有水平对置的被动辐射器。低音单元引起箱内气压变化，推动这些不直接通电的振膜，帮助小箱体重放低频。',
        subfeatures: [{ label: '看懂侧面结构', text: '椭圆形侧面振膜是被动辐射器，不是另一只通电驱动的低音单元。' }, { label: '建立合理预期', text: '低频仍受摆位和房间影响。侧面保持无遮挡，并试听不同位置。' }],
        show: '指出侧面辐射器，但不要触碰振膜。用低音音符清楚的曲目，在相同音量下比较两种合理桌面摆位。',
        say: '“侧面的被动辐射器帮助小箱体重放低频，摆在你的桌面上时，我们还可以通过调整位置找到更合适的听感。”',
        spec: '水平对置双被动辐射器 · 紧凑 3 英寸系统', source: zhSource('4、6') }
    },
    {
      id: 'desktop', accent: 'cyan', position: { x: 30.9, y: 81 }, focus: { x: 30.9, y: 81, zoom: 1.45 },
      chapter: 'Desktop listening', label: 'Stereo placement + 10° baffle', title: 'Build a listening spot around your screen', kicker: 'NEAR-FIELD STEREO',
      body: 'Place the two speakers on either side of the screen and listen from a centered position. The front baffle has a 10° angle to help aim the drivers toward the listener. Supplied foam pads provide another setup option.',
      subfeatures: [{ label: 'Who it suits', text: 'A desk used for music, video editing, games, and everyday media playback.' }, { label: 'Start with placement', text: 'Keep left and right distances similar. Adjust position and angle before reaching for EQ.' }],
      show: 'Place the powered speaker on the right and the other on the left. Play a centered vocal and move into the listening position; show the supplied foam pads and angled baffle.',
      say: '“The two speakers sit around your screen. Set them up evenly and the voice should appear between them, rather than coming from one corner of the desk.”',
      spec: 'Separate stereo pair · 10° angled front baffle · supplied foam pads', source: source('4, 5, 7, 9'),
      zh: { chapter: '桌面近场', label: '立体声摆位 + 10° 前障板', title: '围绕屏幕，布置你的聆听位置', kicker: '桌面立体声',
        body: '将两只音箱摆在屏幕两侧，从中间位置聆听。前障板采用 10° 倾角，帮助单元朝向听者；随附泡棉垫也可用于摆放调整。',
        subfeatures: [{ label: '适合谁', text: '桌面听音乐、剪视频、玩游戏，以及日常影音播放的用户。' }, { label: '先调整摆位', text: '左右距离尽量接近，先调整位置和角度，再考虑均衡设置。' }],
        show: '右边放主箱，左边放副箱。播放居中的人声，坐到中间聆听，再展示泡棉垫和倾斜的前障板。',
        say: '“两只音箱放在屏幕两侧，距离调整好后，你可以听到人声出现在中间，而不是只从桌子一角传来。”',
        spec: '分体立体声 · 10° 倾斜前障板 · 随附泡棉垫', source: zhSource('4、5、7、9') }
    },
    {
      id: 'monitoring', accent: 'violet', position: { x: 33.5, y: 63.5 },
      chapter: 'Faithful playback', label: 'Flat response + low distortion', title: 'Judge your recording, not an exaggerated sound', kicker: 'TONAL ACCURACY & MONITORING',
      body: 'The manufacturer presents a flat-response design and low-distortion measurements. A balanced reference helps with voice editing, basic mixing, and checking music. It is not a promise of an identical response in every room: desk placement and listening level still matter.',
      subfeatures: [{ label: 'What the charts show', text: 'Frequency response describes the balance between low, mid, and high frequencies. Distortion describes additional components introduced during playback. They are different measurements.' }, { label: 'Built-in power', text: 'The active system is rated at 33 W per channel, 66 W total. No separate amplifier is needed; the rating alone does not establish clean output at every distance.' }],
      show: 'Use a familiar voice recording and a music reference. Compare at a similar volume. Explain the manufacturer’s response and distortion charts, without presenting them as measurements of this desk.',
      say: '“For editing or checking a recording, a balanced sound is useful: you want to hear what is in the source. Let us try your own reference track from the listening position.”',
      spec: 'Flat-response design · low-distortion measurements · 33 W × 2 active system', source: `${source('4, 6, 9')}; ${company}`,
      zh: { chapter: '平直响应与低失真', label: '忠实重放 · 剪辑与监听', title: '判断录音本身，不被夸张音色带偏', kicker: '声音准确性与监听用途',
        body: '厂商资料展示了平直响应设计和低失真测量，适合用作人声剪辑、基础混音及音乐检查的参考。并不代表放进任何房间后都能得到相同曲线，桌面摆位和播放音量仍会影响听感。',
        subfeatures: [{ label: '看懂两类曲线', text: '频响反映低、中、高频之间的平衡；失真反映重放时额外产生的成分，两者不是同一项测量。' }, { label: '自带功放', text: '有源系统额定每声道 33 W、合计 66 W，无需另配功放；不能只凭功率数字承诺任意距离下都能大音量无失真。' }],
        show: '播放熟悉的人声录音和音乐参考曲，以相近音量比较。结合厂商频响与失真图解释，不把实验室曲线说成当前桌面的实测结果。',
        say: '“做剪辑或检查录音时，比较均衡的声音能帮助你判断素材本身。可以用你熟悉的参考曲，在实际聆听位置试一试。”',
        spec: '平直响应设计 · 低失真测量 · 33 W × 2 有源系统', source: `${zhSource('4、6、9')}；${zhCompany}` }
    },
    {
      id: 'inputs', accent: 'blue', position: { x: 66, y: 54.8 },
      chapter: 'Five inputs', label: 'Wired sources + Bluetooth', title: 'Keep your sources connected and switch when needed', kicker: 'INPUTS & DAILY CONTROLS',
      body: 'Coaxial, optical, USB, AUX, and Bluetooth cover different source devices. More than one input can stay connected, but you select one for playback. Bluetooth 6.0 includes LDAC support when the sending device supports it too.',
      subfeatures: [{ label: 'First connection', text: 'With power off, place the powered master on the right and its partner on the left. Connect the supplied Z-DIN4 cable between them, then the power cord. Long-press the rear knob to power on and start at low volume.' }, { label: 'Daily operation', text: 'Turn the rear knob for volume and short-press it to change input. The front indicator identifies the selected mode.' }, { label: 'Wireless pairing', text: 'Use the Pair button beside the knob, then select MM3A in the device’s Bluetooth menu. Check codec support on that device.' }],
      show: 'Connect a computer by USB and a phone by Bluetooth. Switch between the matching inputs, then show the Pair button in the rear-view photograph.',
      say: '“Leave your computer and other sources connected, then select the one you want. LDAC is an option on compatible Bluetooth devices.”',
      spec: 'Coaxial / optical / USB / AUX / Bluetooth · Bluetooth 6.0 · LDAC requires a compatible source', source: source('5–7'),
      zh: { chapter: '五种输入', label: '有线音源 + 蓝牙', title: '设备接好后，按需要切换输入', kicker: '输入与日常操作',
        body: '同轴、光纤、USB、AUX 和蓝牙，适配不同的音源设备。多个输入可以保持连接，但播放时选择其中一路。Bluetooth 6.0 支持 LDAC，发送设备也需要兼容这一编码。',
        subfeatures: [{ label: '初次连接', text: '断电时右侧放主箱、左侧放副箱，用随附 Z-DIN4 线连接两箱，再接电源。长按背面旋钮开机，从低音量开始播放。' }, { label: '日常操作', text: '旋转背面旋钮调音量，短按切换输入；正面指示灯用于辨认当前模式。' }, { label: '无线配对', text: '按旋钮旁的 Pair 按钮，再到设备蓝牙列表选择 MM3A，编码支持需在该设备上确认。' }],
        show: '用 USB 接电脑、蓝牙接手机，切换到对应输入试听，再在背面照片中指出 Pair 按钮。',
        say: '“电脑和其他音源可以先接好，想听哪一路再切换；兼容的蓝牙设备还可以使用 LDAC。”',
        spec: '同轴 / 光纤 / USB / AUX / 蓝牙 · Bluetooth 6.0 · LDAC 需兼容音源', source: zhSource('5–7') }
    },
    {
      id: 'peq', accent: 'lime', position: { x: 66, y: 38.9 },
      hotspotLabel: 'USB · DSP / PEQ',
      chapter: 'Personal tuning', label: 'DSP + app / PC PEQ', title: 'Adjust the tonal balance to your preference', kicker: 'DSP & PARAMETRIC EQ',
      body: 'DSP processes the signal digitally. Parametric EQ lets you choose a frequency region and adjust its level and width, giving more control over tonal balance. These are user-led adjustments, not automatic room calibration.',
      subfeatures: [{ label: 'Where to adjust', text: 'Use USB mode for the tuning workflow shown in the supplied company material. Connect MM3A to the supported app or the official MOONDROP HUB in Chrome / Edge. The marker represents the built-in DSP function, not a button on the cabinet.' }, { label: 'A useful first step', text: 'Select one frequency band and make a small gain change; Q controls the affected bandwidth. Save the starting setting and compare at a similar listening level. EQ does not replace good placement.' }],
      show: 'Open the actual MM3A controls after connection. Demonstrate frequency, gain, and Q with one small adjustment, compare, then restore. The original interface illustration is from the supplied company material, not a live connected-device screenshot.',
      say: '“You can adjust a particular frequency region instead of changing the whole sound at once. We can compare one small adjustment and return to the original setting.”',
      spec: 'Built-in DSP · parametric EQ · MOONDROP app / PC web tuning', source: `${source('5, 6')}; ${company}; hub.moondroplab.tech (MM3A listed)`,
      zh: { chapter: '个性化调音', label: 'DSP + App / PC 参数均衡', hotspotLabel: 'USB · DSP / PEQ', title: '按喜好，调整声音的频段平衡', kicker: 'DSP 与参数均衡',
        body: 'DSP 对声音信号进行数字处理。参数均衡可以选定某个频段，再调整幅度和作用宽度，更细致地改变听感。这是用户主动调节，不是自动房间校准。',
        subfeatures: [{ label: '在哪里调', text: '企业资料展示的是 USB 模式调音。连接 MM3A 后，使用兼容 App，或在 Chrome / Edge 中打开官方 MOONDROP HUB。图上的光点代表箱内 DSP 功能，不是箱体按钮。' }, { label: '第一次怎么试', text: '选定一个频段，小幅调整增益；Q 值控制作用宽度。保留初始设置，以相近音量比较。均衡不能代替合理摆位。' }],
        show: '连接后打开实际的 MM3A 调音界面，演示频率、增益和 Q，只做一项小调整，比较后恢复。配图直接取自企业资料，是原始界面示意，不冒充当前已连接设备的截图。',
        say: '“你可以针对某个频段微调，不用一次改变整个声音。先试一项小调整，不喜欢就回到初始设置。”',
        spec: '内置 DSP · 参数均衡 · MOONDROP App / PC 网页调音', source: `${zhSource('5、6')}；${zhCompany}；hub.moondroplab.tech（已列出 MM3A）` }
    }
  ];
  return {
    product: { name: 'MM3A' },
    features: stories.map(({ zh, ...story }) => story),
    localizedFeatures: { zh: Object.fromEntries(stories.map(story => [story.id, story.zh])) },
    portal: {
      sections: [{id:'core',kind:'core',accent:'lime'},{id:'comparison',kind:'board',accent:'orange'},{id:'support',kind:'board',accent:'cyan'},{id:'reviews',kind:'board',accent:'violet'},{id:'gallery',kind:'gallery',accent:'blue'}],
      campaign: { hero: 'assets/hd-gallery/PHI_0971.jpg', product: 'assets/campaign/product-pair.png' },
      comparisons: {
        en: [
          { title: 'Compared with other compact active speakers', customer: '“What makes this pair fit my desk?”', answer: 'Start with the sources the customer uses. MM3A offers five inputs and user-adjustable PEQ in a compact two-way pair. Compare the actual connections and controls of the alternatives, rather than assuming all similarly priced speakers are the same.', proof: 'Five input types · two-way drivers · user-adjustable PEQ' },
          { title: 'Compared with larger active speakers', customer: '“Would a larger speaker be better?”', answer: 'MM3A suits a desk where cabinet size and near-field listening matter. A larger system may provide more output or deeper bass. Choose by desk space, listening distance, and a level-matched audition; room acoustics affect both.', proof: 'Compact 3-inch format · near-field use · placement matters' },
          { title: 'Compared with passive Hi-Fi speakers', customer: '“Do I need another amplifier?”', answer: 'MM3A includes amplification and source inputs, reducing the separate components needed to start. Passive speakers require a suitable amplifier but offer more freedom to choose or upgrade that amplifier independently.', proof: 'Built-in amplification · right master and left partner · supplied interconnect' },
          { title: 'Compared with a single-box speaker', customer: '“Why have two boxes on the desk?”', answer: 'Separate left and right speakers let you set their spacing around the screen and listen from the center. A single-box system can be easier to place. Demonstrate a centered voice and stereo movement so the customer can decide which arrangement suits the desk.', proof: 'Adjustable left/right spacing · stereo demonstration · placement trade-off' }
        ],
        zh: [
          { title: '对比其他紧凑型有源音箱', customer: '“这对音箱为什么适合我的桌面？”', answer: '先问顾客用哪些音源。MM3A 在紧凑两分频箱体中提供五种输入和可调 PEQ，再逐一对照候选产品的实际接口与操作，不笼统判断同价位产品都一样。', proof: '五种输入 · 两分频单元 · 可调 PEQ' },
          { title: '对比更大尺寸有源音箱', customer: '“是不是买大一点更好？”', answer: 'MM3A 适合重视占地和近场聆听的桌面。更大的系统可能提供更高声压或更深低频，应结合桌面空间、听音距离和同音量试听选择；两者都受房间与摆位影响。', proof: '紧凑 3 英寸系统 · 桌面近场 · 摆位仍重要' },
          { title: '对比传统无源 Hi-Fi 音箱', customer: '“还需要另外买功放吗？”', answer: 'MM3A 内置功放和音源输入，减少入门搭建所需的独立设备。无源音箱需要合适的功放，但可以独立选择或升级功放，适合愿意自行搭配系统的顾客。', proof: '内置功放 · 右主箱 / 左副箱 · 随附连接线' },
          { title: '对比单箱一体式音箱', customer: '“桌上为什么要放两只？”', answer: '独立左右箱可以围绕屏幕调整间距，从中间位置聆听。一体式音箱摆放通常更省事，可以现场比较居中人声和左右移动的声音，让顾客判断哪种布置更适合自己的桌面。', proof: '左右间距可调 · 立体声演示 · 兼顾摆放便利' }
        ]
      },
      support: {
        contentsImage: 'assets/hd-gallery/DSC_2795.jpg', packageImage: 'assets/hd-gallery/DSC_2795.jpg',
        imageAlt: { en: 'MM3A speaker with the supplied foam pads', zh: 'MM3A 音箱与随附泡棉垫' },
        en: { contents: ['MM3A master / partner speaker pair','Z-DIN4 speaker interconnect','Power cord','USB cable','AUX cable','Foam pads','User manual and quick-reference card','Certificate of conformity'], packageNote: 'Photo: speaker and foam pads. The complete package also includes the cables and documents listed here.', periods: [['MM3A main unit','1 year'],['Packaged accessories','90 days']], policy: 'The training guide specifies repair coverage for non-human-induced performance failures within the warranty period. Confirm the applicable terms with the purchase region and sales channel.', exclusions: ['Confirm the purchase date, symptom, and connection setup first.', 'Check for accidental damage, unsuitable voltage, or unauthorized repair before promising coverage.', 'Follow the local channel service process. Do not promise an automatic replacement.'] },
        zh: { contents: ['MM3A 主箱 / 副箱一对','Z-DIN4 主副箱连接线','电源线','USB 线','AUX 线','泡棉垫','用户手册与快速指引卡','合格证'], packageNote: '图中为音箱与泡棉垫，完整包装还包含清单中的线材和文件。', periods: [['MM3A 主机','1 年'],['包装配件','90 天']], policy: '培训材料规定，保修期内非人为性能故障提供维修服务。具体适用条款需向购买地区及销售渠道确认。', exclusions: ['先确认购买日期、故障现象与连接方式。','遇到意外损坏、不适当电压或未经授权的拆修，先确认适用政策，不直接承诺保修。','按当地渠道售后流程处理，不承诺自动换新。'] }
      },
      reviews: [
        { channel: 'Gamesky', title: 'MOONDROP MM3A : Small Speakers That Pack A Punch!', url: 'https://www.youtube.com/watch?v=6kGZEYXcNik', image: 'assets/reviews/gamesky.jpg' },
        { channel: 'Cata Degen', title: 'Moondrop MM3A - WHY BUY ANYTHING ELSE', url: 'https://www.youtube.com/watch?v=5l9w16mSBaU', image: 'assets/reviews/cata-degen.jpg' }
      ]
    }
  };
})();
