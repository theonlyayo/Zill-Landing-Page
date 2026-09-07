"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";

const members = [
  {
    name: "Divine",
    role: "Founder & Team Lead",
    image: "/team/UTIBE.jpg",
    hoverImage: "/team/UTIBE.jpg",
  },
  {
    name: "Steven",
    role: "Tech Officer & Product Lead",
    image: "https://ui-avatars.com/api/?name=Steven&background=F5F5F5&color=000&size=800",
    hoverImage: "https://ui-avatars.com/api/?name=Steven&background=FF3700&color=fff&size=800",
  },
  {
    name: "Ayomide",
    role: "UI/UX & Frontend Dev",
    image: "/team/Ayo.png",
    hoverImage: "/team/Ayo.png",
  },
  {
    name: "Patrick",
    role: "Full-Stack Developer",
    image: "https://ui-avatars.com/api/?name=Patrick&background=F5F5F5&color=000&size=800",
    hoverImage: "https://ui-avatars.com/api/?name=Patrick&background=FF3700&color=fff&size=800",
  },
  {
    name: "Oyinda",
    role: "Frontend Developer",
    image: "/team/Oyinda.jpeg",
    hoverImage: "/team/Oyinda.jpeg",
  },
  {
    name: "Ini",
    role: "Product Research Analyst",
    image: "https://ui-avatars.com/api/?name=Ini&background=F5F5F5&color=000&size=800",
    hoverImage: "https://ui-avatars.com/api/?name=Ini&background=FF3700&color=fff&size=800",
  },
  {
    name: "Funsho",
    role: "Operations & QA Associate",
    image: "/team/Funsho.jpeg",
    hoverImage: "/team/Funsho.jpeg",
  },
  {
    name: "Precious",
    role: "Business Analyst & Strategy",
    image: "https://ui-avatars.com/api/?name=Precious&background=F5F5F5&color=000&size=800",
    hoverImage: "https://ui-avatars.com/api/?name=Precious&background=FF3700&color=fff&size=800",
  },
  {
    name: "Oreoluwa",
    role: "Innovation & Strategy Advisor",
    image: "/team/Ore.jpeg",
    hoverImage: "/team/Ore.jpeg",
  },
  {
    name: "Tolu",
    role: "Social Media & Digital Marketing",
    image: "/team/Tolu.jpeg",
    hoverImage: "/team/Tolu.jpeg",
  },
  {
    name: "Seyi",
    role: "Community & Brand Engagement",
    image: "/team/Seyi.jpeg",
    hoverImage: "/team/Seyi.jpeg",
  },
  {
    name: "Elizabeth",
    role: "Finance & Investment Analyst",
    image: "https://ui-avatars.com/api/?name=Elizabeth&background=F5F5F5&color=000&size=800",
    hoverImage: "https://ui-avatars.com/api/?name=Elizabeth&background=FF3700&color=fff&size=800",
  }
];

export function CampusYearbook() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen bg-white dark:bg-[#000000] w-full flex flex-col font-sans"
    >
      <Navbar forceShow={true} />

      <main className="flex-1 w-full pt-32 pb-24">
        <div className="max-container w-full">
          
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666666] hover:text-[#111111] dark:hover:text-[#FFFFFF] mb-12 transition-colors group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#666666] group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF] transition-colors">
              <path d="M17.9998 12V14.67C17.9998 17.98 15.6498 19.34 12.7798 17.68L10.4698 16.34L8.15982 15C5.28982 13.34 5.28982 10.63 8.15982 8.96999L10.4698 7.62999L12.7798 6.28999C15.6498 4.65999 17.9998 6.00999 17.9998 9.32999V12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          
          <div className="mb-16">
             <span className="text-[13px] font-medium text-[#666666] dark:text-[#A0A0A0] mb-4 block">
                The Zill Team
              </span>
              <h2 className="text-4xl md:text-[44px] font-bold text-[#111111] dark:text-white leading-[1.1] tracking-tight max-w-2xl">
                The Students Behind<br/>
                <span className="text-[#FF3700]">The Marketplace.</span>
              </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>

        </div>
      </main>
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="flex flex-col group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden mb-4 bg-[#F7F7F7]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={member.hoverImage}
          alt={`${member.name} candid`}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
        />
      </div>
      <div>
        <h3 className="font-bold text-brand-dark dark:text-white text-[16px]">{member.name}</h3>
        <p className="text-[#666666] dark:text-[#A0A0A0] text-sm">{member.role}</p>
      </div>
    </motion.div>
  );
}
