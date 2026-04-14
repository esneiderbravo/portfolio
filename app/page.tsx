import { portfolioContent } from "@/src/content/portfolio";

export default function HomePage() {
  const { profile, projects, techGroups } = portfolioContent;
  const [frontend, backend, databases, infrastructure, tools] = techGroups;
  const [firstName, ...lastNameParts] = profile.headline.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">KINETIC.DEV</div>
          <div className="nav-links">
            <a href="#works">Works</a>
            <a className="active" href="#stack">
              Stack
            </a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="resume-btn" href="#contact">
            Resume
          </a>
        </div>
      </nav>

      <main className="page-shell">
        <section className="hero" id="works">
          <div className="hero-copy">
            <div className="status-pill">
              <span className="status-dot" />
              <span>{profile.availability}</span>
            </div>

            <h1>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>

            <p className="hero-role">{profile.role}</p>
            <p className="hero-bio">{profile.bio}</p>

            <div className="socials">
              {profile.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-visual" aria-hidden="true" />
            <div className="experience-card">
              <strong>{profile.yearsExperience}</strong>
              <p>Years of logic</p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-label">{profile.philosophyTitle}</div>
          <div>
            <p className="quote">&quot;{profile.philosophyQuote}&quot;</p>
            <p className="about-body">{profile.philosophyBody}</p>
          </div>
        </section>

        <section className="stack" id="stack">
          <div className="stack-head">
            <div>
              <p className="section-kicker">Core ecosystem</p>
              <h2>Engineered Toolkit</h2>
            </div>
            <p className="stack-caption">
              Seleccion curada de tecnologias para construir plataformas enterprise y productos digitales escalables.
            </p>
          </div>

          <div className="stack-grid">
            <article className="stack-card wide">
              <h3>{frontend.name}</h3>
              <div className="chip-list">
                {frontend.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="stack-card wide">
              <h3>{backend.name}</h3>
              <div className="chip-list">
                {backend.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="stack-card">
              <h4>{databases.name}</h4>
              <ul>
                {databases.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="stack-card infra">
              <h4>{infrastructure.name}</h4>
              <ul>
                {infrastructure.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="stack-card">
              <h4>{tools.name}</h4>
              <ul>
                {tools.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="projects-section">
          <p className="section-kicker">Featured projects</p>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <p className="project-domain">{project.domain}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <p className="impact">Impacto: {project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="contact">
          <h2>LISTO PARA CONSTRUIR ALGO GRANDE?</h2>
          <p>Conversemos sobre tu proximo producto, arquitectura o proceso de modernizacion.</p>
          <a href={`mailto:${profile.email}`}>Iniciar Proyecto</a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">KINETIC ARCHITECT</div>
        <div className="footer-copy">© 2026 ESNEIDER BRAVO • ENGINEERED WITH PRECISION</div>
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

