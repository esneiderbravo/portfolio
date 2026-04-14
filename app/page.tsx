"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { portfolioContent } from "@/src/content/portfolio";
import { translations, type Locale } from "@/src/i18n/translations";

export default function HomePage() {
  const { profile, projects, techGroups } = portfolioContent;
  const [frontend, backend, dataMessaging, cloudDevops, integrations] = techGroups;
  const [firstName, ...lastNameParts] = profile.headline.split(" ");
  const lastName = lastNameParts.join(" ");
  const [locale, setLocale] = useState<Locale>("en");
  const t = useMemo(() => translations[locale], [locale]);

  const socialIcons: Record<string, string> = {
    github: "terminal",
    linkedin: "hub",
    email: "mail",
  };

  const itemIcons: Record<string, string> = {
    // Data & Messaging
    postgresql: "database",
    redis: "bolt",
    kafka: "stream",
    "aws s3": "cloud_upload",
    "elastic apm": "monitor_heart",
    // Cloud & DevOps
    aws: "cloud",
    docker: "package_2",
    jenkins: "build",
    ansible: "settings_suggest",
    "github actions": "deployed_code",
    kubernetes: "hub",
    // Integrations
    salesforce: "handshake",
    twilio: "call",
    sendgrid: "mail",
    rollbar: "error",
    plaid: "account_balance",
    looker: "bar_chart",
    // Fallbacks for tools
    git: "terminal",
    jira: "checklist",
    figma: "design_services",
    postman: "send",
    "vs code": "code",
  };

  const getIcon = (value: string, fallback = "code") =>
    itemIcons[value.toLowerCase()] ?? fallback;

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">ESNEIDERBRAVO.DEV</div>
          <div className="nav-links">
            <a href="#works">{t.nav.works}</a>
            <a className="active" href="#stack">
              {t.nav.stack}
            </a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <label className="locale-selector" aria-label={t.nav.language}>
            <span>{t.nav.language}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </label>
          <a className="resume-btn" href="#contact">
            {t.nav.resume}
          </a>
        </div>
      </nav>

      <main className="page-shell">
        <section className="hero" id="works">
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

        <section className="stack" id="stack">
          <div className="stack-head">
            <div>
              <p className="section-kicker">{t.stack.kicker}</p>
              <h2>{t.stack.title}</h2>
            </div>
            <p className="stack-caption">{t.stack.caption}</p>
          </div>

          <div className="stack-grid">
            {/* Frontend — chips */}
            <article className="stack-card wide">
              <h3>
                <span className="material-symbols-outlined stack-icon" aria-hidden="true">layers</span>
                {frontend.name}
              </h3>
              <div className="chip-list">
                {frontend.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </article>

            {/* Backend — chips */}
            <article className="stack-card wide">
              <h3>
                <span className="material-symbols-outlined stack-icon" aria-hidden="true">dns</span>
                {backend.name}
              </h3>
              <div className="chip-list">
                {backend.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </article>

            {/* Data & Messaging — icon list */}
            <article className="stack-card">
              <h4>{dataMessaging.name}</h4>
              <ul>
                {dataMessaging.items.map((item) => (
                  <li key={item}>
                    <span className="stack-item">
                      <span className="material-symbols-outlined stack-icon" aria-hidden="true">
                        {getIcon(item, "storage")}
                      </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Cloud & DevOps — icon list, spans 2 cols */}
            <article className="stack-card infra">
              <h4>{cloudDevops.name}</h4>
              <ul>
                {cloudDevops.items.map((item) => (
                  <li key={item}>
                    <span className="stack-item">
                      <span className="material-symbols-outlined stack-icon" aria-hidden="true">
                        {getIcon(item, "cloud")}
                      </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Integrations — icon list */}
            <article className="stack-card">
              <h4>{integrations.name}</h4>
              <ul>
                {integrations.items.map((item) => (
                  <li key={item}>
                    <span className="stack-item">
                      <span className="material-symbols-outlined stack-icon" aria-hidden="true">
                        {getIcon(item, "integration_instructions")}
                      </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="projects-section">
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
          <a href={`mailto:${profile.email}`}>
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
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </footer>
    </>
  );
}
