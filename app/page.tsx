"use client";

import { useRef } from "react";
import { aboutSection, experience, hero, profile, projects, socialLinks } from "./portfolio-data";
import PillNav from "./components/PillNav";
import ScrollReveal from "./components/ScrollBlurredReveal";
import { ArrowUpRightIcon, DownArrowIcon, ArrowUpIcon } from "./components/icons";
import Image from 'next/image'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useHeroCirclesAnimation } from "./hooks/useHeroCirclesAnimation";
import { useScrollOpacityReveal } from "./hooks/useScrollOpacityReveal";

const sectionIds = ["about", "projects", "experience", "contact"];
gsap.registerPlugin(ScrollTrigger);




export default function Home() {
  const heroRef = useRef(null);
  const largeCircleRef = useRef(null);
  const smallCircleRef = useRef(null)
  
  useHeroCirclesAnimation(heroRef, largeCircleRef, smallCircleRef);
  let activeSection = useScrollSpy(sectionIds);
  useScrollOpacityReveal();

  return (
    <main>
      <PillNav
        items={[
          ...sectionIds.map((section) => ({
            label: section,
            // If the section is "about", point to "#top", otherwise point to "#section"
            href: section === "about" ? "#top" : `#${section}`,
            ariaLabel: section,
          })),
          {

            //CV label is trailing in the navbar so it requires separate parameters
            label: (
              <span className="pill-cv-label">
                CV <ArrowUpRightIcon strokeWidth={2.75} size="1.0em" />
              </span>
            ),
            href: socialLinks.cv.url,
            ariaLabel: "View CV"
          },
        ]}
        // Ensure the active state matches the new "#top" href when "about" is active
        activeHref={activeSection === "about" ? "#top" : `#${activeSection}`}
        initialLoadAnimation={false}
      />

      <section className="hero" id="top" ref={heroRef}>
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
            <a className="button button-primary" href="#projects">See my work <span className="button-arrow"> <DownArrowIcon /> </span></a>
            <a className="text-link" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRightIcon size = "1.25em" strokeWidth = {2.5} /></a>
          </div>
        </div>

        <div className="hero-aside reveal is-visible">
          <span
            ref={largeCircleRef}
            className="hero-circle hero-circle-medium"
            aria-hidden="true"
          />
          <div className="portrait-frame">
            <Image
              src="/pratik_portrait.png"
              alt="Picture of Pratik Harani"
              fill
              priority
              sizes="(max-width: 929px) 92vw, 57vw"
              className="portrait"
            />
          </div>
          <span
            ref={smallCircleRef}
            className="hero-circle hero-circle-small"
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="section about-section" id="about">
        <p className="section-number">01 | ABOUT</p>
        <div className="section-heading about-heading">
          <ScrollReveal
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={2.5}
            containerClassName="about-headline-reveal"
          >
            {aboutSection.headline.join(" ")}
          </ScrollReveal>
        </div>
        <div className="about-layout">
          <div className="about-copy">
            {aboutSection.description.map((description) => (
              <ScrollReveal
                as="p"
                baseOpacity={0.3}
                baseRotation={0}
                blurStrength={2.5}
                key={description}
              >
                {description}
              </ScrollReveal>
            ))}
          </div>
          <div className="skills-panel reveal">
            <div className="skill-list">
              {aboutSection.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <p className="section-number">02 | PROJECTS</p>
        <div className="section-heading with-copy reveal">
          <ScrollReveal
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={2.5}
            containerClassName="about-headline-reveal"
          >
            {"A selection of things I've made"}
          </ScrollReveal>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a
              className={`project-card project-${index + 1} reveal`}
              href={project.liveUrl}
              key={project.title}
              aria-label={`View ${project.title}`}
            >
              <div className="project-image">
                <Image src={project.image} fill sizes="(max-width: 800px) 100vw, 25vw" className="project-image-content" alt={`Screenshot of ${project.title}`}/>
                
              </div>
              <div className="project-details">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <ul aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading reveal">
          <p className="section-number">03 | EXPERIENCE</p>
          <h2>Learning by doing, with good people.</h2>
        </div>
        <div className="experience-list">
          {experience.map((role, index) => (
            <article className="experience-row reveal" key={`${role.company}-${role.role}`}>
              <p className="experience-index">0{index + 1}</p>
              <div className="company-logo">
                <Image
                  src={role.logo}
                  alt={`${role.company} logo`}
                  fill
                  sizes="4.2rem"
                  className="company-logo-image"
                />
              </div>
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
          <p className="section-number">04 | CONTACT</p>
          <p className="contact-kicker">Have a project, opportunity, or idea?</p>
          <h2>Let&apos;s make something <em>good.</em></h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRightIcon /></a>
          <div className="contact-links">
            <a href={socialLinks.github.url}>GitHub <ArrowUpRightIcon /></a>
            <a href={socialLinks.linkedin.url}>LinkedIn <ArrowUpRightIcon /></a>
            <a target="_blank" rel="noopener noreferrer" href={socialLinks.cv.url}>CV <ArrowUpRightIcon /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with love.</p>
        <a href="#top">Back to top <ArrowUpIcon /></a>
      </footer>
    </main>
  );
}



