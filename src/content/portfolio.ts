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
      items: ["React", "Next.js", "TypeScript", "Tailwind", "MUI"],
    },
    {
      name: "Backend",
      items: ["Python", "Flask", "FastAPI", "REST", "GraphQL"],
    },
    {
      name: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis"],
    },
    {
      name: "Cloud & Infrastructure",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
    },
    {
      name: "Tools",
      items: ["Git", "Jira", "Figma", "Postman", "VS Code"],
    },
  ],
};

