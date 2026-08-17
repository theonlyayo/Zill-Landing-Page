"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-config";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  type?: "words" | "lines";
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
  scrollTrigger?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  type = "words",
  duration = 0.7,
  stagger = 0.04,
  delay = 0,
  className = "",
  scrollTrigger = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !ref.current) return;

      const split = new SplitText(ref.current, {
        type: type,
      });

      const targets = type === "words" ? split.words : split.lines;

      gsap.from(targets, {
        opacity: 0,
        y: type === "words" ? 20 : 40,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        ...(scrollTrigger
          ? {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          : {}),
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
