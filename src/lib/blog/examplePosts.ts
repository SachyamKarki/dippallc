import type { BlogPost, CaseStudyCategory } from "@/lib/blog/types";
import { readingTimeFromBlocks } from "@/lib/blog/contentUtils";
import { content as aiBackOfficeContent } from "@/lib/blog/case-studies/ai-back-office";
import { content as aiCopilotContent } from "@/lib/blog/case-studies/ai-copilot";
import { content as aiOpsContent } from "@/lib/blog/case-studies/ai-ops";
import { content as sdWanContent } from "@/lib/blog/case-studies/sd-wan";
import { content as nocContent } from "@/lib/blog/case-studies/noc";
import { content as zeroTrustContent } from "@/lib/blog/case-studies/zero-trust";

export const CASE_STUDY_CATEGORIES: readonly {
  id: CaseStudyCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "AI",
    label: "AI",
    description:
      "Agent workflows, copilots, and production AI systems — designed for operators who need auditability and control.",
  },
  {
    id: "Networking",
    label: "Networking",
    description:
      "Campus, WAN, and operations work — designs we have taken from architecture through cutover and run.",
  },
  {
    id: "Security",
    label: "Security",
    description:
      "Zero-trust, detection, and governance — controls that hold up in audit and on the floor.",
  },
] as const;

const caseStudyCover = (file: string) =>
  ({ kind: "image" as const, src: `/images/case-studies/${file}` });

export const examplePosts: readonly BlogPost[] = [
  {
    slug: "ai-agent-back-office-automation",
    title: "Multi-agent back-office automation for finance ops",
    tag: "AI Agents",
    category: "AI",
    excerpt:
      "A B2B payments team was manually reconciling invoices across three systems. We deployed a multi-agent workflow with tool use, approval gates, and full audit logs — cutting reconciliation time by 72% while keeping human sign-off on every exception.",
    createdAt: "2025-01-15T08:00:00.000Z",
    source: "example",
    cover: caseStudyCover("ai-back-office.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(aiBackOfficeContent),
    initialUpvotes: 312,
    initialDownvotes: 5,
    caseStudy: {
      industry: "Fintech · payments ops",
      engagement: "10 weeks · production",
      stack: ["LangGraph", "OpenAI", "PostgreSQL", "Temporal", "Grafana", "Okta"],
      metrics: [
        { label: "Reconciliation time reduction", value: "72", suffix: "%" },
        { label: "Exceptions requiring human review", value: "8", suffix: "%" },
        { label: "Agent runs audited daily", value: "100", suffix: "%" },
        { label: "Production incidents (90 days)", value: "0", suffix: "" },
      ],
      review: {
        summary:
          "Agent graph is bounded — each tool call logged, approvals enforced before ledger writes. Human override path tested weekly. Residual risk: one legacy CSV export format still parsed with fallback rules until API migration in Q2.",
        strengths: [
          "Deterministic approval gates — no autonomous ledger mutation without operator confirm.",
          "Replayable traces for every agent run; compliance can export full decision chains.",
          "Idempotent tool design — duplicate runs cannot double-post transactions.",
        ],
        risks: [
          "Legacy CSV parser is brittle — API migration tracked as dependency for phase 2.",
          "Model version pinning required before each release — documented in runbook.",
        ],
        verdict:
          "Approved for production. Complete CSV-to-API migration before expanding to international entities.",
      },
    },
    content: aiBackOfficeContent,
  },
  {
    slug: "ai-copilot-knowledge-retrieval",
    title: "Internal copilot with retrieval and approval loops",
    tag: "AI Copilot",
    category: "AI",
    excerpt:
      "Engineering and support teams searched six wikis for runbooks that were often stale. We shipped an internal copilot with RAG over approved docs, citation links, and escalation to SMEs — 64% of L1 queries resolved without a ticket.",
    createdAt: "2025-05-08T09:30:00.000Z",
    source: "example",
    cover: caseStudyCover("ai-copilot.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(aiCopilotContent),
    initialUpvotes: 278,
    initialDownvotes: 8,
    caseStudy: {
      industry: "B2B SaaS · 400 staff",
      engagement: "8 weeks · production",
      stack: ["OpenAI", "Pinecone", "Confluence", "Slack", "Python", "Datadog"],
      metrics: [
        { label: "L1 queries self-served", value: "64", suffix: "%" },
        { label: "Answers with citations", value: "100", suffix: "%" },
        { label: "Median response time", value: "4.2", suffix: " s" },
        { label: "Stale doc flags per week", value: "12", suffix: "" },
      ],
      review: {
        summary:
          "RAG corpus limited to approved Confluence spaces; nightly sync with diff alerts. Copilot refuses to answer when confidence is low and routes to SME queue. Content owners notified when docs drive high escalation rates.",
        strengths: [
          "Mandatory citations — users see source page and last-updated date.",
          "Feedback loop marks bad answers and queues doc updates to owners.",
          "PII scrubbing at ingest; no customer data in the vector index.",
        ],
        risks: [
          "Two legacy Notion spaces still outside sync — migration scheduled.",
          "SME queue SLA not yet automated — manual triage for now.",
        ],
        verdict:
          "Production-ready for engineering and support tiers. Expand corpus after Notion migration.",
      },
    },
    content: aiCopilotContent,
  },
  {
    slug: "ai-agent-ops-monitoring",
    title: "Agent ops dashboard with observability and human override",
    tag: "AI Operations",
    category: "AI",
    excerpt:
      "Production agent workflows had no unified view of runs, failures, or cost. We built an ops dashboard with trace replay, latency SLOs, spend caps, and one-click human override — MTTR on agent failures dropped from hours to 12 minutes.",
    createdAt: "2025-07-19T14:00:00.000Z",
    source: "example",
    cover: caseStudyCover("ai-ops.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(aiOpsContent),
    initialUpvotes: 289,
    initialDownvotes: 6,
    caseStudy: {
      industry: "Logistics · agent platform",
      engagement: "9 weeks · production",
      stack: ["LangSmith", "Grafana", "Prometheus", "Python", "Redis", "PagerDuty"],
      metrics: [
        { label: "Agent failure MTTR", value: "12", suffix: " min" },
        { label: "Runs with full trace", value: "100", suffix: "%" },
        { label: "Cost overrun alerts", value: "0", suffix: "" },
        { label: "Human overrides used", value: "3", suffix: "% of runs" },
      ],
      review: {
        summary:
          "Observability covers every agent graph node — inputs, outputs, token spend, and latency. Spend caps halt runs before budget breach. Human override tested monthly in game-day drills.",
        strengths: [
          "Trace replay lets operators see exact tool sequence before failure.",
          "SLO dashboards separate model latency from tool latency — faster root cause.",
          "Override path documented; compliance signed off on audit export format.",
        ],
        risks: [
          "Third-party tool timeouts still need custom retry policies per integration.",
          "Game-day drills quarterly — increase frequency after next release train.",
        ],
        verdict:
          "Approved. Extend retry policies to remaining external tools in phase 2.",
      },
    },
    content: aiOpsContent,
  },
  {
    slug: "sd-wan-retail-branch-modernization",
    title: "SD-WAN modernization across 80 retail branches",
    tag: "WAN & Edge",
    category: "Networking",
    excerpt:
      "A national retailer was paying for dual MPLS circuits per store while still failing over manually during outages. We designed a dual-hub SD-WAN fabric with active/active internet paths, centralized policy, and NetBox as source of truth — cutting circuit spend while improving failover to under 8 seconds.",
    createdAt: "2024-06-12T09:00:00.000Z",
    source: "example",
    cover: caseStudyCover("networking-sd-wan.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(sdWanContent),
    initialUpvotes: 294,
    initialDownvotes: 7,
    caseStudy: {
      industry: "Retail · 80 branches",
      engagement: "14 weeks · production",
      stack: [
        "Cisco SD-WAN",
        "Fortinet SASE",
        "BGP",
        "IPsec",
        "Terraform",
        "NetBox",
        "Zabbix",
      ],
      metrics: [
        { label: "WAN circuit spend reduction", value: "34", suffix: "%" },
        { label: "Branch failover time", value: "7.4", suffix: " s" },
        { label: "Stores on new fabric", value: "80", suffix: "/80" },
        { label: "Post-cutover P1 incidents", value: "0", suffix: "" },
      ],
      review: {
        summary:
          "Hub-and-spoke SD-WAN with templated branch profiles is sound. Policy is version-controlled and staged per region; rollback tested in lab before each wave. Residual risk is legacy POS VLAN tagging at four acquired stores — migration window scheduled.",
        strengths: [
          "Dual transport (DIA + 4G) with SLA-based application steering — VoIP and POS never share lossy paths.",
          "NetBox → Terraform pipeline eliminates config drift between NOC documentation and live devices.",
          "Wave-based cutover (10 stores/week) with automated pre/post validation scripts.",
        ],
        risks: [
          "Four acquired branches still run non-standard VLAN maps — requires POS vendor sign-off before final wave.",
          "4G backup links need quarterly data-cap review during peak season traffic spikes.",
        ],
        verdict:
          "Approved for full rollout. Recommend completing acquired-store VLAN remediation before holiday freeze.",
      },
    },
    content: sdWanContent,
  },
  {
    slug: "network-observability-noc-automation",
    title: "Network observability platform with automated NOC triage",
    tag: "Network Operations",
    category: "Networking",
    excerpt:
      "A logistics operator’s NOC was drowning in SNMP traps with no correlation across MPLS, Wi‑Fi, and datacenter fabrics. We unified telemetry in Kentik and Grafana, added intent-based alerting, and shipped runbook-linked auto-triage that clears 58% of events without L1 touch.",
    createdAt: "2024-10-24T10:00:00.000Z",
    source: "example",
    cover: caseStudyCover("networking-noc.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(nocContent),
    initialUpvotes: 267,
    initialDownvotes: 9,
    caseStudy: {
      industry: "Logistics · 12 hubs",
      engagement: "11 weeks · production",
      stack: [
        "Kentik",
        "Prometheus",
        "SNMP",
        "Grafana",
        "Ansible",
        "PagerDuty",
        "NetBox",
      ],
      metrics: [
        { label: "Alert noise reduction", value: "71", suffix: "%" },
        { label: "L1 tickets auto-cleared", value: "58", suffix: "%" },
        { label: "MTTR on P2 network events", value: "41", suffix: "% faster" },
        { label: "Telemetry sources unified", value: "6", suffix: "" },
      ],
      review: {
        summary:
          "Telemetry model is coherent: every alert carries device role, site, and upstream dependency context. Auto-triage only fires closed-loop actions on allowlisted runbooks. Main gap is legacy warehouse Wi‑Fi controllers still exporting traps in non-standard MIBs — parser shim in place until refresh.",
        strengths: [
          "Dependency graph from NetBox enriches alerts — ‘core switch down’ pages on-call with affected sites list.",
          "Intent rules suppress flap storms; sustained threshold required before page.",
          "Runbook URLs and last-known-good config attached to every PagerDuty incident.",
        ],
        risks: [
          "Two warehouse Wi‑Fi controller models need custom MIB translation — backlog until Q4 hardware refresh.",
          "Auto-remediation (BGP neighbor bounce) limited to lab-approved playbooks — expand slowly.",
        ],
        verdict:
          "Production-ready for WAN, datacenter, and standard campus gear. Legacy Wi‑Fi controllers remain monitor-only until refresh.",
      },
    },
    content: nocContent,
  },
  {
    slug: "zero-trust-segmentation-soc-pipeline",
    title: "Zero-trust segmentation with SOC correlation pipeline",
    tag: "Security Engineering",
    category: "Security",
    excerpt:
      "A healthcare operator needed east-west containment after a ransomware near-miss — flat VLANs, shared service accounts, and a SIEM that alerted on everything except lateral movement. We deployed identity-aware micro-segmentation, Okta device trust, and a Splunk correlation pipeline that cut false positives by 63% while catching lateral movement in under 4 minutes.",
    createdAt: "2025-03-22T11:00:00.000Z",
    source: "example",
    cover: caseStudyCover("security-zero-trust.jpg"),
    readingTimeMinutes: readingTimeFromBlocks(zeroTrustContent),
    initialUpvotes: 301,
    initialDownvotes: 6,
    caseStudy: {
      industry: "Healthcare · 6 sites",
      engagement: "16 weeks · production",
      stack: [
        "Palo Alto NGFW",
        "Okta",
        "CrowdStrike",
        "Splunk ES",
        "Terraform",
        "Illumio",
        "Active Directory",
      ],
      metrics: [
        { label: "East-west zones enforced", value: "24", suffix: "" },
        { label: "SIEM false positive drop", value: "63", suffix: "%" },
        { label: "Lateral movement detection", value: "<4", suffix: " min" },
        { label: "Critical findings in pen-test", value: "0", suffix: "" },
      ],
      review: {
        summary:
          "Segmentation policy maps to clinical and business roles — not IP spreadsheets. SOC rules are correlation-based with CrowdStrike and firewall logs as primary sources. Residual risk: two legacy imaging workstations on an exception VLAN until vendor cert completes in Q1.",
        strengths: [
          "Identity + device posture gates access — VPN alone no longer grants flat network reach.",
          "Splunk ES correlation searches tuned with 90-day baseline; noise dropped before go-live.",
          "Terraform-managed policy objects — drift detected in CI, not during audit.",
        ],
        risks: [
          "Legacy imaging VLAN exception expires Q1 — must not become permanent shadow IT.",
          "SOC playbooks for Illumio policy violations still manual — automate in phase 2.",
        ],
        verdict:
          "Approved for production. Schedule imaging VLAN decommission and automate remaining SOC playbooks before next audit cycle.",
      },
    },
    content: zeroTrustContent,
  },
] as const;

export function getExamplePost(slug: string): BlogPost | undefined {
  return examplePosts.find((post) => post.slug === slug);
}

export function getExamplePostSummaries() {
  return examplePosts
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      tag: post.tag,
      category: post.category,
      excerpt: post.excerpt,
      createdAt: post.createdAt,
      source: post.source,
      cover: post.cover,
      readingTimeMinutes: post.readingTimeMinutes,
      caseStudy: post.caseStudy,
      initialUpvotes: post.initialUpvotes,
      initialDownvotes: post.initialDownvotes,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getPostsByCategory(category: CaseStudyCategory) {
  return examplePosts.filter((post) => post.category === category);
}
