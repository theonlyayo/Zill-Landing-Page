import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { Features } from "@/components/sections/Features";
import { CreditTrail } from "@/components/sections/CreditTrail";
import { Trust } from "@/components/sections/Trust";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="our-story">
        <OurStory />
      </section>
      <section id="features">
        <Features />
      </section>
      <CreditTrail />
      <section id="trust">
        <Trust />
      </section>
      <section id="team">
        <Team />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
