import type { BlogContentBlock } from "@/lib/blog/types";
import { csImage } from "@/lib/blog/contentUtils";

export const content: readonly BlogContentBlock[] = [
  { type: "h2", text: "Executive summary" },
  {
    type: "p",
    text: "A four-hundred-person B2B SaaS company operated six fragmented knowledge surfaces—Confluence spaces, ad hoc Notion pages, Google Docs, Slack pins, a legacy wiki, and PDF runbooks attached to Jira tickets. Engineering and support staff spent an estimated nine minutes per L1 inquiry locating authoritative answers; when they found them, content was often stale or contradicted by a newer Slack thread. Leadership wanted an internal copilot that accelerated resolution without inventing facts or leaking customer data into training corpora. Over eight weeks we delivered a retrieval-augmented generation system over approved Confluence content, mandatory inline citations with source links and last-updated metadata, confidence-gated refusal behaviour, and escalation to subject-matter experts when retrieval quality fell below threshold. Pinecone hosted the vector index; OpenAI models handled embedding and generation; nightly Confluence sync kept the corpus bounded and auditable. After sixty days in production, sixty-four percent of L1 queries self-served without a ticket, one hundred percent of accepted answers included citations, median response time was 4.2 seconds, and content owners received weekly stale-document flags. This case study explains the constraints that ruled out fine-tuning on tickets, the RAG architecture that made citations non-optional, and the rollout practices that built trust among sceptical senior engineers.",
  },
  {
    type: "p",
    text: "The programme succeeded because retrieval boundaries were treated as security policy, not model tuning. Only approved Confluence spaces entered the index; PII scrubbing ran at ingest; the copilot declined to answer rather than hallucinate when similarity scores were weak—a pattern aligned with NIST AI RMF guidance on meaningful human review and context-aware risk management [1]. OWASP LLM risks around sensitive information disclosure and overreliance informed our citation and refusal UX [2]. For SaaS operators scaling support without scaling headcount, the reference architecture offers a pragmatic path: cite or refuse, never guess, and measure documentation freshness as part of operational health and onboarding velocity.",
  },
  { type: "h2", text: "Background" },
  {
    type: "p",
    text: "The client sells workflow automation software to mid-market operations teams. Support is tiered: L1 handles password resets, integration setup, and known-error workarounds; L2 and engineering handle defects and architecture questions. Internal enablement assumed staff could find runbooks in Confluence, but search relevance was poor across duplicated pages, deprecated product versions, and spaces maintained by different departments without governance. New hires reported spending their first month learning where answers might live rather than what the answers were. Slack became the de facto search engine—fast but ephemeral and unversioned.",
  },
  {
    type: "p",
    text: "Incident retrospectives repeatedly cited documentation drift: a runbook updated for v3.2 still indexed prominently while v4.0 changed authentication flows. Customer-facing SLAs did not require internal doc freshness, so owners deprioritised updates until escalations forced them. Support leadership measured ticket deflection attempts via a macro library in Zendesk, but macros went stale for the same reasons. The CTO charter for the copilot project was explicit: reduce L1 toil, never ship an answer without a traceable source, and keep customer ticket bodies out of the vector store to respect privacy commitments and SOC 2 control narratives.",
  },
  {
    type: "ul",
    items: [
      "Approximately 400 staff across engineering, support, sales engineering, and customer success.",
      "Six knowledge surfaces with Confluence as nominal source of truth but incomplete coverage.",
      "L1 ticket volume averaging 340 per week with high repeat-question rate on integrations.",
      "Existing Confluence search ranked by recency of edit activity, not authority or product version.",
      "SOC 2 and customer DPAs prohibiting use of customer ticket content for model training.",
      "Senior engineers sceptical of chat interfaces after a failed 2023 keyword bot pilot.",
    ],
  },
  { type: "h2", text: "Constraints" },
  {
    type: "p",
    text: "Privacy and compliance constraints eliminated several tempting shortcuts. Fine-tuning on historical Zendesk tickets would have improved domain fluency but violated data processing agreements and introduced uncontrolled PII into model weights. Instead, the corpus was limited to explicitly approved Confluence spaces listed in a YAML manifest reviewed by legal and security quarterly. Ingest pipelines ran Microsoft Presidio-style PII detectors on page text and blocked chunks containing high-confidence entities such as email addresses, phone numbers, and account IDs [3]. Customer names in examples were replaced with placeholders at index time. Access control mirrored Confluence permissions: if a user could not read a page in Confluence, the chunk was filtered post-retrieval before prompt assembly.",
  },
  {
    type: "p",
    text: "Product constraints required mandatory citations on every displayed answer—not footnotes optional behind a disclosure toggle. Users had to see page title, space, URL, and last modified timestamp inline. When retrieval confidence fell below calibrated thresholds, the copilot responded with a structured refusal and opened an SME Slack queue rather than generalising from weak matches—a mitigation for OWASP LLM09 overreliance [2]. Latency target was under six seconds at p95 for internal Slack and web widget interfaces. The system had to degrade gracefully when Pinecone or OpenAI experienced regional outages; cached refusal messages and status banners were required. Two legacy Notion spaces remained outside phase-one scope; migration was scheduled but could not block launch.",
  },
  {
    type: "ul",
    items: [
      "Corpus limited to approved Confluence spaces; manifest signed by content governance council.",
      "No customer ticket bodies or attachments in embeddings; PII scrubbing at ingest mandatory.",
      "Post-retrieval permission filter enforcing Confluence ACLs per requesting user.",
      "Mandatory citations with URL and last-updated date on every non-refusal answer.",
      "Refusal and SME escalation when top-k similarity below threshold; no silent guessing.",
      "Median response time target under six seconds; p95 under ten seconds.",
    ],
  },
  { type: "h2", text: "Architecture" },
  {
    type: "p",
    text: "The architecture follows a classic RAG pipeline with governance wrappers: sync, chunk, embed, retrieve, permission-filter, generate-with-citations, log feedback. Confluence REST API exports pages nightly and on webhook for labelled spaces; incremental diffs re-index only changed pages. Chunking used structure-aware splitting on headings with five-hundred-token windows and fifty-token overlap, preserving heading breadcrumbs in chunk metadata for citation strings. OpenAI text-embedding-3-small produced vectors stored in Pinecone with metadata fields for page ID, space key, title, URL, last modified ISO timestamp, product version tags, and content hash. At query time, hybrid retrieval combined dense vectors with BM25-style keyword search implemented via Pinecone sparse vectors for exact match on error codes and product SKUs [4][5].",
  },
  csImage(
    "ai-copilot",
    "knowledge-base",
    "RAG pipeline diagram from Confluence sync through chunking, embedding, Pinecone index, retrieval, and citation-enforced generation",
    "Knowledge base architecture. Approved Confluence spaces sync nightly into Pinecone; queries retrieve permission-filtered chunks before citation-bound generation.",
    "Dippa architecture diagram",
  ),
  { type: "h3", text: "Retrieval, ranking, and confidence gating" },
  {
    type: "p",
    text: "Retrieval fetched top-twenty chunks, applied permission filters, then re-ranked with a cross-encoder style heuristic combining cosine similarity, recency decay, and authority weighting for spaces tagged gold in the manifest. The re-ranker penalised pages not modified in more than ninety days unless explicitly marked evergreen. Confidence score was the calibrated probability that the top re-ranked chunk answered the query, derived from a validation set of five hundred labelled internal questions. Below 0.68, the system refused. Between 0.68 and 0.78, answers displayed with prominent uncertainty banner and SME escalation suggested. Above 0.78, standard citation UI applied. Refusal messages included closest-matching doc titles without asserting their correctness—helpful pointer without overclaim.",
  },
  {
    type: "p",
    text: "Generation used a strict system prompt requiring inline bracket citations referencing chunk IDs mapped to Confluence URLs in post-processing. JSON schema mode enforced a response object with fields answer_text, citations array, and confidence self-assessment; post-validation rejected outputs missing citations or referencing chunk IDs not present in retrieval results [6]. This pattern mitigates OWASP LLM01 prompt injection attempts to omit sources because schema validation fails closed and returns refusal.",
  },
  {
    type: "code",
    language: "python",
    code: `def answer_query(user: User, question: str) -> CopilotResponse:
    chunks = hybrid_retrieve(question, top_k=20)
    chunks = [c for c in chunks if user.can_read(c.page_id)]
    ranked = rerank(question, chunks)
    confidence = calibrate_confidence(ranked)

    if confidence < REFUSE_THRESHOLD:
        return CopilotResponse.refuse(suggestions=ranked[:3])

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format=AnswerWithCitations.schema(),
        messages=build_messages(question, ranked[:6]),
    )
    parsed = AnswerWithCitations.parse(completion)
    validate_citation_ids(parsed, ranked)
    return CopilotResponse.ok(parsed, confidence)`,
  },
  { type: "h3", text: "Interfaces and feedback loops" },
  {
    type: "p",
    text: "Staff accessed the copilot via Slack slash command and a minimal web widget embedded in the internal portal. Both interfaces rendered citations as clickable Confluence links opening in new tabs, with last modified dates displayed in local timezone. Thumbs up and thumbs down captured structured feedback: downvotes required selecting incorrect, incomplete, stale, or other with optional free text. Downvotes opened a review item for the content owner extracted from Confluence page metadata. Weekly digest emails listed pages that triggered more than five downvotes or escalations—driving documentation maintenance without central editorial bottlenecks. Datadog traced retrieval latency, OpenAI token usage, refusal rate, and escalation volume.",
  },
  csImage(
    "ai-copilot",
    "support-desk",
    "Slack copilot response showing inline citations with Confluence links, last updated dates, and thumbs feedback controls",
    "Support desk experience in Slack. Every answer includes clickable citations; low-confidence queries route to SME queue instead of guessing.",
    "Dippa product screenshot",
  ),
  { type: "h2", text: "Implementation" },
  { type: "h3", text: "Confluence sync and corpus governance" },
  {
    type: "p",
    text: "Implementation began with corpus definition workshops. Space owners tagged pages with product version labels; governance council removed three spaces from manifest after discovering they duplicated content elsewhere. The nightly sync job ran in Kubernetes with idempotent upserts into Pinecone namespaces per environment. Deletions propagated: when pages moved to archived state, vectors deleted within one sync cycle. Webhook-driven incremental sync covered labelled runbook spaces with SLA four-hour freshness; other spaces remained nightly. Diff alerts posted to Slack when high-traffic pages changed more than five percent token count day-over-day, prompting owners to verify copilot impact.",
  },
  {
    type: "p",
    text: "Chunk metadata included heading_path arrays so answers could cite Runbooks > Integrations > OAuth rather than only page titles. Code blocks were split separately with language tags preserved—important for API examples senior engineers relied on. Attachments were not indexed in phase one except markdown exports stored inline; PDF indexing was deferred pending OCR quality review.",
  },
  { type: "h3", text: "Security, privacy, and ACL mirroring" },
  {
    type: "p",
    text: "ACL mirroring cached Confluence effective permissions hourly per user group mapping synced from Okta groups. Post-retrieval filtering prevented prompt assembly from including unauthorised chunks—a critical control when HR and legal spaces shared the same Confluence instance as engineering runbooks. Prompt logs stored redacted retrieval sets for thirty days for debugging; full answer logs retained ninety days with automated PII scrubbing on write. Security review mapped controls to OWASP LLM02 sensitive information disclosure and LLM07 insecure plugin design by treating retrieval filters as authorization enforcement, not convenience [2]. Penetration testing included attempts to exfiltrate restricted space content via creative rephrasing; no bypass succeeded post-filter.",
  },
  { type: "h3", text: "Citation enforcement and evaluation harness" },
  {
    type: "p",
    text: "Before launch we built an evaluation harness of five hundred question-answer pairs maintained by support leads, with gold citations on Confluence URLs. Metrics tracked citation precision, citation recall, refusal correctness, and hallucination rate judged by three human raters. Launch gate required citation precision above 0.95 and hallucination rate below two percent on the harness. Weekly regression ran automatically against new embeddings or prompt changes; release pipeline blocked deploy on regression beyond tolerance. Ragas and custom scorers provided automated pre-screening though human raters remained authoritative for borderline cases [7].",
  },
  {
    type: "quote",
    text: "If it cannot show me the page, I do not want the answer — that was the bar, and they hit it.",
    attribution: "Staff Engineer, Platform",
  },
  { type: "h3", text: "SME escalation workflow" },
  {
    type: "p",
    text: "SME queue posted to a dedicated Slack channel with question text, retrieval scores, top three chunk titles, and requester team. SMEs claimed items via emoji reaction; first responder posted authoritative answer with manual Confluence link and optionally triggered fast-track doc update. SLA was best-effort four business hours—not yet automated, acknowledged as phase-two improvement. Escalation taxonomy fed back into manifest priorities: recurring escalation themes on OAuth integration triggered a documentation sprint that reduced that cluster's volume thirty-eight percent over six weeks.",
  },
  { type: "h2", text: "Rollout" },
  {
    type: "p",
    text: "Rollout targeted sceptical senior engineers first—a deliberate choice inverted from typical pilot programmes. Week one limited access to twenty staff engineers who had criticised the 2023 keyword bot. Their feedback shaped citation UI and refusal copy. Weeks two and three expanded to all of support and solutions engineering with side-by-side ticket handle time measurement. Week four opened to entire company with onboarding lunch sessions demonstrating refusal behaviour and feedback loops. Notion migration workstream ran parallel but did not block general availability; copilot UI displayed banner noting two Notion spaces not yet indexed with expected migration date.",
  },
  {
    type: "ul",
    items: [
      "Week 1: Closed pilot with staff engineers; citation and refusal UX iteration.",
      "Weeks 2–3: Support and sales engineering; handle time A/B versus macro baseline.",
      "Week 4: Company-wide launch; governance council office hours biweekly.",
      "Ongoing: Weekly stale doc digest; monthly security review of manifest changes.",
      "Phase 2 planned: Notion ingestion, SME SLA automation, PDF OCR for legacy attachments.",
    ],
  },
  {
    type: "p",
    text: "Enablement materials emphasised what the copilot would not do: no customer-specific account lookups, no ticket creation without human click-through, no answers without citations. Internal communications framed the tool as search-plus-summary over approved docs, not omniscient assistant—setting expectations that reduced overreliance risk flagged in OWASP LLM09 [2]. Champions in each support pod tracked weekly self-serve rate and shared wins in team standups.",
  },
  { type: "h2", text: "Results" },
  {
    type: "p",
    text: "Sixty days after company-wide launch, support operations reported sixty-four percent of L1 queries self-served via copilot without Zendesk ticket creation—measured by Slack and widget analytics cross-checked against ticket tags for repeat question categories. One hundred percent of non-refusal responses included at least one valid Confluence citation; schema validation rejected malformed completions before user display. Median end-to-end response time was 4.2 seconds; p95 was 8.7 seconds, within target. Content owners received average twelve stale-document flags per week; seventy percent resulted in page updates within fourteen days. SME escalations averaged twenty-two per day down from an initial thirty-one during week two as corpus quality improved.",
  },
  {
    type: "ul",
    items: [
      "Sixty-four percent L1 query self-serve rate without ticket creation.",
      "One hundred percent citation inclusion on accepted answers post schema validation.",
      "Median response time 4.2 seconds; p95 8.7 seconds including retrieval and generation.",
      "Twelve stale doc flags per week driving owner updates; 70% updated within two weeks.",
      "Hallucination rate below two percent on monthly human-eval sample of 200 queries.",
      "Zero PII leakage incidents; pen-test found no ACL bypass via retrieval manipulation.",
    ],
  },
  {
    type: "p",
    text: "Qualitative outcomes mattered as much as metrics. Senior engineers who ignored the keyword bot adopted Slack slash command habitually when citations appeared above answers—visible provenance converted sceptics. Support leads noted macro usage dropped but not to zero; complex multi-step workflows still required human-authored Zendesk macros until runbooks absorbed edge cases surfaced by downvote data. Leadership approved phase-two funding for Notion ingestion and SME SLA automation based on ROI model assuming continued deflection growth to seventy-five percent L1.",
  },
  {
    type: "p",
    text: "Broader organisational effects appeared after the sixty-day mark. New hire onboarding for support shortened by an estimated 1.5 days because the copilot surfaced canonical integration guides instead of tribal Slack pointers. Sales engineering reported faster proof-of-concept setups when solution architects queried webhook signing and idempotency patterns with cited answers during customer calls—reducing back-and-forth with L2. Content governance council meeting attendance increased after weekly stale-doc digests named owners publicly; pages older than one hundred twenty days in gold spaces dropped from forty-one to nineteen without hiring additional technical writers. The programme did not eliminate documentation work—it redirected it toward high-signal updates driven by telemetry rather than periodic audits alone.",
  },
  { type: "h3", text: "Monitoring, cost, and continuous improvement" },
  {
    type: "p",
    text: "Production observability tracked retrieval hit rate, refusal rate, citation validation failures, OpenAI token spend, and Pinecone query latency in Datadog dashboards [12]. Cost governance capped monthly embedding refresh and generation spend; alerts at eighty percent of budget triggered review of whether nightly re-embeds could shift to diff-only for stable spaces. A weekly analytics review joined support leadership, content owners, and platform engineering to inspect downvote clusters, escalation themes, and pages with high retrieval frequency but low thumbs-up rates—signals of stale or ambiguous documentation. Over eight weeks post-launch, three targeted doc sprints closed the highest-friction clusters: OAuth integration setup, webhook retry configuration, and sandbox-to-production promotion checklists. Each sprint measurably shifted refusal and escalation rates downward without model changes, reinforcing that RAG quality is primarily a content pipeline discipline [7][9].",
  },
  {
    type: "p",
    text: "Embedding model and chunk parameter changes ran through the same regression harness used at launch. When OpenAI released an updated embedding model, shadow indexing in a separate Pinecone namespace allowed A/B comparison on the five-hundred-question gold set before cutover. The team rejected one candidate upgrade because citation recall dropped four points on API versioning questions—acceptable for generic search, unacceptable for a copilot where missing the correct runbook page causes support rework. This discipline mirrors NIST AI RMF measure functions applied to retrieval components rather than only generative outputs [1].",
  },
  { type: "h2", text: "Lessons learned" },
  {
    type: "p",
    text: "First, citations are trust infrastructure, not UI decoration. Mandatory inline links with freshness metadata differentiated this programme from failed chat pilots where answers floated without provenance. Second, refusal is a feature—calibrated confidence gating prevented the reputational damage of confident wrong answers during early adoption. Third, corpus governance beats larger models. Shrinking to approved spaces and investing in owner workflows improved outcomes more than upgrading embedding dimensions. Fourth, post-retrieval ACL filtering is non-negotiable in shared Confluence instances; pre-filtering at index time alone is insufficient when permissions change frequently.",
  },
  {
    type: "p",
    text: "Fifth, evaluate with internal gold sets before launch and regress continuously—RAG quality is data pipeline quality. Sixth, pilot with critics; if staff engineers endorse citation discipline, support will follow. Seventh, align with frameworks explicitly: NIST AI RMF map and measure functions translated into manifest review cadence and eval gates [1]. OWASP LLM Top 10 informed threat modelling workshops that produced actionable controls rather than checkbox paperwork [2]. Eighth, plan for stale content operational debt—flags and owner digests worked better than hoping authors self-maintain without feedback signals. Ninth, instrument refusal and escalation paths as product health metrics, not failure modes: a well-calibrated refusal protects trust more than a speculative answer that sends an engineer down the wrong integration path for an hour.",
  },
  {
    type: "p",
    text: "Organisations replicating this pattern should start with corpus manifest discipline, not model selection. Pinecone and OpenAI proved sufficient at four-hundred-employee scale; the differentiator was enforcement: cite, filter, refuse, and log every query. For B2B SaaS operators under SOC 2 scrutiny, keeping customer tickets out of embeddings simplified auditor conversations while still delivering measurable L1 deflection [3][8]. Future work will integrate Notion spaces, automate SME SLAs, and explore version-aware retrieval that preferentially surfaces documentation tagged to the user's current product release train.",
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
        text: "Microsoft (2024). Presidio: Data protection and de-identification SDK.",
        url: "https://microsoft.github.io/presidio/",
      },
      {
        id: "4",
        text: "Pinecone (2024). Hybrid search documentation: dense and sparse retrieval.",
        url: "https://docs.pinecone.io/guides/search/hybrid-search",
      },
      {
        id: "5",
        text: "Atlassian (2024). Confluence Cloud REST API documentation.",
        url: "https://developer.atlassian.com/cloud/confluence/rest/v2/intro/",
      },
      {
        id: "6",
        text: "OpenAI (2024). Structured outputs and JSON schema response format.",
        url: "https://platform.openai.com/docs/guides/structured-outputs",
      },
      {
        id: "7",
        text: "Es et al. (2023). RAGAS: Automated evaluation of retrieval augmented generation.",
        url: "https://arxiv.org/abs/2309.15217",
      },
      {
        id: "8",
        text: "AICPA (2022). SOC 2 Trust Services Criteria for service organizations.",
        url: "https://www.aicpa.org/resources/landing/system-and-organization-controls-soc-2",
      },
      {
        id: "9",
        text: "Lewis et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks.",
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        id: "10",
        text: "Gartner (2024). Guidance on deploying generative AI assistants for internal knowledge management.",
        url: "https://www.gartner.com/en/topics/generative-ai",
      },
      {
        id: "11",
        text: "LangChain (2024). RAG tutorial and production patterns.",
        url: "https://python.langchain.com/docs/tutorials/rag/",
      },
      {
        id: "12",
        text: "Datadog (2024). LLM observability: tracing retrieval and generation pipelines.",
        url: "https://www.datadoghq.com/product/llm-observability/",
      },
    ],
  },
] as const;
