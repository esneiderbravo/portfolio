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
  hero: { availability: string; role: string; bio: string; yearsOfLogic: string }
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
      role: 'Senior Backend Engineer · Python · FastAPI · AWS',
      bio: 'Senior Software Engineer with 8+ years building scalable fintech platforms. Specializing in Python, FastAPI, microservices, and AWS — shipping systems that combine performance, reliability, and AI-first thinking.',
      yearsOfLogic: 'Years of logic',
    },
    about: {
      title: 'The Philosophy',
      quote:
        'I believe in intentional architecture. Every line of code must support the weight of future scale.',
      body: 'I have built and evolved distributed systems at LendingFront — designing Python microservices with FastAPI and Flask, scalable REST APIs, Kafka-driven pipelines, and React frontends. My constant objective is transforming technical complexity into reliable, measurable products deployable on AWS at scale.',
    },
    stack: { kicker: 'Core ecosystem', title: 'Engineered Toolkit' },
    projects: {
      title: 'Featured projects',
      impactPrefix: 'Impact',
      summaries: {
        'Marketplace Expansion Platform':
          'Designed and evolved a partner onboarding platform with typed workflows, business validations, and eligibility automation.',
        'Origination Core API':
          'Consolidated origination logic into versioned APIs to support continuous change without breaking existing integrations.',
        'Loan Servicing Engine':
          'Strengthened payments and loan-state services with robust rules, observability, and safer critical operations.',
      },
      impacts: {
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
        'Introduccion a la gestion de proyectos': 'Introduction to Project Management',
        'Curso de Introduccion a React.js': 'Introduction to React.js Course',
      },
      issuers: {
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
      role: 'Senior Fullstack Developer & Systems Architect',
      bio: 'Ingeniero de software especializado en plataformas financieras. Diseno y escalo productos con foco en arquitectura, rendimiento, confiabilidad y experiencia de usuario.',
      yearsOfLogic: 'Anos de experiencia',
    },
    about: {
      title: 'La Filosofia',
      quote:
        'Creo en la arquitectura intencional. Cada linea de codigo debe soportar el peso del crecimiento futuro.',
      body: 'He construido y evolucionado sistemas en LendingFront con un enfoque fullstack: frontend React, APIs de negocio, integraciones, automatizacion operativa y estandares de calidad. Mi objetivo constante es convertir complejidad tecnica en productos confiables y medibles.',
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
