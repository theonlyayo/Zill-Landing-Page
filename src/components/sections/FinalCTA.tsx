"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function FinalCTA() {
  return (
    <section className="section-padding bg-white dark:bg-[#000000] transition-colors duration-500 ease-in-out">
      <div className="max-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-4xl md:text-[44px] font-bold text-brand-dark dark:text-white leading-[1.1] tracking-tight mb-6">
              Ready to start selling?
            </h2>
            <p className="text-base md:text-lg text-brand-gray max-w-lg">
              Join the waitlist and be among the first MTU students to claim
              your storefront when Zill launches.
            </p>
            <WaitlistForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
