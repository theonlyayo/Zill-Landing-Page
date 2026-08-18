import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OurStoryPage() {
  return (
    <main className="bg-white dark:bg-[#111111] min-h-screen pt-32 pb-24">
      <article className="max-container">
        <div className="w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#8b8ba7] hover:text-[#111111] dark:text-white mb-12 transition-colors">
          <Image src="/arrow-left.svg" alt="Back" width={16} height={16} className="w-4 h-4" /> Back to Home
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] dark:text-white tracking-tight mb-8">
            A Zeal Became ZILL
          </h1>
          <div className="flex flex-row items-center gap-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden shadow-sm">
              <Image 
                src="/utibe.jpg" 
                alt="Essien-Ekanem Utibe"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-[#111111] dark:text-white text-[16px]">Essien-Ekanem Utibe</div>
              <div className="text-[14px] text-[#FF3700] font-medium">Founder</div>
            </div>
          </div>
        </header>

        <div className="text-[#444444] font-medium text-[16px] leading-[1.8] space-y-6">
          <p>My name is Utibeabasi.</p>
          
          <p>Before ZILL was a platform, before there was a team, before there was a product people could actually use, there was just me, a few products, and a problem I couldn't seem to solve.</p>
          
          <p>I was a young boy trying to push my brand, get more visibility, and sell my products faster. I tried everything I could think of. I worked through different channels. I collaborated with different brands and product owners. I bought products, resold them, experimented with different ways of reaching customers, and kept searching for that one thing that would make selling easier.</p>
          
          <p>But I kept hitting the same wall. The products were there. The buyers were there. But the connection between them wasn't good enough. And that frustrated me.</p>
          
          <p>Because I realized that I wasn't the only one struggling. There were students on campuses creating products, running small businesses, reselling products, and trying to make something for themselves. They had the products. They had the ambition. They just didn't always have the visibility.</p>
          
          <p>At the same time, buyers had their own problems. Finding products could be stressful. Getting information often meant sending messages back and forth.</p>
          
          <blockquote className="border-l-4 border-[#FF3700] pl-6 my-8 italic text-[#666666] dark:text-[#A0A0A0]">
            <p className="mb-2">&quot;Do you have this?&quot;</p>
            <p className="mb-2">&quot;How much is it?&quot;</p>
            <p className="mb-2">&quot;Is it still available?&quot;</p>
            <p className="mb-2">&quot;Can I see another picture?&quot;</p>
            <p>&quot;How do I know I can trust this?&quot;</p>
          </blockquote>
          
          <p>And sometimes, the buyer simply had to rely on whatever the seller told them.</p>
          
          <p>That's when I started asking myself questions. What if there was an infrastructure that could help campus traders and businesses struggling with sales and visibility? What if sellers could have a proper digital storefront instead of depending entirely on social media posts, status updates, or word of mouth?</p>
          
          <p>What if buyers could walk into that storefront themselves? See the products. Explore their options. Compare. Choose. And make their own decisions.</p>
          
          <p>What if there was a platform that didn't require me or anyone else to decide what a buyer should see based on what they told me? What if the products could simply be there, waiting to be discovered?</p>
          
          <p>And then came an even bigger question: <strong className="text-[#111111] dark:text-white">What if the transaction itself could be safer, more transparent, and built around trust?</strong></p>
          
          <p>That question stayed with me. Because I didn't want to build just another marketplace. I didn't want to create some generic corporate app that tried to serve everyone but truly understood no one.</p>
          
          <p>I wanted something that understood students. Something built around the way students actually buy, sell, discover, and make decisions. Something fast. Something local. Something human. Something that could become part of the student economy instead of simply observing it from the outside.</p>
          
          <p>The idea had actually been living in my head since secondary school. But an idea is easy to have. Building it is the hard part.</p>
          
          <p>At the beginning, I didn't have enough tools to bring everything to life. I didn't have the perfect resources. I didn't have the perfect team. But I refused to let that stop me.</p>
          
          <p>So I started preparing anyway. I gathered my thoughts. I analyzed the problem. I documented the system requirements. I thought about how buyers should interact with products. I thought about how sellers should manage their businesses. I thought about trust. I thought about transactions. I thought about the campus environment.</p>
          
          <p>I kept asking questions and turning those questions into things that could eventually be built. I was preparing for something I couldn't fully see yet.</p>
          
          <p>Then came 2025.</p>
          
          <p>And suddenly, the idea that had been sitting in my head since secondary school had a chance to become real. This time, I wasn't alone. I found an amazing team. People who believed in the problem. People who understood the vision. People who were willing to work their fingers to the bone to bring something that started as a thought into the real world.</p>
          
          <p>And together, we began building. The vision started taking shape. The conversations became designs. The designs became systems. The systems became a product. And the product became something bigger than the original idea.</p>
          
          <p>That is how ZILL began.</p>
          
          <h3 className="text-2xl font-bold text-[#111111] dark:text-white mt-16 mb-6">A Zeal Became ZILL</h3>
          
          <p>I started with a problem. Then came the questions. Then came the countless ideas, late nights, sketches, research, system requirements, and conversations about what a better marketplace could look like for students.</p>
          
          <p>I didn't have everything figured out. I didn't even have all the tools to build it.</p>
          
          <p>But I had something stronger: <strong className="text-[#111111] dark:text-white">Zeal.</strong></p>
          
          <p>The zeal to solve a problem I had personally experienced. The zeal to make selling easier for students. The zeal to give buyers a place where they could discover products for themselves. The zeal to build something that didn't just look like a marketplace, but actually understood the people using it.</p>
          
          <p>That zeal kept growing. And when the right people, tools, and opportunity finally came together in 2025, that zeal had nowhere else to go.</p>
          
          <p>It became something. It became a team. It became a vision. It became a product.</p>
          
          <p className="text-2xl font-bold text-[#111111] dark:text-white mt-16 leading-[1.4]">
            And eventually...<br/>That zeal became ZILL.
          </p>
        </div>

        </div>
        <div className="w-full mt-16 pt-10 border-t border-gray-100 flex justify-start">
          <Link href="/">
            <Button variant="dark">Join the waitlist today</Button>
          </Link>
        </div>
      </article>
    </main>
  );
}
