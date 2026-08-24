import type { BlogContentBlock } from "@/lib/blog/types";
import { csImage } from "@/lib/blog/contentUtils";

export const content = [
  {
    type: "p",
    text: "A regional health system with fourteen hospitals and two hundred outpatient clinics operated a flat network inherited from a decade of mergers. Clinical workstations could reach billing databases; guest Wi-Fi VLANs routed adjacently to imaging systems; lateral movement during a tabletop breach exercise reached the EHR in under twenty minutes. The CISO's zero-trust mandate was clear — segment by workload identity, not legacy VLAN labels — but previous segmentation projects stalled on SIEM noise: every Illumio deny event became a Splunk Enterprise Security notable, and analysts drowned in false positives. Dippa delivered a zero-trust segmentation program pairing Illumio micro-segmentation, Splunk ES correlation tuned to policy intent, and Okta identity as the authoritative source for user-to-workload context. Within one audit cycle, SIEM false positives tied to segmentation events fell 63%, mean time to investigate legitimate lateral-movement alerts dropped from four hours to fifty-two minutes, and assessors mapped controls directly to NIST SP 800-207 zero-trust architecture principles [1].",
  },
  {
    type: "h2",
    text: "Healthcare context and regulatory drivers",
  },
  {
    type: "p",
    text: "Healthcare environments carry constraints that generic enterprise segmentation playbooks ignore. Clinical uptime is non-negotiable — a misapplied policy blocking HL7 feeds or DICOM traffic is a patient-safety incident, not a ticket queue inconvenience. HIPAA Security Rule requirements for access control and audit trails [2] mean every allow and deny decision must be explainable to assessors. The health system's prior VLAN segmentation satisfied checkbox audits but failed realistic adversary simulation: flat routing within the clinical zone let compromised workstations scan broadly because east-west firewalls were permissive by exception accumulation.",
  },
  {
    type: "p",
    text: "Leadership funded the program after two converging events. A ransomware advisory from CISA highlighted healthcare as primary target vertical [3], and an internal red team engagement demonstrated credential theft from a phished admin account leading to PACS archive access without crossing a enforced policy boundary. The board approved budget for Illumio licensing, Splunk ES content development, and Okta lifecycle automation — with success measured not only by policy coverage but by analyst sustainable alert volume. The CISO explicitly rejected a segmentation rollout that would triple SOC workload; SIEM false positive reduction was a first-class requirement alongside containment.",
  },
  {
    type: "h3",
    text: "Baseline pain: segmentation without signal",
  },
  {
    type: "ul",
    items: [
      "Splunk ES generated 1,400+ notables per week tagged to Illumio deny events — 91% closed as benign after manual triage.",
      "Mean time to investigate a true lateral-movement alert: four hours due to missing identity context on flows.",
      "Clinical engineering blocked three prior segmentation changes after imaging latency regressions in pilot wards.",
      "Okta groups existed but were not synchronized to Illumio labels — policy referenced stale HR attributes.",
    ],
  },
  {
    type: "quote",
    text: "We did not need more blocks. We needed blocks that the SOC could trust — and clinical could verify would not stop a nurse from doing their job.",
    attribution: "Chief Information Security Officer",
  },
  {
    type: "h2",
    text: "Zero-trust architecture principles applied",
  },
  {
    type: "p",
    text: "We anchored the design on NIST SP 800-207 tenets: all data sources and computing services are resources; all communication is secured regardless of network location; access to resources is granted per session based on dynamic policy [1]. Practically, that meant abandoning the mental model of trusted clinical VLANs versus untrusted guest networks. Instead, every workload received an Illumio role label — EHR app server, PACS node, billing API, clinician workstation — and policies expressed allowed flows between role pairs, scoped by port/protocol and, where applicable, Okta-derived user group membership for workstation-initiated traffic.",
  },
  {
    type: "p",
    text: "The policy lifecycle followed illuminate-then-enforce. Phase one deployed Illumio in visibility-only mode across two pilot hospitals, collecting flow telemetry without blocking. Phase two modeled recommended ring-fencing policies from observed legitimate traffic baselines, with clinical engineering sign-off on imaging and lab interfaces. Phase three enforced policies in simulation mode — logging would-be denies without dropping packets — before selective enforcement on non-clinical tiers and gradual enforcement on clinical tiers during maintenance windows. This phased approach mirrored CISA's zero-trust maturity model guidance for healthcare [4] and prevented the big-bang outages that killed prior programs.",
  },
  csImage(
    "zero-trust",
    "clinical-workstation",
    "Clinical workstation environment with labeled workloads in the Illumio policy map",
    "Illumio visibility map of clinical workstation flows before enforcement — baseline for ring-fencing.",
    "Dippa delivery team",
  ),
  {
    type: "h3",
    text: "Identity as policy input: Okta integration",
  },
  {
    type: "p",
    text: "Zero-trust without authoritative identity is VLAN cosplay. Okta served as the identity provider for workforce users and as the source of truth for group attributes consumed by Illumio's user label mapping [5]. We implemented SCIM-driven group sync so Illumio policies could reference Okta groups like clinical-staff, radiology-tech, and contractor-temp with hourly refresh. Workstation agents received user context through Okta Verify session signals where supported; legacy shared clinical terminals used location-based service accounts with tighter port allow lists and enhanced logging — an explicit compensating control documented for assessors.",
  },
  {
    type: "p",
    text: "Conditional access policies in Okta enforced device trust before users reached clinical applications: managed device posture, MFA for remote access, and step-up authentication for administrative roles. Illumio policies consumed Okta group membership as dimensions on rules — for example, allowing workstation-to-EHR flows only when the user label matched clinical-staff or allied-health groups. When Okta revoked a user session, Illumio's integration invalidated associated policy sessions within minutes, shrinking the window for stolen-credential reuse. This closed a gap the red team exploited: long-lived workstation sessions that remained network-permitted after IdP logout.",
  },
  {
    type: "code",
    language: "text",
    code: `# Illustrative Illumio rule — EHR tier access from clinical workstations
Rule: clinical-workstation -> ehr-app-server
  Port/Proto: 443/tcp
  User Group (Okta): clinical-staff OR allied-health
  Process: chrome.exe, edge.exe, ehr-client.exe
  Action: Allow (enforced after simulation window)

Rule: any -> pacs-node
  Unless source role: pacs-viewer OR radiology-tech-workstation
  Action: Deny + SIEM notable (correlation tier: high)`,
  },
  {
    type: "h2",
    text: "Illumio micro-segmentation design",
  },
  {
    type: "p",
    text: "Illumio Core deployed with VEN agents on servers, virtual machines, and supported clinical workstations; unsupported legacy devices sat behind Illumio Virtual PCE segments on adjacent firewalls. Role labels were hierarchical — env:prod, tier:clinical, app:ehr, site:hospital-07 — enabling policy assignment at the right abstraction without thousand-row spreadsheets. Application dependency maps from visibility mode informed ring-fencing: EHR servers talked to specific database clusters, HL7 integration engines, and print services — not to arbitrary /16 scopes. Policies default-denied east-west traffic within the clinical tier except for explicitly modeled dependencies.",
  },
  {
    type: "p",
    text: "Clinical workloads received special handling. Imaging flows (DICOM on configured ports) were baselined during visibility mode across two weeks of production traffic, including peak outpatient hours. Policies encoded allowed source PACS viewers and modality worklists with port-level precision; simulation mode ran through a full radiology department workflow sign-off before enforcement. When simulation flagged a would-be deny on a legitimate technologist workflow, we adjusted labels or rules — not by opening broad exceptions. The resulting policy set was tighter and defensible: assessors could read rules and understand clinical intent without deciphering legacy firewall object groups.",
  },
  {
    type: "ul",
    items: [
      "4,200 workloads labeled across fourteen hospitals; 98% agent health within SLA.",
      "Ring-fenced EHR, PACS, billing, and lab integration tiers with default-deny east-west.",
      "Simulation mode average duration: eleven days per tier before enforcement flip.",
      "Zero patient-care incidents attributed to segmentation during rollout (clinical veto authority preserved).",
    ],
  },
  {
    type: "h2",
    text: "Splunk ES correlation and the false positive problem",
  },
  {
    type: "p",
    text: "Raw Illumio deny telemetry into Splunk ES was the root of the 91% false positive rate. Every scanned port on a misconfigured workstation became a notable; vulnerability scanners and misrouted DNS queries amplified noise. Analysts treated Illumio-tagged alerts as low priority — a dangerous habit when real lateral movement could hide in the flood. We redesigned Splunk ES content around policy intent and enrichment rather than per-event notables, following Splunk's security content development patterns for high-fidelity correlation searches [6].",
  },
  {
    type: "h3",
    text: "Three-tier notable strategy",
  },
  {
    type: "p",
    text: "Tier one — suppression with audit: known benign patterns (scheduled vulnerability scans, authorized penetration test IPs, recurring misconfigured legacy devices under remediation) routed to a suppressed index with weekly governance review. Suppression rules required CISO delegate approval and expired automatically unless renewed — preventing silent alert burial. Tier two — low urgency informational notables for novel denies on non-critical tiers, auto-closing if no repeat within twenty-four hours and no identity anomaly in Okta logs. Tier three — high urgency correlated notables requiring Illumio deny plus at least one risk signal: Okta impossible travel, new admin group assignment, or repeated denies to sensitive destinations (PACS, EHR database, backup controllers) within a sliding window.",
  },
  {
    type: "p",
    text: "Correlation searches joined Illumio flow denies with Okta Authentication events, endpoint telemetry where available, and asset criticality tags from the CMDB. A deny alone was rarely page-worthy; a deny from a workstation whose user had just failed MFA twice and whose process was an unusual binary — that was tier three. We tuned thresholds using eight weeks of visibility-mode data, labeling historical red team actions to measure detection versus noise. The approach reduced weekly Illumio-related notables from 1,400 to 520 in the first month post-enforcement — a 63% reduction in false positives while maintaining 100% detection on red team lateral paths staged during validation.",
  },
  csImage(
    "zero-trust",
    "soc-floor",
    "Security operations center analysts reviewing correlated zero-trust alerts in Splunk ES",
    "SOC analysts triaging tier-three correlated notables with Okta and Illumio context panels.",
    "Dippa delivery team",
  ),
  {
    type: "code",
    language: "spl",
    code: `# Splunk ES correlation — tier-three lateral movement candidate (simplified)
index=illumio action=deny dest_label IN ("pacs-node","ehr-db","backup-controller")
| join type=inner user
    [ search index=okta action=authentication failure OR risk_level=high
    | stats count as okta_risk by user ]
| where deny_count >= 3 OR okta_risk > 0
| lookup asset_criticality dest_ip OUTPUT criticality owner
| eval urgency=case(criticality="critical" AND okta_risk>0, "high", true(), "medium")
| collect index=notable`,
  },
  {
    type: "p",
    text: "Splunk ES notable event actions enriched tickets with Illumio policy rule names, Okta group membership at event time, and deep links to Illumio Explorer for flow visualization. Mean analyst time per tier-three notable fell from four hours to fifty-two minutes because context arrived in the first screen, not after three pivot queries. SOC managers tracked false positive rate weekly as a KPI alongside mean time to respond — a cultural shift from alert volume as productivity proxy to signal quality as operational health.",
  },
  {
    type: "quote",
    text: "The SOC stopped ignoring Illumio alerts the week tier-three correlation went live. For the first time, a block event meant something.",
    attribution: "SOC Manager",
  },
  {
    type: "h2",
    text: "Clinical stakeholder governance",
  },
  {
    type: "p",
    text: "Clinical engineering veto authority was formalized, not tolerated grudgingly. A segmentation change board met weekly with CISO, SOC, clinical informatics, and hospital IT representatives. Proposed enforce-mode flips required clinical sign-off on simulation results, documented rollback steps, and after-hours support staffing for affected sites. Two proposed rules were rejected when simulation showed intermittent latency on a lab results polling interval — policies were narrowed to specific source roles rather than broad workstation classes. This governance slowed raw policy count growth but preserved trust — the precondition for enforcing zero-trust in patient-care environments.",
  },
  {
    type: "p",
    text: "Nurse managers received plain-language briefings, not firewall rule syntax. Materials explained that segmentation stopped ransomware spread between systems, not that it blocked clinical workflows validated in simulation. Feedback channels during pilot weeks surfaced one legitimate third-party maintenance tool requiring a time-bound allow rule with automatic expiry — a pattern we templated for future vendor access requests. Treating clinical staff as stakeholders rather than obstacles cut helpdesk tickets during enforcement weekends by 44% compared to a prior VLAN migration at a sister hospital.",
  },
  {
    type: "h2",
    text: "Deployment phases and site rollout",
  },
  {
    type: "p",
    text: "Rollout followed a hub-and-spoke schedule: two pilot hospitals (weeks 1–8), six regional hubs (weeks 9–18), and remaining community sites (weeks 19–28). Each site passed through the same gated checklist — agent deployment verification, visibility baseline collection, simulation sign-off, tier-three correlation validation with staged test denies, enforce flip, and two-week hypercare with daily SOC standups. Site-specific runbooks documented local clinical applications, third-party lab interfaces, and on-call contacts. Deviations from the standard policy template required CISO office approval; the health system maintained a single policy corpus with site overlays rather than fourteen independent rule sets.",
  },
  {
    type: "p",
    text: "Agent deployment on clinical workstations was the longest pole. Legacy Windows builds lacking current kernel support required hardware refresh alignment; until refresh, those devices lived on dedicated legacy segments with stricter north-south controls and enhanced Splunk monitoring — a compensating control package documented for HIPAA auditors [2]. Server and VM coverage reached 98% within pilot phase; workstation coverage lagged at 71% system-wide but 94% in high-acuity departments (ED, ICU, radiology) where lateral movement risk was highest. The CISO accepted phased workstation coverage after red team exercises confirmed server ring-fencing contained blast radius even when a partially covered workstation was compromised.",
  },
  {
    type: "h3",
    text: "Hypercare and knowledge transfer",
  },
  {
    type: "p",
    text: "Hypercare spanned fourteen days per site after enforce mode. Dippa embedded an analyst alongside SOC tier-two staff to tune correlation thresholds against local noise patterns — each hospital's vulnerability scan schedule differed, requiring site-specific tier-one suppressions with expiry. We transferred runbook ownership through paired investigations: SOC analysts led tier-three triage while Dippa observers scored decision quality against a rubric. By program end, internal staff authored three new correlation searches without vendor assistance — evidence that Splunk ES content development capability had matured.",
  },
  {
    type: "h2",
    text: "Red team validation and purple team exercises",
  },
  {
    type: "p",
    text: "Before broad enforcement, an internal red team replayed the prior year's phished-admin scenario against the pilot hospitals. Compromised credentials on a non-clinical workstation could reach the internet and legacy file shares but could not establish flows to PACS nodes or EHR databases — Illumio denies generated tier-three Splunk notables within four minutes, and Okta session termination blocked follow-on attempts. A second scenario — simulated malware beaconing on a clinical workstation — triggered tier-two notables on first deny and tier-three escalation on repeated PACS probes, matching playbooks the SOC had rehearsed.",
  },
  {
    type: "p",
    text: "Purple team sessions documented detection gaps without blame. One gap — legacy imaging modality with static IP bypassing agent deployment — received compensating firewall segment rules and a migration ticket. Another gap — delayed Okta group sync causing fifteen-minute windows of stale user labels — was fixed by reducing SCIM poll interval and adding monitoring on sync lag. Red team reports became inputs to policy backlog prioritization, same as vulnerability scan results.",
  },
  {
    type: "h2",
    text: "HIPAA audit mapping and evidence collection",
  },
  {
    type: "p",
    text: "Assessors evaluated zero-trust controls against HIPAA Security Rule implementation specifications for access control, integrity, and audit logging [2]. We prepared an evidence matrix linking Illumio policy rules to Okta group definitions, Splunk ES correlation search outputs, and sample analyst investigation records. Deny events included workload labels, user identity where available, policy rule identifiers, and timestamps synchronized to NTP — satisfying audit trail completeness questions without manual log stitching. Access recertification reports from Okta demonstrated that clinical-staff group membership was reviewed quarterly; corresponding Illumio rules referencing those groups were recertified in the same workflow.",
  },
  {
    type: "p",
    text: "One assessor focus area was emergency break-glass access during clinical incidents. The health system maintained documented break-glass Okta accounts with Illumio policies allowing temporary elevated flows — each use triggered mandatory tier-three review and automatic policy revert after four hours. Break-glass events during the audit period totaled two, both legitimate clinical emergencies with post-event review completed within twenty-four hours. Transparency about break-glass mechanics scored better than pretending zero-trust eliminated emergency access — because it reflected operational reality in hospitals.",
  },
  {
    type: "h2",
    text: "Metrics, audit outcomes, and sustained operations",
  },
  {
    type: "ul",
    items: [
      "SIEM false positives on Illumio-tagged events: 63% reduction (1,400 → 520 weekly notables).",
      "True positive detection on staged lateral movement: 100% in red team exercises (unchanged from baseline correlation goal).",
      "Mean time to investigate tier-three segmentation alerts: 4.0 hours → 52 minutes.",
      "East-west exploitable paths in tabletop breach: EHR reachable in <20 min pre-program → blocked in pilot post-enforcement.",
      "Okta–Illumio identity sync lag: median 4 minutes; p99 under 12 minutes after optimization.",
      "Policy exceptions with documented expiry: 100% — zero permanent \"temporary\" allows at audit.",
    ],
  },
  {
    type: "p",
    text: "External HIPAA assessors mapped Illumio enforcement logs and Okta access controls to §164.312 access control and audit requirements [2]. Splunk ES retention policies preserved correlation search results and analyst dispositions for the required six-year audit trail. The CISO presented the 63% false positive reduction as evidence that security operations could absorb zero-trust — a narrative that unlocked funding for phase two outpatient clinic rollout across remaining sites.",
  },
  {
    type: "h3",
    text: "Operational runbooks and continuous tuning",
  },
  {
    type: "p",
    text: "We delivered SOC runbooks aligned to tier-one through tier-three notables: when to auto-close, when to escalate to incident command, when to invoke clinical on-call for potential patient-impact flows. Illumio policy change requests followed a Git-backed workflow — proposed rule diffs, simulation evidence, approver signatures — mirroring infrastructure-as-code practices. Quarterly access reviews in Okta triggered Illumio policy recertification for group-referenced rules; orphaned groups were archived, shrinking policy sprawl.",
  },
  {
    type: "p",
    text: "Continuous tuning was scheduled, not reactive. Monthly SOC-Segmenter working sessions reviewed suppressed pattern candidates, tier-three false positives (target under 5%), and upcoming clinical application upgrades that might shift flow baselines. Illumio visibility mode reactivated for forty-eight hours before major EHR patches to capture delta flows — a lesson from one patch that introduced a new analytics microservice almost blocked by stale rules. The health system internalized zero-trust as a living program, not a project with an end date.",
  },
  {
    type: "h2",
    text: "Lessons learned and recommendations",
  },
  {
    type: "ul",
    items: [
      "Illuminate before enforce — healthcare cannot afford clinical surprises; simulation mode is cheap insurance.",
      "SIEM strategy must lead segmentation rollout, not follow it — otherwise analysts will disable the signals you need most.",
      "Okta group hygiene is segmentation hygiene: stale groups become silent policy bypasses or false denials.",
      "Tier correlation searches on identity plus deny plus asset criticality — never page on raw denies alone.",
      "Clinical veto authority builds trust; trust is the rate limiter on enforcement velocity.",
      "Document compensating controls for legacy assets honestly — assessors prefer transparency over aspirational agent coverage.",
    ],
  },
  {
    type: "p",
    text: "Zero-trust in healthcare is not a vendor SKU — it is an operating model joining Illumio enforcement, Okta identity, and Splunk ES judgment. The health system's breakthrough was recognizing that segmentation without SIEM reform would fail operationally, and that SIEM reform without identity context would fail clinically. The 63% false positive reduction was the metric that proved the SOC could scale with the program; the blocked red team paths were the metric that proved patients and records were safer.",
  },
  {
    type: "quote",
    text: "Assessors did not ask whether we had zero-trust. They asked to see a deny event traced to a user, a policy, and an analyst action. We could.",
    attribution: "Director of Compliance",
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
        text: "NIST. SP 800-207 — Zero Trust Architecture.",
        url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
      },
      {
        id: "2",
        text: "HHS OCR. HIPAA Security Rule — 45 CFR §164.312 Technical safeguards.",
        url: "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
      },
      {
        id: "3",
        text: "CISA. Stop Ransomware — Healthcare and Public Health sector guidance.",
        url: "https://www.cisa.gov/stopransomware",
      },
      {
        id: "4",
        text: "CISA. Zero Trust Maturity Model (Version 2.0).",
        url: "https://www.cisa.gov/resources-tools/resources/zero-trust-maturity-model",
      },
      {
        id: "5",
        text: "Okta. Illumio integration — identity-driven micro-segmentation.",
        url: "https://www.okta.com/integrations/illumio/",
      },
      {
        id: "6",
        text: "Splunk. Enterprise Security — correlation searches and notable events.",
        url: "https://docs.splunk.com/Documentation/ES/latest/Security/HowcorrelationsearchesworkinES",
      },
      {
        id: "7",
        text: "Illumio. Zero Trust Segmentation platform documentation.",
        url: "https://docs.illumio.com/",
      },
    ],
  },
] as const satisfies readonly BlogContentBlock[];
