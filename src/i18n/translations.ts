export type Locale = 'en' | 'es'

type Translation = {
  nav: {
    home: string
    about: string
    skills: string
    projects: string
    contact: string
    resume: string
    language: string
    ai: string
    experience: string
    education: string
    certifications: string
  }
  hero: {
    availability: string
    role: string
    bio: string
    yearsOfLogic: string
    ctaPrimary: string
    ctaSecondary: string
    metricYears: string
    metricCerts: string
    metricProjects: string
    metricFocus: string
  }
  about: { title: string; quote: string; body: string }
  stack: { kicker: string; title: string }
  projects: {
    title: string
    impactPrefix: string
    summaries: Record<string, string>
    impacts: Record<string, string>
  }
  cta: { title: string; body: string; action: string }
  skills: { title: string; capabilitiesTitle: string; headlineTitle: string }
  footer: { signature: string }
  experience: {
    kicker: string
    present: string
    companies: Record<string, string>
    roles: Record<string, string>
    periods: Record<string, string>
    bullets: Record<string, string[]>
  }
  education: { kicker: string }
  certifications: {
    kicker: string
    issuerLabel: string
    issuedLabel: string
    credentialLabel: string
    titles: Record<string, string>
    issuers: Record<string, string>
  }
  ai: { kicker: string; tagline: string }
  article: {
    writing: string
    heroKicker: string
    heroTitle: string
    heroTitleAccent: string
    heroTitleEnd: string
    heroLead: string
    statArticles: string
    statReads: string
    statRating: string
    topRatedTitle: string
    topRatedTag: string
    searchPlaceholder: string
    sortRecent: string
    sortMostRead: string
    sortTopRated: string
    sortTrending: string
    filterAll: string
    filterUnread: string
    filterRead: string
    allTopics: string
    clearFilters: string
    resultMeta: string
    resultMetaOne: string
    emptyTitle: string
    emptyState: string
    latestBadge: string
    featuredBadge: string
    readBadge: string
    readsLabel: string
    yourVote: string
    starLabel: string
    markRead: string
    markedRead: string
    readArticle: string
    loadMore: string
    viewCv: string
    authorBody: string
    footerNote: string
    backToHome: string
    backToArticles: string
    tocTitle: string
    ratingPrompt: string
    ratingHintPrompt: string
    ratingHintVoted: string
    keepReading: string
    allArticlesLink: string
    minRead: string
    publishedOn: string
  }
}

export const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
      language: 'Language',
      ai: 'AI Stack',
      experience: 'Experience',
      education: 'Education',
      certifications: 'Certifications',
    },
    hero: {
      availability: 'Available for new projects',
      role: 'Senior Software Engineer · Python · FastAPI · AWS · AI-First',
      bio: 'Senior Software Engineer with {years} years building scalable fintech backends and AI-powered platforms. I specialize in Python, FastAPI, microservices, AWS, and clean architecture for high-performance financial applications.',
      yearsOfLogic: 'Years of logic',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'View work',
      metricYears: 'Years shipping',
      metricCerts: 'Certifications',
      metricProjects: 'Case studies',
      metricFocus: 'FinTech & AI',
    },
    about: {
      title: 'The Philosophy',
      quote:
        'I believe in intentional architecture. Every line of code must support the weight of future scale.',
      body: 'In an ecosystem where scalability and efficiency are paramount, a poorly designed backend poses the greatest risk to innovation. I build robust solution engines for fintech and AI products with Python, FastAPI, microservices on AWS, and TDD. At Muno Labs, LendingFront, and Unozero.ai, I have led technical initiatives from conversational AI platforms to cross-functional engineering at scale.',
    },
    stack: { kicker: 'Core ecosystem', title: 'Engineered Toolkit' },
    projects: {
      title: 'Featured projects',
      impactPrefix: 'Impact',
      summaries: {
        'Chatbook AI Platform':
          'Architected and stabilized Chatbook, a conversational AI hospitality assistant using FastAPI, RAG, n8n, and WhatsApp Business API.',
        'Marketplace Expansion Platform':
          'Designed and evolved a partner onboarding platform with typed workflows, business validations, and eligibility automation.',
        'Origination Core API':
          'Consolidated origination logic into versioned APIs to support continuous change without breaking existing integrations.',
        'Loan Servicing Engine':
          'Strengthened payments and loan-state services with robust rules, observability, and safer critical operations.',
      },
      impacts: {
        'Chatbook AI Platform':
          'Production-ready MVP with GCP infrastructure, operational monitoring, and knowledge-driven guest responses.',
        'Marketplace Expansion Platform':
          'Faster onboarding, stronger frontend/API consistency, and reduced operational effort.',
        'Origination Core API':
          'Higher release stability, lower regression risk, and better functional traceability.',
        'Loan Servicing Engine':
          'Better operational traceability, fewer incidents, and stronger confidence in transactional flows.',
      },
    },
    cta: {
      title: 'READY TO BUILD SOMETHING BIG?',
      body: 'Let us talk about your next product, architecture, or modernization initiative.',
      action: 'Start Project',
    },
    skills: {
      title: 'Technical Skills',
      capabilitiesTitle: 'Core Capabilities',
      headlineTitle: 'Short Professional Headline',
    },
    footer: { signature: 'ENGINEERED WITH PRECISION' },
    experience: {
      kicker: 'Work History',
      present: 'Current',
      companies: {},
      roles: {},
      periods: {},
      bullets: {},
    },
    education: { kicker: 'Education' },
    certifications: {
      kicker: 'Certifications',
      issuerLabel: 'Issuer',
      issuedLabel: 'Issued',
      credentialLabel: 'Show credential',
      titles: {
        'Building with the Claude API': 'Building with the Claude API',
        'Claude Code in Action': 'Claude Code in Action',
        'Introduction to Model Context Protocol': 'Introduction to Model Context Protocol',
        'Certificate of completion: Introduction to agent skills':
          'Certificate of Completion: Introduction to Agent Skills',
        'Gen AI User': 'Gen AI User',
        'Introduccion a la gestion de proyectos': 'Introduction to Project Management',
        'Curso de Introduccion a React.js': 'Introduction to React.js Course',
      },
      issuers: {
        Anthropic: 'Anthropic',
        'Tecnologico de Monterrey': 'Monterrey Institute of Technology',
        'Universidad Internacional de La Rioja': 'International University of La Rioja',
      },
    },
    ai: {
      kicker: 'AI-First Architecture',
      tagline: 'Tools, platforms and protocols I use to build and ship AI-powered products.',
    },
    article: {
      writing: 'Writing & sharing',
      heroKicker: '// Engineering blog · community',
      heroTitle: 'Explore, learn and',
      heroTitleAccent: 'rate',
      heroTitleEnd: 'the best.',
      heroLead:
        'Honest notes on Python, FastAPI, AWS and AI-first engineering. Search by topic, mark what you have read and discover what the community rates highest.',
      statArticles: 'Articles',
      statReads: 'Total reads',
      statRating: 'Average rating',
      topRatedTitle: 'Top rated by the community',
      topRatedTag: 'Top 3',
      searchPlaceholder: 'Search by title, description or topic…',
      sortRecent: 'Recent',
      sortMostRead: 'Most read',
      sortTopRated: 'Top rated',
      sortTrending: 'Trending',
      filterAll: 'All',
      filterUnread: 'Unread',
      filterRead: 'Read',
      allTopics: 'All topics',
      clearFilters: 'Clear filters',
      resultMeta: 'Showing {shown} of {matched} articles',
      resultMetaOne: 'Showing 1 of 1 article',
      emptyTitle: 'No results',
      emptyState: 'Try another term or remove a filter.',
      latestBadge: 'New',
      featuredBadge: 'Featured',
      readBadge: 'Read',
      readsLabel: 'reads',
      yourVote: 'Your rating',
      starLabel: '{n} of 5',
      markRead: 'Mark as read',
      markedRead: 'Marked as read',
      readArticle: 'Read article',
      loadMore: 'Load more articles',
      viewCv: 'View CV',
      authorBody:
        'Backend engineer focused on Python, FastAPI and AI-first systems. I write about what I learn building software in production.',
      footerNote: 'Built with markdown, no database.',
      backToHome: 'Back to home',
      backToArticles: 'Back to articles',
      tocTitle: 'In this article',
      ratingPrompt: 'Was this article helpful?',
      ratingHintPrompt: 'Tap a star to rate',
      ratingHintVoted: 'Thanks, you rated {n} of 5',
      keepReading: 'Keep reading',
      allArticlesLink: 'All articles',
      minRead: 'min read',
      publishedOn: 'Published on',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      resume: 'CV',
      language: 'Idioma',
      ai: 'IA Stack',
      experience: 'Experiencia',
      education: 'Educación',
      certifications: 'Certificaciones',
    },
    hero: {
      availability: 'Disponible para nuevos proyectos',
      role: 'Senior Software Engineer · Python · FastAPI · AWS · AI-First',
      bio: 'Ingeniero de software senior con {years} años construyendo backends fintech escalables y plataformas potenciadas por IA. Especializado en Python, FastAPI, microservicios, AWS y arquitectura limpia.',
      yearsOfLogic: 'Años de experiencia',
      ctaPrimary: 'Iniciar proyecto',
      ctaSecondary: 'Ver proyectos',
      metricYears: 'Años entregando',
      metricCerts: 'Certificaciones',
      metricProjects: 'Casos de estudio',
      metricFocus: 'FinTech e IA',
    },
    about: {
      title: 'La Filosofía',
      quote:
        'Creo en la arquitectura intencional. Cada línea de código debe soportar el peso del crecimiento futuro.',
      body: 'En un ecosistema donde la escalabilidad y la eficiencia son clave, un backend mal diseñado es el mayor riesgo para la innovación. Construyo motores de solución para fintech e IA con Python, FastAPI, microservicios en AWS y TDD. En Muno Labs, LendingFront y Unozero.ai he liderado desde plataformas conversacionales hasta iniciativas de ingeniería cross-funcional.',
    },
    stack: { kicker: 'Ecosistema principal', title: 'Toolkit de Ingeniería' },
    projects: {
      title: 'Proyectos destacados',
      impactPrefix: 'Impacto',
      // Featured project summaries and impacts are EN-only by design.
      // Long-form project content is maintained in a single language to avoid translation drift.
      summaries: {},
      impacts: {},
    },
    cta: {
      title: '¿LISTO PARA CONSTRUIR ALGO GRANDE?',
      body: 'Conversemos sobre tu próximo producto, arquitectura o proceso de modernización.',
      action: 'Iniciar Proyecto',
    },
    skills: {
      title: 'Habilidades Técnicas',
      capabilitiesTitle: 'Capacidades Clave',
      headlineTitle: 'Headline Profesional Corta',
    },
    footer: { signature: 'ENGINEERED WITH PRECISION' },
    experience: {
      kicker: 'Historial Laboral',
      present: 'Actual',
      companies: {
        'muno-labs': 'Muno Labs',
        lendingfront: 'LendingFront',
        'lady-confecciones': 'Ladys Confecciones SAS BIC',
        'universidad-magdalena': 'Universidad del Magdalena',
        'unozero-ai': 'Unozero.ai',
      },
      roles: {
        'muno-senior-se': 'Ingeniero de Software Senior',
        'lf-technical-lead': 'Líder Técnico',
        'lf-senior-se': 'Ingeniero de Software Senior',
        'lf-integration-lead': 'Líder de Equipo de Integración',
        'lf-se-ii': 'Ingeniero de Software II',
        'lf-software-engineer': 'Ingeniero de Software',
        'lady-web-developer': 'Desarrollador Web',
        'unimag-web-developer': 'Desarrollador Web',
        'unozero-cto': 'CTO / Arquitecto de Plataforma IA',
      },
      periods: {
        'muno-senior-se': 'Jun 2026 - Actual',
        'lf-technical-lead': 'Jun 2025 - Jun 2026',
        'lf-senior-se': 'Jun 2024 - Jun 2025',
        'lf-integration-lead': 'Ago 2023 - Jun 2024',
        'lf-se-ii': 'Nov 2022 - Oct 2023',
        'lf-software-engineer': 'Mar 2021 - Oct 2022',
        'lady-web-developer': 'Ago 2020 - Mar 2021',
        'unimag-web-developer': 'Feb 2019 - Ago 2020',
        'unozero-cto': 'Nov 2025 - Feb 2026',
      },
      bullets: {
        'muno-senior-se': [
          'Construyo software y plataformas de datos con IA para clientes de fintech, insurtech y salud',
          'Arquitecturo servicios backend escalables con Python, TypeScript y patrones cloud-native',
          'Me integro con equipos de producto en entrega, calidad de código y prácticas de ingeniería AI-first',
        ],
        'lf-technical-lead': [
          'Lideré ingeniería cross-funcional en backend, frontend, QA y producto para entregas de alto impacto',
          'Definí estándares de arquitectura, mentoreé ingenieros e impulsé flujos de desarrollo asistido por IA',
          'Facilité decisiones técnicas, resolución de incidentes y adopción de Spec-Driven Development',
          'Mejoré la colaboración entre Ingeniería, QA y Producto mediante procesos y documentación',
        ],
        'lf-senior-se': [
          'Desarrollé soluciones backend con Python (FastAPI, Django) bajo principios de arquitectura limpia',
          'Diseñé APIs REST escalables para aplicaciones financieras en entornos de producción',
          'Automaticé pipelines CI/CD con GitHub Actions y Docker',
          'Usé PostgreSQL, Redis, AWS y CloudWatch para monitoreo y observabilidad',
        ],
        'lf-integration-lead': [
          'Alineé equipos de Desarrollo y QA para entregas eficientes y de alta calidad',
          'Eliminé cuellos de botella en la entrega y aseguré estándares técnicos en cada iteración',
          'Lideré comunicación cross-funcional a lo largo del ciclo de vida del software',
        ],
        'lf-se-ii': [
          'Construí sistemas backend con Python y Flask; lideré la transición a microservicios en Node.js',
          'Gestioné un equipo de 3 desarrolladores bajo metodologías Agile',
          'Optimicé consultas SQL en MySQL y PostgreSQL; implementé pruebas con Pytest y Nose',
          'Adopté CI/CD con Jenkins y Docker para despliegues más rápidos y confiables',
        ],
        'lf-software-engineer': [
          'Desarrollé APIs REST con Node.js y aplicaciones web con Python y Flask',
          'Optimicé consultas MySQL y PostgreSQL para operaciones de alto tráfico',
          'Implementé pruebas automatizadas con Pytest y Nose',
          'Contribuí al rendimiento frontend con React, jQuery, HTML5 y CSS3',
        ],
        'lady-web-developer': [
          'Lideré el desarrollo del marketplace con PHP y Laravel: catálogo, carrito, pedidos y pagos',
          'Diseñé APIs REST para integración con aplicación móvil',
          'Optimicé consultas MySQL e implementé pruebas automatizadas con PHPUnit',
          'Contribuí a la adopción de CI/CD con Jenkins y Docker',
        ],
        'unimag-web-developer': [
          'Desarrollé sistemas web académicos y administrativos con PHP y jQuery',
          'Optimicé consultas de base de datos e implementé frameworks de pruebas automatizadas',
          'Documenté sistemas y recopilé requisitos de usuarios finales',
          'Entregué funcionalidades usando metodologías Agile',
        ],
        'unozero-cto': [
          'Lideré la arquitectura y entrega de Chatbook, asistente de IA para comunicación hotelera',
          'Construí una plataforma conversacional con FastAPI, pipelines RAG, n8n y WhatsApp Business API',
          'Diseñé infraestructura en GCP: VMs, DNS, políticas de firewall, red y operaciones en producción',
          'Establecí procesos de despliegue, monitoreo y operación para confiabilidad de la plataforma',
        ],
      },
    },
    education: { kicker: 'Educación' },
    certifications: {
      kicker: 'Certificaciones',
      issuerLabel: 'Emisor',
      issuedLabel: 'Emitido',
      credentialLabel: 'Ver credencial',
      titles: {},
      issuers: {},
    },
    ai: {
      kicker: 'Arquitectura AI-First',
      tagline:
        'Herramientas, plataformas y protocolos que uso para construir productos potenciados por IA.',
    },
    article: {
      writing: 'Escribir y compartir',
      heroKicker: '// Blog de ingeniería · comunidad',
      heroTitle: 'Explora, aprende y',
      heroTitleAccent: 'vota',
      heroTitleEnd: 'lo mejor.',
      heroLead:
        'Notas honestas sobre Python, FastAPI, AWS e ingeniería AI-first. Busca por tema, marca lo que ya leíste y descubre lo que la comunidad puntúa más alto.',
      statArticles: 'Artículos',
      statReads: 'Lecturas totales',
      statRating: 'Valoración media',
      topRatedTitle: 'Lo mejor valorado por la comunidad',
      topRatedTag: 'Top 3',
      searchPlaceholder: 'Buscar por título, descripción o tema…',
      sortRecent: 'Recientes',
      sortMostRead: 'Más leídos',
      sortTopRated: 'Mejor puntuados',
      sortTrending: 'Tendencia',
      filterAll: 'Todos',
      filterUnread: 'No leídos',
      filterRead: 'Leídos',
      allTopics: 'Todos los temas',
      clearFilters: 'Limpiar filtros',
      resultMeta: 'Mostrando {shown} de {matched} artículos',
      resultMetaOne: 'Mostrando 1 de 1 artículo',
      emptyTitle: 'Sin resultados',
      emptyState: 'Prueba con otro término o quita algún filtro.',
      latestBadge: 'Nuevo',
      featuredBadge: 'Destacado',
      readBadge: 'Leído',
      readsLabel: 'lecturas',
      yourVote: 'Tu voto',
      starLabel: '{n} de 5',
      markRead: 'Marcar como leído',
      markedRead: 'Marcado como leído',
      readArticle: 'Leer artículo',
      loadMore: 'Cargar más artículos',
      viewCv: 'Ver CV',
      authorBody:
        'Ingeniero backend enfocado en Python, FastAPI y sistemas AI-first. Escribo sobre lo que aprendo construyendo software en producción.',
      footerNote: 'Construido con markdown, sin base de datos.',
      backToHome: 'Volver al inicio',
      backToArticles: 'Volver a artículos',
      tocTitle: 'En este artículo',
      ratingPrompt: '¿Te sirvió este artículo?',
      ratingHintPrompt: 'Toca una estrella para votar',
      ratingHintVoted: 'Gracias, votaste {n} de 5',
      keepReading: 'Sigue leyendo',
      allArticlesLink: 'Todos los artículos',
      minRead: 'min de lectura',
      publishedOn: 'Publicado el',
    },
  },
}
