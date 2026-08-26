import { ArrowUpRightIcon } from "../icons";

export interface ProfileContact {
    email: string;
}

export interface SocialLink {
    url: string;
}

export interface SocialLinks {
    github: SocialLink;
    linkedin: SocialLink;
    cv: SocialLink;
}

export interface ContactSectionProps {
    profile: ProfileContact;
    socialLinks: SocialLinks;
    sectionNumber: string;
    kickerText?: string;
    normalHeadlineText?: string;
    highlightedHeadlineText?: string;
}

export function ContactSection({
    profile,
    socialLinks,
    sectionNumber,
    kickerText = "Have a project, opportunity, or idea?",
    normalHeadlineText = "Let's make something",
    highlightedHeadlineText = "good"
}: ContactSectionProps){
    return (
        <section className="contact-section" id="contact">
            <div className="contact-orbit orbit-one" />
            <div className="contact-orbit orbit-two" />

            <div className="contact-content reveal">
                <p className="section-number">{sectionNumber}</p>
                <p className="contact-kicker">{kickerText}</p>
                <h2>{normalHeadlineText} <em>{highlightedHeadlineText}</em></h2>
                <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRightIcon /></a>

                
                <div className="contact-links">
                    {/* target blank and rel noopener makes the link open in a new tab */}
                    <a target="_blank" rel="noopener noreferrer" href={socialLinks.github.url}>GitHub <ArrowUpRightIcon /></a>
                    <a target="_blank" rel="noopener noreferrer" href={socialLinks.linkedin.url}>LinkedIn <ArrowUpRightIcon /></a>
                    <a target="_blank" rel="noopener noreferrer" href={socialLinks.cv.url}>CV <ArrowUpRightIcon /></a>
                </div>
            </div>
        </section>
    )
}
