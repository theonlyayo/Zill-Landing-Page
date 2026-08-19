"use client";

import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    icon: (isHovered: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.path 
          d="M12 2L3 7V12C3 17.5 7.05 22.74 12 24C16.95 22.74 21 17.5 21 12V7L12 2Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path 
          d="M9 12L11 14L15 10" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isHovered ? 0.3 : 0 }}
        />
      </svg>
    ),
    title: "Student Verified Accounts",
    description:
      "Every user signs up with a verified student email. No anonymous profiles, no outsiders. You always know who you're dealing with.",
  },
  {
    icon: (isHovered: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.circle 
          cx="12" 
          cy="12" 
          r="9" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 6V12L16 14" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isHovered ? 0.4 : 0 }}
        />
      </svg>
    ),
    title: "Credibility Score System",
    description:
      "Response rate, listing activity, offer conversion, and dispute history — combined into a single visible trust score that every buyer can check before committing.",
  },
  {
    icon: (isHovered: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.rect 
          x="3" 
          y="3" 
          width="18" 
          height="18" 
          rx="4" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path 
          d="M8 12H16M8 8H16M8 16H12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: isHovered ? [0, 1] : 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isHovered ? 0.4 : 0 }}
        />
      </svg>
    ),
    title: "Built-In Dispute Handling",
    description:
      "When something goes wrong, there's an actual process — not just screenshots and back-and-forth. Every transaction has a traceable record.",
  },
];

function TrustCard({ pillar }: { pillar: typeof pillars[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const isActive = isMobile ? isInView : isHovered;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white dark:bg-[#111111] rounded-[2rem] p-8 md:p-10 border border-[#EAEAEA] dark:border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden transition-colors duration-500 ease-in-out"
    >
      <motion.div 
        className="absolute top-8 left-8 w-32 h-32 bg-[#FF3700] rounded-full mix-blend-multiply filter blur-[50px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isActive ? 0.12 : 0,
          scale: isActive ? 1.5 : 0.5
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] dark:bg-[#222222] flex items-center justify-center text-[#FF3700] mb-8 relative z-10 border border-[#EAEAEA] dark:border-transparent">
        {pillar.icon(isActive)}
      </div>
      
      <h3 className="text-xl md:text-[22px] font-bold text-brand-dark dark:text-white mb-4 tracking-tight relative z-10">
        {pillar.title}
      </h3>
      <p className="text-[15px] text-brand-gray leading-relaxed relative z-10">
        {pillar.description}
      </p>
    </div>
  );
}

export function Trust() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#000000] relative z-10 transition-colors duration-500 ease-in-out">
      <div className="max-container w-full">
        
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <span className="text-[13px] font-medium text-[#666666] dark:text-[#A0A0A0] mb-4 block">
              Trust & Safety
            </span>
            <h2 className="text-4xl md:text-[44px] font-bold text-brand-dark dark:text-white leading-[1.1] tracking-tight mb-6">
              Safety isn&apos;t an afterthought.<br />
              <span className="text-[#FF3700]">It&apos;s the foundation.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar) => (
              <TrustCard key={pillar.title} pillar={pillar} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
