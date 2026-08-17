"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { KlarnaCarousel } from "@/components/ui/KlarnaCarousel";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Team() {
  return (
    <section className="py-24 md:py-32 bg-white relative z-10">
      <div className="max-container w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Copy & Actions */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-start">
            <ScrollReveal>
              <span className="text-[13px] font-medium text-[#666666] mb-4 block">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-[44px] font-bold text-brand-dark leading-[1.1] tracking-tight mb-6">
                Built by Students,<br className="hidden md:block" /> <span className="text-[#FF3700]">for Students.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-[14px] text-[#666666] leading-relaxed mb-8 max-w-[560px]">
                We&apos;re a small team of Mountain Top University students who got
                tired of the same broken buying and selling experience on campus.
                So we built the solution ourselves. Zill isn&apos;t a project from
                some outside company — it&apos;s built by the people who actually
                use it, on the campus where it runs.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <Link href="/team">
                  <Button variant="dark">Meet the team</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Carousel */}
          <div className="flex-1 w-full relative flex items-center justify-center lg:justify-end min-h-[650px]">
            <ScrollReveal delay={0.3} className="w-full h-full absolute inset-0">
              <KlarnaCarousel backgroundColor="#ffffff" />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
