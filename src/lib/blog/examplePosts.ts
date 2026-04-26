import type { BlogPost } from "@/lib/blog/types";

export const examplePosts: readonly BlogPost[] = [
  {
    slug: "what-great-delivery-looks-like",
    title: "What great delivery looks like when stakes are high",
    tag: "Software systems",
    excerpt:
      "A practical look at senior-led execution, decision cadence, and the signals that separate busy work from real progress.",
    createdAt: "2026-01-18T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(255, 255, 255, 1) 52%, rgba(37, 99, 235, 0.16) 100%)" },
    readingTimeMinutes: 7,
    initialUpvotes: 128,
    initialDownvotes: 9,
    content: [
      {
        type: "p",
        text: "When a product is tied to revenue, compliance, or core operations, delivery stops being a vibe and becomes a system. The best teams don’t “move fast and break things” — they move fast while keeping the surface area of risk small and observable.",
      },
      { type: "h2", text: "A simple definition of great delivery" },
      {
        type: "p",
        text: "Great delivery is the ability to turn ambiguity into working software with minimal wasted motion, while keeping stakeholders aligned on what “done” means. You can feel it in the operating rhythm: small batches, sharp ownership, fast feedback, and zero drama in the last mile.",
      },
      { type: "h3", text: "Signals to look for" },
      {
        type: "ul",
        items: [
          "Weekly milestones you can demo, not just describe.",
          "Clear constraints: what we’re not doing this sprint and why.",
          "Fast decisions: an owner, a deadline, and a recorded outcome.",
          "Observability: logs, metrics, and alerts built alongside features.",
          "A calm team: urgency without panic or heroics.",
        ],
      },
      { type: "h2", text: "How we reduce risk without slowing down" },
      {
        type: "p",
        text: "We default to thin vertical slices: one meaningful flow end-to-end, shipped with the right permissions, tracking, and rollback story. That creates compounding certainty: every slice hardens the architecture and teaches us what the real constraints are.",
      },
      {
        type: "quote",
        text: "Velocity is a byproduct of clarity. When a team knows what matters and why, speed becomes natural.",
        attribution: "Delivery notes",
      },
      { type: "h2", text: "A practical operating cadence" },
      {
        type: "p",
        text: "If you only steal one thing: run a weekly “demo + decision” meeting. The demo keeps everyone honest. The decisions unblock the next week. Everything else is optional.",
      },
    ],
  },
  {
    slug: "where-ai-automation-belongs",
    title: "Where AI automation belongs inside modern operations",
    tag: "AI orchestration",
    excerpt:
      "Not hype—leverage. How to introduce AI safely, measure outcomes, and keep systems legible as they evolve.",
    createdAt: "2026-02-07T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 1) 52%, rgba(15, 23, 42, 0.12) 100%)" },
    readingTimeMinutes: 9,
    initialUpvotes: 201,
    initialDownvotes: 15,
    content: [
      {
        type: "p",
        text: "AI is most valuable when it removes coordination cost: triage, summarization, routing, and the glue work that keeps teams busy but doesn’t create durable value.",
      },
      { type: "h2", text: "The best first automations" },
      {
        type: "ul",
        items: [
          "Support ticket classification + suggested replies (with approval).",
          "Document parsing into structured records for ops workflows.",
          "Executive reporting drafts sourced from trusted data.",
          "Back-office reconciliations where humans only handle exceptions.",
        ],
      },
      { type: "h2", text: "Guardrails that keep it safe" },
      {
        type: "p",
        text: "Treat AI like a junior operator: give it scoped permissions, log every action, and require approval for irreversible steps. The goal isn’t to eliminate humans — it’s to concentrate human attention where judgment matters.",
      },
      { type: "code", language: "pseudo", code: "if action.is_irreversible:\n  require_human_approval()\nlog(action)\nexecute(action)" },
      {
        type: "p",
        text: "The teams that win here don’t ship “an AI feature”. They ship an operating system for AI decisions: audit trails, metrics, and a clear failure mode.",
      },
    ],
  },
  {
    slug: "turning-strategy-into-shipping",
    title: "Turning strategy into shipping: a simple operating model",
    tag: "Consulting",
    excerpt:
      "How we reduce ambiguity, align stakeholders, and keep delivery velocity high without sacrificing quality.",
    createdAt: "2026-03-02T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(255, 255, 255, 1) 52%, rgba(15, 23, 42, 0.12) 100%)" },
    readingTimeMinutes: 6,
    initialUpvotes: 97,
    initialDownvotes: 6,
    content: [
      {
        type: "p",
        text: "Strategy becomes real when it turns into a sequence of decisions. The simplest operating model is one that makes decisions inevitable: clear owners, deadlines, and the minimum artifacts required to move work forward.",
      },
      { type: "h2", text: "The model (in four parts)" },
      {
        type: "ul",
        items: [
          "Define one measurable outcome for the next 30 days.",
          "Translate it into 3–5 deliverables people can point to.",
          "Assign one accountable owner per deliverable.",
          "Review weekly: demo progress, decide tradeoffs, remove blockers.",
        ],
      },
      { type: "h2", text: "What to avoid" },
      {
        type: "p",
        text: "Avoid building a dashboard of dashboards. Avoid endless stakeholder syncs. Avoid “alignment” as a substitute for decision-making. Your operating model should reduce meetings, not create them.",
      },
    ],
  },
  {
    slug: "building-a-premium-design-system",
    title: "Building a premium design system without slowing delivery",
    tag: "Product engineering",
    excerpt:
      "A lightweight approach to tokens, components, and interaction patterns that improves consistency without becoming a governance project.",
    createdAt: "2026-03-21T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(217, 70, 239, 0.12) 0%, rgba(255, 255, 255, 1) 52%, rgba(15, 23, 42, 0.12) 100%)" },
    readingTimeMinutes: 8,
    initialUpvotes: 142,
    initialDownvotes: 11,
    content: [
      { type: "p", text: "The best design systems feel invisible: products look consistent, teams move faster, and nobody argues about button padding." },
      { type: "h2", text: "Start with tokens, not a component catalog" },
      {
        type: "p",
        text: "Define a small set of tokens (colors, spacing, radius, typography) and use them everywhere. Components become easier when the primitives are stable.",
      },
      { type: "h2", text: "Components should encode decisions" },
      {
        type: "ul",
        items: [
          "A primary button that always looks like “the primary action”.",
          "A card that always handles hover/focus states correctly.",
          "A form input that always includes validation affordances.",
        ],
      },
      { type: "quote", text: "A component is a decision you no longer need to remake.", attribution: "Design system principle" },
    ],
  },
  {
    slug: "observability-for-operators",
    title: "Observability for operators: what to instrument on day one",
    tag: "Architecture",
    excerpt:
      "The smallest set of logs and metrics that make a system feel calm — even when it’s under pressure.",
    createdAt: "2026-04-04T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(255, 255, 255, 1) 52%, rgba(15, 23, 42, 0.12) 100%)" },
    readingTimeMinutes: 10,
    initialUpvotes: 188,
    initialDownvotes: 13,
    content: [
      {
        type: "p",
        text: "Most teams add monitoring after the first incident. The better move is to instrument the handful of signals that make incidents shorter and less expensive.",
      },
      { type: "h2", text: "The day-one checklist" },
      {
        type: "ul",
        items: [
          "Request IDs that flow through every service and log line.",
          "Structured logs for critical state transitions (create, approve, publish).",
          "Golden signals: latency, traffic, errors, saturation.",
          "A minimal audit trail for user-affecting actions.",
          "An alert for error budget burn, not every single error spike.",
        ],
      },
      { type: "h2", text: "Make it usable" },
      {
        type: "p",
        text: "Observability is a product. If it’s hard to answer ‘what happened’ in under 60 seconds, the instrumentation isn’t done yet.",
      },
    ],
  },
  {
    slug: "how-to-run-a-weekly-demo",
    title: "How to run a weekly demo that actually accelerates shipping",
    tag: "Operating model",
    excerpt:
      "A meeting format that trades status theater for real progress: show the work, make decisions, and leave with a plan.",
    createdAt: "2026-04-12T00:00:00.000Z",
    source: "example",
    cover: { kind: "gradient", background: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(255, 255, 255, 1) 52%, rgba(15, 23, 42, 0.12) 100%)" },
    readingTimeMinutes: 5,
    initialUpvotes: 76,
    initialDownvotes: 5,
    content: [
      { type: "p", text: "Most status meetings exist because nobody trusts the system. A demo meeting builds trust by making progress visible." },
      { type: "h2", text: "Agenda (45 minutes)" },
      { type: "ul", items: ["10m: Demo (live, not slides).", "10m: Metrics + risks.", "15m: Decisions (tradeoffs, scope, sequencing).", "10m: Next-week plan."] },
      { type: "h2", text: "Rules" },
      { type: "ul", items: ["No demo, no credit.", "One owner per decision.", "Write down what changed and why."] },
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
