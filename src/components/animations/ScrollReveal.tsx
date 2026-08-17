"use client";

import { useRef, ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  stagger?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const targets = stagger
        ? ref.current?.children
        : ref.current;

      if (!targets) return;

      gsap.from(targets, {
        ...directionMap[direction],
        opacity: 0,
        duration,
        delay,
        stagger: stagger || 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
