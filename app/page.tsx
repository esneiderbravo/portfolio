"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { portfolioContent } from "@/src/content/portfolio";
import { translations, type Locale } from "@/src/i18n/translations";

const GROUP_ORDER = [
  "Frontend",
  "Backend & Languages",
  "Data & Messaging",
  "Cloud & DevOps",
  "APIs & Architecture",
  "Integrations",
];

export default function HomePage() {
  const { profile, projects, experiences, skillGroups, aiStack, coreCapabilities } = portfolioContent;
  const [firstName, ...lastNameParts] = profile.headline.split(" ");
  const lastName = lastNameParts.join(" ");
  const [locale, setLocale] = useState<Locale>("en");
  const t = useMemo(() => translations[locale], [locale]);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expIndex, setExpIndex] = useState(0);

  useEffect(() => {
    const sections: { id: string; activeKey: string }[] = [
      { id: "home", activeKey: "about" },
      { id: "about", activeKey: "about" },
      { id: "ai", activeKey: "ai" },
      { id: "skills", activeKey: "skills" },
      { id: "experience", activeKey: "experience" },
      { id: "projects", activeKey: "projects" },
    ];
    const keyById = new Map(sections.map((section) => [section.id, section.activeKey]));
    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          visibleRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let nextActiveKey = "about";
        let bestRatio = 0;
        for (const section of sections) {
          const ratio = visibleRatios.get(section.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextActiveKey = keyById.get(section.id) ?? nextActiveKey;
          }
        }

        if (bestRatio > 0) {
          setActiveSection((current) => (current === nextActiveKey ? current : nextActiveKey));
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const socialIcons: Record<string, string> = {
    github: "terminal",
    linkedin: "hub",
    email: "mail",
  };

  const itemIcons: Record<string, string> = {
    // ── Frontend ──────────────────────────────────────────────────────────────
    "react 18": "deployed_code",
    "react.js": "deployed_code",
    react: "deployed_code",
    "mui v5": "palette",
    "material ui": "palette",
    auth0: "lock",
    redux: "account_tree",
    webpack: "build",
    formik: "edit_note",
    recharts: "bar_chart",
    jquery: "javascript",
    html5: "html",
    css3: "css",
    typescript: "data_object",
    tailwind: "style",
    "framer motion": "animation",
    "next.js": "rocket_launch",
    // ── Backend & Languages ────────────────────────────────────────────────────
    python: "code",
    "python (fastapi, django, flask)": "code",
    flask: "local_drink",
    fastapi: "flash_on",
    django: "dns",
    "node.js": "dns",
    "php (laravel)": "terminal",
    sqlalchemy: "table",
    alembic: "history",
    graphql: "schema",
    celery: "pending_actions",
    marshmallow: "transform",
    // ── Data & Messaging ──────────────────────────────────────────────────────
    postgresql: "database",
    mysql: "database",
    redis: "bolt",
    kafka: "stream",
    "aws s3": "cloud_upload",
    "elastic apm": "monitor_heart",
    // ── Cloud & DevOps ────────────────────────────────────────────────────────
    aws: "cloud",
    docker: "package_2",
    jenkins: "build",
    ansible: "settings_suggest",
    "github actions": "deployed_code",
    kubernetes: "hub",
    "ci/cd pipelines": "sync_alt",
    "ci/cd": "sync_alt",
    // ── APIs & Architecture ───────────────────────────────────────────────────
    "rest apis": "api",
    "rest": "api",
    microservices: "widgets",
    "distributed systems": "hub",
    // ── Integrations ──────────────────────────────────────────────────────────
    salesforce: "handshake",
    twilio: "call",
    sendgrid: "mail",
    rollbar: "error",
    plaid: "account_balance",
    looker: "bar_chart",
    // ── Engineering Skills / Capabilities ─────────────────────────────────────
    "clean architecture": "architecture",
    "solid principles": "rule",
    "test-driven development (tdd)": "check_circle",
    "system design (scalable systems)": "schema",
    "sql query optimization": "query_stats",
    "scalable api design": "lan",
    "performance tuning": "speed",
    "observability & monitoring": "monitoring",
    "ai-first architectures": "psychology",
    "ai integration in microservices": "smart_toy",
    "technical leadership": "groups",
    "code reviews": "rate_review",
    mentoring: "school",
    "agile / scrum": "sprint",
    "multidisciplinary team leadership": "diversity_3",
    // ── Tools (fallback) ──────────────────────────────────────────────────────
    git: "terminal",
    jira: "checklist",
    figma: "design_services",
    postman: "send",
    "vs code": "code",
    // ── AI Assistants ──────────────────────────────────────────────────────────
    "github copilot": "auto_awesome",
    "cursor": "code_blocks",
    "chatgpt (gpt-4o)": "psychology",
    "claude (anthropic)": "smart_toy",
    // ── LLM & Orchestration ───────────────────────────────────────────────────
    "openai api": "developer_mode",
    "anthropic api": "memory",
    "langchain": "link",
    "langgraph": "schema",
    // ── MCPs ─────────────────────────────────────────────────────────────────
    "github mcp": "hub",
    "jira mcp": "checklist",
    "postgresql mcp": "database",
    "confluence mcp": "article",
    "figma mcp": "design_services",
    // ── Data Intelligence ─────────────────────────────────────────────────────
    "snowflake": "ac_unit",
    "fivetran": "cable",
    "dbt": "transform",
    // ── AI Dev Workflow ───────────────────────────────────────────────────────
    "openspec cli": "terminal",
    "artifact-driven changes": "checklist",
    "opsx:propose": "edit_document",
    "opsx:apply": "build_circle",
    "opsx:verify": "verified",
    "skills": "school",
    "agents": "smart_toy",
    "sub-agents": "group_work",
    // ── Design ────────────────────────────────────────────────────────────────
    "figma dev mode": "developer_board",
    "figjam": "gesture",
  };

  const getIcon = (value: string, fallback = "code") =>
    itemIcons[value.toLowerCase()] ?? fallback;

  const groupIcon: Record<string, string> = {
    Frontend: "layers",
    "Backend & Languages": "dns",
    "Data & Messaging": "database",
    "Cloud & DevOps": "cloud",
    "APIs & Architecture": "api",
    Integrations: "handshake",
  };

  const aiGroupIcon: Record<string, string> = {
    "AI Coding Assistants": "auto_awesome",
    "LLM APIs & Orchestration": "psychology",
    "Model Context Protocol": "extension",
    "Data Intelligence": "analytics",
    "Design & Prototyping": "design_services",
    "AI Dev Workflow": "workflow",
  };

  const mergedGroups = useMemo(
    () => [...skillGroups].sort((a, b) => GROUP_ORDER.indexOf(a.name) - GROUP_ORDER.indexOf(b.name)),
    [skillGroups]
  );

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">ESNEIDERBRAVO.DEV</div>
          <div className="nav-links">
            <a href="#home" onClick={() => setActiveSection("about")} className={activeSection === "about" ? "active" : ""}>{t.nav.about}</a>
            <a href="#ai" onClick={() => setActiveSection("ai")} className={activeSection === "ai" ? "active" : ""}>{t.nav.ai}</a>
            <a href="#skills" onClick={() => setActiveSection("skills")} className={activeSection === "skills" ? "active" : ""}>{t.nav.skills}</a>
            <a href="#experience" onClick={() => setActiveSection("experience")} className={activeSection === "experience" ? "active" : ""}>{t.experience.title}</a>
            <a href="#projects" onClick={() => setActiveSection("projects")} className={activeSection === "projects" ? "active" : ""}>{t.nav.projects}</a>
          </div>
          <label className="locale-selector" aria-label={t.nav.language}>
            <span>{t.nav.language}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </label>
          <button
            className={`hamburger${mobileMenuOpen ? " open" : ""}`}
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          <a href="#home" onClick={() => { setActiveSection("about"); setMobileMenuOpen(false); }} className={activeSection === "about" ? "active" : ""}>{t.nav.about}</a>
          <a href="#ai" onClick={() => { setActiveSection("ai"); setMobileMenuOpen(false); }} className={activeSection === "ai" ? "active" : ""}>{t.nav.ai}</a>
          <a href="#skills" onClick={() => { setActiveSection("skills"); setMobileMenuOpen(false); }} className={activeSection === "skills" ? "active" : ""}>{t.nav.skills}</a>
          <a href="#experience" onClick={() => { setActiveSection("experience"); setMobileMenuOpen(false); }} className={activeSection === "experience" ? "active" : ""}>{t.experience.title}</a>
          <a href="#projects" onClick={() => { setActiveSection("projects"); setMobileMenuOpen(false); }} className={activeSection === "projects" ? "active" : ""}>{t.nav.projects}</a>
        </div>
      )}

      <main className="page-shell">
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="status-pill">
              <span className="status-dot" />
              <span>{t.hero.availability}</span>
            </div>

            <h1>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>

            <p className="hero-role">{t.hero.role}</p>
            <p className="hero-bio">{t.hero.bio}</p>

            <div className="socials">
              {profile.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="social-link">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {socialIcons[link.label.toLowerCase()] ?? "link"}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-visual">
              <Image
                src="/profile.png"
                alt="Retrato profesional de Esneider Bravo"
                fill
                priority
                className="hero-image"
                sizes="(max-width: 920px) 90vw, 530px"
              />
            </div>
            <div className="experience-card">
              <strong>{profile.yearsExperience}</strong>
              <p>{t.hero.yearsOfLogic}</p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-label">{t.about.title}</div>
          <div>
            <p className="quote">&quot;{t.about.quote}&quot;</p>
            <p className="about-body">{t.about.body}</p>
          </div>
        </section>

        <section className="ai-section" id="ai">
          <div className="ai-section-head">
            <p className="section-kicker">{t.ai.kicker}</p>
            <p className="ai-tagline">{t.ai.tagline}</p>
          </div>

          <div className="ai-grid">
            {aiStack.map((group) => (
              <article key={group.name} className="ai-card">
                <h4>
                  <span className="material-symbols-outlined ai-group-icon" aria-hidden="true">
                    {aiGroupIcon[group.name] ?? "smart_toy"}
                  </span>
                  {group.name}
                </h4>
                <div className="ai-chips">
                  {group.items.map((item) => (
                    <span key={item} className="ai-chip">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {getIcon(item, "auto_awesome")}
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stack" id="skills">
          <div className="stack-head">
            <div>
              <p className="section-kicker">{t.skills.title}</p>
            </div>
          </div>

          <div className="skills-grid">
            {mergedGroups.map((group) => (
              <article key={group.name} className="stack-card">
                <h4>
                  <span className="material-symbols-outlined stack-icon" aria-hidden="true">
                    {groupIcon[group.name] ?? "code"}
                  </span>
                  {group.name}
                </h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${group.name}-${item}`}>
                      <span className="stack-item">
                        <span className="material-symbols-outlined stack-icon" aria-hidden="true">
                          {getIcon(item, "code")}
                        </span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <article className="stack-card capabilities-card">
            <h4>{t.skills.capabilitiesTitle}</h4>
            <div className="chip-list">
              {coreCapabilities.map((capability) => (
                <span key={capability} className="chip capability-chip">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {getIcon(capability, "bolt")}
                  </span>
                  {capability}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="exp-section" id="experience">
          <p className="section-kicker">{t.experience.kicker}</p>
          <h2 className="exp-title">{t.experience.title}</h2>

          <div className="exp-carousel">
            <div
              className="exp-track"
              style={{ transform: `translateX(-${expIndex * 100}%)` }}
            >
              {experiences.map((exp) => (
                <article key={`${exp.company}-${exp.role}`} className="exp-card">
                  <div className="exp-card-header">
                    <div>
                      <p className="exp-company">{exp.company}</p>
                      <h3 className="exp-role">{exp.role}</h3>
                    </div>
                    <span className={`exp-period${exp.current ? " current" : ""}`}>
                      {exp.current ? t.experience.present : exp.period}
                      {exp.current && <span className="exp-period-sub">{exp.period}</span>}
                    </span>
                  </div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="exp-controls">
              <button
                className="exp-nav-btn"
                onClick={() => setExpIndex((i) => Math.max(0, i - 1))}
                disabled={expIndex === 0}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>

              <div className="exp-dots">
                {experiences.map((_, i) => (
                  <button
                    key={i}
                    className={`exp-dot${i === expIndex ? " active" : ""}`}
                    onClick={() => setExpIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className="exp-nav-btn"
                onClick={() => setExpIndex((i) => Math.min(experiences.length - 1, i + 1))}
                disabled={expIndex === experiences.length - 1}
                aria-label="Next"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <p className="section-kicker">{t.projects.title}</p>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <p className="project-domain">{project.domain}</p>
                <h3>{project.title}</h3>
                <p>{t.projects.summaries[project.title] ?? project.summary}</p>
                <p className="impact">
                  {t.projects.impactPrefix}: {t.projects.impacts[project.title] ?? project.impact}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="contact">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.body}</p>
          <a href="https://wa.me/573195854272" target="_blank" rel="noreferrer">
            {t.cta.action}
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">ESNEIDERBRAVO.DEV</div>
        <div className="footer-copy">© 2026 ESNEIDER BRAVO • {t.footer.signature}</div>
        <div className="footer-links">
          {profile.socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
          <a href="https://wa.me/573195854272" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </footer>
    </>
  );
}
