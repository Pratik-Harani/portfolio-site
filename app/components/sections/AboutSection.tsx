

import ScrollReveal from "../ScrollBlurredReveal";

export interface AboutData {
    headline: string[];
    description: string[];
    skills: string[];
}

export interface AboutSectionProps {
    aboutSection: AboutData;
    sectionNumber: string;

    headlineScrollRevealBaseOpacity?: number;
    headlineScrollRevealBlurStrength?: number;
    headlineScrollRevealBaseRotation?: number;

    copyScrollRevealBaseOpacity?: number;
    copyScrollRevealBlurStrength?: number;
    copyScrollRevealBaseRotation?: number;
}

export function AboutSection({
    aboutSection,
    sectionNumber,

    headlineScrollRevealBaseOpacity = 0.1,
    headlineScrollRevealBlurStrength = 2.5,
    headlineScrollRevealBaseRotation = 0,

    copyScrollRevealBaseOpacity = 0.3,
    copyScrollRevealBlurStrength = 2.5,
    copyScrollRevealBaseRotation = 0,
}: AboutSectionProps){
    return (
             <section className="section about-section" id="about">
                <p className="section-number">{sectionNumber}</p>
                <div className="section-heading about-heading">
                  <ScrollReveal
                    baseOpacity={headlineScrollRevealBaseOpacity}
                    baseRotation={headlineScrollRevealBaseRotation}
                    blurStrength={headlineScrollRevealBlurStrength}
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
                        baseOpacity={copyScrollRevealBaseOpacity}
                        baseRotation={copyScrollRevealBaseRotation}
                        blurStrength={copyScrollRevealBlurStrength}
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
        
    )
}