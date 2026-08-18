"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  if (pathname === "/team" && !forceShow) {
    return null;
  }

  const navLinks = [
    { label: "Our Story", href: "/#our-story" },
    { label: "What we Offer", href: "/#features" },
    { label: "Trust & Safety", href: "/#trust" },
    { label: "Meet the Team", href: "/#team" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-container py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Zill Logo"
              width={32}
              height={38}
              className="w-auto h-9"
              priority
            />
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="font-archivo text-[#666666] hover:text-[#111111] text-[14px] font-medium transition-colors duration-300 ease-in-out"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Secondary Button & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:block">
            <Button
              variant="dark"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Join our Community
            </Button>
          </div>
          
          {/* Hamburger Menu Toggle (Mobile only) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-brand-dark mb-1.5 block rounded-full origin-center"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-brand-dark mb-1.5 block rounded-full"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-brand-dark block rounded-full origin-center"
            />
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#EAEAEA] md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-archivo text-[#111111] text-[18px] font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-6 border-t border-[#EAEAEA]">
                <Button
                  variant="dark"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Join our Community
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
