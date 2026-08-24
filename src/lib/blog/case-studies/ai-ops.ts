import type { BlogContentBlock } from "@/lib/blog/types";
import { csImage } from "@/lib/blog/contentUtils";

export const content = [
  {
    type: "p",
    text: "A global logistics operator deployed twelve autonomous agents across dispatch, exception handling, and customer-notification workflows. Within six weeks of production launch, on-call engineers were spending more time reconstructing agent decisions than fixing root causes. Mean time to recovery (MTTR) for agent-related incidents averaged forty-seven minutes — unacceptable for a platform that processed three million routing decisions daily. Dippa was engaged to design an operator-first observability stack: unified tracing via LangSmith, production dashboards in Grafana, and a mandatory human-override path that could halt any agent run without redeploying code. The result was a twelve-minute MTTR and a SOC-ready audit trail that satisfied both internal SRE and external compliance reviewers.",
  },
  {
    type: "h2",
    text: "Background and operating constraints",
  },
  {
    type: "p",
    text: "The client's agent fleet ran on a LangGraph orchestration layer backed by OpenAI and Anthropic models, with tool calls into TMS APIs, geospatial services, and a PostgreSQL event store. Agents were not experimental — they owned tier-one dispatch exceptions and generated legally relevant customer communications in regulated markets. Leadership had approved the automation program on two conditions: every decision had to be replayable, and no agent could mutate production state without an operator-visible checkpoint. Those constraints shaped every design choice in the ops dashboard program.",
  },
  {
    type: "p",
    text: "Before our engagement, observability was fragmented. LangSmith captured development traces, but production sampling was inconsistent and not correlated with infrastructure metrics. Grafana showed CPU and queue depth, but engineers could not pivot from a latency spike to the specific agent run that triggered a bad TMS write. PagerDuty alerts fired on generic thresholds — \"error rate > 2%\" — with no structured payload describing which agent graph node failed or which tool returned malformed JSON. On-call runbooks assumed human operators could SSH into worker pods and grep logs; that model collapsed once concurrent agent runs exceeded four hundred per minute during peak season.",
  },
  {
    type: "h3",
    text: "Stakeholders and success criteria",
  },
  {
    type: "ul",
    items: [
      "Platform SRE: MTTR under fifteen minutes for P1 agent incidents, with runbooks that do not require model-prompt expertise.",
      "Compliance: immutable audit logs linking operator overrides to downstream state changes, retained for seven years.",
      "Agent engineering: feedback loops from production failures into LangSmith datasets without manual CSV exports.",
      "Business operations: visibility into agent throughput, cost per run, and human-escalation rates by workflow.",
    ],
  },
  {
    type: "quote",
    text: "We did not need more dashboards. We needed one place where an on-call engineer could see the agent's reasoning, the tool output, and the infra context — and hit pause before a bad dispatch propagated.",
    attribution: "Director of Platform Engineering",
  },
  {
    type: "h2",
    text: "Architecture: the agent ops control plane",
  },
  {
    type: "p",
    text: "We introduced a thin control plane — internally codenamed Relay — that sat between the LangGraph runtime and existing observability tools. Relay did not replace LangSmith or Grafana; it normalized identifiers, enriched traces with deployment metadata, and exposed a small set of control APIs for human override. Every agent run received a globally unique run_id at graph entry; that ID propagated through OpenTelemetry spans, LangSmith trace roots, structured logs, and Grafana exemplars. This single correlation key eliminated the \"three tabs and a prayer\" debugging workflow that had defined the first month of production.",
  },
  {
    type: "p",
    text: "The architecture followed a deliberate separation of concerns. LangSmith remained the system of record for LLM-centric data: prompts, completions, token counts, evaluator scores, and human feedback tags. Grafana remained the system of record for time-series infrastructure and application metrics, fed by Prometheus and Loki. Relay bridged the two by writing LangSmith run metadata into a low-cardinality Prometheus label set and by injecting trace deep-links into Grafana alert annotations. Operators clicked from a firing alert directly into the LangSmith trace view filtered to the affected run_id — a workflow we validated in game-day exercises before enabling auto-page for agent SLO breaches.",
  },
  csImage(
    "ai-ops",
    "trace-dashboard",
    "Grafana dashboard showing agent run latency, tool error rates, and LangSmith trace deep-links",
    "Unified agent ops dashboard correlating LangSmith traces with Grafana infrastructure metrics.",
    "Dippa delivery team",
  ),
  {
    type: "h3",
    text: "LangSmith integration in production",
  },
  {
    type: "p",
    text: "LangSmith's strength is capturing the semantic layer of agent behavior — what the model saw, what it decided, and how each tool call chained into the next [1]. Our production integration went beyond the default SDK wrapper. We configured LangSmith with a dedicated production project per agent workflow, enforced tagging on every trace (environment, model version, graph version, tenant shard), and enabled run-level feedback hooks tied to the override UI. Sampling was set to 100% for runs that touched write tools; read-only classification runs sampled at 10% to control cost while preserving statistical visibility into latency drift.",
  },
  {
    type: "p",
    text: "Critically, we exported LangSmith run summaries to object storage on a fifteen-minute cadence via the LangSmith API [2]. That export served two purposes. First, it gave compliance an immutable, WORM-enabled archive independent of LangSmith's SaaS retention window. Second, it powered offline eval pipelines — when an operator flagged a run as incorrect, the export job automatically appended it to a regression dataset keyed by agent workflow. Agent engineers reviewed those datasets weekly; promoted examples became LangSmith evaluators that blocked merges when prompt changes regressed tool-selection accuracy.",
  },
  {
    type: "code",
    language: "typescript",
    code: `// Production trace wrapper — every write-tool invocation is fully traced
export async function tracedAgentRun(ctx: RunContext) {
  const runId = ctx.runId; // propagated to OTel + Grafana exemplars
  return langsmith.traceable(
    async () => executeGraph(ctx),
    {
      name: ctx.workflow,
      run_type: "chain",
      metadata: {
        run_id: runId,
        graph_version: ctx.graphVersion,
        model: ctx.modelId,
        tenant: ctx.tenantId,
      },
      tags: ["production", ctx.workflow, \`model:\${ctx.modelId}\`],
    },
  )();
}`,
  },
  {
    type: "p",
    text: "We also instrumented LangSmith's feedback API so operator overrides were first-class events, not Slack afterthoughts. When an on-call engineer triggered an override, Relay posted structured feedback to the LangSmith run: override reason code, operator LDAP, timestamp, and a snapshot hash of graph state at interruption. That feedback appeared inline on the trace timeline, visible to agent engineers during post-incident review. Over twelve weeks, override-tagged runs became the highest-signal source for prompt and tool-schema improvements — more actionable than generic \"thumbs down\" ratings on individual LLM turns.",
  },
  {
    type: "h3",
    text: "Grafana dashboards and alerting model",
  },
  {
    type: "p",
    text: "Grafana dashboards were organized around operator mental models, not microservice topology. The primary landing dashboard — Agent Fleet Overview — showed four rows: throughput and queue depth, error and retry rates, p95 end-to-end latency by workflow, and cost proxies (token volume × model tariff). Each panel supported drill-down by workflow, model version, and tenant shard. A second dashboard, Run Forensics, accepted a run_id paste and rendered a synthesized timeline: OTel span waterfall, LangSmith link, associated log lines from Loki, and TMS API response codes pulled from Prometheus histograms.",
  },
  {
    type: "p",
    text: "Alerting moved from threshold noise to SLO-driven pages. We defined error budgets per workflow based on historical p99 latency and tool failure rates. Alerts fired only when burn rate exceeded policy over a sliding window, and every alert annotation included the top three contributing run_ids by error impact. This pattern, adapted from Google SRE workbook guidance on multi-window burn rates [3], cut PagerDuty volume by 58% in the first month while increasing the fraction of pages that required immediate action. On-call engineers reported that annotated run_ids reduced mean time to first hypothesis from eighteen minutes to under four.",
  },
  {
    type: "ul",
    items: [
      "Recording rules pre-aggregated agent metrics to keep dashboard queries sub-second at peak load.",
      "Exemplars linked latency histogram buckets to run_id for one-click trace pivot.",
      "Loki labels constrained to low-cardinality fields — run_id lookup via Relay API, not label indexing.",
      "Synthetic probes simulated read-only agent paths every five minutes from three regions.",
    ],
  },
  {
    type: "h2",
    text: "Human override: design and implementation",
  },
  {
    type: "p",
    text: "Human override was the most politically sensitive requirement. Business stakeholders feared that a big red stop button would neuter automation ROI; compliance insisted it was non-negotiable for regulated customer communications. We resolved the tension by designing override as a scoped, auditable state transition rather than a kill switch. Operators could pause a single run, pause all runs for a workflow, or rollback the last committed write for a run — each action required a reason code and MFA through Okta. Paused runs serialized graph state to S3; resumption required either operator approval or automatic expiry after TTL, preventing indefinite queue stalls.",
  },
  {
    type: "p",
    text: "The override API exposed three endpoints consumed by the ops dashboard and by automated guardrails. POST /runs/{run_id}/pause halted execution before the next tool call boundary — never mid-HTTP request — preserving external system consistency. POST /workflows/{name}/circuit-open set a Redis flag checked at graph entry, routing new runs to a human queue while in-flight runs drained safely. POST /runs/{run_id}/rollback invoked compensating transactions against the TMS write API where supported; unsupported writes flagged for manual reconciliation with pre-filled incident tickets. Every override emitted a CloudEvents message consumed by Splunk and the compliance archive.",
  },
  csImage(
    "ai-ops",
    "oncall",
    "On-call engineer using the agent override console during a simulated incident drill",
    "Human override console with MFA-gated pause, circuit-open, and rollback actions.",
    "Dippa delivery team",
  ),
  {
    type: "code",
    language: "yaml",
    code: `# Example PagerDuty alert payload enrichment (Grafana unified alerting)
annotations:
  summary: "Dispatch agent error budget burn > 2x"
  run_id: "{{ $labels.run_id }}"
  langsmith_url: "https://smith.langchain.com/o/acme/projects/dispatch/r/{{ $labels.run_id }}"
  override_url: "https://ops.acme.internal/agents/runs/{{ $labels.run_id }}/pause"
  runbook: "https://wiki.acme.internal/runbooks/agent-dispatch-p1"`,
  },
  {
    type: "p",
    text: "We ran monthly game days where operators practiced override under load. Scenarios included poisoned geospatial responses, TMS rate limiting, and model version skew after a partial rollout. The drills surfaced a critical gap: junior on-call engineers hesitated to circuit-open workflows without senior approval. We added a guided decision tree in the dashboard — three questions about blast radius and customer impact — that recommended pause versus circuit-open versus rollback. Hesitation time dropped; MTTR improved measurably in subsequent drills. Leadership accepted automation continuity because overrides were rare (0.3% of runs) and always documented.",
  },
  {
    type: "quote",
    text: "The override button is not an admission that agents fail. It is proof that we can trust them in production — because we can stop them.",
    attribution: "VP of Operations",
  },
  {
    type: "h2",
    text: "Incident response and the path to twelve-minute MTTR",
  },
  {
    type: "p",
    text: "MTTR before the program was forty-seven minutes measured from PagerDuty page to confirmed customer impact remediation — not merely to root-cause identification. Incidents clustered into four archetypes: tool schema drift after upstream API changes, model behavior regression following prompt edits, capacity saturation during peak windows, and retry storms amplifying transient TMS errors. Each archetype had a distinct forensic signature, but without correlated traces engineers treated every page as a unique mystery.",
  },
  {
    type: "h3",
    text: "Runbook redesign around run_id",
  },
  {
    type: "p",
    text: "We rewrote runbooks to start from run_id, not from log grep patterns. Step one: open Run Forensics dashboard, paste run_id from alert annotation. Step two: classify failure layer — infra, tool, model, or external dependency — using the synthesized timeline. Step three: apply playbook branch. Tool failures often warranted circuit-open plus upstream ticket; model failures triggered eval dataset promotion and rollback to prior graph version via feature flag; infra failures escalated to platform SRE with attached exemplar metrics. This classification tree was printed on a single page and embedded in the dashboard sidebar.",
  },
  {
    type: "p",
    text: "For the worst incident in the program — a TMS field rename that caused 12% of dispatch writes to fail silently — MTTR was eleven minutes. The alert annotation carried a high-impact run_id; forensics showed tool responses returning HTTP 200 with empty bodies; an operator circuit-opened the dispatch workflow; rollback scripts reconciled forty-three affected shipments. Post-incident, we added JSON schema validation on tool responses and a LangSmith evaluator that flagged empty-body successes. That evaluator prevented recurrence across two subsequent API changes.",
  },
  {
    type: "ul",
    items: [
      "P1 MTTR (production impact): 47 min → 12 min median over ninety days post-launch.",
      "P2 MTTR (degraded but workaround available): 28 min → 9 min median.",
      "Mean time to root-cause identification: 22 min → 6 min.",
      "Incidents requiring senior escalation: 41% → 14%.",
      "Override actions per 10,000 runs: 31 → 8 (better upstream quality, not less oversight).",
    ],
  },
  {
    type: "h3",
    text: "Post-incident learning loop",
  },
  {
    type: "p",
    text: "Every P1 and P2 incident produced a blameless postmortem within five business days. Postmortems were incomplete without LangSmith trace links and Grafana snapshot exports attached. Agent engineering maintained a rolling \"prevent recurrence\" backlog prioritized by incident frequency × customer impact. Items that touched prompts or tool schemas required LangSmith eval passes before redeployment — the same gate used for feature work. This closed the loop between ops pain and engineering investment; dashboard metrics showed eval coverage rising from 34% to 89% of production workflows over the engagement period.",
  },
  {
    type: "h2",
    text: "Defensive instrumentation: tool schemas and eval gates",
  },
  {
    type: "p",
    text: "Observability without prevention would have left the client faster at diagnosing failures they still could not stop in time. We paired the ops dashboard with defensive instrumentation at tool boundaries. Every external API response passed through JSON Schema validation before the agent graph advanced; schema violations short-circuited the run and emitted a high-severity metric rather than allowing silent partial writes. Schemas versioned alongside TMS API contracts in Git, with CI failing when upstream OpenAPI specs changed without a matching schema bump. This pattern drew on established API hardening practice — validate at the boundary, fail closed, alert with context [5].",
  },
  {
    type: "p",
    text: "LangSmith evaluators ran in two tiers. Tier-one evaluators executed on every production trace tagged with write tools — latency budget 800ms — checking for empty payloads, missing required fields, and confidence scores below workflow thresholds. Tier-two evaluators ran asynchronously against the fifteen-minute export batch, applying heavier semantic checks and LLM-as-judge comparisons for customer-facing notification text. Evaluator regressions blocked deployment pipelines through GitHub status checks wired to LangSmith's comparison API [2]. Agent engineers initially resisted the latency tax; we showed that tier-one evaluators caught the TMS empty-body class of bugs at graph runtime, converting what would have been twelve-minute incidents into sub-minute automated pauses with no customer impact.",
  },
  {
    type: "code",
    language: "python",
    code: `# Tier-1 LangSmith evaluator — runs inline on write-tool traces
def validate_tms_response(run, example) -> dict:
    payload = run.outputs.get("tool_response", {})
    if run.outputs.get("http_status") == 200 and not payload.get("shipment_id"):
        return {"key": "empty_success", "score": 0, "comment": "200 with empty body"}
    return {"key": "empty_success", "score": 1}`,
  },
  {
    type: "h2",
    text: "Security, access control, and audit",
  },
  {
    type: "p",
    text: "The ops dashboard and override APIs were high-privilege surfaces. Access was gated through Okta groups with quarterly recertification: ops-viewer (dashboards read-only), ops-responder (pause and circuit-open), ops-admin (rollback and eval promotion). All sessions required hardware MFA. API tokens used by Grafana for LangSmith deep-link enrichment were scoped to read-only LangSmith permissions and rotated automatically via HashiCorp Vault. Override actions wrote to an immutable audit stream — S3 Object Lock plus Splunk HEC — satisfying SOC 2 and customer contractual clauses on automated decision explainability.",
  },
  {
    type: "p",
    text: "Penetration testing in week ten attempted privilege escalation from ops-viewer to override endpoints. Relay enforced authorization at the API gateway and again at the service layer; attempts were logged and alerted. No findings were open at engagement close. Compliance reviewers specifically praised the LangSmith feedback linkage — they could trace an operator override to a TMS state change within two query hops, a scenario that previously required manual log archaeology across three systems.",
  },
  {
    type: "h2",
    text: "Rollout phases and organizational change",
  },
  {
    type: "p",
    text: "We delivered in four phases over fourteen weeks. Phase one (weeks 1–3): correlation ID plumbing, LangSmith production project setup, baseline Grafana dashboards — no alerting changes. Phase two (weeks 4–7): override API and dashboard UI, MFA integration, game day one. Phase three (weeks 8–11): SLO-based alerting, Run Forensics dashboard, LangSmith export to compliance archive. Phase four (weeks 12–14): runbook migration, on-call training, handoff to internal platform team with documented Terraform modules for dashboard and alert provisioning.",
  },
  {
    type: "p",
    text: "Organizational change mattered as much as tooling. Agent engineers initially viewed LangSmith production tagging as overhead. We demonstrated that override-tagged runs shortened their debug cycles and fed eval datasets automatically — adoption improved when they saw merged PRs blocked by their own regression tests. SREs skeptical of LLM observability became advocates after the TMS field-rename incident resolved in eleven minutes on a dashboard they trusted. Executive sponsors received a weekly one-page scorecard: MTTR, error budget remaining, override rate, eval coverage — metrics that connected ops health to business continuity.",
  },
  {
    type: "h2",
    text: "Results and sustained outcomes",
  },
  {
    type: "p",
    text: "Ninety days after full rollout, median P1 MTTR stabilized at twelve minutes — a 74% reduction from the pre-engagement baseline. PagerDuty noise dropped 58% while true-positive page urgency increased, a pattern consistent with healthier alerting hygiene [3]. Agent workflow availability measured by error budget met 99.2% against a 99.0% target. Compliance completed their audit with zero major findings on automated decision traceability. Internal NPS for on-call engineers improved from −11 to +34, a qualitative signal that the program succeeded operationally, not just on paper.",
  },
  {
    type: "p",
    text: "Cost visibility was an unexpected win. Token volume dashboards by workflow surfaced two agents running classification at GPT-4 rates where GPT-4o-mini met eval thresholds. Right-sizing saved an estimated $47,000 monthly without accuracy regression — savings that funded continued LangSmith and Grafana Cloud commitments. Human override rates fell from 0.31% to 0.08% of runs as upstream quality improved, demonstrating that observability investment reduced operational toil rather than creating it.",
  },
  {
    type: "h2",
    text: "Lessons learned and recommendations",
  },
  {
    type: "ul",
    items: [
      "Correlate early: a single run_id across LangSmith, OTel, and Grafana pays dividends before fancy dashboards.",
      "Treat override as a product feature, not an emergency hack — MFA, reason codes, and audit streams build trust.",
      "Sample strategically: 100% tracing on write paths, statistical sampling on read paths balances cost and signal.",
      "Alert on SLO burn, not static thresholds — annotate with run_ids to make pages actionable.",
      "Close the loop: production overrides and incidents must feed LangSmith eval datasets automatically.",
      "Game days are mandatory: override hesitation is a latency bug you can train away.",
    ],
  },
  {
    type: "p",
    text: "For organizations standing up agent fleets in production, the lesson is straightforward: agents are distributed systems with non-deterministic components, and they deserve the same operational rigor as payment processors or identity providers. LangSmith answers what the agent thought; Grafana answers how the platform behaved; human override answers whether you can sleep at night. Combined, they turn agent ops from artisanal log reading into an engineering discipline with measurable MTTR, auditability, and continuous improvement.",
  },
  {
    type: "quote",
    text: "Twelve-minute MTTR is not a trophy metric. It means our customers do not wait while we figure out what the machine did — we already know, and we can fix it.",
    attribution: "Staff SRE, Incident Commander",
  },
  {
    type: "h2",
    text: "References",
  },
  {
    type: "references",
    items: [
      {
        id: "1",
        text: "LangChain. LangSmith documentation — tracing, feedback, and production monitoring.",
        url: "https://docs.smith.langchain.com/",
      },
      {
        id: "2",
        text: "LangChain. LangSmith API reference — run exports and programmatic feedback.",
        url: "https://docs.smith.langchain.com/reference",
      },
      {
        id: "3",
        text: "Google SRE Team. Multi-window, multi-burn-rate alerting (Site Reliability Workbook).",
        url: "https://sre.google/workbook/alerting-on-slos/",
      },
      {
        id: "4",
        text: "Grafana Labs. Exemplars — linking metrics to traces.",
        url: "https://grafana.com/docs/grafana/latest/fundamentals/exemplars/",
      },
      {
        id: "5",
        text: "OpenTelemetry. Trace context propagation specification.",
        url: "https://opentelemetry.io/docs/specs/otel/context/api-propagators/",
      },
      {
        id: "6",
        text: "CloudEvents. CNCF specification for event metadata interoperability.",
        url: "https://cloudevents.io/",
      },
    ],
  },
] as const satisfies readonly BlogContentBlock[];
