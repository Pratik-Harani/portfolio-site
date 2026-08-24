
import { useEffect, useState, } from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


// Tracks which section is currently "active" based on scroll position, for highlighting the matching nav pill. 
// Fires on mount, scroll, and resize. 
 

export function useScrollSpy(sectionIds: string[], readingLineRatio = 0.35) {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const readingPosition = window.scrollY + window.innerHeight * readingLineRatio;
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
  }, [sectionIds, readingLineRatio]);

  return activeSection;
}