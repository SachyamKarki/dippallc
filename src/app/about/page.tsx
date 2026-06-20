import Image from "next/image";
import Link from "next/link";
import { leadership, studioStats, serviceLines } from "@/lib/data";

export const metadata = {
  title: "About — DIPPA",
  description:
    "We are a senior-led software and AI engineering studio. We build systems that compound in value long after handoff.",
};

const values = [
  {
    number: "01",
    title: "Senior thinking close to the work",
    text: "Strategy, design, engineering, and delivery stay tightly connected. Quality does not survive handoffs — so we minimise them.",
  },
  {
    number: "02",
    title: "Premium is a systems decision",
    text: "The interface, the workflow, and the operating model all need to feel considered. We design for trust, not decoration.",
  },
  {
    number: "03",
    title: "Automation needs governance",
    text: "AI is only valuable when it is observable, controllable, and easy for teams to understand under real operating pressure.",
  },
  {
    number: "04",
    title: "Advice without shipping is noise",
    text: "We stay close enough to implementation that strategy reflects reality. Every engagement ends with working software.",
  },
];

const timeline = [
  { year: "2018", event: "Founded in Kathmandu by a small team of senior engineers tired of big-agency bloat." },
  { year: "2020", event: "First US enterprise engagement — a logistics AI project that shipped in 18 days." },
  { year: "2022", event: "Expanded into AI agent systems; built one of the earliest production LangChain deployments." },
  { year: "2024", event: "Opened a remote-first model serving clients across the US, UK, and Southeast Asia." },
  { year: "2026", event: "48+ high-trust engagements completed. 93% client retention on strategic work." },
];

export default function AboutPage() {
  return (
    <main className="about-root">

      {/* Hero */}
      <section className="about-hero">
        <div className="section-shell">
          <p className="about-kicker">About Dippa</p>
          <h1 className="about-hero-title">
            We build systems that<br className="hidden md:block" /> outlast the engagement.
          </h1>
          <p className="about-hero-subtitle">
            Dippa is a senior-led software and AI engineering studio. We partner with operators and founders who need high-integrity systems — not slide decks — and we stay close enough to execution that every strategy we recommend, we also ship.
          </p>
          <div className="about-hero-stats">
            {(studioStats as readonly { value: string; suffix: string; label: string }[]).map((s) => (
              <div key={s.label} className="about-stat">
                <span className="about-stat-value">
                  {s.value}<span className="about-stat-suffix">{s.suffix}</span>
                </span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mv-section">
        <div className="section-shell">
          <div className="about-mv-grid">
            <div className="about-mv-card about-mv-card-dark">
              <p className="about-mv-label">Mission</p>
              <p className="about-mv-text">
                To turn technical complexity into compounding business leverage — by building software and AI systems that operators can actually trust.
              </p>
            </div>
            <div className="about-mv-card about-mv-card-light">
              <p className="about-mv-label">Vision</p>
              <p className="about-mv-text">
                A world where ambitious teams ship high-quality systems fast — without sacrificing governance, clarity, or long-term architectural health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values-section">
        <div className="section-shell">
          <div className="about-section-head">
            <p className="about-section-kicker">How we work</p>
            <h2 className="about-section-title">The principles we refuse to compromise on.</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.number} className="about-value-item">
                <span className="about-value-num">{v.number}</span>
                <div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-text">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="about-services-section">
        <div className="section-shell">
          <div className="about-section-head">
            <p className="about-section-kicker">What we build</p>
            <h2 className="about-section-title">Three lines of practice, one operating standard.</h2>
          </div>
          <div className="about-services-grid">
            {(serviceLines as readonly { name: string; eyebrow: string; description: string; deliverables: readonly string[] }[]).map((s, i) => (
              <div key={s.name} className="about-service-card">
                <p className="about-service-num">{String(i + 1).padStart(2, "0")}</p>
                <p className="about-service-eyebrow">{s.eyebrow}</p>
                <h3 className="about-service-name">{s.name}</h3>
                <p className="about-service-desc">{s.description}</p>
                <ul className="about-service-deliverables">
                  {s.deliverables.map((d) => (
                    <li key={d} className="about-service-deliverable">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section">
        <div className="section-shell">
          <div className="about-section-head">
            <p className="about-section-kicker">Our story</p>
            <h2 className="about-section-title">Built slowly, on purpose.</h2>
          </div>
          <div className="about-timeline">
            {timeline.map((t) => (
              <div key={t.year} className="about-timeline-item">
                <span className="about-timeline-year">{t.year}</span>
                <span className="about-timeline-line" aria-hidden="true" />
                <p className="about-timeline-event">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="about-team-section">
        <div className="section-shell">
          <div className="about-section-head">
            <p className="about-section-kicker">The team</p>
            <h2 className="about-section-title">The minds behind the move.</h2>
            <p className="about-section-sub">
              A small senior team. No juniors owning your architecture. No PM layers adding delay.
            </p>
          </div>
          <div className="about-team-grid">
            {(leadership as readonly { name: string; role: string; bio: string; avatar: string }[]).map((person) => (
              <div key={person.name} className="about-team-card">
                <div className="about-team-avatar-wrap">
                  <Image src={person.avatar} alt={person.name} width={80} height={80} className="about-team-avatar" />
                </div>
                <h3 className="about-team-name">{person.name}</h3>
                <p className="about-team-role">{person.role}</p>
                <p className="about-team-bio">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="section-shell">
          <div className="about-cta-inner">
            <div>
              <h2 className="about-cta-title">Ready to build something that lasts?</h2>
              <p className="about-cta-sub">
                Every engagement starts with a complimentary discovery session. No junior hand-off. No pitch deck.
              </p>
            </div>
            <Link href="/contact" className="button-primary whitespace-nowrap">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
