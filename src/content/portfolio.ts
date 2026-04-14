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
  techGroups: [
    {
      name: "Frontend",
      // Evidence: marketplaceportal/app/src/package.json (React 18, MUI v5, Auth0, Recharts, Formik, react-router-dom, Webpack)
      items: ["React 18", "MUI v5", "Auth0", "Redux", "Webpack", "Formik", "Recharts"],
    },
    {
      name: "Backend",
      // Evidence: originationservice, loanservice, marketplace_service, decisionservice requirements.txt
      items: ["Python", "Flask", "FastAPI", "SQLAlchemy", "GraphQL", "Alembic", "Celery"],
    },
    {
      name: "Data & Messaging",
      // Evidence: 25 repos with Redis, 21 with Kafka, 21 with PostgreSQL, boto3 S3 across 24 repos
      items: ["PostgreSQL", "Redis", "Kafka", "AWS S3", "Elastic APM"],
    },
    {
      name: "Cloud & DevOps",
      // Evidence: Docker in 24 repos, Jenkins in 24 workflows, Ansible in 18, Kubernetes in .yml files
      items: ["AWS", "Docker", "Jenkins", "Ansible", "GitHub Actions", "Kubernetes"],
    },
    {
      name: "Integrations",
      // Evidence: salesforce in 15 repos, twilio in 13, sendgrid in 5, rollbar in 19, plaid in marketplaceportal
      items: ["Salesforce", "Twilio", "Sendgrid", "Rollbar", "Plaid", "Looker"],
    },
  ],
};

