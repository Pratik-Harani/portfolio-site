import { RefObject } from 'react';
import Image from 'next/image';
import { DownArrowIcon, ArrowUpRightIcon } from '../icons';

export interface HeroHeadline {
    beforeHighlight: string;
    highlightedText?: string;
    afterHighlight?: string;
}

export interface HeroSectionProps {
    // Animation Refs
    heroRef?: RefObject<null>;
    largeCircleRef?: RefObject<null>;
    smallCircleRef?: RefObject<null>;

    // Content Props
    headline: HeroHeadline;
    introduction: string;
    email: string;

    // Customization Props 
    imageSrc?: string;
    imageAlt?: string;
    imageSizes?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonArrowIconSize?: string;
    secondaryButtonArrowIconStrokeWidth?: number;


}

export function HeroSection({
    heroRef,
    largeCircleRef,
    smallCircleRef,
    headline,
    introduction,
    email,
    
    imageSrc = "/pratik_portrait.png",
    imageAlt = "Picture of Pratik Harani",
    imageSizes = "(max-width: 929px) 92vw, 57vw",

    primaryButtonText = "See my work",
    primaryButtonHref = "#projects",

    secondaryButtonText = "Let's talk",
    secondaryButtonArrowIconSize = "1.25em",
    secondaryButtonArrowIconStrokeWidth = 2.5,

}: HeroSectionProps) {
    return (
        <section className="hero" id="top" ref={heroRef}>
            <div className="hero-copy reveal is-visible">
                <h1 className="hero-title">
                    <span>{headline.beforeHighlight}</span>
                    {headline.highlightedText && (
                        <span className="hero-highlight"> {headline.highlightedText}</span>
                    )}
                    {headline.afterHighlight && (
                        <span> {headline.afterHighlight}</span>
                    )}
                </h1>
                <p className="hero-intro">{introduction}</p>
                <div className="hero-actions">
                    <a className="button button-primary" href={primaryButtonHref}>
                        {primaryButtonText}{" "}
                        <span className="button-arrow">
                            <DownArrowIcon />
                        </span>
                    </a>
                    <a className="text-link" href={`mailto:${email}`}>
                        {secondaryButtonText}{" "}
                        <ArrowUpRightIcon size={secondaryButtonArrowIconSize} strokeWidth={secondaryButtonArrowIconStrokeWidth} />
                    </a>
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
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes={imageSizes}
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
    );
}