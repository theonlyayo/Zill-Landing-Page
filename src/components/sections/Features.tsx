"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

const items = [
  {
    title: '"How Much Last?"',
    description: "Send an offer on any listing instead of paying sticker price. Sellers accept, counter, or decline. It's campus haggling, made clean, fair, and trackable.",
    image: "/bento/how-much-last.png",
    colSpan: "md:col-span-2",
    imageScale: "scale-[1.32]",
    imageContainerClass: "aspect-[2/1] md:aspect-[3/1]",
    rotate: -3,
  },
  {
    title: "Flash Deals",
    description: "Time-box a discount on any listing to move inventory fast. Set the clock, drop the price, buyers see the countdown and act.",
    image: "/bento/flash-deal.svg",
    colSpan: "md:col-span-2",
    imageScale: "scale-[0.69]",
    imageContainerClass: "aspect-[2/1] md:aspect-[3/1]",
    rotate: 4,
  },
  {
    title: "Credibility Score",
    description: "A visible trust score (0–100) built from response rate, active listings, offer conversion, and dispute history. Your campus reputation, quantified.",
    image: "/bento/credibility-score.png",
    colSpan: "md:col-span-2",
    imageScale: "scale-[0.62]",
    imageContainerClass: "aspect-[2/1] md:aspect-[3/1]",
    rotate: -4,
  },
  {
    title: "Your Own Storefront",
    description: "Every seller gets a branded page at yourname.zill.store. List products, show your credibility score, receive offers, all in one place.",
    image: "/bento/store-front.png",
    colSpan: "md:col-span-3",
    imageScale: "scale-[0.85]",
    imageContainerClass: "aspect-[3/1] md:aspect-[4/1]",
    rotate: 2,
  },
  {
    title: "Verified Students Only",
    description: "Every user is a verified student. No anonymous accounts, no outsiders. Just your campus community, building trust together.",
    image: "/bento/verified.svg",
    colSpan: "md:col-span-3",
    imageScale: "scale-[0.45]",
    imageContainerClass: "aspect-[3/1] md:aspect-[4/1]",
    rotate: -2,
  },
];

const TiltCard = ({ item, index }: { item: typeof items[0], index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spring physics for buttery smooth tilt return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  // Map mouse position to rotation (subtle, 5 degrees max)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const [isHovered, setIsHovered] = useState(false);
  const isActive = isMobile ? isInView : isHovered;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${item.colSpan} bento-card-new bg-white rounded-[32px] p-6 md:p-8 flex flex-col items-start justify-between shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-[#E5E5E5]/50 group cursor-pointer transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}
    >
      {/* Top Graphic Section */}
      <div className={`w-full relative ${item.imageContainerClass} mb-10 flex items-center justify-center`} style={{ transformStyle: "preserve-3d" }}>
        {/* Playful Spring Graphic using Framer Motion */}
        <motion.div
          animate={isActive ? { scale: 1.1, rotateZ: item.rotate, z: 40 } : { scale: 1, rotateZ: 0, z: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 12, mass: 0.8 }}
          className="w-full h-full relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`w-full h-full relative ${item.imageScale}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain drop-shadow-xl"
              priority={index < 3} // Prioritize LCP for top row
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Text Section */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-[19px] md:text-[21px] font-bold text-[#111111] mb-3 tracking-tight">
          {item.title}
        </h3>
        <p className="text-[#666666] text-[12px] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export function Features() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".bento-card-new");
      
      // Playful spring entrance
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.1,
        ease: "elastic.out(1, 0.7)", // Crazy bouncy ease
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="py-24 md:py-32 bg-[#F8F9FA] relative z-10">
      <div className="max-container w-full">
        
        {/* Title Block */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="text-[13px] font-medium text-[#666666] mb-4 block">
            What we Offer
          </span>
          <h2 className="text-4xl md:text-[44px] font-bold text-brand-dark leading-[1.1] tracking-tight mb-6">
            Everything campus commerce needs.<br />
            <span className="text-[#FF3700]">Nothing it doesn&apos;t.</span>
          </h2>
        </div>

        {/* New Bento Grid - Playful 3D UI */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-8"
          style={{ perspective: "1200px" }}
        >
          {items.map((item, i) => (
            <TiltCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
