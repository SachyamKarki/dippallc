import type { BlogContentBlock } from "@/lib/blog/types";
import { csImage } from "@/lib/blog/contentUtils";

export const content: readonly BlogContentBlock[] = [
  {
    type: "p",
    text: "A national specialty retailer operating eighty brick-and-mortar branches across twelve states faced a WAN architecture that had not kept pace with store modernization. Every location relied on dual MPLS circuits procured through a regional carrier bundle, with primary and backup paths that shared the same provider backbone more often than anyone admitted on paper. When circuits degraded, store managers rebooted edge routers, called a tier-one helpdesk, and waited for an RFO measured in hours—not seconds. Point-of-sale terminals, VoIP handsets, inventory scanners, and guest Wi‑Fi all competed for the same constrained pipes with no application-aware routing. Monthly WAN spend exceeded $420,000, yet adding bandwidth at a single high-volume location required a six-month contract amendment. Leadership asked for a design that reduced cost, automated failover, and gave internal teams direct control of policy rather than routing every change through a telco project manager.",
  },
  {
    type: "p",
    text: "Dippa was engaged for a fourteen-week program spanning architecture, lab validation, infrastructure-as-code pipeline build-out, and wave-based production cutover. The target stack centered on Cisco SD-WAN [1] for overlay transport and policy, NetBox [2] as the authoritative inventory and site model, and Terraform [3] to generate device configuration from that model with no hand-edited production configs. The program completed with all eighty branches on the new fabric, median automatic failover of 7.4 seconds, and a thirty-four percent reduction in WAN circuit spend after MPLS decommission in migrated regions. This case study documents the constraints we operated under, the dual-hub topology we selected, the NetBox-to-Terraform pipeline that eliminated documentation drift, and the cutover methodology that produced zero P1 incidents attributed to migration.",
  },
  { type: "h2", text: "Starting conditions and business drivers" },
  {
    type: "p",
    text: "The retailer's store technology team had spent three years digitizing checkout, back-room inventory, and clienteling applications at the edge. Each initiative assumed reliable, low-latency connectivity to SaaS POS backends and a private cloud hosting legacy merchandising APIs. In practice, WAN performance varied widely by region: coastal stores with newer fiber DIA options saw acceptable latency, while inland locations on aging MPLS tail circuits routinely exceeded one hundred milliseconds to the primary datacenter. VoIP quality complaints tracked circuit utilization more closely than handset firmware versions. Guest Wi‑Fi, originally deprioritized, had become a clienteling channel—store associates used captive-portal analytics to recognize returning customers—yet it still rode the same MPLS queues as card-present transactions.",
  },
  {
    type: "p",
    text: "Finance initiated the WAN review after a Q4 outage at eleven stores in a single metro market. A carrier core maintenance window ran long; backup MPLS paths failed to converge because both circuits terminated on the same provider edge. Stores operated in offline POS mode for four hours. The business cost—lost transactions, manual reconciliation, and overtime at the service desk—exceeded the annual circuit fees for that market alone. The CIO set three measurable goals: reduce WAN opex by at least twenty-five percent within twelve months of completion, achieve sub-ten-second automatic failover for POS and VoIP at every branch, and establish an internal source of truth for site connectivity so network changes no longer depended on spreadsheet archaeology.",
  },
  {
    type: "ul",
    items: [
      "POS, VoIP, back-room scanners, and guest Wi‑Fi must remain on isolated segments with enforceable QoS—not a flat store LAN.",
      "Failover must be automatic; front-line staff cannot be expected to power-cycle routers during peak trading hours.",
      "Every branch configuration must be generated from NetBox site records; manual CLI edits in production are prohibited.",
      "Each store cutover must complete within a two-hour maintenance window with validated rollback to MPLS within thirty minutes if post-checks fail.",
      "Security and PCI scope boundaries established during the prior segmentation project must not regress.",
    ],
  },
  { type: "h2", text: "Assessment findings" },
  {
    type: "p",
    text: "We began with a two-week discovery pass: circuit inventory validation, passive monitoring at twenty representative stores, and interviews with NOC, store operations, and the PCI assessor. The circuit inventory confirmed eighty branches with one hundred fifty-nine active MPLS services—some locations retained a third legacy T1 for alarm panels. Contract end dates staggered across four years, with early termination fees that made rip-and-replace financially painful if not sequenced regionally. Passive monitoring revealed that thirty-seven percent of stores experienced at least one hour-long primary circuit impairment per month, but only four percent of those events generated carrier tickets because store staff had normalized brief glitches.",
  },
  {
    type: "p",
    text: "Application profiling at ten pilot stores showed POS traffic averaging four megabits per second at peak with burst sensitivity to latency above eighty milliseconds. VoIP consumed less bandwidth but was intolerant of jitter above twenty-five milliseconds. Guest Wi‑Fi peaked at twelve megabits on weekends yet was business-critical for the clienteling workflow. The existing MPLS QoS markings were inconsistent: some CE routers marked POS DSCP correctly, others overwrote queues at the provider edge. The assessment concluded that continuing to optimize MPLS COS classes would not deliver the cost target or operational control the CIO required. SD-WAN with local internet breakout and centralized policy was the recommended path, consistent with Gartner's guidance on hybrid WAN architectures for distributed retail [4].",
  },
  csImage(
    "sd-wan",
    "retail-floor",
    "Retail store floor during peak trading hours with POS and clienteling workflows dependent on WAN connectivity",
    "Store operations continued during cutover windows; pre/post validation scripts ensured POS and VoIP were healthy before doors opened.",
    "Dippa field documentation",
  ),
  { type: "h2", text: "Architecture overview" },
  {
    type: "p",
    text: "We designed a dual-hub SD-WAN fabric: two regional hubs collocated in Equinix facilities—one East, one Central—each hosting Cisco vSmart controllers, vManage, and hub vEdge routers with dual DIA and private cloud connectivity. Branches received Cisco cEdge devices with dual local DIA circuits plus 4G/LTE backup modems. The overlay ran in a hub-and-spoke topology for east-west traffic to corporate applications, with selective direct internet breakout for guest Wi‑Fi and software updates. BGP at the hubs advertised summarized routes to AWS and on-premises datacenter peers; branches maintained minimal routing state and received policy from vSmart templates.",
  },
  {
    type: "p",
    text: "Application-aware routing policies steered POS and VoIP over the primary DIA transport when SLA metrics—latency, loss, and jitter sampled every ten seconds—met defined thresholds. Degraded paths triggered automatic failover to secondary DIA or LTE without store intervention. Guest Wi‑Fi traffic exited locally at the branch, reducing hub hairpinning and keeping PCI-scoped systems off shared internet paths. Fortinet SASE integration at the hubs provided consistent URL filtering and IPS for breakout traffic without backhauling guest sessions to the datacenter. The design deliberately avoided full mesh: eighty branches in full mesh would have complicated BGP policy without meaningful latency benefit given the retailer's traffic patterns.",
  },
  { type: "h3", text: "Hub layer design" },
  {
    type: "p",
    text: "Each hub consisted of paired vEdge routers in active/active configuration with diverse DIA providers and cross-connects into the retailer's cloud VPCs. vSmart controllers ran in a three-node cluster split across availability zones for control-plane resilience. vManage provided single-pane orchestration but was not the source of truth for site attributes—NetBox held site codes, address data, circuit identifiers, VLAN mappings, and device roles. Hub routers peered via eBGP with cloud VPN gateways using private AS numbers allocated per region. We implemented maximum-prefix limits and route filtering so a branch misconfiguration could not leak into the hub's upstream tables.",
  },
  {
    type: "p",
    text: "Hub internet breakout for corporate SaaS used centralized security inspection before traffic exited toward Microsoft 365 and the POS SaaS provider's anycast endpoints. Telemetry from hubs fed Zabbix dashboards watched by the NOC during cutover waves. The hub design included a maintenance mode flag in NetBox that, when set, shifted branches to alternate hub preference and suppressed SLA-based flapping alerts—a lesson learned from lab testing where simultaneous hub upgrades caused unnecessary branch path oscillation.",
  },
  { type: "h3", text: "Branch layer design" },
  {
    type: "p",
    text: "Standard branch profiles covered seventy-six locations: dual DIA with diverse last-mile providers where available, plus LTE backup. Four acquired stores in the Pacific Northwest retained non-standard VLAN maps pending POS vendor recertification; they received a variant profile with identical transport policy but extended monitoring until VLAN remediation completed. Each cEdge connected to dual switches with POS on a dedicated VLAN, VoIP on a voice VLAN with strict priority queuing, scanners on an operations VLAN, and guest Wi‑Fi on an isolated SSID mapped to a local breakout policy.",
  },
  {
    type: "p",
    text: "LTE served as tertiary transport, not primary, to control data costs during peak season video promotions on guest Wi‑Fi. Data caps were modeled per store and reviewed quarterly. Cisco SD-WAN's performance-based routing measured real application flow performance rather than relying solely on ICMP probes—a distinction that mattered at stores where providers rate-limited ping while leaving TCP flows acceptable [1]. We documented baseline SLA metrics per transport during lab emulation of degraded last-mile conditions using netem injection.",
  },
  csImage(
    "sd-wan",
    "edge-router",
    "Cisco SD-WAN edge router installation in a retail branch communications closet",
    "Standardized rack layout and labeling sped cutover nights; Terraform-generated configs matched NetBox asset tags on every device.",
    "Dippa field documentation",
  ),
  { type: "h2", text: "NetBox as source of truth" },
  {
    type: "p",
    text: "Before this program, site documentation lived in a NetBox instance that was mostly accurate for IPAM but inconsistently updated for circuit IDs and physical install details. Field techs often labeled devices correctly while NetBox still referenced retired MPLS CE routers. That drift made previous change windows risky: engineers trusted printed runbooks over the database. We established a governance rule—no production change without a matching NetBox record—and backed it with automation. Every site received a validated custom field set: store number, region, wave assignment, transport circuit identifiers, POS VLAN ID, maintenance window, and hub preference.",
  },
  {
    type: "p",
    text: "NetBox webhooks fired on approved site updates to trigger a Terraform plan pipeline in GitLab CI. The pipeline rendered Cisco SD-WAN device templates—feature templates, device templates, and policy attachments—using Terraform providers and modular HCL. Plans were artifact-stored for audit; applies required approval from network engineering and automatically opened a change record in the retailer's ITSM tool. Device-specific variables—circuit bandwidth, interface labels, GPS coordinates for LTE diagnostics—were read from NetBox via API during plan generation. If Terraform detected a device serial not present in NetBox, the pipeline failed closed.",
  },
  {
    type: "code",
    language: "hcl",
    code: `# Branch profile generated from NetBox site store-042
data "netbox_site" "store" {
  slug = var.site_slug
}

resource "sdwan_feature_template" "vpn_branch" {
  name     = "\${data.netbox_site.store.custom_fields.store_number}-vpn"
  type     = "vpn-vedge"
  template = templatefile("\${path.module}/templates/vpn_branch.tpl", {
    site_id   = data.netbox_site.store.custom_fields.store_number
    hub_east  = var.hub_east_ip
    hub_central = var.hub_central_ip
  })
}

resource "sdwan_device_template" "branch" {
  name              = "\${data.netbox_site.store.name}-cedge"
  device_type       = "vedge-c8000v"
  feature_templates = [
    sdwan_feature_template.system.id,
    sdwan_feature_template.vpn_branch.id,
    sdwan_feature_template.transport_dia_primary.id,
    sdwan_feature_template.transport_dia_secondary.id,
    sdwan_feature_template.transport_lte.id,
    sdwan_feature_template.qos_pos_voip.id,
  ]
}

resource "sdwan_policy" "app_steering_pos" {
  name = "\${data.netbox_site.store.slug}-pos-steering"
  rules = [{
    app      = "pos_terminal"
    sla      = { latency_ms = 80, loss_pct = 0.5, jitter_ms = 25 }
    preferred = ["dia_primary", "dia_secondary"]
    fallback  = ["lte_backup"]
  }]
}`,
  },
  {
    type: "p",
    text: "The pipeline eliminated an entire class of errors we had seen in prior retail engagements: mistyped interface names, orphaned policy attachments, and devices provisioned with another store's VPN profile. During wave one, a staging error in NetBox pointed store 019 at store 018's secondary circuit ID; Terraform plan review caught the mismatch before any apply. That fail-closed behavior became a talking point with auditors reviewing change control maturity.",
  },
  { type: "h2", text: "Policy design and application steering" },
  {
    type: "p",
    text: "Policy design began in the lab with application identification lists aligned to the retailer's actual traffic—not generic category defaults. POS terminals spoke HTTPS to a known SaaS endpoint set; VoIP used SIP and RTP ranges defined by the UCaaS vendor; inventory scanners used a proprietary TCP port to a warehouse API. We created custom application definitions where Cisco's defaults were too broad, preventing guest Wi‑Fi HTTPS from being misclassified as POS. QoS queues on the cEdge prioritized VoIP and POS ACK-heavy flows; scavenger class carried guest Wi‑Fi and patch traffic.",
  },
  {
    type: "p",
    text: "Centralized policies from vSmart enforced consistent steering across all branches while allowing regional hub preference overrides for stores geographically closer to the Central hub. Maintenance windows were encoded as time-based policy objects so SLA-based failover alerts suppressed during scheduled circuit migrations. PCI assessors reviewed breakout paths and confirmed guest Wi‑Fi did not share address space with POS segments; segmentation tests with tagged test traffic validated isolation at every wave.",
  },
  {
    type: "ul",
    items: [
      "POS and VoIP never share a lossy transport path when a healthier alternative exists.",
      "Guest Wi‑Fi breaks out locally with SASE inspection; no hairpin through hubs.",
      "LTE activates only after both DIA paths fail SLA thresholds for sixty consecutive seconds.",
      "Hub preference follows NetBox region tags; manual overrides expire after seventy-two hours.",
    ],
  },
  { type: "h2", text: "Lab validation and performance testing" },
  {
    type: "p",
    text: "We built a physical lab mirroring production: two hub routers, four branch emulators representing high/medium/low traffic profiles, and impairment tools injecting latency, loss, and reordering on individual transports. Failover tests measured POS transaction completion times and VoIP MOS scores during controlled primary circuit drops. Median failover to secondary DIA landed at 6.8 seconds; failover to LTE averaged eleven seconds—acceptable given LTE was tertiary. We rejected an initial policy that failed over on single packet loss spikes; requiring sustained SLA violation for sixty seconds eliminated false positives observed during provider micro-bursts.",
  },
  {
    type: "p",
    text: "Terraform pipeline drills ran weekly: random site selection, plan generation, simulated apply against lab controllers, and post-apply validation scripts comparing live device state to expected NetBox attributes. Lab controllers were refreshed from production template exports nightly to catch drift. Store operations joined one lab session to watch POS behavior during failover—building that visibility reduced resistance from regional managers who feared invisible cutover risk.",
  },
  { type: "h2", text: "Cutover methodology" },
  {
    type: "p",
    text: "Production migration proceeded in eight waves of ten stores, sequenced by contract termination windows and regional inventory risk. Each wave followed an identical playbook documented in the runbook library and rehearsed in tabletop exercises with NOC and field services. T-minus seven days: NetBox wave tag applied, Terraform plans generated and reviewed, circuit orders confirmed for DIA installs. T-minus forty-eight hours: cEdge devices shipped or staged locally, LTE SIMs activated, pre-cutover SNMP baseline captured. Cutover night: field tech installed cEdge parallel to existing MPLS CE, validated link light and IP reachability, applied Terraform-approved config, ran automated pre-check script.",
  },
  {
    type: "p",
    text: "The pre-check script validated POS terminal ping to SaaS endpoints, VoIP registration count against expected handsets, inventory scanner TCP session establishment, and guest Wi‑Fi DHCP success. Cutover swapped default route from MPLS CE to cEdge with MPLS left in passive monitor mode for forty-eight hours before decommission. Post-check repeated pre-check metrics plus a fifteen-minute synthetic POS transaction replay from a test lane. NOC watched Zabbix dashboards for seventy-two hours with wave-specific escalation rosters. Rollback remained available for thirty minutes via scripted route revert to MPLS CE if post-check failed any hard gate.",
  },
  { type: "h3", text: "Wave outcomes and exceptions" },
  {
    type: "p",
    text: "Waves one through three completed without P1 incidents. Wave four encountered a P3 VoIP QoS issue at two stores where a local switch vendor had disabled trust boundaries on access ports—voice traffic arrived untagged at the cEdge. We corrected switch config templates and rescanned the fleet; no further voice issues occurred. Four acquired stores in wave eight used the variant VLAN profile; POS vendor sign-off for VLAN changes landed one week before holiday freeze, allowing final migration without schedule slip. MPLS decommission in completed regions began only after forty-eight hours of stable monitoring and finance verification that backup circuits were not billing duplicate port fees.",
  },
  {
    type: "quote",
    text: "We stopped treating WAN like a black box the telco owns. Policy is ours, documented in NetBox, and reproducible every morning from Terraform. When a circuit blips now, the store keeps selling—we see it in monitoring, not from angry managers on Saturday afternoon.",
    attribution: "Director of Store Technology",
  },
  { type: "h2", text: "Monitoring and operational handoff" },
  {
    type: "p",
    text: "Zabbix polled cEdge and hub health metrics with templates generated alongside Terraform device records. Dashboards grouped stores by wave and region, highlighting SLA violations, transport utilization, and LTE data consumption. Alert routing mirrored the retailer's existing NOC tiers: hard downs on both DIA paths at a high-volume store paged immediately; single-transport degradation opened tickets without page. Runbooks linked from alerts referenced NetBox site pages and the last successful Terraform apply ID for forensic traceability.",
  },
  {
    type: "p",
    text: "Training spanned three cohorts: NOC L1 focused on dashboard interpretation and when to escalate versus wait for automatic failover; field services learned rack standards and LTE antenna placement; network engineering owned Terraform pipeline approvals and policy changes. We documented a quarterly recertification exercise—simulate branch failover in lab, review LTE cap usage, audit NetBox against physical site surveys—to prevent gradual drift as stores remodel layouts.",
  },
  { type: "h2", text: "Financial and operational results" },
  {
    type: "p",
    text: "Ninety days after the final wave, all eighty branches operated on the SD-WAN fabric. WAN circuit spend decreased thirty-four percent compared to the pre-program MPLS baseline, driven by MPLS decommission, negotiated DIA pricing at regional volume, and elimination of unused backup T1 services at six locations. Median automatic failover time measured 7.4 seconds across synthetic and real impairment events—versus forty-five or more minutes of manual recovery documented in pre-program incident logs. Zero P1 incidents were attributed to cutover activity; cumulative post-cutover P2 events tied to WAN numbered three, all provider-side DIA outages handled by automatic failover without store closure.",
  },
  {
    type: "ul",
    items: [
      "Eighty of eighty stores on SD-WAN with standardized branch profiles and documented exceptions.",
      "Thirty-four percent WAN opex reduction with finance-validated circuit disconnects.",
      "7.4 s median failover for POS/VoIP paths; LTE tertiary path available at every standard branch.",
      "NetBox-to-Terraform pipeline: zero production configs hand-edited outside automation in six months post go-live.",
      "PCI segmentation boundaries unchanged; assessor accepted guest Wi‑Fi local breakout with SASE controls.",
    ],
  },
  { type: "h2", text: "Lessons learned" },
  {
    type: "p",
    text: "Three lessons merit emphasis for teams planning similar programs. First, treat NetBox hygiene as a deliverable, not a side task—automation amplifies bad data faster than manual processes fail. Investing two weeks upfront to audit site records and enforce webhook-driven validation paid back in every subsequent wave. Second, sequence MPLS disconnects against contract language regionally; early termination fees can erase SD-WAN savings if finance is not in the room during wave planning. Third, involve store operations in lab failover demos early; technical success without organizational trust produces shadow workarounds—managers who keep MPLS CE powered on 'just in case' undermine decommission savings.",
  },
  {
    type: "p",
    text: "Residual risks remain tracked: four acquired stores await final VLAN standardization; LTE data caps need quarterly review during promotional seasons; hub cross-connect capacity should be re-evaluated before next year's cloud migration doubles east-west traffic. The retailer extended Dippa's engagement for a phase-two project automating branch turn-up for new store openings using the same NetBox-Terraform pipeline—proof that the architecture is treated as a platform, not a one-time migration.",
  },
  { type: "h2", text: "Security, compliance, and segmentation" },
  {
    type: "p",
    text: "PCI scope boundaries established in a prior segmentation project could not regress during WAN migration. We mapped every breakout path—guest Wi‑Fi local internet, corporate SaaS via hub inspection, POS over overlay—to diagrams the QSA reviewed before wave one. Penetration tests at lab and two pilot stores confirmed guest clients could not reach POS VLANs despite shared physical cEdge hardware. Management plane access to vManage and vSmart used jump hosts with MFA; branch devices accepted configuration only from approved controller certificates rotated on a ninety-day cycle.",
  },
  {
    type: "p",
    text: "Terraform state files containing device credentials were stored in an encrypted backend with object-level audit logging. Change approvals in GitLab required two network engineers for production applies affecting more than five sites—a guardrail added after a tabletop exercise showed how a single mistyped hub variable could mis-steer an entire region. These controls added process overhead but satisfied security stakeholders who had blocked an earlier WAN refresh attempt over concerns about local internet breakout at stores handling card-present transactions.",
  },
  { type: "h2", text: "Conclusion" },
  {
    type: "p",
    text: "This program demonstrated that distributed retail WAN modernization can deliver measurable cost reduction and resilience without betting on a single carrier's MPLS roadmap. Cisco SD-WAN provided application-aware steering and operational visibility; NetBox and Terraform together ensured what we documented was what we deployed. The thirty-four percent spend reduction and sub-ten-second failover metrics met executive goals, while zero P1 cutover incidents validated the wave methodology. For retailers facing similar MPLS constraints, the actionable takeaway is sequential: establish inventory truth, automate config generation, prove failover in a representative lab, then migrate in waves with hard validation gates—not big-bang cutovers driven by contract dates alone.",
  },
  {
    type: "references",
    title: "References",
    items: [
      {
        id: "1",
        text: "Cisco Systems. Cisco SD-WAN Design Guide and performance-based routing documentation.",
        url: "https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/sdwan-overview.html",
      },
      {
        id: "2",
        text: "NetBox Labs. NetBox documentation: sites, custom fields, and webhooks.",
        url: "https://docs.netbox.dev/en/stable/",
      },
      {
        id: "3",
        text: "HashiCorp. Terraform documentation: state, modules, and CI/CD integration.",
        url: "https://developer.hashicorp.com/terraform/docs",
      },
      {
        id: "4",
        text: "Gartner. Market Guide for WAN Edge Infrastructure (hybrid WAN and SD-WAN adoption patterns).",
        url: "https://www.gartner.com/en/documents/market-guide-for-wan-edge-infrastructure",
      },
      {
        id: "5",
        text: "PCI Security Standards Council. PCI DSS v4.0: network segmentation and CDE scoping guidance.",
        url: "https://www.pcisecuritystandards.org/document_library/",
      },
      {
        id: "6",
        text: "Equinix. Edge deployment and cross-connect documentation for hybrid cloud connectivity.",
        url: "https://docs.equinix.com/",
      },
    ],
  },
] as const;
