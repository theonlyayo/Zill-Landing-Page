import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-white min-h-screen pt-32 pb-24">
        <article className="max-container w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#8b8ba7] hover:text-[#111111] mb-12 transition-colors">
            <Image src="/arrow-left.svg" alt="Back" width={16} height={16} className="w-4 h-4" /> Back to Home
          </Link>
          
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-8">Zill Privacy Policy</h1>
            <p className="text-[#666666]">Effective Date: August 14, 2026<br/>Last Updated: August 14, 2026</p>
          </header>

          <div className="text-[#444444] text-[16px] leading-[1.8] space-y-6 w-full">
            <p>
              Zill (“Zill”, “we”, “us”, or “our”) operates an online marketplace designed to connect buyers and sellers and make commerce more accessible, trustworthy, and convenient.
            </p>
            <p>
              This Privacy Policy explains how Zill collects, uses, stores, protects, and otherwise processes personal information when you access or use our website, mobile application, marketplace, payment features, communications, and related services (collectively, the “Services”).
            </p>
            <p>
              By using Zill, you acknowledge that you have read and understood this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">1. Information We Collect</h2>
            <p>Depending on how you use Zill, we may collect the following categories of information:</p>
            
            <h3 className="text-xl font-semibold text-[#111111] mt-8 mb-4">A. Information You Provide</h3>
            <p>This may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Full name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Account username</li>
              <li>Password or authentication information</li>
              <li>Profile information</li>
              <li>Delivery address</li>
              <li>Billing information</li>
              <li>Seller/business information</li>
              <li>Product information and listings</li>
              <li>Customer support communications</li>
              <li>Reviews, ratings, comments, and other content you submit</li>
              <li>Information provided during verification or dispute resolution</li>
            </ul>
            <p>We will only request information that is reasonably necessary for the relevant service.</p>

            <h3 className="text-xl font-semibold text-[#111111] mt-8 mb-4">B. Transaction Information</h3>
            <p>When you purchase or sell through Zill, we may process information relating to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Products purchased or sold</li>
              <li>Transaction amounts</li>
              <li>Order information</li>
              <li>Payment status</li>
              <li>Delivery information</li>
              <li>Refunds and cancellations</li>
              <li>Transaction history</li>
            </ul>
            <p>Payment card or bank information may be processed by third-party payment providers. Zill may not directly store complete payment-card credentials where the payment provider handles such information.</p>

            <h3 className="text-xl font-semibold text-[#111111] mt-8 mb-4">C. Automatically Collected Information</h3>
            <p>When you use our Services, we may automatically collect information such as:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>IP address</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Device identifiers</li>
              <li>Approximate location information</li>
              <li>Pages or features accessed</li>
              <li>Usage patterns</li>
              <li>Login information</li>
              <li>Technical and diagnostic information</li>
            </ul>
            <p>We use this information to operate, secure, improve, and understand our Services.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">2. How We Use Your Information</h2>
            <p>Zill may use personal information to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Create and manage user accounts</li>
              <li>Facilitate purchases and sales</li>
              <li>Process and verify transactions</li>
              <li>Facilitate delivery</li>
              <li>Communicate with users</li>
              <li>Provide customer support</li>
              <li>Verify accounts and prevent fraud</li>
              <li>Detect suspicious or illegal activity</li>
              <li>Protect users and the integrity of the marketplace</li>
              <li>Improve our products and services</li>
              <li>Personalize the user experience</li>
              <li>Conduct analytics and research</li>
              <li>Send service-related notifications</li>
              <li>Send marketing communications where permitted</li>
              <li>Comply with applicable laws and legal obligations</li>
              <li>Enforce our Terms and other policies</li>
              <li>Resolve disputes</li>
              <li>Protect the rights, property, and safety of Zill, our users, and third parties</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">3. Legal Basis for Processing</h2>
            <p>Where applicable, Zill processes personal data on one or more lawful bases, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Performance of a contract</li>
              <li>Compliance with legal obligations</li>
              <li>Consent</li>
              <li>Legitimate interests</li>
              <li>Protection of vital interests</li>
              <li>Other lawful bases permitted under applicable data-protection laws</li>
            </ul>
            <p>Where processing is based on consent, you may withdraw your consent subject to applicable legal and operational limitations.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">4. Information Shared With Other Users</h2>
            <p>Because Zill operates as a marketplace, certain information may need to be visible to other users.</p>
            <p>For example, seller information may be displayed on a seller profile or product listing, while information necessary to complete an order may be shared with the relevant seller or delivery provider.</p>
            <p>Zill does not intend to publicly display sensitive personal information that is unnecessary for marketplace operations.</p>
            <p>Users are responsible for avoiding the publication of unnecessary personal information in product descriptions, reviews, messages, or other public areas of the platform.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">5. Service Providers</h2>
            <p>Zill may work with trusted third-party providers that assist us with payment processing, delivery and logistics, cloud hosting, authentication, analytics, communication, customer support, fraud prevention, security, and technical infrastructure. These providers may process information only as necessary to provide their services to Zill and subject to appropriate contractual or legal safeguards where required.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">6. Payments</h2>
            <p>Payments made through Zill may be processed through third-party payment processors. Where applicable, payment providers may collect and process financial information under their own privacy policies and terms. Zill does not guarantee the security, availability, or uninterrupted operation of third-party payment services, although we take reasonable steps to work with reputable providers.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">7. Fraud Prevention and Security</h2>
            <p>Zill may analyze account, device, transaction, behavioral, and marketplace information to identify fraud, account abuse, fake accounts, payment abuse, scams, suspicious transactions, platform manipulation, or other activities that may threaten users or Zill. We may restrict, suspend, or terminate accounts where we reasonably believe such action is necessary to protect the platform or its users.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">8. Data Security</h2>
            <p>We implement reasonable technical and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure. However, no internet-based service can guarantee absolute security. You are responsible for protecting your account credentials and should immediately notify Zill if you believe your account has been compromised.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">9. Data Retention</h2>
            <p>Zill retains personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy. When information is no longer reasonably required, we may delete, anonymize, or securely dispose of it, subject to applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">10. Your Privacy Rights</h2>
            <p>Subject to applicable law, you may have rights concerning your personal information, including the right to request access, correction, or deletion. To make a privacy request, contact:</p>
            <p className="mt-4">
              <strong>Privacy Contact:</strong> hello@zill.store<br/>
              <strong>Data Protection Contact:</strong> hello@zill.store
            </p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">11. Children&apos;s Privacy</h2>
            <p>Zill is not designed to knowingly collect personal information from children where such collection is prohibited by applicable law.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">12. International Data Transfers</h2>
            <p>Zill may use service providers or infrastructure located outside the country in which you live. Where personal information is transferred across borders, Zill will take steps required by applicable data-protection laws to protect that information.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">13. Marketing Communications</h2>
            <p>Where permitted by law, Zill may send you information about products, services, promotions, or other marketplace activities. You may opt out of promotional communications by following the unsubscribe instructions provided in the communication or by contacting us.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">14. Cookies and Similar Technologies</h2>
            <p>Zill may use cookies, pixels, local storage, and similar technologies to keep users signed in, remember preferences, understand how our Services are used, improve performance, protect against fraud, and measure marketing effectiveness.</p>

            <h2 className="text-2xl font-bold text-[#111111] mt-12 mb-6">15. Third-Party Services and Links</h2>
            <p>Zill may contain links to third-party websites, applications, payment services, delivery services, or other platforms. We are not responsible for the privacy practices of these third parties.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
