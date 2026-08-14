"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import styles from "./PillNav.module.css";

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
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const timelineRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
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

    if (!navItems || !indicator || !target) return;

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
      timeline.to(indicator, { x, width, duration: 0.25, ease: "power1.inOut", overwrite: "auto" }, 0);
      timeline.call(() => setSettledActiveHref(undefined), undefined, 0.18);
      timeline.call(() => setSettledActiveHref(activeHref), undefined, 0.36);
      indicatorTimelineRef.current = timeline;
    }

    window.addEventListener("resize", placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [activeHref, ease, items]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width, height } = pill.getBoundingClientRect();
        const radius = ((width * width) / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
        const originY = diameter - delta;

        gsap.set(circle, {
          width: diameter,
          height: diameter,
          bottom: -delta,
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(`.${styles.pillLabel}`);
        const hoverLabel = pill.querySelector<HTMLElement>(`.${styles.pillLabelHover}`);
        gsap.set(label, { y: 0 });
        gsap.set(hoverLabel, { y: height + 12, opacity: 0 });

        timelineRefs.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });
        timeline.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        timeline.to(label, { y: -(height + 8), duration: 2, ease, overwrite: "auto" }, 0);
        timeline.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        timelineRefs.current[index] = timeline;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => undefined);

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

    return () => window.removeEventListener("resize", layout);
  }, [ease, initialLoadAnimation, items]);

  const animatePill = (index: number, progress: number, duration: number) => {
    const timeline = timelineRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(timeline.duration() * progress, {
      duration,
      ease,
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
                    if (activeHref !== item.href) animatePill(index, 1, 0.3);
                  }}
                  onMouseLeave={() => {
                    if (activeHref !== item.href) animatePill(index, 0, 0.2);
                  }}
                  ref={(element) => { pillRefs.current[index] = element; }}
                >
                  <span className={styles.hoverCircle} aria-hidden="true" ref={(element) => { circleRefs.current[index] = element; }} />
                  <span className={styles.labelStack}>
                    <span className={styles.pillLabel}>{item.label}</span>
                    <span className={styles.pillLabelHover} aria-hidden="true">{item.label}</span>
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
