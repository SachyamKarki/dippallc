import type { BlogContentBlock } from "@/lib/blog/types";
import { csImage } from "@/lib/blog/contentUtils";

export const content: readonly BlogContentBlock[] = [
  { type: "h2", text: "Executive summary" },
  {
    type: "p",
    text: "A mid-market B2B payments operator processing $2.1B in annual volume was spending more than fourteen staff-hours each business day reconciling invoices, settlement files, and ledger entries across three systems that had never been designed to agree. Finance operations copied data between NetSuite, a payment gateway export, and an internal PostgreSQL ledger; when totals diverged, resolution happened in Slack threads with no durable audit trail. Regulators and card-scheme partners expected evidence of control, not screenshots. Over ten weeks we designed and deployed a multi-agent reconciliation platform built on LangGraph for orchestrated reasoning, Temporal for durable workflow execution, and explicit human approval gates before any ledger mutation. The system normalised heterogeneous inputs, proposed matches with confidence scores, routed exceptions to operators with suggested remediation, and logged every tool invocation for compliance export. After ninety days in production, daily reconciliation effort dropped seventy-two percent, only eight percent of line items required human review, and zero production incidents were attributed to agent actions. This case study documents the constraints that shaped the architecture, the implementation choices that kept automation bounded, and the operational practices that made auditors comfortable signing off.",
  },
  {
    type: "p",
    text: "The engagement succeeded because we treated agents as supervised operators rather than autonomous bookkeepers. Ledger writes remained behind approval gates; idempotent tool design prevented duplicate posting; Temporal retries could not double-commit transactions. NIST AI Risk Management Framework guidance on govern-map-measure-manage informed our control design [1], and OWASP LLM Top 10 categories around prompt injection and excessive agency directly influenced our tool boundary policies [2]. The result is a reference pattern for fintech back-office automation where speed and auditability are non-negotiable.",
  },
  { type: "h2", text: "Background" },
  {
    type: "p",
    text: "The client operates a B2B payments platform serving wholesale distributors and regional manufacturers. Merchants submit invoices through a portal; the platform routes ACH and card settlements through a third-party gateway; finance closes books in NetSuite. A home-grown ledger in PostgreSQL tracks real-time balances for fraud monitoring and customer-facing dashboards. None of these systems share a canonical transaction identifier. Invoice numbers from merchants rarely match gateway reference codes, and the internal ledger uses UUIDs assigned at ingestion. Prior to automation, three analysts and a senior controller performed daily three-way matching: export CSVs from each system, pivot in spreadsheets, and manually investigate variances above $50. Month-end close added two extra days while the team chased timing differences on settlement batches that cleared after midnight UTC but before US Eastern business hours.",
  },
  {
    type: "p",
    text: "Leadership initiated the project after a Q3 audit finding noted insufficient documentation for manual adjustments. External auditors could see that totals eventually agreed, but they could not reconstruct who changed what, when, or why. Simultaneously, transaction volume grew thirty-four percent year-over-year while headcount stayed flat. The CFO mandated automation that reduced daily reconciliation time without removing human sign-off on exceptions or any action that mutated financial records. The Head of Finance Operations summarised the tension succinctly: they needed speed without gambling the audit. Every exception still had to have a name attached.",
  },
  {
    type: "ul",
    items: [
      "Daily reconciliation across NetSuite, payment gateway exports, and internal PostgreSQL ledger.",
      "Four FTE in finance ops spending roughly 14 hours combined on matching and exception handling.",
      "Regulatory and card-scheme expectations for immutable audit trails on financial adjustments.",
      "Heterogeneous identifiers and formats: API JSON, gateway CSV, legacy merchant CSV uploads.",
      "Prior manual process produced correct totals but weak provenance for auditor reconstruction.",
    ],
  },
  { type: "h2", text: "Constraints" },
  {
    type: "p",
    text: "Regulatory and internal risk policies established hard boundaries before we wrote agent prompts. No autonomous ledger mutation was permitted under any confidence threshold. Agents could read source systems, propose matches, draft journal entries, and annotate exceptions, but committing a journal entry required an authenticated operator to click approve in a dedicated UI with reason codes captured in PostgreSQL. PCI DSS scope considerations meant gateway credentials lived in a secrets vault with short-lived tokens; agents never saw raw API keys in context windows [3]. Data residency requirements kept all processing in US-East regions. Model outputs used for financial decisions had to be replayable: we pinned OpenAI model versions in production and blocked deploys when the pinned version differed from the last compliance-approved baseline.",
  },
  {
    type: "p",
    text: "Technical constraints were equally binding. The payment gateway still delivered one critical report as CSV only; API migration was scheduled for Q2 but could not block the project. NetSuite rate limits capped bulk reads to staged nightly pulls plus incremental hourly deltas. The internal ledger exposed a write API that was powerful but historically brittle—duplicate POSTs without idempotency keys had caused duplicate balance entries in 2022. Temporal was already the client's standard for durable workflows in onboarding; infrastructure would not approve a second orchestration engine. Observability had to land in existing Grafana and PagerDuty channels. Okta SSO was mandatory for operator UI access.",
  },
  {
    type: "ul",
    items: [
      "Zero autonomous writes to NetSuite or the internal ledger; approval gates on every mutation.",
      "Full replay of agent runs with inputs, tool calls, model version, and operator overrides.",
      "Idempotent tool design so retries and duplicate workflow starts cannot double-post.",
      "Legacy CSV ingestion until gateway API migration; fallback parsers must log confidence.",
      "PCI-aligned secret handling; no credentials in prompts or unstructured logs.",
      "Production deploys require model version parity with compliance-approved baseline.",
    ],
  },
  { type: "h2", text: "Architecture" },
  {
    type: "p",
    text: "We modelled reconciliation as a directed graph of specialised agents coordinated by LangGraph, with Temporal owning outer workflow durability, timers, and retry policy. LangGraph managed intra-run reasoning: which agent activates next, what state accumulates, and where human interrupts attach. Temporal workflows wrapped each daily reconciliation batch, ensuring that a crash mid-run resumed from the last completed activity without re-executing side effects. This separation follows LangGraph's recommended pattern for long-running, human-in-the-loop processes where graph state is rich but platform-level durability belongs in a workflow engine [4]. PostgreSQL stored normalised documents, proposed matches, approval records, and append-only audit events. Grafana dashboards pulled metrics from Prometheus exporters on the agent service and Temporal workers.",
  },
  csImage(
    "ai-back-office",
    "reconciliation",
    "Multi-agent reconciliation graph showing intake, matching, exception, and approval nodes connected through LangGraph state transitions",
    "LangGraph agent topology for daily reconciliation. Intake normalises inputs; matching proposes links; exceptions route to operators; ledger writes pause at approval gates.",
    "Dippa architecture diagram",
  ),
  { type: "h3", text: "Agent roles and state machine" },
  {
    type: "p",
    text: "Four agent roles participated in each run. The intake agent fetched and normalised source records: NetSuite invoices via REST, gateway CSV and partial API feeds, and ledger rows via SQL read replica. It emitted a canonical internal document schema with hashed source payloads so downstream steps could prove they worked from immutable inputs. The matching agent compared documents using deterministic rules first—exact amount and date windows, reference token fuzzy match, merchant ID joins—and escalated ambiguous sets to LLM-assisted reasoning with structured JSON output and explicit confidence scores. Matches above 0.92 auto-staged as proposed reconciliations; matches between 0.75 and 0.92 flagged for operator review with agent rationale; below 0.75 routed to the exception agent.",
  },
  {
    type: "p",
    text: "The exception agent clustered unmatched items, suggested root causes from a finite taxonomy—timing difference, FX rounding, duplicate submission, missing gateway reversal—and opened tasks in the operator queue with pre-filled investigation steps. It could invoke read-only investigative tools: pull gateway detail by reference, compare NetSuite payment status, query ledger event history. The posting agent drafted journal entries and ledger adjustments as structured payloads but terminated at an approval interrupt. LangGraph's interrupt primitive held the graph until Temporal signalled resume after operator action [4]. Approved payloads invoked idempotent write tools; rejected payloads logged reason codes and optionally spawned a corrected draft.",
  },
  {
    type: "code",
    language: "typescript",
    code: `// Simplified LangGraph interrupt before ledger write
const graph = new StateGraph(ReconciliationState)
  .addNode("intake", intakeAgent)
  .addNode("match", matchingAgent)
  .addNode("exception", exceptionAgent)
  .addNode("draft_post", postingAgent)
  .addNode("await_approval", approvalGate)
  .addEdge("intake", "match")
  .addConditionalEdges("match", routeByConfidence)
  .addEdge("exception", "await_approval")
  .addEdge("draft_post", "await_approval")
  .compile({ checkpointer: postgresCheckpointer });

// Temporal activity resumes graph after operator approves
await graph.invoke(null, {
  configurable: { thread_id: batchId },
  interrupt: "approval_resume",
});`,
  },
  { type: "h3", text: "Tool boundaries and audit envelope" },
  {
    type: "p",
    text: "Every tool exposed to agents implemented a shared audit envelope: caller run ID, agent role, input hash, output hash, latency, and model version when LLM reasoning participated. Write tools additionally required idempotency keys derived from batch ID, document IDs, and proposed entry hash. PostgreSQL audit tables were append-only; compliance exports joined audit events to Okta identity for operator approvals. Read tools were allowlisted per agent role—the matching agent could not invoke write endpoints even if prompt injection attempted to elicit them, a direct mitigation for OWASP LLM06 excessive agency [2]. Structured outputs used JSON schema validation; malformed model responses failed the step and surfaced in the operator UI rather than silently proceeding.",
  },
  csImage(
    "ai-back-office",
    "approval-gates",
    "Operator approval UI showing proposed journal entry, confidence score, agent rationale, and source document hashes",
    "Approval gate UI. Operators see matched source excerpts, agent confidence, and idempotency key before ledger commit.",
    "Dippa product screenshot",
  ),
  { type: "h2", text: "Implementation" },
  { type: "h3", text: "Ingestion and normalisation" },
  {
    type: "p",
    text: "Implementation phase one focused on canonical document schema and ingestion reliability. We defined a ReconciliationDocument type with source system, external identifiers, normalised amount in minor units, currency, effective timestamp, merchant ID, and raw payload hash. Intake activities ran as Temporal activities with individual retry policies: NetSuite pulls used exponential backoff on 429 responses; CSV ingestion validated column mappings and quarantined rows that failed schema checks rather than poisoning the batch. The legacy merchant CSV format required a fallback parser with explicit lower confidence ceiling—matches involving those rows could not exceed 0.85 without human review. This acknowledged technical debt while API migration remained on the roadmap.",
  },
  {
    type: "p",
    text: "Nightly full sync plus hourly incremental updates kept agent inputs fresh without hammering NetSuite limits. Gateway API coverage expanded during the project from sixty percent to eighty-five percent of volume; remaining CSV rows shrank but persisted in production monitoring as a tracked risk. Datadog alerts fired when CSV share exceeded five percent of daily volume, prompting finance to chase gateway migration milestones.",
  },
  { type: "h3", text: "Matching logic and confidence calibration" },
  {
    type: "p",
    text: "Deterministic matchers handled roughly seventy-eight percent of line items in production. Rules were version-controlled YAML tested with golden fixtures—amount equality within one cent, settlement date plus or minus one business day, tokenised reference overlap above 0.8 Jaccard similarity. LLM-assisted matching activated only for residual sets, with prompts constrained to select from candidate pairs provided by SQL joins, never free-form inventing matches. We calibrated confidence thresholds on four weeks of labelled historical data: precision above 0.99 for auto-stage at 0.92, recall prioritised at the exception band to avoid silent drops. OpenAI function calling returned structured MatchProposal objects validated against schema before graph transitions [5].",
  },
  {
    type: "p",
    text: "Model version pinning was enforced in CI. Deploy pipelines compared production config to compliance-approved model identifiers; mismatches blocked release. Weekly replay jobs re-ran a frozen sample of fifty historical batches against new model versions in shadow mode, comparing proposal diffs before compliance approved upgrades. This operationalised NIST AI RMF measure and manage functions for drift and regression [1].",
  },
  { type: "h3", text: "Approval workflow and operator experience" },
  {
    type: "p",
    text: "The operator UI surfaced queues by exception type and aging. Each task displayed side-by-side source excerpts, agent rationale, confidence, investigative tool results, and draft posting payload. Approve, reject, and request-more-info actions wrote to audit tables with mandatory reason codes on reject. Request-more-info spawned a sub-graph allowing the exception agent one additional investigative loop before re-presenting. Bulk approve existed only for deterministic high-confidence subsets explicitly tagged by the matching agent as rule-based, never LLM-only proposals. Training sessions emphasised that approval was attestation, not rubber-stamping—internal audit sampled ten approvals per week during rollout.",
  },
  {
    type: "quote",
    text: "We got speed without gambling the audit — every exception still has a name attached.",
    attribution: "Head of Finance Operations",
  },
  { type: "h3", text: "Temporal durability and failure modes" },
  {
    type: "p",
    text: "Temporal workflows modelled each daily batch as a parent workflow with child activities for ingestion, graph invocation, and notification. Activity heartbeats detected stuck LLM calls; retries respected idempotency on intake and read tools while write activities short-circuited if approval had not been recorded. We tested failure modes in game days: worker pod loss mid-graph, NetSuite outage during intake, duplicate cron triggers for the same business date. Duplicate cron protection used Temporal workflow ID reuse policy reject duplicate, keyed by reconciliation date. Recovery time objective for batch restart under fifteen minutes was met in drills [6].",
  },
  {
    type: "code",
    language: "python",
    code: `@workflow.defn
class DailyReconciliationWorkflow:
    @workflow.run
    async def run(self, business_date: str) -> BatchResult:
        docs = await workflow.execute_activity(
            ingest_all_sources,
            business_date,
            start_to_close_timeout=timedelta(minutes=30),
            retry_policy=RetryPolicy(maximum_attempts=5),
        )
        graph_result = await workflow.execute_activity(
            run_reconciliation_graph,
            docs,
            start_to_close_timeout=timedelta(hours=2),
            heartbeat_timeout=timedelta(minutes=2),
        )
        await workflow.execute_activity(
            notify_finance_queue,
            graph_result.exception_count,
        )
        return graph_result`,
  },
  { type: "h2", text: "Rollout" },
  {
    type: "p",
    text: "Rollout followed a four-stage plan over six weeks after a two-week pilot on historical replay and four live shadow days. Stage zero replayed ninety days of archived exports through the graph with operators blind-scoring proposals without approval authority—measuring precision, recall, and time-to-propose. Stage one shadow mode ran the production graph alongside manual reconciliation; operators compared outputs but manual process remained authoritative. Stage two partial production auto-staged high-confidence deterministic matches only; humans approved all LLM-assisted proposals and every write. Stage three expanded auto-staging to calibrated LLM band matches above 0.92 with continued approval gates on writes. Stage four deprecated parallel spreadsheet matching for US entities while EU entities waited on FX rule extensions.",
  },
  {
    type: "ul",
    items: [
      "Weeks 1–2: Historical replay and golden fixture hardening; compliance review of audit schema.",
      "Weeks 3–4: Shadow mode with dual-run KPI tracking; operator training and runbook publication.",
      "Weeks 5–6: Partial production for deterministic matches; PagerDuty integration for batch failures.",
      "Weeks 7–8: Full US production with LLM auto-staging; internal audit sampling of approvals.",
      "Weeks 9–10: Hardening, CSV parser telemetry, and handoff to client SRE for on-call rotation.",
    ],
  },
  {
    type: "p",
    text: "Change management included weekly office hours with finance ops, a runbook for batch failure recovery, and a compliance export job producing CSV bundles auditors used during Q4 interim testing. Model upgrade proposals became a formal change category requiring shadow replay sign-off. Grafana dashboards displayed batch duration, exception queue depth, auto-match rate, and mean approval latency—metrics reviewed in a fortnightly steering meeting with CFO staff.",
  },
  { type: "h2", text: "Results" },
  {
    type: "p",
    text: "After ninety days of full US production, finance operations measured outcomes against baseline October metrics collected before kickoff. Combined daily reconciliation effort dropped from approximately fourteen hours to under four hours—a seventy-two percent reduction. Auto-staged matches covered sixty-three percent of line items; operators reviewed another twenty-nine percent in the exception UI; eight percent required senior controller involvement, typically multi-party timing or FX edge cases. Zero production incidents involved duplicate posting or unauthorised ledger mutation. One P3 incident—a misconfigured CSV column mapping after a gateway header change—was detected within forty minutes by quarantine alerts and resolved same day without incorrect postings.",
  },
  {
    type: "ul",
    items: [
      "Seventy-two percent reduction in daily reconciliation labour hours.",
      "Eight percent of line items required senior human review; none bypassed approval gates.",
      "One hundred percent of agent runs produced compliance-exportable audit chains.",
      "Zero duplicate postings attributed to retries or duplicate workflow triggers in ninety days.",
      "Median batch completion time 47 minutes versus four-plus hours manual end-to-end.",
      "Q4 interim audit closed the prior documentation finding with no new exceptions.",
    ],
  },
  {
    type: "p",
    text: "Qualitative feedback highlighted trust earned through replay transparency. Operators initially sceptical of LLM-assisted matching adopted the tool after discovering they could replay exact tool sequences and compare to their manual conclusions. Compliance noted audit export completeness exceeded manual process because reason codes and source hashes were systematic rather than optional spreadsheet comments. Residual risk remained on legacy CSV ingestion—tracked as a phase-two dependency on gateway API migration—and on model version governance, which the client institutionalised into their existing change advisory board.",
  },
  { type: "h3", text: "Observability and compliance exports" },
  {
    type: "p",
    text: "Operations visibility was a first-class deliverable, not a stretch goal. Prometheus metrics exposed batch duration histograms, per-agent tool latency, LLM token consumption, exception queue depth, and approval turnaround time. Grafana dashboards segmented deterministic versus LLM-assisted match rates so leadership could see where probabilistic reasoning contributed value versus where rules sufficed. PagerDuty alerts fired on batch failure, ingestion quarantine spikes, or approval queue aging beyond twenty-four hours. Compliance exports ran on demand and on schedule: each bundle included the full decision chain for a sampled set of reconciliations—source document hashes, agent proposals, operator identity from Okta, approval timestamps, and final posting IDs in NetSuite and the internal ledger. External auditors reviewing Q4 interim controls reported the export format reduced sampling preparation from days to hours compared with prior spreadsheet reconstruction [7][8].",
  },
  {
    type: "p",
    text: "Trace replay used LangGraph checkpoint storage backed by PostgreSQL. Operators and auditors could reopen any run, step through graph transitions, and inspect tool inputs and outputs without re-invoking live APIs. This design choice added storage cost but eliminated an entire class of 'the system said so' disputes during exception reviews. Game-day exercises included deliberate replay of a disputed match from shadow mode; finance leads confirmed replay fidelity matched their contemporaneous notes. That exercise accelerated sign-off for stage-three LLM auto-staging.",
  },
  { type: "h2", text: "Lessons learned" },
  {
    type: "p",
    text: "First, approval gates are not overhead—they are the product. Fintech automation that optimises only for match rate without designing attestation UX will fail governance review. Investing in side-by-side source display and reason-coded rejections paid dividends in adoption and audit outcomes. Second, separate deterministic from probabilistic matching in metrics and permissions. Rule-based auto-staging earned operator trust; LLM-assisted auto-staging required shadow periods twice as long as initially planned. Third, idempotency keys belong in write tools from day one, not after the first duplicate incident. Temporal retries are a feature; without idempotent tools they become liability.",
  },
  {
    type: "p",
    text: "Fourth, treat model upgrades as production infrastructure changes, not prompt tweaks. Shadow replay on frozen batches caught two regressions before they reached operators—both involved subtle date parsing on gateway references. Fifth, quarantine bad rows early; poisoned ingestion sets erode confidence in the entire batch UI. Sixth, align with existing orchestration standards. Choosing Temporal over a bespoke job runner reduced infrastructure friction and let SRE apply familiar on-call patterns. Seventh, document residual risks honestly in the compliance packet—auditors respected the CSV migration timeline when presented with monitoring thresholds and ownership.",
  },
  {
    type: "p",
    text: "For organisations evaluating similar systems, the actionable pattern is bounded agency: agents propose, humans with identity attest, platforms prove. Frameworks from NIST AI RMF and OWASP LLM Top 10 translate into concrete controls when mapped to tool allowlists, structured outputs, and append-only audit—not slide deck vocabulary [1][2]. LangGraph plus Temporal proved a durable combination for human-in-the-loop financial workflows where graph richness and enterprise retry semantics both matter [4][6].",
  },
  {
    type: "references",
    title: "References",
    items: [
      {
        id: "1",
        text: "National Institute of Standards and Technology (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0).",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        id: "2",
        text: "OWASP Foundation (2025). OWASP Top 10 for Large Language Model Applications.",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      },
      {
        id: "3",
        text: "PCI Security Standards Council (2024). Payment Card Industry Data Security Standard v4.0.",
        url: "https://www.pcisecuritystandards.org/document_library/",
      },
      {
        id: "4",
        text: "LangChain (2024). LangGraph documentation: Human-in-the-loop and durable execution patterns.",
        url: "https://langchain-ai.github.io/langgraph/",
      },
      {
        id: "5",
        text: "OpenAI (2024). Structured outputs and function calling guide.",
        url: "https://platform.openai.com/docs/guides/structured-outputs",
      },
      {
        id: "6",
        text: "Temporal Technologies (2024). Temporal documentation: Workflow execution and retry policies.",
        url: "https://docs.temporal.io/",
      },
      {
        id: "7",
        text: "Deloitte (2023). Trustworthy AI in financial services: governance and control considerations.",
        url: "https://www2.deloitte.com/us/en/pages/financial-services/articles/trustworthy-ai.html",
      },
      {
        id: "8",
        text: "Bank for International Settlements (2022). Principles for operational resilience in financial market infrastructures.",
        url: "https://www.bis.org/cpmi/publ/d162.htm",
      },
      {
        id: "9",
        text: "Financial Action Task Force (2023). Guidance on digital identity and fraud prevention in payments.",
        url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/",
      },
      {
        id: "10",
        text: "Google Cloud (2024). Architecture framework: Idempotent API design patterns.",
        url: "https://cloud.google.com/architecture/scalable-and-resilient-apps",
      },
    ],
  },
] as const;
