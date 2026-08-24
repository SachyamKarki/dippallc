import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Dippa IT Solutions",
  description: "How Dippa IT Solutions collects, uses, and protects your information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly when you contact us, request a consultation, or subscribe to our newsletter. This includes:

• **Contact information** — name, email address, phone number, and company name.
• **Communication data** — messages, enquiries, and correspondence you send us.
• **Technical data** — IP address, browser type, and pages visited when you use our website.
• **Newsletter preferences** — your email address and subscription status.

We do not collect sensitive personal data such as financial information, government IDs, or health records through this website.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your enquiries and provide the services you request.
• Send newsletters and IT insights you have opted into.
• Improve our website, services, and communications.
• Comply with legal obligations and protect against fraudulent activity.
• Contact you about relevant service updates or offers (you may opt out at any time).

We will never sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    title: "3. Data Sharing",
    content: `We may share your information with trusted third-party service providers who assist us in operating our website and delivering our services — such as email delivery platforms, analytics providers, and cloud infrastructure partners. These parties are contractually required to keep your information confidential and use it only for the purposes we specify.

We may also disclose information when required by law, court order, or government authority.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Contact enquiries are typically retained for up to 3 years. Newsletter subscribers are retained until they unsubscribe. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: "5. Cookies",
    content: `Our website uses cookies and similar technologies. When you first visit, we ask you to accept cookies or continue with essential cookies only. Your choice is stored on this device. You can change it at any time using Cookie settings in the website footer.

• **Essential cookies** — required for the site to function correctly, including remembering your cookie preference.
• **Analytics cookies** — used only if you accept all cookies, to understand traffic patterns and improve the site.

Disabling non-essential cookies will not prevent you from using the website.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

• **Access** — request a copy of the personal data we hold about you.
• **Correction** — request correction of inaccurate or incomplete data.
• **Deletion** — request erasure of your personal data.
• **Objection** — object to processing of your data for marketing purposes.
• **Portability** — request your data in a structured, machine-readable format.

To exercise any of these rights, contact us at info@thedippa.com.`,
  },
  {
    title: "7. Security",
    content: `We implement industry-standard technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of our website after changes are posted constitutes your acceptance of the revised policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy or how we handle your data, please contact us:\n\nDippa IT Solutions\n270 17th St NW, Atlanta, GA 30363-1205, United States\nEmail: info@thedippa.com`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-hero">
        <div className="legal-hero-inner section-shell">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Last updated: June 2025</p>
        </div>
      </div>

      <div className="legal-body section-shell">
        <div className="legal-intro">
          <p>
            Dippa IT Solutions (&quot;Dippa&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully.
          </p>
        </div>

        <div className="legal-sections">
          {SECTIONS.map((section) => (
            <div key={section.title} className="legal-section">
              <h2 className="legal-section-title">{section.title}</h2>
              <div className="legal-section-body">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>")
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="legal-footer-note">
          <Link href="/terms" className="legal-related-link">Terms of Service →</Link>
          <Link href="/" className="legal-related-link">← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
