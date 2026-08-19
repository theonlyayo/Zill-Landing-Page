"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-config";
import { Button } from "@/components/ui/Button";

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", toggleActions: "play none none reverse",
        },
      });

      tl.from(labelRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      });

      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "words" });
        tl.from(split.words, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        }, "-=0.2");
      }

      tl.from(pRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2")
      .from(btnRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2")
      .from(metricsRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3")
      .from(imgRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-[#000000] relative z-10 transition-colors duration-500 ease-in-out">
      <div className="max-container w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-xl flex flex-col items-start">
            <span ref={labelRef} className="text-[13px] font-medium text-[#666666] dark:text-[#A0A0A0] mb-4 block">Our Story</span>
            
            <h2 ref={headlineRef} className="text-4xl md:text-[44px] font-bold text-brand-dark dark:text-white leading-[1.1] tracking-tight mb-6">
              Built by students.<br />
              <span className="text-[#FF3700]">For students.</span>
            </h2>
            
            <p ref={pRef} className="text-[14px] text-[#666666] dark:text-[#A0A0A0] leading-relaxed mb-8 max-w-[560px]">
              We built Zill because we were tired of getting scammed on campus group chats. Now, every transaction is verified, safe, and builds your credibility. Start trading in seconds.
            </p>

            <div ref={btnRef} className="flex items-center gap-4 mb-6">
              <Link href="/our-story">
                <Button variant="dark">Read our Full Story</Button>
              </Link>
            </div>

            <div ref={metricsRef} className="flex items-center gap-10 md:gap-14 mt-2">
              <div>
                <div className="text-[13px] font-medium text-brand-dark dark:text-white mb-1">100%</div>
                <div className="text-[11px] text-[#666666]">Verified Students</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-brand-dark dark:text-white mb-1">&lt;2min</div>
                <div className="text-[11px] text-[#666666]">Median listing time</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-brand-dark dark:text-white mb-1">5+</div>
                <div className="text-[11px] text-[#666666]">Campus features</div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative flex items-center justify-end">
            <div ref={imgRef} className="w-full max-w-[540px] aspect-[4/3] rounded-[16px] relative overflow-hidden shadow-sm">
                <Image
                  src="/utibe.jpg"
                  alt="Essien-Ekanem Utibe - Founder of Zill"
                  fill
                  className="object-cover"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
