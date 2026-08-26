import ScrollReveal from "../ScrollBlurredReveal";
import Image from 'next/image';

export interface Project {
    title: string;
    liveUrl: string;
    image: string;
    category: string;
    description: string;
    technologies: string[];
}

export interface ProjectsSectionProps {
    projects: Project[];
    sectionNumber: string;
    headlineText?: string;
    projectImageLoadQualitySizes?: string;
    headlineScrollRevealBaseOpacity?: number;
    headlineScrollRevealBlurStrength?: number;
    headlineScrollRevealBaseRotation?: number;
}

export function ProjectsSection({
    projects,
    sectionNumber,
    headlineText = "A selection of things I've made",
    projectImageLoadQualitySizes = "(max-width: 800px) 100vw, 25vw",
    headlineScrollRevealBaseOpacity = 0.1,
    headlineScrollRevealBlurStrength = 2.5,
    headlineScrollRevealBaseRotation = 0,
}: ProjectsSectionProps){
    return(
        <section className="section projects-section" id="projects">
            <p className="section-number">{sectionNumber}</p>
            <div className="section-heading with-copy reveal">
                <ScrollReveal
                    baseOpacity={headlineScrollRevealBaseOpacity}
                    baseRotation={headlineScrollRevealBaseRotation}
                    blurStrength={headlineScrollRevealBlurStrength}
                    containerClassName="about-headline-reveal"
                >
                    {headlineText}
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
                            <Image src={project.image} fill sizes={projectImageLoadQualitySizes} className="project-image-content" alt={`Screenshot of ${project.title}`} />

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
    )
}