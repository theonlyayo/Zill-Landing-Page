import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <main className="bg-white dark:bg-[#111111] min-h-screen pt-32 pb-24">
        <article className="max-container w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#8b8ba7] hover:text-[#111111] dark:text-white mb-12 transition-colors">
            <Image src="/arrow-left.svg" alt="Back" width={16} height={16} className="w-4 h-4" /> Back to Home
          </Link>
          
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] dark:text-white tracking-tight mb-8">Zill Terms and Conditions</h1>
            <p className="text-[#666666] dark:text-[#A0A0A0]">Effective Date: August 14, 2026<br/>Last Updated: August 14, 2026</p>
          </header>

          <div className="text-[#444444] text-[16px] leading-[1.8] space-y-6 w-full">
            <p>Welcome to Zill.</p>
            <p>
              These Terms and Conditions (“Terms”) govern your access to and use of the Zill platform, including our website, applications, marketplace, payment features, communications, and related services.
            </p>
            <p>By creating an account or using Zill, you agree to these Terms.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">1. About Zill</h2>
            <p>Zill provides an online marketplace that allows users to discover, list, buy, sell, and interact regarding products and services. Zill may facilitate communication, payments, delivery, dispute handling, and other aspects of transactions, but Zill is not necessarily the seller or owner of products listed by independent sellers.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">2. Eligibility</h2>
            <p>You may use Zill only if you are legally capable of entering into a binding agreement under applicable law. If you are using Zill on behalf of a business or organization, you confirm that you have authority to bind that organization.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">3. Accounts</h2>
            <p>You may be required to create an account to access certain features. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Provide accurate information</li>
              <li>Keep your information updated</li>
              <li>Protect your password and authentication credentials</li>
              <li>Not share your account with unauthorized persons</li>
              <li>Notify Zill of unauthorized access</li>
              <li>Not create accounts for fraudulent purposes</li>
            </ul>
            <p>You are responsible for activity conducted through your account unless caused by circumstances for which you are not legally responsible.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">4. Seller Responsibilities</h2>
            <p>Sellers must:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Provide accurate product descriptions</li>
              <li>Use genuine images or clearly identify representative images</li>
              <li>Set accurate prices</li>
              <li>Maintain reasonable product availability</li>
              <li>Fulfill legitimate orders</li>
              <li>Comply with applicable laws</li>
              <li>Avoid counterfeit, stolen, dangerous, or prohibited products</li>
              <li>Treat buyers fairly</li>
              <li>Provide accurate delivery information</li>
            </ul>
            <p>Zill may remove listings or restrict accounts that violate these requirements.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">5. Prohibited Activities</h2>
            <p>Users may not use Zill to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Commit fraud</li>
              <li>Scam other users</li>
              <li>Sell stolen goods</li>
              <li>Sell counterfeit goods</li>
              <li>Sell prohibited or illegal products</li>
              <li>Manipulate reviews or ratings</li>
              <li>Create fake accounts</li>
              <li>Circumvent platform restrictions</li>
              <li>Upload malicious software</li>
              <li>Attempt unauthorized access</li>
              <li>Harass or threaten users</li>
              <li>Misrepresent products</li>
              <li>Manipulate transactions</li>
              <li>Use Zill for unlawful purposes</li>
            </ul>
            <p>Additional prohibited products or activities may be listed in Zill&apos;s Prohibited Items Policy.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">6. Payments</h2>
            <p>Payments may be processed through third-party payment providers. Users agree to provide accurate payment and transaction information. Zill may temporarily restrict transactions where fraud, security concerns, disputes, or legal requirements require investigation.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">7. Refunds and Cancellations</h2>
            <p>Refunds, cancellations, returns, and disputes may be governed by Zill&apos;s applicable Buyer Protection and Refund Policy. Nothing in these Terms removes rights that consumers have under applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">8. Reviews and User Content</h2>
            <p>Users may be allowed to submit reviews, ratings, images, comments, and other content. You must not submit content that is false or deliberately misleading, defamatory, abusive, illegal, infringing, threatening, malicious, or designed to manipulate marketplace rankings.</p>
            <p>By submitting content, you grant Zill permission to use, display, reproduce, and distribute that content as reasonably necessary to operate and promote the Services, subject to applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">9. Intellectual Property</h2>
            <p>Zill&apos;s branding, software, design, logos, trademarks, content, and other platform materials belong to Zill or its licensors unless otherwise stated. You may not copy, reproduce, modify, distribute, reverse engineer, or commercially exploit Zill&apos;s protected materials without appropriate authorization.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">10. Account Suspension</h2>
            <p>Zill may suspend, restrict, or terminate an account where we reasonably believe that the user violated these Terms, fraud occurred, the account presents a security risk, the user violated applicable law, the user threatens other users or the platform, or the account is being used abusively.</p>
            <p>Where appropriate, Zill may provide notice and an opportunity to appeal.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">11. Platform Availability</h2>
            <p>Zill may temporarily modify, suspend, or discontinue portions of the Services for maintenance, security, technical, operational, or business reasons. We will take reasonable steps to minimize disruption where practical.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">12. Disputes</h2>
            <p>Users should first attempt to resolve transaction-related issues through Zill&apos;s designated dispute-resolution process where available. Nothing in these Terms prevents a user from exercising legal rights available under applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">13. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Zill will not be liable for indirect, incidental, special, consequential, or unforeseeable losses arising from use of the marketplace. Nothing in these Terms excludes liability that cannot legally be excluded.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">14. Changes to These Terms</h2>
            <p>Zill may update these Terms from time to time. Continued use of Zill after updated Terms become effective may constitute acceptance of the revised Terms where permitted by applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">15. Governing Law</h2>
            <p>These Terms shall be interpreted in accordance with the laws applicable to Zill and its users, subject to any mandatory consumer-protection or other legal requirements that apply.</p>
            <p><strong>Jurisdiction:</strong> Federal Republic of Nigeria</p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-12 mb-6">16. Contact</h2>
            <p>For questions regarding these Terms:</p>
            <p className="mt-4">
              <strong>Zill</strong><br/>
              <strong>Email:</strong> zealtozill.info@gmail.com<br/>
              <strong>Website:</strong> https://zill.store
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
