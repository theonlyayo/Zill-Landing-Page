"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";

const members = [
  {
    name: "Sophia Benett",
    role: "Co-Founder & CEO",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/8fd4d2a3-a363-4658-d6ee-84790bc8f300/w=800",
    hoverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Isabella Foster",
    role: "Co-Founder & COO",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/4d1fe81d-5289-4e08-b381-03e4e9efed00/w=800",
    hoverImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Grace Turner",
    role: "Head of Product",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6ab26fe4-5016-4c65-01e8-b3a71ea08200/w=800",
    hoverImage: "https://images.unsplash.com/photo-1543269664-56d5d51436fd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Olivia Parker",
    role: "Lead Engineer",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/4b1ec233-9a09-4483-1adb-404a93094100/w=800",
    hoverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Lucas Turner",
    role: "Frontend Developer",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/20fd03c3-49d6-408c-3ac9-8c5a6ed2b500/w=800",
    hoverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Emma Collins",
    role: "Product Designer",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c84f3e45-635f-4eaa-4e24-730098b55500/w=800",
    hoverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mia Carter",
    role: "Marketing Lead",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/3b42034b-897e-456d-cb00-1f2cf0aa4700/w=800",
    hoverImage: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ella Morgan",
    role: "Community Manager",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/9652cf81-4644-4471-1122-4e40ef6e2600/w=800",
    hoverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marcus Reed",
    role: "Backend Engineer",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/f8b3688c-11d0-425c-0b6f-66f133322c00/w=800",
    hoverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Julia Chen",
    role: "Operations",
    image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c083d83a-f5a4-4434-989f-4eaa9bbe7500/w=800",
    hoverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
  },
];

export function CampusYearbook() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen bg-white w-full flex flex-col font-sans"
    >
      <Navbar forceShow={true} />

      {/* Main Content */}
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="max-container w-full">
          
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#8b8ba7] hover:text-[#111111] mb-12 transition-colors">
            <Image src="/arrow-left.svg" alt="Back" width={16} height={16} className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="mb-16">
             <span className="text-[13px] font-medium text-[#666666] mb-4 block">
                The Zill Team
              </span>
              <h2 className="text-4xl md:text-[44px] font-bold text-[#111111] leading-[1.1] tracking-tight max-w-2xl">
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
        {/* Primary Image */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        {/* Secondary (Hover) Image */}
        <Image
          src={member.hoverImage}
          alt={`${member.name} candid`}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
        />
      </div>
      <div>
        <h3 className="font-bold text-brand-dark text-[16px]">{member.name}</h3>
        <p className="text-[#666666] text-sm">{member.role}</p>
      </div>
    </motion.div>
  );
}
