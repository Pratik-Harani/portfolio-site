"use client";

import { useEffect, useState, useRef } from "react";
import { aboutSection, experience, hero, profile, projects, socialLinks } from "./portfolio-data";
import PillNav from "./components/PillNav";
import ScrollReveal from "./components/ScrollReveal";
import Image from 'next/image'
import { ChevronDown } from 'lucide-react';
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sectionIds = ["about", "projects", "experience", "contact"];
gsap.registerPlugin(ScrollTrigger);

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function DownArrowIcon({size = 15, strokeWidth = 2.5, ...rest }: React.ComponentProps<typeof ChevronDown>) {
  return( 
    <span aria-hidden="true">
      <ChevronDown size={size} strokeWidth={strokeWidth} {...rest} />
    </span>
  );
}


export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const heroRef = useRef(null);
  const pinkCircleRef = useRef(null);
  const blueCircleRef = useRef(null)

  //Hero circles scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.25, // higher = laggier/smoother catch-up, lower = tighter
          invalidateOnRefresh: true,
        },
      });
  
      tl.to(
        pinkCircleRef.current,
        { y: 260, ease: "power2.out" },
        0
      ).to(
        blueCircleRef.current,
        { y: -160, ease: "power2.out" },
        0
      );
    }, heroRef);

    return () => ctx.revert(); // cleans up tweens + ScrollTrigger instance
  }, []);


  //Navbar scroll spy
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

  //opacity scroll reveal (applied on Project, Experience & Contact sections)
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

  return (
    <main>
      <PillNav
        items={[
          ...sectionIds.map((section) => ({ label: section, href: `#${section}` })),
          { label: "CV", href: socialLinks.cv.url, ariaLabel: "View CV" },
        ]}
        activeHref={`#${activeSection}`}
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
            <a className="text-link" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowIcon /></a>
          </div>
        </div>

        <div className="hero-aside reveal is-visible">
          <span
            ref={pinkCircleRef}
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
            ref={blueCircleRef}
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
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon /></a>
          <div className="contact-links">
            <a href={socialLinks.github.url}>GitHub <ArrowIcon /></a>
            <a href={socialLinks.linkedin.url}>LinkedIn <ArrowIcon /></a>
            <a href={socialLinks.cv.url}>CV <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with love.</p>
        <a href="#top">Back to top  ↑</a>
      </footer>
    </main>
  );
}
