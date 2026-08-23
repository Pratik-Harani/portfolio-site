"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: "h2" | "p";
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "top 30%",
  wordAnimationEnd = "top 20%",
  as: Tag = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;

      return (
        <span className={styles.word} data-scroll-reveal-word key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const wordElements = element.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal-word]"
    );
    const scroller = scrollContainerRef?.current ?? window;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      gsap.set(element, { clearProps: "transform" });
      gsap.set(wordElements, { opacity: 1, filter: "blur(0px)" });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
          willChange: "opacity, filter",
        },
        {
          ease: "none",
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }, element);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => context.revert();
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    rotationEnd,
    scrollContainerRef,
    wordAnimationEnd,
    children,
  ]);

  return (
    <Tag
      ref={containerRef}
      className={`${styles.scrollReveal} ${containerClassName}`.trim()}
    >
      <span className={`${styles.text} ${textClassName}`.trim()}>
        {splitText}
      </span>
    </Tag>
  );
}