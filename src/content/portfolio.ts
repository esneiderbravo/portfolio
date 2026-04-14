import type { PortfolioContent } from "@/src/types/portfolio";

export const portfolioContent: PortfolioContent = {
  profile: {
    name: "Esneider Bravo",
    headline: "ESNEIDER BRAVO",
    role: "Senior Fullstack Developer & Systems Architect",
    bio: "Ingeniero de software especializado en plataformas financieras. Diseno y escalo productos con foco en arquitectura, rendimiento, confiabilidad y experiencia de usuario.",
    philosophyTitle: "The Philosophy",
    philosophyQuote:
      "Creo en la arquitectura intencional. Cada linea de codigo debe soportar el peso del crecimiento futuro.",
    philosophyBody:
      "He construido y evolucionado sistemas en LendingFront con un enfoque fullstack: frontend React, APIs de negocio, integraciones, automatizacion operativa y estandares de calidad. Mi objetivo constante es convertir complejidad tecnica en productos confiables y medibles.",
    yearsExperience: "8+",
    availability: "Disponible para nuevos proyectos",
    email: "esneiderbravo@gmail.com",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/esneiderbravo" },
      { label: "LinkedIn", href: "https://linkedin.com/in/esneider-bravo" },
    ],
  },
  projects: [
    {
      title: "Marketplace Expansion Platform",
      domain: "FinTech Growth",
      summary:
        "Disene y evolucione una plataforma de onboarding para partners con flujos tipados, validaciones de negocio y automatizacion de elegibilidad.",
      impact: "Aceleracion del onboarding, mejor consistencia entre frontend y APIs y reduccion del esfuerzo operativo.",
    },
    {
      title: "Origination Core API",
      domain: "Lending Core",
      summary:
        "Consolide logica de originacion en APIs versionadas para soportar cambios continuos sin romper integraciones existentes.",
      impact: "Mayor estabilidad en releases, menor riesgo de regresiones y mejor trazabilidad funcional.",
    },
    {
      title: "Loan Servicing Engine",
      domain: "Payments & Servicing",
      summary:
        "Fortaleci servicios de pagos y estados de prestamo con reglas robustas, observabilidad y operaciones criticas seguras.",
      impact: "Mejor trazabilidad operativa, menor tasa de incidencias y mayor confianza en flujos transaccionales.",
    },
  ],
  experiences: [
    {
      company: "LendingFront",
      role: "Senior Software Engineer",
      period: "Jun 2024 – Present",
      current: true,
      bullets: [
        "Developed backend solutions using Python (FastAPI, Django)",
        "Designed scalable REST APIs for financial systems",
        "Applied clean architecture and best practices",
      ],
    },
    {
      company: "LendingFront",
      role: "Integration Team Lead",
      period: "Aug 2023 – Jun 2024",
      bullets: [
        "Aligned Development and QA teams",
        "Ensured high-quality software delivery",
        "Removed bottlenecks and improved processes",
      ],
    },
    {
      company: "LendingFront",
      role: "Software Engineer II",
      period: "Nov 2022 – Oct 2023",
      bullets: [
        "Built backend systems using Python and Flask",
        "Led transition to microservices with Node.js",
        "Managed a team of 3 developers",
        "Optimized SQL queries (MySQL / PostgreSQL)",
        "Implemented CI/CD pipelines with Jenkins and Docker",
      ],
    },
    {
      company: "LendingFront",
      role: "Software Engineer",
      period: "Mar 2021 – Oct 2022",
      bullets: [
        "Developed REST APIs with Node.js",
        "Built applications with Python (Flask)",
        "Improved database performance",
        "Implemented automated testing",
        "Contributed to CI/CD processes",
      ],
    },
    {
      company: "Ladys Confecciones SAS BIC",
      role: "Web Developer",
      period: "Aug 2020 – Mar 2021",
      bullets: [
        "Built e-commerce marketplace with PHP & Laravel",
        "Integrated payment gateways",
        "Developed REST APIs",
        "Implemented testing with PHPUnit",
        "Improved frontend performance",
      ],
    },
    {
      company: "Universidad del Magdalena",
      role: "Web Developer",
      period: "Feb 2019 – Aug 2020",
      bullets: [
        "Developed academic web systems (PHP, jQuery)",
        "Optimized database performance",
        "Implemented testing frameworks",
        "Worked with Agile methodologies",
        "Documented systems and gathered requirements",
      ],
    },
  ],
  aiStack: [
    {
      name: "AI Coding Assistants",
      items: ["GitHub Copilot", "Cursor", "ChatGPT (GPT-4o)", "Claude (Anthropic)"],
    },
    {
      name: "LLM APIs & Orchestration",
      items: ["OpenAI API", "Anthropic API", "LangChain", "LangGraph"],
    },
    {
      name: "Model Context Protocol",
      items: ["GitHub MCP", "Jira MCP", "PostgreSQL MCP", "Confluence MCP", "Figma MCP"],
    },
    {
      name: "Design & Prototyping",
      items: ["Figma Dev Mode", "FigJam"],
    },
    {
      name: "AI Dev Workflow",
      items: ["OpenSpec CLI", "Artifact-Driven Changes", "Skills", "Agents", "Sub-agents"],
    },
  ],
  skillGroups: [
    {
      name: "Frontend",
      items: ["React.js", "Next.js", "MUI v5", "TypeScript", "Auth0", "Redux", "Webpack", "Formik", "Recharts", "jQuery", "HTML5", "CSS3"],
    },
    {
      name: "Backend & Languages",
      items: ["Python (FastAPI, Django, Flask)", "SQLAlchemy", "Alembic", "Celery", "Marshmallow", "Node.js", "PHP (Laravel)"],
    },
    {
      name: "Data & Messaging",
      items: ["PostgreSQL", "MySQL", "Redis", "Kafka", "AWS S3", "Elastic APM", "Snowflake", "Fivetran", "Looker", "dbt"],
    },
    {
      name: "Cloud & DevOps",
      items: ["AWS", "Docker", "Jenkins", "Ansible", "GitHub Actions", "Kubernetes"],
    },
    {
      name: "APIs & Architecture",
      items: ["REST APIs", "GraphQL", "Microservices", "Distributed Systems"],
    },
    {
      name: "Integrations",
      items: ["Salesforce", "Twilio", "Sendgrid", "Rollbar", "Plaid", "Looker"],
    },
  ],
  coreCapabilities: [
    "Clean Architecture",
    "SOLID Principles",
    "Test-Driven Development (TDD)",
    "System Design (Scalable Systems)",
    "SQL Query Optimization",
    "Scalable API Design",
    "Performance Tuning",
    "Observability & Monitoring",
    "AI-First Architectures",
    "AI Integration in Microservices",
    "Technical Leadership",
    "Code Reviews",
    "Mentoring",
    "Agile / Scrum",
    "Multidisciplinary Team Leadership",
  ],
};

