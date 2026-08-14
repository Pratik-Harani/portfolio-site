"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import styles from "./PillNav.module.css";


const scrollSpyPillAnimationDuration = 0.25;
const scrollSpyColorAnimationDuration = scrollSpyPillAnimationDuration * 0.48;
const scrollSpyEase = "power3.easeOut";

const hoverLabelRaise = 2;
const hoverLabelRaiseAnimationDuration = 0.12;
const hoverLabelEasePreset = "power3.easeOut"; //check gsap library documentation for all possible options

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
};

export default function PillNav({
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "var(--paper)",
  pillColor = "var(--ink)",
  hoveredPillTextColor = "var(--ink)",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settledActiveHref, setSettledActiveHref] = useState(activeHref);
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const activeIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const indicatorTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPositionedIndicator = useRef(false);

  useLayoutEffect(() => {
    const navItems = navItemsRef.current;
    const indicator = activeIndicatorRef.current;
    const activeIndex = items.findIndex((item) => item.href === activeHref);
    const target = pillRefs.current[activeIndex];
    const activeLabel = labelRefs.current[activeIndex];

    if (!navItems || !indicator || !target) return;

    if (activeLabel) {
      labelTweenRefs.current[activeIndex]?.kill();
      labelTweenRefs.current[activeIndex] = gsap.to(activeLabel, {
        y: 0,
        duration: hoverLabelRaiseAnimationDuration,
        ease: hoverLabelEasePreset,
        overwrite: "auto",
      });
    }

    const getTargetBounds = () => {
      const navRect = navItems.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      return { x: targetRect.left - navRect.left, width: targetRect.width };
    };

    const placeIndicator = () => {
      const { x, width } = getTargetBounds();
      gsap.set(indicator, { x, width });
    };

    if (!hasPositionedIndicator.current) {
      placeIndicator();
      hasPositionedIndicator.current = true;
      setSettledActiveHref(activeHref);
    } else {
      const { x, width } = getTargetBounds();
      indicatorTimelineRef.current?.kill();
      const timeline = gsap.timeline();
      timeline.to(indicator, { x, width, duration: scrollSpyPillAnimationDuration, ease: scrollSpyEase, overwrite: "auto" }, 0);
      timeline.call(() => setSettledActiveHref(undefined), undefined, scrollSpyPillAnimationDuration * 0.42);
      timeline.call(
        () => setSettledActiveHref(activeHref),
        undefined,
        scrollSpyPillAnimationDuration - scrollSpyColorAnimationDuration,
      );
      indicatorTimelineRef.current = timeline;
    }

    window.addEventListener("resize", placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [activeHref, ease, items]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { visibility: "hidden", opacity: 0 });
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -12, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease, clearProps: "transform" },
      );
    }

  }, [ease, initialLoadAnimation]);

  const animateLabel = (index: number, raised: boolean) => {
    const label = labelRefs.current[index];
    if (!label) return;

    labelTweenRefs.current[index]?.kill();
    labelTweenRefs.current[index] = gsap.to(label, {
      y: raised ? -hoverLabelRaise : 0,
      duration: hoverLabelRaiseAnimationDuration,
      ease: hoverLabelEasePreset,
      overwrite: "auto",
    });
  };

  const setMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open);
    const menu = mobileMenuRef.current;
    const lines = hamburgerRef.current?.querySelectorAll(`.${styles.hamburgerLine}`);

    if (lines) {
      gsap.to(lines[0], { rotation: open ? 45 : 0, y: open ? 3 : 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: open ? -45 : 0, y: open ? -3 : 0, duration: 0.3, ease });
    }

    if (menu) {
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": pillTextColor ?? baseColor,
    "--scroll-spy-color-animation-duration": `${scrollSpyColorAnimationDuration}s`,
  } as CSSProperties;

  return (
    <div className={styles.container} style={cssVars}>
      <nav className={`${styles.pillNav} ${className}`} aria-label="Primary navigation">
        <div className={styles.navItems} ref={navItemsRef}>
          <span className={styles.activeIndicator} aria-hidden="true" ref={activeIndicatorRef} />
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  className={`${styles.pill}${settledActiveHref === item.href ? ` ${styles.isActive}` : ""}`}
                  href={item.href}
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  onMouseEnter={() => {
                    if (activeHref !== item.href) animateLabel(index, true);
                  }}
                  onMouseLeave={() => {
                    if (activeHref !== item.href) animateLabel(index, false);
                  }}
                  onClick={() => animateLabel(index, false)}
                  ref={(element) => { pillRefs.current[index] = element; }}
                >
                  <span className={styles.labelStack}>
                    <span className={styles.pillLabel} ref={(element) => { labelRefs.current[index] = element; }}>
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          className={styles.mobileMenuButton}
          onClick={() => {
            setMobileMenu(!isMobileMenuOpen);
            onMobileMenuClick?.();
          }}
          ref={hamburgerRef}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      <div className={styles.mobileMenuPopover} ref={mobileMenuRef}>
        <ul className={styles.mobileMenuList}>
          {items.map((item) => (
            <li key={item.href}>
              <a
                className={`${styles.mobileMenuLink}${activeHref === item.href ? ` ${styles.isActive}` : ""}`}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => setMobileMenu(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
