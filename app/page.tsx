"use client";

import { useRef } from "react";
import { aboutSection, projectsSection, experienceSection, hero, profile, socialLinks, contactSection, sectionIds} from "./portfolio-data";
import PillNav from "./components/PillNav";
import { ArrowUpRightIcon} from "./components/icons";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useHeroCirclesAnimation } from "./hooks/useHeroCirclesAnimation";
import { useScrollOpacityReveal } from "./hooks/useScrollOpacityReveal";
import { HeroSection }  from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { SiteFooter } from "./components/sections/SiteFooter";


gsap.registerPlugin(ScrollTrigger);




export default function Home() {
  const heroRef = useRef(null);
  const largeCircleRef = useRef(null);
  const smallCircleRef = useRef(null)
  
  useHeroCirclesAnimation(heroRef, largeCircleRef, smallCircleRef);
  const activeSection = useScrollSpy(sectionIds);
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

      <HeroSection
        heroRef={heroRef}
        largeCircleRef={largeCircleRef}
        smallCircleRef={smallCircleRef}
        headline={hero.headline}
        introduction={hero.introduction}
        email={profile.email}
      />

      <AboutSection 
        aboutSection={aboutSection} 
        sectionNumber={`01 | ${sectionIds[0]}`} 
      />
 
      <ProjectsSection 
        projects = {projectsSection.projects}
        headlineText = {projectsSection.headline} 
        sectionNumber={`02 | ${sectionIds[1]}`} 
      />

      <ExperienceSection 
        experience = {experienceSection.experience} 
        headlineText={experienceSection.headline}
        sectionNumber={`03 | ${sectionIds[2]}`} 
      />

      <ContactSection 
        profile = {profile} 
        socialLinks={socialLinks} 
        sectionNumber={`04 | ${sectionIds[3]}`} 
        normalHeadlineText={contactSection.normalHeadlineText}
        highlightedHeadlineText={contactSection.highlightedHeadlineText}
        kickerText={contactSection.kickerText}
      />


      <SiteFooter profile={profile}/>
    </main>
  );
}



