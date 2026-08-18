"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { TextReveal } from "@/components/animations/TextReveal";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(subRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      }, "+=0.3");

      tl.from(
        formRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

      if (window.innerWidth >= 768) {
        gsap.to(sectionRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding min-h-[100svh] flex items-center pt-24 md:pt-32 pb-16 relative z-0"
    >
      <div className="max-container w-full translate-y-[-6px]">
        <div className="flex flex-col items-center text-center gap-12 lg:gap-16">
          {/* Copy side */}
          <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-[666px] bg-white border border-[#E5E5E5] text-xs font-medium text-brand-dark w-fit mx-auto">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              Coming to Mountain Top University
            </div>

            <TextReveal
              as="h1"
              type="words"
              duration={0.6}
              stagger={0.05}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark leading-[1.15]"
            >
              Your Campus Hustle Finally Has A Home.
            </TextReveal>

            <p
              ref={subRef}
              className="text-[13px] md:text-[15px] text-brand-gray leading-relaxed max-w-3xl mx-auto"
            >
              Zill is the marketplace where students buy, sell, negotiate prices, and build a real financial history. <br />
              All from one verified campus platform.
            </p>

            <div ref={formRef} className="w-full max-w-md mx-auto mt-4">
              <WaitlistForm />
            </div>
          </div>

          {/* Dashboard screenshot */}
          <div ref={imageRef} className="w-full lg:w-[60%] max-w-4xl relative mx-auto mt-4">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(17,17,17,0.1)] border border-brand-dark/10 bg-white animate-[float_6s_ease-in-out_infinite]">
              <Image
                src="/dashboard.png"
                alt="Zill seller dashboard showing ₦218,400 monthly revenue, pending offers from buyers, and store health metrics"
                width={1360}
                height={860}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
