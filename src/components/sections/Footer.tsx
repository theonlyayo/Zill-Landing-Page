import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white py-16 px-6 md:px-12 border-t border-[#EAEAEA]">
      <div className="max-container w-full flex flex-col gap-16">
        
        {/* Top: Logo & Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Zill Logo"
                width={32}
                height={38}
                className="w-auto h-10"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-2xl lg:ml-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-semibold text-brand-dark uppercase tracking-wider mb-2">Platform</h4>
              <Link href="/#our-story" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Our Story</Link>
              <Link href="/#features" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Features</Link>
              <Link href="/#trust" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Trust & Safety</Link>
              <Link href="/#team" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Meet the Team</Link>
              <Link href="/#faq" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">FAQ</Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-semibold text-brand-dark uppercase tracking-wider mb-2">Support</h4>
              <Link href="/#faq" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Help Center</Link>
              <a href="mailto:hello@zill.store" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Contact Us</a>
              <a href="mailto:hello@zill.store" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Report an Issue</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-semibold text-brand-dark uppercase tracking-wider mb-2">Legal</h4>
              <Link href="/privacy" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[14px] text-[#666666] hover:text-[#FF3700] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="w-full bg-[#FF3700] rounded-full py-3 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[14px] font-medium text-white/90 text-center md:text-left">
            © {new Date().getFullYear()} Zill. All Rights Reserved.
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {/* Twitter/X */}
            <a href="#" aria-label="Zill on Twitter" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Zill on Instagram" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:hello@zill.store" aria-label="Email Zill" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M2 4L12 13L22 4"></path>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
