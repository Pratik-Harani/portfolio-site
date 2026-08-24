import { useEffect, RefObject } from "react";
import gsap from "gsap"

export function useHeroCirclesAnimation(

  heroRef: RefObject<null>, largeCircleRef: RefObject<null>, smallCircleRef: RefObject<null>, 
  parallaxAmount = 1.25,
  largeCircleDistance = 260,
  smallCircleDistane = -160) {


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: parallaxAmount, 
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        largeCircleRef.current,
        { y: largeCircleDistance, ease: "power2.out" },
        0
      ).to(
        smallCircleRef.current,
        { y: smallCircleDistane, ease: "power2.out" },
        0
      );
    }, heroRef);

    return () => ctx.revert(); // cleans up tweens + ScrollTrigger instance
  }, []);
}

