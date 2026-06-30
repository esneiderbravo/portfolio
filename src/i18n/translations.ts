export type Locale = 'en' | 'es'

type Translation = {
  nav: {
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
  experience: { kicker: string; present: string }
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
}

export const translations: Record<Locale, Translation> = {
  en: {
    nav: {
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
      bio: 'Senior Software Engineer with 7+ years building scalable fintech backends and AI-powered platforms. I specialize in Python, FastAPI, microservices, AWS, and clean architecture for high-performance financial applications.',
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
    experience: { kicker: 'Work History', present: 'Current' },
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
  },
  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      resume: 'CV',
      language: 'Idioma',
      ai: 'IA Stack',
      experience: 'Experiencia',
      education: 'Educacion',
      certifications: 'Certificaciones',
    },
    hero: {
      availability: 'Disponible para nuevos proyectos',
      role: 'Senior Software Engineer · Python · FastAPI · AWS · AI-First',
      bio: 'Ingeniero de software senior con mas de 7 anos construyendo backends fintech escalables y plataformas potenciadas por IA. Especializado en Python, FastAPI, microservicios, AWS y arquitectura limpia.',
      yearsOfLogic: 'Anos de experiencia',
      ctaPrimary: 'Iniciar proyecto',
      ctaSecondary: 'Ver proyectos',
      metricYears: 'Anos entregando',
      metricCerts: 'Certificaciones',
      metricProjects: 'Casos de estudio',
      metricFocus: 'FinTech e IA',
    },
    about: {
      title: 'La Filosofia',
      quote:
        'Creo en la arquitectura intencional. Cada linea de codigo debe soportar el peso del crecimiento futuro.',
      body: 'En un ecosistema donde la escalabilidad y la eficiencia son clave, un backend mal disenado es el mayor riesgo para la innovacion. Construyo motores de solucion para fintech e IA con Python, FastAPI, microservicios en AWS y TDD. En Muno Labs, LendingFront y Unozero.ai he liderado desde plataformas conversacionales hasta iniciativas de ingenieria cross-funcional.',
    },
    stack: { kicker: 'Ecosistema principal', title: 'Toolkit de Ingenieria' },
    projects: {
      title: 'Proyectos destacados',
      impactPrefix: 'Impacto',
      // Featured project summaries and impacts are EN-only by design.
      // Long-form project content is maintained in a single language to avoid translation drift.
      summaries: {},
      impacts: {},
    },
    cta: {
      title: 'LISTO PARA CONSTRUIR ALGO GRANDE?',
      body: 'Conversemos sobre tu proximo producto, arquitectura o proceso de modernizacion.',
      action: 'Iniciar Proyecto',
    },
    skills: {
      title: 'Habilidades Tecnicas',
      capabilitiesTitle: 'Capacidades Clave',
      headlineTitle: 'Headline Profesional Corta',
    },
    footer: { signature: 'ENGINEERED WITH PRECISION' },
    experience: { kicker: 'Historial Laboral', present: 'Actual' },
    education: { kicker: 'Educacion' },
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
  },
}
