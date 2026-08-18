"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, SplitText } from "@/lib/gsap-config";
import { CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Magnetic = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // 0.3 pull factor
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export function CreditTrail() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pRefs = useRef<HTMLParagraphElement[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  const quoteX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const quoteY = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);
  
  const pillX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const pillY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  const auraX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const auraY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const [isHoveringSection, setIsHoveringSection] = useState(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.to(sectionRef.current, {
        backgroundColor: "#111111",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
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

      if (pRefs.current.length > 0) {
        const splitLines = new SplitText(pRefs.current, { type: "lines" });
        gsap.fromTo(splitLines.lines,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 60%", // start scrubbing when top of text hits 60% of viewport
              end: "bottom 60%", // end when bottom of text hits 60%
              scrub: 0.5, // 0.5 sec smoothing
            }
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !pRefs.current.includes(el)) {
      pRefs.current.push(el);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
      className="py-24 md:py-32 transition-colors relative z-10 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      

      <div className="max-container w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Copy & Actions */}
          <div ref={leftRef} className="flex-1 w-full max-w-xl flex flex-col items-start">
            <span ref={labelRef} className="text-[13px] font-medium text-white/70 mb-4 block">
              The Graduation Credit Trail
            </span>
            
            <h2 ref={headlineRef} className="text-4xl md:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-8">
              Your Hustle. Your History.<br />
              <span className="text-[#FF3700]">Your Future.</span>
            </h2>
            
            <p ref={addToRefs} className="text-[12px] md:text-[15px] text-white/60 leading-relaxed mb-6 max-w-[560px]">
              Every verified transaction you make on Zill becomes part of a real,
              exportable financial history. Not a vanity metric, an actual
              record of business activity.
            </p>

            <p ref={addToRefs} className="text-[12px] md:text-[15px] text-white/60 leading-relaxed mb-12 max-w-[560px]">
              When you graduate, that history is proof you can bring to a bank,
              an investor, or an employer. Something almost no Nigerian student
              has access to otherwise. Your four years of campus commerce
              won&apos;t vanish, they&apos;ll follow you.
            </p>

            {/* Metrics/Icons row - MAGNETIC */}
            <div className="flex items-center flex-wrap gap-6 md:gap-10 mt-2">
              <Magnetic>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111]/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3700]/20 group-hover:border-[#FF3700]/50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-white/60 group-hover:text-[#FF3700] transition-colors" />
                  </div>
                  <div className="text-[11px] font-medium text-white/50 group-hover:text-white transition-colors">Verified Sales</div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111]/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3700]/20 group-hover:border-[#FF3700]/50 transition-colors">
                    <Award className="w-5 h-5 text-white/60 group-hover:text-[#FF3700] transition-colors" />
                  </div>
                  <div className="text-[11px] font-medium text-white/50 group-hover:text-white transition-colors">Credit Built</div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111]/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3700]/20 group-hover:border-[#FF3700]/50 transition-colors">
                    <GraduationCap className="w-5 h-5 text-white/60 group-hover:text-[#FF3700] transition-colors" />
                  </div>
                  <div className="text-[11px] font-medium text-white/50 group-hover:text-white transition-colors">Graduation Ready</div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111]/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3700]/20 group-hover:border-[#FF3700]/50 transition-colors">
                    <Briefcase className="w-5 h-5 text-white/60 group-hover:text-[#FF3700] transition-colors" />
                  </div>
                  <div className="text-[11px] font-medium text-white/50 group-hover:text-white transition-colors">Bank Proof</div>
                </div>
              </Magnetic>
            </div>
          </div>

          {/* Right: Testimonial */}
          <div className="flex-1 w-full relative flex items-center justify-end py-10 lg:py-0">
            <div className="w-full max-w-[500px]">
              <div className="flex items-start gap-5 md:gap-6 relative">
                
                {/* Floating Parallax Quote */}
                <motion.div 
                  style={{ x: quoteX, y: quoteY }} 
                  className="text-[#FF3700] text-6xl md:text-7xl font-bold leading-none pt-2 cursor-default"
                >
                  &ldquo;
                </motion.div>
                
                <div className="flex-1">
                  <p className="text-white/90 text-lg md:text-[21px] font-medium leading-relaxed mb-8">
                    I&apos;ve been selling hoodies on campus since year one, and honestly, Zill just made it official. Knowing I&apos;m graduating with a clean, verifiable record of all my sales and my own <span className="text-white font-bold">.store</span> domain? It&apos;s wild. No bank is going to ask me if I really have business experience. They&apos;ll just see the proof.
                  </p>
                  
                  {/* Magnetic Parallax Pill */}
                  <Magnetic className="inline-block">
                    <motion.div 
                      style={{ x: pillX, y: pillY }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 bg-[#FF3700] rounded-full p-1.5 pr-6 shadow-[0_10px_30px_rgba(255,55,0,0.3)] cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-[#111111]/20 relative shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-white/10" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-white font-bold text-[13px] leading-tight mb-0.5">Precious</h4>
                        <p className="text-white/90 text-[11px] leading-tight">Business Owner</p>
                      </div>
                    </motion.div>
                  </Magnetic>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
