"use client";

import { useEffect, useRef, useState } from "react";
import { STAT_TARGETS, STATS } from "./data";

export function useCountUpStats() {
  const statsRef = useRef<HTMLElement | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const section = statsRef.current;
    if (!section || statsStarted) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = requestAnimationFrame(() => setStatsStarted(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [statsStarted]);

  useEffect(() => {
    if (!statsStarted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const reducedMotionFrame = requestAnimationFrame(() => {
        setAnimatedStats(STAT_TARGETS.map(({ target }) => target));
      });
      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    const duration = 1200;
    const startedAt = performance.now();
    let animationFrame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(STAT_TARGETS.map(({ target }) => Math.round(target * eased)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [statsStarted]);

  return { animatedStats, statsRef };
}
