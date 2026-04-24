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
      "Platform architecture and design systems",
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
    title: "Design the control layer",
    text: "Every system gets a clear operating model: permissions, human approvals, analytics, failure states, and governance.",
  },
  {
    step: "03",
    title: "Ship with senior craft",
    text: "Design, engineering, and AI orchestration move together so the first release looks premium and works under real pressure.",
  },
  {
    step: "04",
    title: "Scale with evidence",
    text: "We keep instrumentation close to the work, so iteration is based on outcomes, not assumptions or vanity metrics.",
  },
] as const;

export const engagementModes = [
  "Launch a new premium product or client portal",
  "Modernize an outdated internal system",
  "Design AI agents for operations or support",
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

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Proof", href: "/#proof" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X / Updates", href: "https://x.com" },
  { label: "Email Us", href: "mailto:hello@dippa.group" },
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
  "Product design systems and launch-ready brand execution",
  "Transformation advisory with embedded technical delivery",
] as const;

export const careers = [
  {
    title: "Senior Product Engineer",
    department: "Product Engineering",
    type: "Full-time",
    location: "Kathmandu / Hybrid",
  },
  {
    title: "AI Systems Engineer",
    department: "AI Agent Systems",
    type: "Full-time",
    location: "Remote",
  },
  {
    title: "Design Technologist",
    department: "Creative Engineering",
    type: "Contract",
    location: "Kathmandu",
  },
] as const;

export const allProducts = [
  {
    name: "Ops Canvas",
    description:
      "A premium web operations cockpit for leadership teams that need unified visibility across delivery, finance, and growth.",
    category: "Software",
    image: "/images/blog-software.png",
    href: "/#services",
  },
  {
    name: "Agent Desk",
    description:
      "A controlled AI support system that routes work, drafts resolutions, and escalates only what truly needs human attention.",
    category: "AI Automation",
    image: "/images/blog-ai-automation.png",
    href: "/#proof",
  },
  {
    name: "Clarity Sprint",
    description:
      "A transformation engagement that combines diagnostics, product direction, and execution planning with a fast implementation start.",
    category: "Consulting",
    image: "/images/blog-consulting.png",
    href: "/#process",
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
