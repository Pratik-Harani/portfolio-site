import Image from "next/image";

export interface ExperienceRole {
    company: string;
    role: string;
    description: string;
    logo: string;
    dates: string;
    location: string;
}

export interface ExperienceSectionProps {
    experience: ExperienceRole[];
    sectionNumber: string;
    headlineText: string;
    logoImageLoadQualitySizes?: string;
}

export function ExperienceSection({
    experience,
    sectionNumber,
    headlineText,
    logoImageLoadQualitySizes = "4.2rem",
}: ExperienceSectionProps){
    return(
        <section className="section experience-section" id="experience">
            <div className="section-heading reveal">
                <p className="section-number">{sectionNumber}</p>
                <h2>{headlineText}</h2>
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
                                sizes={logoImageLoadQualitySizes}
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
    )
}