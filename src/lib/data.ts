import { examplePosts } from "@/lib/blog/examplePosts";
import { WEBSITE_PROJECTS } from "@/lib/websites/content";

export const dippaMotto = "Aiming to Quantum Computing";

export const studioStats = [
  { value: "48", suffix: "+", label: "high-trust launches shipped" },
  { value: "14", suffix: "d", label: "to first production prototype" },
  { value: "93", suffix: "%", label: "client retention on strategic work" },
] as const;

export const serviceLines = [
  {
    name: "Product Engineering",
    eyebrow: "Software Systems",
    description:
      "Premium internal platforms, customer-facing apps, and operational software built with senior product judgment from day one.",
    deliverables: [
      "Web apps and internal tools",
      "Platform architecture and engineering systems",
      "Launch-ready engineering teams",
    ],
    icon: "code",
  },
  {
    name: "AI Agent Systems",
    eyebrow: "Autonomous Operations",
    description:
      "We design agent workflows that reason, route work, call tools, and stay observable enough for serious businesses to trust.",
    deliverables: [
      "Multi-step AI agent orchestration",
      "Back-office automation and copilots",
      "Knowledge, retrieval, and approval loops",
    ],
    icon: "cpu",
  },
  {
    name: "Advisory + Delivery",
    eyebrow: "Consulting That Ships",
    description:
      "Strategy is only useful if it survives contact with implementation. We audit, prioritize, and then stay close enough to execute.",
    deliverables: [
      "Technical due diligence",
      "Transformation roadmaps",
      "Embedded leadership support",
    ],
    icon: "compass",
  },
] as const;

export const clientSignals = [
  "Fintech",
  "Healthcare Ops",
  "Logistics",
  "Education",
  "Retail",
  "Media",
  "Hospitality",
  "B2B SaaS",
] as const;

export const proofPoints = [
  {
    title: "Agentic service desk",
    result: "61% of repetitive tickets resolved automatically",
    summary:
      "We paired retrieval, tool calling, and approval checkpoints to move support ops from inbox chaos to measurable automation.",
  },
  {
    title: "Executive operations cockpit",
    result: "Weekly reporting time cut from 9 hours to 35 minutes",
    summary:
      "A custom operating dashboard unified sales, finance, and delivery data so leadership could act without waiting on manual reports.",
  },
  {
    title: "Digital transformation sprint",
    result: "First production release in 18 days",
    summary:
      "We replaced a slide-heavy consulting track with a scoped build sprint, governance rituals, and live executive visibility.",
  },
] as const;

export const operatingModel = [
  {
    step: "01",
    title: "Frame the leverage",
    text: "We identify the workflow, product surface, or operating bottleneck where better software can create compounding returns.",
  },
  {
    step: "02",
    title: "Architect the control layer",
    text: "Every system gets a clear operating model: permissions, human approvals, analytics, failure states, and governance.",
  },
  {
    step: "03",
    title: "Ship with senior craft",
    text: "High-end engineering and AI orchestration move together so the first release looks premium and works under real pressure.",
  },
  {
    step: "04",
    title: "Scale with evidence",
    text: "We keep instrumentation close to the work, so iteration is based on outcomes, not assumptions or vanity metrics.",
  },
] as const;

export const aboutEngagement = [
  {
    step: "01",
    title: "Discover",
    text: "We start with how the business runs today: the work, the systems, the constraints, and the owners. No solution is proposed until the operating problem is clear.",
  },
  {
    step: "02",
    title: "Recommend",
    text: "You receive a scoped plan — architecture, sequence, risks, and what will not be built. Leadership can approve a path, not a vague ambition.",
  },
  {
    step: "03",
    title: "Build",
    text: "The same team that framed the work implements it: software, AI workflows, or both. Progress stays visible against the agreed scope.",
  },
  {
    step: "04",
    title: "Transfer",
    text: "We hand over documentation, controls, and operating practice so your people can run the system. Support continues if you want a next phase.",
  },
] as const;

export const aboutValues = [
  {
    num: "01",
    title: "Diagnose before we prescribe",
    text: "Tools and models are easy to buy. The harder work is naming the process that should change, who is accountable, and what a good week looks like after go-live.",
  },
  {
    num: "02",
    title: "Advice that survives implementation",
    text: "We do not separate strategy from delivery. The people who recommend the system stay close enough to build it, so the plan is honest about time, data, and risk.",
  },
  {
    num: "03",
    title: "AI with an operating model",
    text: "Automation is useful only when it is observable, permissioned, and easy to override. We design agents and workflows that operators can inspect and trust.",
  },
  {
    num: "04",
    title: "Leave the organisation stronger",
    text: "The engagement is successful when your team can run what we shipped — not when a demo looks impressive. Handover, documentation, and controls are part of the work.",
  },
] as const;

export const engagementModes = [
  "Launch a new premium product or client portal",
  "Modernize an outdated internal system",
  "Engineer AI agents for operations or support",
  "Add senior execution to a transformation initiative",
] as const;

export const testimonials = [
  {
    quote:
      "Dippa brought agency-level polish and operator-level depth. The product looked premium, but more importantly it changed how our team works every day.",
    name: "Nisha Adhikari",
    role: "COO, Northstar Health",
  },
  {
    quote:
      "Most firms sell AI slides. Dippa designed the workflow, connected the tools, and gave us a system leadership could actually trust.",
    name: "Aayush Bhandari",
    role: "Director of Innovation, Vector Logistics",
  },
  {
    quote:
      "They operate like senior partners, not outsourced executors. Fast decisions, sharp taste, and very strong delivery discipline.",
    name: "Ritika Sharma",
    role: "Founder, Atelier Commerce",
  },
] as const;

export const insights = [
  {
    category: "AI Agents",
    title: "How to make AI agents feel trustworthy in operations",
    blurb:
      "The answer is rarely more intelligence. It is better controls, clearer states, and an operating model humans can inspect.",
  },
  {
    category: "Product Strategy",
    title: "Premium software is a business decision, not just a design style",
    blurb:
      "The highest-performing web apps create confidence before a user reads a single sentence. That is product strategy expressed visually.",
  },
  {
    category: "Consulting",
    title: "Why consulting should end in shipped systems",
    blurb:
      "Advice has a short shelf life. Teams remember the workflows, dashboards, and automations that keep paying them back.",
  },
] as const;

/** WhatsApp business line — floating button + contact flows */
export const WHATSAPP_NUMBER = "14437806166";
export const WHATSAPP_URL =
  "https://wa.me/14437806166?text=" +
  encodeURIComponent("Hi, I'd like to connect with Dippa IT Solutions.");

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Case Studies & Blogs", href: "/news" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Proof", href: "/#proof" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "Request a Consultation", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X / Updates", href: "https://x.com" },
  { label: "Email Us", href: "mailto:hello@dippa.group" },
] as const;

export const footerSocialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thedippa", platform: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/thedippa", platform: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/thedippa", platform: "facebook" },
] as const;

export const principles = [
  {
    title: "Senior thinking stays close to the work",
    text: "We keep strategy, design, engineering, and delivery tightly connected so quality does not get diluted by handoffs.",
  },
  {
    title: "Premium is a systems decision",
    text: "The interface, the workflow, and the operating model all need to feel considered. We design for trust, not decoration.",
  },
  {
    title: "Automation needs governance",
    text: "AI is only valuable when it is observable, controllable, and easy for teams to understand under real operating pressure.",
  },
] as const;

export const capabilities = [
  "Custom web applications and internal operating platforms",
  "AI agent orchestration, copilots, and workflow automation",
  "Technical engineering systems and launch-ready product execution",
  "Transformation advisory with embedded technical delivery",
] as const;

export const careers = [] as const;

export const GANTABYA_LEGAL = {
  privacy: "https://admin-web-three-amber.vercel.app/privacy",
  terms: "https://admin-web-three-amber.vercel.app/terms",
  support: "https://admin-web-three-amber.vercel.app/support",
} as const;

export const PRODUCT_SECTIONS = [
  {
    id: "saas",
    label: "SaaS",
    description:
      "Subscription cloud products for commerce, lead generation, and growth — built to run in production with real users and real data.",
  },
  {
    id: "websites",
    label: "Websites",
    description:
      "Marketing sites, product landing pages, and company web presence — fast, accessible, and easy to maintain.",
  },
  {
    id: "mobile-apps",
    label: "Mobile Apps",
    description:
      "Native and cross-platform apps designed for everyday use on the device people carry.",
  },
  {
    id: "internal-apps",
    label: "Internal Apps",
    description:
      "Operator tools, dashboards, and internal platforms that help teams run day-to-day work with less friction.",
  },
] as const;

export type ProductSectionId = (typeof PRODUCT_SECTIONS)[number]["id"];

/** Client websites shown on the homepage project carousel (real Dippa builds). */
export const STUDIO_WEBSITES = WEBSITE_PROJECTS.map((site) => ({
  slug: site.slug,
  name: site.name,
  description: site.description,
  category: site.category,
  image: site.image,
  liveLink: site.liveLink,
  stack: site.stack,
}));

export const allProducts = [
  {
    slug: "sauji",
    name: "Sauji",
    sectionId: "saas" as const,
    description:
      "An AI commerce assistant for small merchants — take orders from Instagram DMs and chat in English or Nepali, keep inventory in sync, and run the whole shop from one mobile dashboard.",
    category: "AI Commerce",
    image: "/images/products/sauji.png",
    href: "/projects/sauji",
    stack: ["Expo", "React Native", "Express", "Firebase", "Google Gemini"],
    stats: [
      { label: "Languages", value: "2", suffix: "" },
      { label: "Channels", value: "3", suffix: "+" },
    ],
    timeline: "In active development",
    liveLink: "",
    details: [
      {
        type: "narrative" as const,
        title: "The problem",
        body: "Small shop owners lose orders in DMs, juggle stock in notebooks, and cannot afford a full-time person to reply in English and Nepali around the clock.",
      },
      {
        type: "narrative" as const,
        title: "What it does",
        body: "Sauji gives merchants a mobile ops hub — today's orders and revenue, low-stock alerts, and a Gemini-powered chat layer that turns natural messages into structured orders. Customers can text in English, Nepali, or Roman Nepali; send product photos for vision matching; and reach the shop through Instagram DMs connected to the same inventory.",
      },
      {
        type: "narrative" as const,
        title: "How it is built",
        body: "Expo/React Native on the client with Firebase Auth and Firestore for live sync. An Express backend handles Gemini prompts, order parsing, image analysis, and Instagram webhook events. Business profile, payment methods, and delivery settings live in one place.",
      },
      {
        type: "impact" as const,
        title: "Status",
        body: "Dashboard, inventory, orders, chat simulator, business profile, and connected accounts are implemented. Sauji is heading toward a pilot with local merchants.",
      },
    ],
  },
  {
    slug: "scrapper",
    name: "Scrapper",
    sectionId: "saas" as const,
    description:
      "A lead-generation workspace — scrape Google Maps at scale, enrich contacts, verify emails, and launch outreach campaigns without switching between five different tools.",
    category: "Lead Generation",
    image: "/images/products/scrapper.png",
    href: "/projects/scrapper",
    stack: ["Flask", "Scrapy", "React", "Vite", "MongoDB", "Redis"],
    stats: [
      { label: "Pipeline stages", value: "4", suffix: "" },
      { label: "Outreach channels", value: "2", suffix: "" },
    ],
    timeline: "In active development",
    liveLink: "",
    details: [
      {
        type: "narrative" as const,
        title: "The problem",
        body: "Outbound teams still copy leads from Maps into spreadsheets, verify emails by hand, and run campaigns from a separate inbox — slow, duplicated, and hard to trust.",
      },
      {
        type: "narrative" as const,
        title: "What it does",
        body: "Scrapper is one SaaS surface for the full prospecting loop: run distributed Google Maps scrapes with proxy rotation, deduplicate and enrich contacts, verify deliverability, then enroll leads into email or LinkedIn outreach — with SPF, DKIM, and DMARC checks before anything sends.",
      },
      {
        type: "narrative" as const,
        title: "How it is built",
        body: "Flask coordinates scrape jobs, enrichment pipelines, and campaign sends. A React/Vite frontend covers Lead Studio, scraper runs, link analysis, and team workspace. Redis queues fan work across workers; MongoDB stores deduplicated places keyed on Google's stable place_id.",
      },
      {
        type: "impact" as const,
        title: "Status",
        body: "Scrape → enrich → verify → campaign flow is live end to end. Current focus is queue reliability, sender reputation controls, and production hardening.",
      },
    ],
  },
  ...WEBSITE_PROJECTS.map((site) => ({
    slug: site.slug,
    name: site.name,
    sectionId: "websites" as const,
    description: site.description,
    category: site.category,
    image: site.image,
    href: `/projects/${site.slug}`,
    stack: [...site.stack],
    stats: [{ label: "Status", value: "Live", suffix: "" }],
    timeline: site.timeline,
    liveLink: site.liveLink,
    details: site.details.map((d) => ({ ...d })),
  })),
  {
    slug: "gantabya",
    name: "Gantabya",
    sectionId: "mobile-apps" as const,
    description:
      "Kathmandu Valley bus transit guide — plan journeys with official routes, road-following maps, traffic-aware estimates, and step-by-step trip guidance.",
    category: "Transit",
    image: "/images/gantabya.png",
    href: "/projects/gantabya",
    stack: ["React Native", "Apple Maps", "Transit Routing", "Live Traffic"],
    stats: [
      { label: "Valley Routes", value: "80", suffix: "+" },
      { label: "Version", value: "1.0", suffix: ".0" },
    ],
    timeline: "In App Store review",
    liveLink: "",
    status: "in-review" as const,
    legal: GANTABYA_LEGAL,
    details: [
      {
        type: "narrative" as const,
        title: "The Objective",
        body: "Help riders across Kathmandu, Lalitpur, and Bhaktapur find the right bus, see where it actually travels on the road, and get clear boarding and alighting guidance.",
      },
      {
        type: "narrative" as const,
        title: "What it delivers",
        body: "Direct and transfer trip search, road-snapped map paths, traffic-aware timing when available, road disruption alerts, and optional in-trip guidance — free, with no account required for v1.0.0.",
      },
      {
        type: "impact" as const,
        title: "Status",
        body: "Gantabya is preparing for App Store launch. Product pages, privacy policy, and support are live while the public listing goes through review.",
      },
    ],
  },
] as const;

export const businesses = [
  {
    name: "Software",
    description:
      "We design premium customer and operator-facing applications that help companies run with more speed, confidence, and clarity.",
    focus: ["Product Architecture", "Internal Platforms", "Interface Systems"],
    icon: "code",
    image: "/images/blog-software.png",
  },
  {
    name: "AI Automation",
    description:
      "Our agent systems move work across support, operations, reporting, and decision workflows with controls that teams can trust.",
    focus: ["AI Agents", "Automation Workflows", "Knowledge Systems"],
    icon: "cpu",
    image: "/images/blog-ai-automation.png",
  },
  {
    name: "Consulting",
    description:
      "We bring operator-level clarity to digital transformation, aligning roadmap decisions with implementation reality from the start.",
    focus: ["Technical Advisory", "Transformation Design", "Execution Support"],
    icon: "compass",
    image: "/images/blog-consulting.png",
  },
] as const;

export const leadership = [
  {
    name: "Arpan Karki",
    role: "Founder and Principal",
    bio: "Leads strategy, product direction, and high-trust transformation engagements across the studio.",
    avatar: "/images/avatar-arun.png",
  },
  {
    name: "Sana Thapa",
    role: "Head of Product Engineering",
    bio: "Shapes the engineering systems and interface quality behind Dippa's premium software delivery.",
    avatar: "/images/avatar-priya.png",
  },
  {
    name: "Ritesh Bista",
    role: "Lead, AI Agent Systems",
    bio: "Designs agent workflows, tool orchestration, and operational controls for dependable automation.",
    avatar: "/images/avatar-rajesh.png",
  },
] as const;

export const blogPosts = [
  {
    title: "What premium software feels like before a user says a word",
    excerpt:
      "The first seconds of a product experience shape trust, adoption, and pricing power more than most teams realize.",
    tag: "Product Strategy",
    date: "Apr 2026",
    image: "/images/blog-software.png",
  },
  {
    title: "Designing AI agents that stay useful after the demo",
    excerpt:
      "The winning pattern is not novelty. It is a combination of observability, workflow fit, and careful escalation design.",
    tag: "AI Automation",
    date: "Mar 2026",
    image: "/images/blog-ai-automation.png",
  },
  {
    title: "Why the best consulting work leaves behind software",
    excerpt:
      "Strategy compounds when it becomes a living system inside the business rather than a document everyone forgets in a week.",
    tag: "Consulting",
    date: "Feb 2026",
    image: "/images/blog-consulting.png",
  },
] as const;

/** Live item counts shown on navbar clothing tags */
export const navLinkCounts: Partial<Record<(typeof navLinks)[number]["href"], number>> = {
  "/products": allProducts.length,
  "/news": examplePosts.length,
};
