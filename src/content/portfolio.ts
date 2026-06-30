import type { PortfolioContent } from '@/src/types/portfolio'

export const portfolioContent: PortfolioContent = {
  profile: {
    name: 'Esneider Bravo',
    headline: 'ESNEIDER BRAVO',
    role: 'Senior Software Engineer | Python, FastAPI, AWS | Microservices | AI-First Architect',
    bio: 'Senior Software Engineer specializing in scalable fintech backends, microservices on AWS, and AI-first product delivery with Python, FastAPI, and clean architecture.',
    philosophyTitle: 'The Philosophy',
    philosophyQuote:
      'I believe in intentional architecture. Every line of code must support the weight of future scale.',
    philosophyBody:
      'I build robust backend engines for high-performance financial applications and AI-powered platforms. At Muno Labs, LendingFront, and Unozero.ai, I have led microservices migrations, conversational AI systems, and cross-functional engineering initiatives grounded in TDD and clean architecture.',
    availability: 'Disponible para nuevos proyectos',
    email: 'esneiderbravoyb@gmail.com',
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/esneiderbravo' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/esneider-bravo' },
    ],
  },
  projects: [
    {
      title: 'Chatbook AI Platform',
      domain: 'AI Hospitality',
      summary:
        'Arquitecte y estabilice Chatbook, un asistente conversacional con FastAPI, RAG, n8n y WhatsApp Business API para comunicacion hotelera.',
      impact:
        'MVP llevado a produccion con infraestructura GCP, monitoreo operativo y respuestas contextuales basadas en conocimiento.',
    },
    {
      title: 'Marketplace Expansion Platform',
      domain: 'FinTech Growth',
      summary:
        'Disene y evolucione una plataforma de onboarding para partners con flujos tipados, validaciones de negocio y automatizacion de elegibilidad.',
      impact:
        'Aceleracion del onboarding, mejor consistencia entre frontend y APIs y reduccion del esfuerzo operativo.',
    },
    {
      title: 'Origination Core API',
      domain: 'Lending Core',
      summary:
        'Consolide logica de originacion en APIs versionadas para soportar cambios continuos sin romper integraciones existentes.',
      impact:
        'Mayor estabilidad en releases, menor riesgo de regresiones y mejor trazabilidad funcional.',
    },
    {
      title: 'Loan Servicing Engine',
      domain: 'Payments & Servicing',
      summary:
        'Fortaleci servicios de pagos y estados de prestamo con reglas robustas, observabilidad y operaciones criticas seguras.',
      impact:
        'Mejor trazabilidad operativa, menor tasa de incidencias y mayor confianza en flujos transaccionales.',
    },
  ],
  companyExperiences: [
    {
      id: 'muno-labs',
      company: 'Muno Labs',
      logo: '/logos/muno-labs.png',
      logoAlt: 'Muno Labs logo',
      roles: [
        {
          id: 'muno-senior-se',
          role: 'Senior Software Engineer',
          period: 'Jun 2026 - Present',
          current: true,
          bullets: [
            'Build AI-powered software and data platforms for fintech, insurtech, and healthcare clients',
            'Architect scalable backend services with Python, TypeScript, and cloud-native patterns',
            'Embed with product teams on delivery, code quality, and AI-first engineering practices',
          ],
        },
      ],
    },
    {
      id: 'lendingfront',
      company: 'LendingFront',
      logo: '/logos/lendingfront.png',
      logoAlt: 'LendingFront logo',
      roles: [
        {
          id: 'lf-technical-lead',
          role: 'Technical Lead',
          period: 'Jun 2025 - Jun 2026',
          bullets: [
            'Led cross-functional engineering across backend, frontend, QA, and product for high-impact delivery',
            'Defined architecture standards, mentored engineers, and drove AI-assisted development workflows',
            'Facilitated technical decisions, incident resolution, and Spec-Driven Development adoption',
            'Improved Engineering, QA, and Product collaboration through processes and documentation',
          ],
        },
        {
          id: 'lf-senior-se',
          role: 'Senior Software Engineer',
          period: 'Jun 2024 - Jun 2025',
          bullets: [
            'Developed backend solutions using Python (FastAPI, Django) with clean architecture principles',
            'Designed scalable RESTful APIs for financial applications in production environments',
            'Automated CI/CD pipelines with GitHub Actions and Docker',
            'Used PostgreSQL, Redis, AWS, and CloudWatch for monitoring and observability',
          ],
        },
        {
          id: 'lf-integration-lead',
          role: 'Integration Team Lead',
          period: 'Aug 2023 - Jun 2024',
          bullets: [
            'Aligned Development and QA teams for efficient, high-quality software delivery',
            'Removed delivery bottlenecks and ensured technical standards across iterations',
            'Led cross-functional communication across the full software development lifecycle',
          ],
        },
        {
          id: 'lf-se-ii',
          role: 'Software Engineer II',
          period: 'Nov 2022 - Oct 2023',
          bullets: [
            'Built backend systems with Python and Flask; led transition to Node.js microservices',
            'Managed a team of 3 developers under Agile methodologies',
            'Optimized SQL queries in MySQL and PostgreSQL; implemented Pytest and Nose testing',
            'Adopted CI/CD with Jenkins and Docker for faster, more reliable deployments',
          ],
        },
        {
          id: 'lf-software-engineer',
          role: 'Software Engineer',
          period: 'Mar 2021 - Oct 2022',
          bullets: [
            'Developed RESTful APIs with Node.js and web applications with Python and Flask',
            'Optimized MySQL and PostgreSQL queries for high-traffic operations',
            'Implemented automated testing with Pytest and Nose',
            'Contributed to frontend performance with React, jQuery, HTML5, and CSS3',
          ],
        },
      ],
    },
    {
      id: 'unozero-ai',
      company: 'Unozero.ai',
      logo: '/logos/unozero-ai.png',
      logoAlt: 'Unozero.ai logo',
      roles: [
        {
          id: 'unozero-cto',
          role: 'CTO / AI Platform Architect',
          period: 'Nov 2025 - Feb 2026',
          bullets: [
            'Led architecture and delivery of Chatbook, an AI hospitality assistant for hotel guest communication',
            'Built a conversational platform with FastAPI, RAG pipelines, n8n, and WhatsApp Business API',
            'Designed GCP infrastructure: VMs, DNS, firewall policies, networking, and production operations',
            'Established deployment, monitoring, and operational processes for platform reliability',
          ],
        },
      ],
    },
    {
      id: 'lady-confecciones',
      company: 'Ladys Confecciones SAS BIC',
      logo: '/logos/lady-confecciones.png',
      logoAlt: 'Lady Confecciones logo',
      roles: [
        {
          id: 'lady-web-developer',
          role: 'Web Developer',
          period: 'Aug 2020 - Mar 2021',
          bullets: [
            'Led marketplace development with PHP and Laravel: catalog, cart, orders, and payments',
            'Designed RESTful APIs for mobile app integration',
            'Optimized MySQL queries and implemented PHPUnit automated testing',
            'Contributed to CI/CD adoption with Jenkins and Docker',
          ],
        },
      ],
    },
    {
      id: 'universidad-magdalena',
      company: 'Universidad del Magdalena',
      logo: '/logos/universidad-del-magdalena.png',
      logoAlt: 'Universidad del Magdalena logo',
      roles: [
        {
          id: 'unimag-web-developer',
          role: 'Web Developer',
          period: 'Feb 2019 - Aug 2020',
          bullets: [
            'Developed academic and administrative web systems with PHP and jQuery',
            'Optimized database queries and implemented automated testing frameworks',
            'Documented systems and gathered requirements from end users',
            'Delivered features using Agile methodologies',
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: 'Universidad del Magdalena',
      degree: 'B.S. in Systems Engineering',
      period: '2015 - 2020',
      location: 'Santa Marta, Colombia',
      highlights: [
        'Built a strong base in software architecture, algorithms, and relational databases.',
        'Developed academic web systems with PHP and JavaScript as part of applied projects.',
      ],
    },
  ],
  certifications: [
    {
      name: 'Building with the Claude API',
      issuer: 'Anthropic',
      issued: 'Jun 2026',
      credentialId: 'u75ozqpqrj37',
      credentialUrl: 'https://verify.skilljar.com/c/u75ozqpqrj37',
    },
    {
      name: 'Claude Code in Action',
      issuer: 'Anthropic',
      issued: 'Jun 2026',
      credentialId: 'jef7cto7jspf',
      credentialUrl: 'https://verify.skilljar.com/c/jef7cto7jspf',
    },
    {
      name: 'Introduction to Model Context Protocol',
      issuer: 'Anthropic',
      issued: 'Jun 2026',
      credentialId: 'xtjdsxghsg3p',
      credentialUrl: 'https://verify.skilljar.com/c/xtjdsxghsg3p',
    },
    {
      name: 'Certificate of completion: Introduction to agent skills',
      issuer: 'Anthropic',
      issued: 'Jun 2026',
      credentialId: 'witt7jffq6tu',
      credentialUrl: 'https://verify.skilljar.com/c/witt7jffq6tu',
    },
    {
      name: 'Gen AI User',
      issuer: 'Certiprof',
      issued: 'May 2026',
      credentialUrl:
        'https://www.credly.com/badges/45870334-71fc-48e0-b920-2d105dedd44d/linked_in_profile',
    },
    {
      name: 'Introduccion a la gestion de proyectos',
      issuer: 'Tecnologico de Monterrey',
      issued: 'Oct 2025',
      credentialId: 'R4U3AU9QFVY7',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/R4U3AU9QFVY7',
    },
    {
      name: 'Lifelong Learning 2025',
      issuer: 'Certiprof',
      issued: 'Aug 2025',
      credentialUrl:
        'https://www.credly.com/badges/a02000d7-7513-4d0f-9beb-969465563024/linked_in_profile',
    },
    {
      name: 'Introduction to Docker',
      issuer: 'Google',
      issued: 'Mar 2024',
      credentialId: 'aaf7e06444bd0fe1aec455d960b7c891',
      credentialUrl: 'https://coursera.org/share/aaf7e06444bd0fe1aec455d960b7c891',
    },
    {
      name: 'Preparation Certification AZ900: Microsoft Azure Fundamentals',
      issuer: 'Universidad Internacional de La Rioja',
      issued: 'Oct 2022',
    },
    {
      name: 'Curso de Introduccion a React.js',
      issuer: 'Platzi',
      issued: 'Feb 2023',
      credentialId: 'bb33d01a-a018-46f7-950d-0c2ed8026abc',
      credentialUrl: 'https://platzi.com/p/esneiderbravoyb/curso/2444-react/diploma/detalle/',
    },
    {
      name: 'Scrum Foundation Professional Certificate - SFPC',
      issuer: 'Certiprof',
      issued: 'Feb 2023',
      credentialUrl:
        'https://www.credly.com/badges/6ac40dbc-278e-49ec-bab1-beaabed96e6e/linked_in_profile',
    },
    {
      name: 'Remote Work Professional Certification - RWPC',
      issuer: 'Certiprof',
      issued: 'Apr 2023',
      credentialUrl:
        'https://www.credly.com/badges/8374a564-1624-42fa-9340-f9e6725be05a/linked_in_profile',
    },
    {
      name: 'EF SET English Certificate 51/100 (B2 Upper Intermediate)',
      issuer: 'EF SET',
      issued: '2023',
      credentialUrl: 'https://www.efset.org/cert/JgA6mE',
    },
  ],
  aiStack: [
    {
      name: 'AI Coding Assistants',
      items: [
        'Claude Code',
        'Claude Code Commands',
        'Claude Code Hooks',
        'Claude.md',
        'GitHub Copilot',
        'Cursor',
        'ChatGPT (GPT-4o)',
      ],
    },
    {
      name: 'LLM APIs & Orchestration',
      items: ['OpenAI API', 'Anthropic API', 'LangChain', 'LangGraph'],
    },
    {
      name: 'Model Context Protocol',
      items: ['GitHub MCP', 'Jira MCP', 'PostgreSQL MCP', 'Confluence MCP', 'Figma MCP'],
    },
    {
      name: 'Design & Prototyping',
      items: ['Figma Dev Mode', 'FigJam'],
    },
    {
      name: 'AI Dev Workflow',
      items: ['OpenSpec CLI', 'Artifact-Driven Changes', 'Skills', 'Agents', 'Sub-agents'],
    },
  ],
  skillGroups: [
    {
      name: 'Frontend',
      items: [
        'React.js',
        'Next.js',
        'MUI v5',
        'TypeScript',
        'Auth0',
        'Redux',
        'Webpack',
        'Formik',
        'Recharts',
        'jQuery',
        'HTML5',
        'CSS3',
      ],
    },
    {
      name: 'Backend & Languages',
      items: [
        'Python (FastAPI, Django, Flask)',
        'SQLAlchemy',
        'Alembic',
        'Celery',
        'Marshmallow',
        'Node.js',
        'PHP (Laravel)',
      ],
    },
    {
      name: 'Data & Messaging',
      items: [
        'PostgreSQL',
        'MySQL',
        'Redis',
        'Kafka',
        'AWS S3',
        'Elastic APM',
        'Snowflake',
        'Fivetran',
        'Looker',
        'dbt',
      ],
    },
    {
      name: 'Cloud & DevOps',
      items: [
        'AWS',
        'Google Cloud Platform',
        'Docker',
        'Jenkins',
        'Ansible',
        'GitHub Actions',
        'Kubernetes',
      ],
    },
    {
      name: 'APIs & Architecture',
      items: ['REST APIs', 'GraphQL', 'Microservices', 'Distributed Systems'],
    },
    {
      name: 'Integrations',
      items: ['Salesforce', 'Twilio', 'Sendgrid', 'Rollbar', 'Plaid', 'Looker'],
    },
  ],
  coreCapabilities: [
    'Clean Architecture',
    'SOLID Principles',
    'Test-Driven Development (TDD)',
    'System Design (Scalable Systems)',
    'SQL Query Optimization',
    'Scalable API Design',
    'Performance Tuning',
    'Observability & Monitoring',
    'AI-First Architectures',
    'AI Integration in Microservices',
    'Technical Leadership',
    'Code Reviews',
    'Mentoring',
    'Agile / Scrum',
    'Multidisciplinary Team Leadership',
  ],
}
