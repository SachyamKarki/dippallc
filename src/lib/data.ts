import { examplePosts } from "@/lib/blog/examplePosts";

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
    title: "AI Solutions Architect",
    department: "Creative Engineering",
    type: "Contract",
    location: "Kathmandu",
  },
] as const;

export const allProducts = [
  {
    slug: "ops-canvas",
    name: "Ops Canvas",
    description:
      "A premium web operations cockpit for leadership teams that need unified visibility across delivery, finance, and growth.",
    category: "Software Engineering",
    image: "/images/blog-software.png",
    href: "/projects/ops-canvas",
    stack: ["Next.js", "PostgreSQL", "Real-time WebSockets", "Redis", "Custom Analytics Engine"],
    stats: [
      { label: "Data Latency", value: "85", suffix: "ms" },
      { label: "Reporting Efficiency", value: "92", suffix: "%" },
    ],
    timeline: "14 weeks",
    liveLink: "https://ops-canvas.dippa.group",
    details: [
      {
        type: "narrative",
        title: "The Objective",
        body: "Standardizing the flow of multi-regional internal data for a logistics firm that was struggling with 14-day delays in financial reporting. The goal was to reach sub-second visibility across all operational nodes.",
      },
      {
        type: "media",
        image: "/projects/1.jpg",
        caption: "Data Normalization Layer Architecture",
      },
      {
        type: "narrative",
        title: "The Challenge",
        body: "Legacy ERP systems lacked modern API endpoints, requiring the development of custom middleware that could poll, transform, and stream data without impacting the performance of the source databases.",
      },
      {
        type: "media",
        image: "/projects/5.jpg",
        caption: "Middleware Performance Monitoring Dashboard",
      },
      {
        type: "narrative",
        title: "The Execution",
        body: "We implemented a custom event-bus architecture that normalizes incoming telemetry from legacy SAP systems and real-time GPS trackers into a unified Postgres layer, served via high-frequency WebSockets.",
      },
      {
        type: "media",
        image: "/projects/6.jpg",
        caption: "Real-time Geospatial Visualization Layer",
      },
      {
        type: "narrative",
        title: "The User Experience",
        body: "The final interface was designed as a high-density 'command center' for logistics coordinators, reducing the number of dashboard switches by 70% and placing critical intervention tools exactly where they are needed.",
      },
      {
        type: "impact",
        title: "Final Impact",
        body: "Stakeholders now operate on zero-delay data, resulting in a documented $1.2M reduction in yearly operational waste through proactive anomaly detection.",
      }
    ]
  },
  {
    slug: "agent-desk",
    name: "Agent Desk",
    description:
      "A controlled AI support system that routes work, drafts resolutions, and escalates only what truly needs human attention.",
    category: "AI & Automation",
    image: "/images/blog-ai-automation.png",
    href: "/projects/agent-desk",
    stack: ["LangChain", "OpenAI GPT-4", "Pinecone DB", "Node.js", "Python"],
    stats: [
      { label: "Auto-Resolution", value: "61", suffix: "%" },
      { label: "Agent Handling Time", value: "-40", suffix: "%" },
    ],
    timeline: "8 weeks",
    liveLink: "https://agent-desk.dippa.group",
    details: [
      {
        type: "narrative",
        title: "The Problem",
        body: "A scaling SaaS enterprise was experiencing a 300% increase in technical support volume. Response times were degrading, and the support team was burning out on repetitive queries.",
      },
      {
        type: "media",
        image: "/projects/2.jpg",
        caption: "Automated Workflows & RAG Implementation",
      },
      {
        type: "narrative",
        title: "The Strategy",
        body: "Instead of a simple chatbot, we designed a multi-agent system where one agent categorizes the intent, another retrieves relevant documentation, and a third synthesizes a highly contextual resolution draft for human review.",
      },
      {
        type: "media",
        image: "/projects/7.jpg",
        caption: "Agent Reasoning Chain & Tool Calling Logs",
      },
      {
        type: "narrative",
        title: "The Infrastructure",
        body: "By building a Retrieval Augmented Generation (RAG) system grounded in their actual technical documentation (1,500+ pages), we enabled AI agents to resolve L1/L2 tickets with 89% accuracy.",
      },
      {
        type: "media",
        image: "/projects/8.jpg",
        caption: "Vector Database Performance & Embedding Analysis",
      },
      {
        type: "impact",
        title: "Final Impact",
        body: "61% of all incoming tickets are now closed without human intervention, allowing the core team to focus exclusively on complex architectural consulting for clients.",
      }
    ]
  },
  {
    slug: "clarity-sprint",
    name: "Clarity Sprint",
    description:
      "A transformation engagement that combines diagnostics, product direction, and execution planning with a fast implementation start.",
    category: "Strategic Consulting",
    image: "/projects/3.jpg",
    href: "/projects/clarity-sprint",
    stack: ["Diagnostic Audit", "Execution Roadmap", "Rapid Prototyping", "Stakeholder Governance"],
    stats: [
      { label: "Diagnostic Phase", value: "15", suffix: " days" },
      { label: "Deployment Cycle", value: "-72", suffix: "%" },
    ],
    timeline: "3 weeks",
    liveLink: "https://clarity-sprint.dippa.group",
    details: [
      {
        type: "narrative",
        title: "The Strategy",
        body: "Most digital transformations fail due to analysis paralysis. We replaced traditional multi-month consulting cycles with a high-velocity 15-day diagnostic pulse.",
      },
      {
        type: "media",
        image: "/projects/4.jpg",
        caption: "Tactical Execution Planning Session",
      },
      {
        type: "narrative",
        title: "The Approach",
        body: "We conducted over 40 hours of stakeholder interviews and technical audits in the first 5 days, identifying critical friction points that were costing the organization $50k per week in lost developer productivity.",
      },
      {
        type: "media",
        image: "/projects/9.jpg",
        caption: "Technical Debt Mapping & Prioritization Matrix",
      },
      {
        type: "narrative",
        title: "The Delivery",
        body: "We identified over $400k in annual software licensing overlap within the first 10 days and delivered a functional prototype of a consolidated platform by the end of week three.",
      },
      {
        type: "impact",
        title: "Final Impact",
        body: "The client successfully pivoted their entire IT budget toward growth-focused internal engineering, abandoning three legacy vendors and shipping their first unified platform in 18 days.",
      }
    ]
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
