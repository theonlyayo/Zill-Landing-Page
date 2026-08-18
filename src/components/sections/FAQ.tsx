"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    question: "What is Zill?",
    answer: "Zill is e-commerce infrastructure that connects buyers with trusted sellers, making it easier to discover, buy, and sell products."
  },
  {
    question: "Who can use Zill?",
    answer: "Anyone can use Zill to buy or sell, as long as they meet our requirements."
  },
  {
    question: "Is Zill only for students?",
    answer: "No. Zill started with students in mind, but we're building infrastructure for everyone—across campuses, cities, and eventually Africa."
  },
  {
    question: "How do I buy something?",
    answer: "Find a product, check the seller, add it to your cart, and checkout securely. Simple."
  },
  {
    question: "Can I trust sellers on Zill?",
    answer: "Zill provides seller profiles, ratings, reviews, and trust features to help you make informed decisions."
  },
  {
    question: "How do payments work?",
    answer: "Payments are processed securely through our supported payment providers. Available methods may vary by location."
  },
  {
    question: "When does a seller get paid?",
    answer: "Seller payments are settled according to Zill's transaction and settlement rules after the required conditions are met."
  },
  {
    question: "How do I become a seller?",
    answer: "Create an account, complete seller onboarding, add your products, and start selling."
  },
  {
    question: "Can I sell from anywhere?",
    answer: "Yes. Zill is built to help sellers reach customers beyond their immediate location, subject to available delivery options."
  },
  {
    question: "What if there's a problem with my order?",
    answer: "Report the issue through Zill Support. We'll review eligible disputes and help work toward a resolution."
  },
  {
    question: "What if I receive the wrong or damaged product?",
    answer: "Report it as soon as possible with your order details. Your case will be reviewed under Zill's buyer and dispute policies."
  },
  {
    question: "Is my information safe?",
    answer: "We take privacy and security seriously. Your information is handled according to our Privacy Policy and applicable laws."
  },
  {
    question: "What products can I sell?",
    answer: "You can sell products allowed under Zill's marketplace rules and applicable laws. Some products may be restricted."
  },
  {
    question: "Does Zill offer delivery?",
    answer: "Delivery options depend on the seller, location, product, and available logistics partners."
  },
  {
    question: "How do I contact Zill?",
    answer: "Need help? Reach out through our official Zill Support channels."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#F9F9F9] relative z-10">
      <div className="max-container w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Title & Copy */}
          <div className="flex-1 w-full lg:max-w-md flex flex-col items-start lg:sticky lg:top-32 self-start">
            <ScrollReveal>
              <span className="text-[13px] font-medium text-[#666666] mb-4 block">
                FAQ
              </span>
              <h2 className="text-4xl md:text-[44px] font-bold text-brand-dark leading-[1.1] tracking-tight mb-6">
                Frequently Asked<br />
                <span className="text-[#FF3700]">Questions.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[14px] text-[#666666] leading-relaxed mb-8 max-w-[560px]">
                <strong className="block mb-2 font-medium text-brand-dark">Still have questions?</strong>
                We&apos;re here to help. Contact Zill Support.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <a href="mailto:zealtozill.info@gmail.com"><Button variant="dark">Get Help</Button></a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Accordion */}
          <div className="flex-1 w-full">
            <div className="flex flex-col border-t border-[#EAEAEA]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <ScrollReveal key={index} delay={0.03 * (index % 10)}>
                    <div className="border-b border-[#EAEAEA]">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
                      >
                        <span className={`text-[18px] md:text-[22px] font-medium tracking-tight transition-colors duration-400 pr-6 ${isOpen ? "text-[#FF3700]" : "text-brand-dark group-hover:text-[#FF3700]"}`}>
                          {faq.question}
                        </span>
                        <div className="ml-4 flex-shrink-0 relative w-6 h-6 flex items-center justify-center text-brand-dark">
                          {/* Horizontal line */}
                          <motion.span 
                            className={`absolute w-[18px] h-[2px] rounded-full transition-colors duration-400 ${isOpen ? "bg-[#FF3700]" : "bg-current group-hover:bg-[#FF3700]"}`}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                          {/* Vertical line */}
                          <motion.span 
                            className={`absolute w-[18px] h-[2px] rounded-full transition-colors duration-400 ${isOpen ? "bg-[#FF3700]" : "bg-current group-hover:bg-[#FF3700]"}`}
                            animate={{ rotate: isOpen ? 180 : 90, opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                              className="pb-6 md:pb-8"
                            >
                              <p className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-[540px]">
                                {faq.answer}
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
