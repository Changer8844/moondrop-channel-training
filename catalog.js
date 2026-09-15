window.MOONDROP_TRAINING_CATALOG = {
  ui: {
    en: {
      documentTitle: "MOONDROP · Channel Training",
      brandKicker: "CHANNEL TRAINING",
      pageTitle: "Channel\nTraining",
      tagline: "Always in music. Always on the journey.",
      selectCategory: "Select a product category",
      languageLabel: "Choose language",
      home: "Training home",
      close: "Close category",
      available: "Training available",
      openTraining: "Open product training",
      emptyTitle: "No product training available yet.",
      emptyBody: "Please choose another product category.",
      categoryDialog: "Product category training",
      productType: "True wireless stereo"
    },
    zh: {
      documentTitle: "MOONDROP · 渠道培训",
      brandKicker: "渠道培训",
      pageTitle: "渠道\n培训",
      tagline: "自始至终，沉于音乐中。",
      selectCategory: "选择产品分类",
      languageLabel: "选择语言",
      home: "培训首页",
      close: "关闭产品分类",
      available: "培训内容已上线",
      openTraining: "进入产品培训",
      emptyTitle: "暂无可用培训内容",
      emptyBody: "请选择其他产品分类。",
      categoryDialog: "产品分类培训",
      productType: "真无线耳机"
    }
  },
  categories: [
    {
      id: "true-wireless",
      name: { en: "True Wireless", zh: "真无线耳机" },
      description: {
        en: "Wireless freedom with MOONDROP's acoustic character.",
        zh: "在无线体验中延续水月雨的声音表达。"
      },
      image: "assets/categories/true-wireless.jpg",
      imagePosition: "50% 47%",
      featured: true
    },
    {
      id: "wired-in-ear",
      name: { en: "Wired In-Ear", zh: "有线入耳式耳机" },
      description: {
        en: "Acoustic engineering shaped for personal listening.",
        zh: "为个人聆听打造的声学工程。"
      },
      image: "assets/categories/wired-in-ear.jpg",
      imagePosition: "50% 28%"
    },
    {
      id: "headphones",
      name: { en: "Headphones", zh: "头戴式耳机" },
      description: {
        en: "Full-scale drivers, open sound and long-session comfort.",
        zh: "大尺寸单元、开阔听感与长时间佩戴体验。"
      },
      image: "assets/categories/headphones.jpg",
      imagePosition: "15% 52%"
    },
    {
      id: "dac-accessories",
      name: { en: "DAC/AMP & Accessories", zh: "解码耳放与配件" },
      description: {
        en: "Portable decoding, amplification and signal control.",
        zh: "便携解码、耳放与信号链配件。"
      },
      image: "assets/categories/dac-accessories.jpg",
      imagePosition: "82% 48%"
    },
    {
      id: "desktop-digital",
      name: { en: "Desktop & Digital Audio", zh: "桌面与数字音频" },
      description: {
        en: "Listening systems for the desk, studio and living space.",
        zh: "面向桌面、工作室与生活空间的聆听系统。"
      },
      image: "assets/categories/desktop-digital.jpg",
      imagePosition: "84% 48%"
    },
    {
      id: "collaborations",
      name: { en: "Collaborations", zh: "联名系列" },
      description: {
        en: "Acoustic products connected with culture and imagination.",
        zh: "连接声音、文化与想象力的联名产品。"
      },
      image: "assets/categories/collaborations.jpg",
      imagePosition: "50% 38%"
    }
  ],
  products: [
    {
      id: "edge2",
      categoryId: "headphones",
      name: { en: "EDGE2", zh: "羽翼2 EDGE2" },
      type: { en: "Adaptive ANC over-ear headphones", zh: "自适应降噪头戴式耳机" },
      image: "products/edge2/assets/campaign/edge2-category-card-wide.png",
      imagePosition: "50% 50%",
      imageFit: "cover",
      href: "products/edge2/index.html",
      status: "live"
    },
    {
      id: "mm3a",
      categoryId: "desktop-digital",
      name: { en: "MM3A", zh: "MM3A" },
      type: { en: "3-inch active desktop stereo", zh: "3 英寸有源桌面音箱" },
      image: "products/mm3a/assets/hd-gallery/DSC_2593.jpg",
      imagePosition: "50% 53%",
      imageFit: "cover",
      href: "products/mm3a/index.html",
      status: "live"
    },
    {
      id: "pudding",
      categoryId: "true-wireless",
      name: { en: "PUDDING", zh: "布丁 PUDDING" },
      type: { en: "Adaptive ANC true wireless", zh: "实时自适应降噪真无线耳机" },
      image: "products/pudding/assets/campaign/catalog-cover.jpg",
      imagePosition: "50% 50%",
      imageFit: "cover",
      href: "products/pudding/index.html",
      status: "live"
    },
    {
      id: "space-travel-2",
      categoryId: "true-wireless",
      name: { en: "SPACE TRAVEL 2", zh: "太空漫游 2" },
      type: { en: "True wireless stereo", zh: "真无线耳机" },
      image: "assets/products/space-travel-2-category-card.jpg",
      imagePosition: "50% 43%",
      imageFit: "cover",
      href: "products/space-travel-2/index.html",
      status: "live"
    },
    {
      id: "pill",
      categoryId: "true-wireless",
      name: { en: "PILL", zh: "音乐胶囊 PILL" },
      type: { en: "Open-ear ear-clip wireless", zh: "开放式耳夹式无线耳机" },
      image: "assets/products/pill-red-white-category-card.jpg",
      imagePosition: "50% 55%",
      imageFit: "cover",
      href: "products/pill/index.html",
      status: "live"
    },
    {
      id: "rays",
      categoryId: "wired-in-ear",
      name: { en: "RAYS", zh: "RAYS 光束" },
      type: { en: "USB-C DSP gaming IEM", zh: "USB-C DSP 游戏入耳耳机" },
      image: "products/rays/assets/official/rays-product-angled.jpg",
      imagePosition: "50% 52%",
      imageFit: "cover",
      href: "products/rays/index.html",
      status: "live"
    }
  ]
};

(() => {
  const catalog = window.MOONDROP_TRAINING_CATALOG;
  const ui = {
    de: { documentTitle: 'MOONDROP · Vertriebsschulung', brandKicker: 'VERTRIEBSSCHULUNG', pageTitle: 'Vertrieb\nSchulung', tagline: 'Musik im Mittelpunkt. Bereit für jeden Weg.', selectCategory: 'Produktkategorie wählen', languageLabel: 'Sprache wählen', home: 'Trainingsstart', close: 'Kategorie schließen', available: 'Training verfügbar', openTraining: 'Produktschulung öffnen', emptyTitle: 'Noch keine Produktschulung verfügbar.', emptyBody: 'Bitte eine andere Kategorie wählen.', categoryDialog: 'Produktschulung nach Kategorie', productType: 'True Wireless' },
    es: { documentTitle: 'MOONDROP · Formación comercial', brandKicker: 'FORMACIÓN COMERCIAL', pageTitle: 'Formación\ncomercial', tagline: 'La música en el centro. Siempre en movimiento.', selectCategory: 'Elegir categoría', languageLabel: 'Elegir idioma', home: 'Inicio de formación', close: 'Cerrar categoría', available: 'Formación disponible', openTraining: 'Abrir formación del producto', emptyTitle: 'Aún no hay formación disponible.', emptyBody: 'Elige otra categoría.', categoryDialog: 'Formación por categoría', productType: 'True Wireless' },
    pt: { documentTitle: 'MOONDROP · Treinamento comercial', brandKicker: 'TREINAMENTO COMERCIAL', pageTitle: 'Treinamento\ncomercial', tagline: 'A música no centro. Sempre em movimento.', selectCategory: 'Escolher categoria', languageLabel: 'Escolher idioma', home: 'Início do treinamento', close: 'Fechar categoria', available: 'Treinamento disponível', openTraining: 'Abrir treinamento do produto', emptyTitle: 'Ainda não há treinamento disponível.', emptyBody: 'Escolha outra categoria.', categoryDialog: 'Treinamento por categoria', productType: 'True Wireless' },
    fr: { documentTitle: 'MOONDROP · Formation réseau', brandKicker: 'FORMATION RÉSEAU', pageTitle: 'Formation\nréseau', tagline: 'La musique au centre. Toujours en mouvement.', selectCategory: 'Choisir une catégorie', languageLabel: 'Choisir la langue', home: 'Accueil formation', close: 'Fermer la catégorie', available: 'Formation disponible', openTraining: 'Ouvrir la formation produit', emptyTitle: 'Aucune formation disponible pour le moment.', emptyBody: 'Choisir une autre catégorie.', categoryDialog: 'Formation par catégorie', productType: 'True Wireless' },
    it: { documentTitle: 'MOONDROP · Formazione canale', brandKicker: 'FORMAZIONE CANALE', pageTitle: 'Formazione\ncanale', tagline: 'La musica al centro. Sempre in viaggio.', selectCategory: 'Scegli categoria', languageLabel: 'Scegli lingua', home: 'Home formazione', close: 'Chiudi categoria', available: 'Formazione disponibile', openTraining: 'Apri formazione prodotto', emptyTitle: 'Formazione non ancora disponibile.', emptyBody: 'Scegli un’altra categoria.', categoryDialog: 'Formazione per categoria', productType: 'True Wireless' },
    ru: { documentTitle: 'MOONDROP · Обучение канала', brandKicker: 'ОБУЧЕНИЕ КАНАЛА', pageTitle: 'Обучение\nканала', tagline: 'Музыка в центре. Всегда в пути.', selectCategory: 'Выберите категорию', languageLabel: 'Выберите язык', home: 'Главная обучения', close: 'Закрыть категорию', available: 'Обучение доступно', openTraining: 'Открыть обучение продукта', emptyTitle: 'Обучение пока недоступно.', emptyBody: 'Выберите другую категорию.', categoryDialog: 'Обучение по категориям', productType: 'True Wireless' }
  };
  Object.assign(catalog.ui, ui);

  const navigationUi = {
    en: { skipCategories: 'Skip to categories', categoryWall: 'Product training categories', categoryNavigation: 'Category navigation' },
    zh: { skipCategories: '跳转到产品分类', categoryWall: '产品培训分类', categoryNavigation: '分类导航' },
    de: { skipCategories: 'Zu den Kategorien springen', categoryWall: 'Produktschulungskategorien', categoryNavigation: 'Kategorienavigation' },
    es: { skipCategories: 'Ir a las categorías', categoryWall: 'Categorías de formación de productos', categoryNavigation: 'Navegación de categorías' },
    pt: { skipCategories: 'Ir para as categorias', categoryWall: 'Categorias de treinamento de produtos', categoryNavigation: 'Navegação de categorias' },
    fr: { skipCategories: 'Aller aux catégories', categoryWall: 'Catégories de formation produit', categoryNavigation: 'Navigation des catégories' },
    it: { skipCategories: 'Vai alle categorie', categoryWall: 'Categorie formazione prodotto', categoryNavigation: 'Navigazione categorie' },
    ru: { skipCategories: 'Перейти к категориям', categoryWall: 'Категории обучения продукту', categoryNavigation: 'Навигация по категориям' }
  };
  Object.entries(navigationUi).forEach(([code, values]) => Object.assign(catalog.ui[code] || (catalog.ui[code] = {}), values));

  const categories = {
    'true-wireless': {
      de: ['True Wireless', 'Kabelloser Hörgenuss mit dem akustischen Charakter von MOONDROP.'], es: ['True Wireless', 'Libertad inalámbrica con el carácter acústico de MOONDROP.'], pt: ['True Wireless', 'Liberdade sem fios com a assinatura acústica da MOONDROP.'], fr: ['True Wireless', 'Liberté sans fil avec la signature acoustique de MOONDROP.'], it: ['True Wireless', 'Libertà wireless con la firma acustica di MOONDROP.'], ru: ['True Wireless', 'Беспроводное прослушивание с фирменной акустикой MOONDROP.']
    },
    'wired-in-ear': {
      de: ['Kabelgebundene In-Ears', 'Akustische Präzision für persönliches Hören.'], es: ['In-ear con cable', 'Ingeniería acústica para la escucha personal.'], pt: ['In-ear com fio', 'Engenharia acústica para ouvir com precisão.'], fr: ['Intra-auriculaires filaires', 'Ingénierie acoustique pour l’écoute personnelle.'], it: ['In-ear cablati', 'Ingegneria acustica per l’ascolto personale.'], ru: ['Проводные внутриканальные', 'Точная акустика для персонального прослушивания.']
    },
    headphones: {
      de: ['Kopfhörer', 'Große Treiber, offener Klang und Komfort für lange Sessions.'], es: ['Auriculares', 'Grandes transductores, sonido abierto y comodidad prolongada.'], pt: ['Fones de ouvido', 'Drivers grandes, som aberto e conforto para longas sessões.'], fr: ['Casques', 'Grands transducteurs, son ouvert et confort longue durée.'], it: ['Cuffie', 'Driver di grandi dimensioni, suono ampio e comfort prolungato.'], ru: ['Полноразмерные наушники', 'Крупные излучатели, открытая подача и комфорт на долгие сессии.']
    },
    'dac-accessories': {
      de: ['DAC/AMP & Zubehör', 'Portables Decoding, Verstärkung und Signalsteuerung.'], es: ['DAC/AMP y accesorios', 'Conversión, amplificación y control de señal portátil.'], pt: ['DAC/AMP e acessórios', 'Conversão, amplificação e controle de sinal portátil.'], fr: ['DAC/AMP & accessoires', 'Conversion, amplification et contrôle du signal nomades.'], it: ['DAC/AMP e accessori', 'Conversione, amplificazione e controllo del segnale portatili.'], ru: ['ЦАП/усилители и аксессуары', 'Портативное преобразование, усиление и контроль сигнала.']
    },
    'desktop-digital': {
      de: ['Desktop & Digital Audio', 'Hörsysteme für Schreibtisch, Studio und Wohnraum.'], es: ['Audio de escritorio y digital', 'Sistemas de escucha para escritorio, estudio y hogar.'], pt: ['Áudio de mesa e digital', 'Sistemas de áudio para mesa, estúdio e sala.'], fr: ['Audio de bureau & numérique', 'Systèmes d’écoute pour bureau, studio et intérieur.'], it: ['Audio desktop e digitale', 'Sistemi d’ascolto per scrivania, studio e ambiente domestico.'], ru: ['Настольное и цифровое аудио', 'Системы прослушивания для стола, студии и дома.']
    },
    collaborations: {
      de: ['Kooperationen', 'Akustikprodukte, verbunden mit Kultur und Fantasie.'], es: ['Colaboraciones', 'Productos acústicos unidos a la cultura y la imaginación.'], pt: ['Colaborações', 'Produtos acústicos ligados à cultura e à imaginação.'], fr: ['Collaborations', 'Des produits audio reliés à la culture et à l’imaginaire.'], it: ['Collaborazioni', 'Prodotti acustici tra cultura e immaginazione.'], ru: ['Коллаборации', 'Акустические продукты на стыке культуры и воображения.']
    }
  };
  catalog.categories.forEach((category) => Object.entries(categories[category.id] || {}).forEach(([lang, [name, description]]) => { category.name[lang] = name; category.description[lang] = description; }));

  const productTypes = {
    edge2: { de: 'Over-Ear-Kopfhörer mit adaptivem ANC', es: 'Auriculares circumaurales con ANC adaptativo', pt: 'Fones over-ear com ANC adaptativo', fr: 'Casque circum-aural à ANC adaptatif', it: 'Cuffie over-ear con ANC adattivo', ru: 'Полноразмерные наушники с адаптивным ANC' },
    mm3a: { de: 'Aktives 3-Zoll-Stereosystem', es: 'Estéreo activo de 3 pulgadas', pt: 'Estéreo ativo de 3 polegadas', fr: 'Enceintes stéréo actives 3 pouces', it: 'Stereo attivo da 3 pollici', ru: 'Активная стереосистема с 3-дюймовыми динамиками' },
    pudding: { de: 'True Wireless mit adaptivem ANC', es: 'True Wireless con ANC adaptativo', pt: 'True Wireless com ANC adaptativo', fr: 'True Wireless à ANC adaptatif', it: 'True Wireless con ANC adattivo', ru: 'TWS с адаптивным ANC' },
    'space-travel-2': { de: 'True Wireless Stereo', es: 'Estéreo True Wireless', pt: 'Estéreo True Wireless', fr: 'Stéréo True Wireless', it: 'Stereo True Wireless', ru: 'Стерео True Wireless' },
    pill: { de: 'Kabellose Open-Ear-Ohrbügel', es: 'Open-ear inalámbricos de clip', pt: 'Open-ear sem fios com gancho', fr: 'Open-ear sans fil à clip', it: 'Open-ear wireless ad archetto', ru: 'Открытые беспроводные наушники-клипсы' },
    rays: { de: 'Gaming-In-Ears mit USB-C-DSP', es: 'IEM gaming con DSP USB-C', pt: 'IEM para jogos com DSP USB-C', fr: 'IEM gaming avec DSP USB-C', it: 'IEM gaming con DSP USB-C', ru: 'Игровые внутриканальные наушники с USB-C DSP' }
  };
  catalog.products.forEach((product) => Object.assign(product.type, productTypes[product.id] || {}));
})();
