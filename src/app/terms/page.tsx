import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Dippa IT Solutions",
  description: "Terms and conditions governing the use of Dippa IT Solutions services and website.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Dippa IT Solutions website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, clients, and users who access or use our services.`,
  },
  {
    title: "2. Services",
    content: `Dippa IT Solutions provides managed IT services, infrastructure support, software development, AI automation, network management, cybersecurity solutions, and related technology consulting services.

The scope, deliverables, timelines, and pricing of specific engagements are defined in separate service agreements or statements of work entered into with each client. These Terms of Service govern general use of our website and establish the baseline conditions for all client relationships.`,
  },
  {
    title: "3. Use of Website",
    content: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:

• Use the site in any way that violates applicable local, national, or international laws or regulations.
• Transmit unsolicited commercial communications (spam).
• Attempt to gain unauthorised access to any part of the website or its infrastructure.
• Use automated tools to scrape, crawl, or extract content from this website without written permission.
• Upload or transmit viruses, malware, or any other malicious code.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on this website — including text, graphics, logos, images, and software — is the property of Dippa IT Solutions or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent. Client deliverables are governed by the intellectual property provisions in the relevant service agreement.`,
  },
  {
    title: "5. Client Responsibilities",
    content: `Clients engaging Dippa IT Solutions for services agree to:

• Provide accurate and complete information necessary for service delivery.
• Maintain appropriate access credentials and notify us promptly of any unauthorised access.
• Ensure their use of our services complies with all applicable laws and regulations.
• Pay invoices in accordance with agreed payment terms.
• Provide reasonable access to systems, personnel, and facilities as required for service delivery.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties acknowledge that in the course of engagement, confidential information may be exchanged. Each party agrees to maintain the confidentiality of the other's proprietary information and not to disclose it to third parties without prior written consent, except as required by law.

This obligation of confidentiality survives the termination of any service agreement.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Dippa IT Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or business opportunities — arising from your use of our website or services.

Our total liability for any claim arising out of or relating to our services shall not exceed the total fees paid by you to Dippa IT Solutions in the three months preceding the claim.`,
  },
  {
    title: "8. Disclaimers",
    content: `This website and its content are provided on an "as is" basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.

Information on this website is for general informational purposes only and does not constitute professional advice. Specific recommendations are provided only within formal service engagements.`,
  },
  {
    title: "9. Third-Party Services",
    content: `Our services may integrate with or rely on third-party platforms, tools, or cloud providers. We are not responsible for the availability, performance, or terms of third-party services. Clients are responsible for compliance with the terms of any third-party services used as part of their IT environment.`,
  },
  {
    title: "10. Termination",
    content: `We reserve the right to terminate or suspend access to our website or services at our discretion, without notice, for conduct that violates these Terms of Service or is harmful to other users, us, or third parties.

Clients may terminate service agreements in accordance with the terms specified in their individual contracts.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Atlanta, Georgia.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our website or services after changes are posted constitutes acceptance of the updated terms. We encourage you to review these terms periodically.`,
  },
  {
    title: "13. Contact Us",
    content: `If you have questions about these Terms of Service, please contact us:\n\nDippa IT Solutions\n270 17th St NW, Atlanta, GA 30363-1205, United States\nEmail: info@thedippa.com`,
  },
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-hero">
        <div className="legal-hero-inner section-shell">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-meta">Last updated: June 2025</p>
        </div>
      </div>

      <div className="legal-body section-shell">
        <div className="legal-intro">
          <p>
            These Terms of Service govern your use of the Dippa IT Solutions website located at thedippa.com and the services we provide. By using our website or engaging our services, you agree to these terms in full. Please read them carefully before proceeding.
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
          <Link href="/privacy" className="legal-related-link">Privacy Policy →</Link>
          <Link href="/" className="legal-related-link">← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
