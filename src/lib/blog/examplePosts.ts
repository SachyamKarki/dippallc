import type { BlogPost } from "@/lib/blog/types";

export const examplePosts: readonly BlogPost[] = [
  {
    slug: "enterprise-network-overhaul-manufacturing",
    title: "How we modernised a 3-site manufacturing network in 6 weeks",
    tag: "Case Study",
    excerpt:
      "A legacy flat network with no segmentation was exposing production systems to the open office. Dippa redesigned the architecture, migrated 400+ endpoints, and achieved zero production downtime.",
    createdAt: "2026-02-10T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-systems.jpg" },
    readingTimeMinutes: 8,
    initialUpvotes: 214,
    initialDownvotes: 7,
    content: [
      {
        type: "p",
        text: "A mid-sized electronics manufacturer running three sites had been operating on a single flat Layer-2 network for over a decade. Production PLCs, IP cameras, HR laptops, and guest Wi-Fi all shared the same broadcast domain.",
      },
      { type: "h2", text: "The challenge" },
      {
        type: "ul",
        items: [
          "No VLAN segmentation — OT and IT traffic mixed on the same switch fabric.",
          "Ageing hardware with no vendor support.",
          "A 6-week hard deadline with no tolerance for production downtime.",
          "400+ endpoints across three geographically distributed sites.",
        ],
      },
      { type: "h2", text: "Dippa's approach" },
      {
        type: "p",
        text: "We started with a two-day discovery audit: traffic capture, device fingerprinting, and stakeholder interviews. We produced a segmentation map with five VLANs (Production, IT, CCTV, Guest, Management) enforced at a centralised firewall pair.",
      },
      { type: "h2", text: "Results" },
      {
        type: "ul",
        items: [
          "Zero production downtime across all three migration weekends.",
          "OT systems fully isolated with allowlist-only firewall rules.",
          "Full NetFlow + syslog visibility to a central SIEM.",
          "Endpoint provisioning time cut from 45 minutes to under 8.",
        ],
      },
      {
        type: "quote",
        text: "Dippa delivered exactly what they scoped — on time, no surprises. The network feels like completely different infrastructure.",
        attribution: "Head of IT Operations, Client",
      },
    ],
  },
  {
    slug: "ai-helpdesk-automation-retail",
    title: "Cutting IT helpdesk tickets by 60% with AI triage",
    tag: "Case Study",
    excerpt:
      "A retail chain with 80 stores was drowning in Level-1 support tickets. We built an AI triage layer that auto-resolves password resets, VPN issues, and hardware swap requests — freeing the team for real problems.",
    createdAt: "2026-03-05T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-ai-agent-real.jpg" },
    readingTimeMinutes: 7,
    initialUpvotes: 189,
    initialDownvotes: 11,
    content: [
      {
        type: "p",
        text: "A national retail chain with 80 stores was generating over 1,200 Level-1 support tickets per month. The internal IT team of six was spending 70% of their time on password resets, VPN issues, and printer connectivity requests.",
      },
      { type: "h2", text: "Solution architecture" },
      {
        type: "p",
        text: "We integrated an AI triage layer in front of the existing ServiceNow instance. The model classifies incoming tickets, attempts auto-resolution via pre-approved runbooks, and escalates only when confidence is below threshold.",
      },
      { type: "h2", text: "Key outcomes" },
      {
        type: "ul",
        items: [
          "60% reduction in human-handled L1 tickets within 90 days.",
          "Average resolution time for auto-handled tickets: 3 minutes vs. 4 hours.",
          "Full audit trail retained for every automated action.",
          "Engineers now spend 80% of time on proactive infrastructure work.",
        ],
      },
    ],
  },
  {
    slug: "cloud-migration-financial-services",
    title: "Zero-downtime cloud migration for a regional financial services firm",
    tag: "Case Study",
    excerpt:
      "Moving a compliance-critical core banking application to AWS without a single minute of unplanned downtime — and cutting infrastructure costs by 34% in the first year.",
    createdAt: "2026-04-01T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-automation-real.jpg" },
    readingTimeMinutes: 9,
    initialUpvotes: 241,
    initialDownvotes: 14,
    content: [
      {
        type: "p",
        text: "A regional financial services firm was running its core banking application on ageing on-premises hardware. Hardware failure risk was high, DR testing was manual, and the infrastructure team spent 40% of their time on routine maintenance.",
      },
      { type: "h2", text: "Migration strategy" },
      {
        type: "p",
        text: "We used a lift-and-optimise approach: replicate first to establish a stable baseline, then right-size and refactor services with the highest cost/risk profile. A 4-week dual-run period ensured the cloud environment matched production before cutover.",
      },
      { type: "h2", text: "Compliance and security" },
      {
        type: "ul",
        items: [
          "Data residency maintained in-region throughout migration.",
          "Encryption at rest and in transit enforced by policy.",
          "Automated compliance reports mapped to local financial regulations.",
          "RTO reduced from 8 hours to under 15 minutes.",
        ],
      },
      {
        type: "quote",
        text: "The cutover weekend was the calmest infrastructure change we've had in years. The preparation was meticulous.",
        attribution: "CTO, Client",
      },
    ],
  },
  {
    slug: "endpoint-security-hardening-healthcare",
    title: "Securing 1,200 endpoints across a healthcare network",
    tag: "Case Study",
    excerpt:
      "After a near-miss ransomware incident, a healthcare provider engaged Dippa to harden their endpoint estate — from unmanaged BYOD devices to clinical workstations — in 10 weeks.",
    createdAt: "2026-05-12T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-app-dev.jpg" },
    readingTimeMinutes: 6,
    initialUpvotes: 163,
    initialDownvotes: 9,
    content: [
      {
        type: "p",
        text: "A healthcare provider narrowly avoided a ransomware attack when a phishing email was flagged by a vigilant staff member. The security audit that followed revealed 1,200 endpoints with inconsistent patch levels and no EDR on 40% of devices.",
      },
      { type: "h2", text: "What we did" },
      {
        type: "ul",
        items: [
          "Full endpoint inventory using network scanning and SCCM data reconciliation.",
          "EDR deployed to 100% of managed endpoints within 3 weeks.",
          "Conditional Access policy: unmanaged devices blocked from clinical apps.",
          "Automated patch compliance reporting delivered weekly to the board.",
        ],
      },
      { type: "h2", text: "Outcome" },
      {
        type: "p",
        text: "Within 10 weeks, the organisation moved from a fragmented reactive posture to a fully managed, policy-driven endpoint environment. Estimated attack surface reduced by 70% based on exposure scoring.",
      },
    ],
  },
  {
    slug: "smart-office-iot-deployment",
    title: "Smart office IoT rollout across 5 corporate campuses",
    tag: "Infrastructure",
    excerpt:
      "Dippa designed and deployed a secure IoT network covering environmental sensors, smart lighting, access control, and meeting room management — all centralised on a single management platform.",
    createdAt: "2026-05-28T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-web-dev.jpg" },
    readingTimeMinutes: 7,
    initialUpvotes: 134,
    initialDownvotes: 8,
    content: [
      {
        type: "p",
        text: "A professional services firm wanted to modernise its five corporate campuses with smart office technology — but had concerns about IoT security following high-profile breaches in the industry.",
      },
      { type: "h2", text: "Architecture" },
      {
        type: "p",
        text: "All IoT devices were placed on an isolated management VLAN with no direct internet access. Traffic was routed through a centralised IoT gateway with certificate-based device authentication and encrypted MQTT channels.",
      },
      { type: "h2", text: "What was deployed" },
      {
        type: "ul",
        items: [
          "320 environmental sensors (temperature, CO₂, occupancy).",
          "Smart lighting controllers integrated with occupancy data.",
          "IP-based access control replacing legacy magnetic key cards.",
          "Meeting room booking panels synced with Microsoft 365.",
        ],
      },
    ],
  },
  {
    slug: "warehouse-wifi-upgrade",
    title: "High-density Wi-Fi for a 40,000 m² distribution warehouse",
    tag: "Infrastructure",
    excerpt:
      "RF interference, forklift-mounted scanners dropping connections, and a WMS running over Wi-Fi — Dippa designed a high-density wireless network that hasn't dropped a scan since go-live.",
    createdAt: "2026-06-05T00:00:00.000Z",
    source: "example",
    cover: { kind: "image", src: "/images/service-webapp.jpg" },
    readingTimeMinutes: 5,
    initialUpvotes: 109,
    initialDownvotes: 6,
    content: [
      {
        type: "p",
        text: "A logistics company operating a 40,000 m² distribution centre was experiencing constant Wi-Fi drop-outs on forklift-mounted barcode scanners. The warehouse management system ran entirely over wireless — each drop was a lost scan and a productivity hit.",
      },
      { type: "h2", text: "Root cause" },
      {
        type: "p",
        text: "A predictive RF survey revealed channel saturation in the picking zone, where 60+ access points from a previous expansion had been added without a channel plan. Co-channel interference was causing retry storms.",
      },
      { type: "h2", text: "Redesign and results" },
      {
        type: "ul",
        items: [
          "Complete AP layout redesign based on predictive RF modelling.",
          "Modern APs deployed with dynamic channel assignment.",
          "Forklift scanners migrated to dedicated 5 GHz SSIDs.",
          "Zero dropped connections in the 90 days following go-live.",
        ],
      },
    ],
  },
] as const;

export function getExamplePost(slug: string): BlogPost | undefined {
  return examplePosts.find((post) => post.slug === slug);
}

export function getExamplePostSummaries() {
  return examplePosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    tag: post.tag,
    excerpt: post.excerpt,
    createdAt: post.createdAt,
    source: post.source,
    cover: post.cover,
    readingTimeMinutes: post.readingTimeMinutes,
    initialUpvotes: post.initialUpvotes,
    initialDownvotes: post.initialDownvotes,
  }));
}
