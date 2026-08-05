"use client";

import { useEffect, useState } from "react";
import { aboutSection, experience, hero, profile, projects, skills, socialLinks } from "./portfolio-data";

const sectionIds = ["about", "projects", "experience", "contact"];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder ${className}`} aria-label={`${label} placeholder`} role="img">
      <span>Replace with</span>
      <strong>{label}</strong>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const readingPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sections[0]?.id ?? "about";

      sections.forEach((section) => {
        if (section.offsetTop <= readingPosition) currentSection = section.id;
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const animatedItems = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    animatedItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={handleNavClick}>
          <span className="wordmark-dot" />
          {profile.firstName.toLowerCase()}.dev
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          {sectionIds.map((section) => (
            <a
              className={activeSection === section ? "is-active" : ""}
              href={`#${section}`}
              key={section}
              onClick={handleNavClick}
            >
              {section}
            </a>
          ))}
          <a href={socialLinks.cv.url} onClick={handleNavClick}>
            cv <ArrowIcon />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal is-visible">
          <h1 className="hero-title">
            <span>{hero.headline.beforeHighlight}</span>
            {hero.headline.highlightedText && (
              <span className="hero-highlight"> {hero.headline.highlightedText}</span>
            )}
            {hero.headline.afterHighlight && <span> {hero.headline.afterHighlight}</span>}
          </h1>
          <p className="hero-intro">{hero.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">See my work <span>↓</span></a>
            <a className="text-link" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowIcon /></a>
          </div>
        </div>

        <div className="hero-aside reveal is-visible">
          <span className="hero-circle hero-circle-large" aria-hidden="true" />
          <span className="hero-circle hero-circle-medium" aria-hidden="true" />
          <span className="hero-circle hero-circle-small" aria-hidden="true" />
          <Placeholder label="your portrait" className="portrait portrait-cutout" />
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading reveal">
          <p className="section-number">01 / ABOUT</p>
          <h2>{aboutSection.headline}</h2>
        </div>
        <div className="about-layout">
          <div className="about-copy reveal">
            <p>{aboutSection.description[0]}</p>
            <p>{aboutSection.description[1]}</p>
            <a className="text-link" href="#contact">More about me <ArrowIcon /></a>
          </div>
          <div className="skills-panel reveal">
            <p className="panel-label">Toolbox</p>
            <div className="skill-list">
              {aboutSection.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading with-copy reveal">
          <div>
            <p className="section-number">02 / PROJECTS</p>
            <h2>A selection of things I&apos;ve made.</h2>
          </div>
          <p>Each project is a small study in making useful, considered software.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-${index + 1} reveal`} key={project.title}>
              <div className="project-image">
                <Placeholder label={`${project.title} image`} />
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="project-details">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <ul aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <a aria-label={`View ${project.title}`} href={project.liveUrl}>View <ArrowIcon /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading reveal">
          <p className="section-number">03 / EXPERIENCE</p>
          <h2>Learning by doing, with good people.</h2>
        </div>
        <div className="experience-list">
          {experience.map((role, index) => (
            <article className="experience-row reveal" key={`${role.company}-${role.role}`}>
              <p className="experience-index">0{index + 1}</p>
              <Placeholder label={`${role.company} logo`} className="company-logo" />
              <div className="experience-role">
                <h3>{role.role}</h3>
                <p>{role.description}</p>
              </div>
              <div className="experience-meta">
                <strong>{role.company}</strong>
                <span>{role.dates}</span>
                <span>{role.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orbit orbit-one" />
        <div className="contact-orbit orbit-two" />
        <div className="contact-content reveal">
          <p className="section-number">04 / CONTACT</p>
          <p className="contact-kicker">Have a project, opportunity, or idea?</p>
          <h2>Let&apos;s make something <em>good.</em></h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon /></a>
          <div className="contact-links">
            <a href={socialLinks.github.url}>GitHub <ArrowIcon /></a>
            <a href={socialLinks.linkedin.url}>LinkedIn <ArrowIcon /></a>
            <a href={socialLinks.cv.url}>CV <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with care.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
