import ProgressiveImage from "@/components/ui/ProgressiveImage";
import { aboutImages } from "@/lib/aboutImages";
import {
  aboutEngagement,
  aboutValues,
  serviceLines,
  studioStats,
} from "@/lib/data";

export const metadata = {
  title: "About",
  description:
    "Dippa is a software and AI consulting firm. We diagnose how work actually runs, then design, build, and transfer systems clients can operate.",
};

const NARRATIVE = [
  {
    title: "We start with the operating reality, not the roadmap deck.",
    paragraphs: [
      "Most organisations we meet already own software, vendors, and a backlog of AI ideas. The gap is rarely tooling. It is a clear line from the constraint in the business to a system people will actually use when the project team has gone home.",
      "Dippa exists to hold that line. We sit with operators and leadership, name what must change, and stay accountable through design, build, and handover. Consulting and engineering are one engagement — not a strategy phase followed by a separate delivery vendor.",
    ],
    image: aboutImages.narrativeWorkshop,
    imageAlt: "Consultants and client team in a working session",
  },
  {
    title: "AI only counts when operators trust it on a normal Tuesday.",
    paragraphs: [
      "A platform nobody uses is not progress. An agent that demos well but cannot be audited is a liability — especially in regulated or high-volume operations.",
      "We design for the working week: shorter cycles, clearer decisions, fewer handoffs, and controls your team can explain to leadership or a regulator. Permissions, observability, and human override are in scope from week one.",
    ],
    image: aboutImages.narrativeAi,
    imageAlt: "AI agent systems — intelligent automation and neural workflow architecture",
  },
  {
    title: "The same team that scoped the work ships production code.",
    paragraphs: [
      "Hand-offs between strategy firms and delivery vendors are where intent gets lost. We keep discovery, architecture, and implementation in one accountable chain — with weekly demos against agreed scope.",
      "Whether we are building an internal platform, integrating legacy systems, or standing up agent workflows, progress stays visible. You always know what shipped, what is in staging, and what is explicitly out of v1.",
    ],
    image: aboutImages.narrativeBuild,
    imageAlt: "Engineering team building and reviewing software delivery",
  },
  {
    title: "We are done when your operators can run it without us.",
    paragraphs: [
      "Delivery is not a go-live party followed by silence. Runbooks, admin guides, training, and a defined support window are part of the contract — not stretch goals after the budget is spent.",
      "Our engagements succeed when your team owns the system: monitoring alerts they understand, escalation paths that work on a busy Monday, and documentation that matches what is actually in production.",
    ],
    image: aboutImages.narrativeTransfer,
    imageAlt: "Team handover session and operational transfer",
  },
];

const ENGAGEMENT_IMAGES = [
  aboutImages.discover,
  aboutImages.recommend,
  aboutImages.build,
  aboutImages.transfer,
];

const PRACTICE_IMAGES = [
  aboutImages.practiceEngineering,
  aboutImages.practiceAi,
  aboutImages.practiceAdvisory,
];

const PRACTICE_IMAGE_ALTS: Record<string, string> = {
  "Product Engineering": "Software engineering and product development team at work",
  "AI Agent Systems": "AI agent orchestration and autonomous operations workflow",
  "Advisory + Delivery": "Consulting workshop and strategic delivery planning",
};

const VALUE_IMAGES = [
  aboutImages.valueDiagnose,
  aboutImages.valueAdvice,
  aboutImages.valueAiOps,
  aboutImages.valueTransfer,
];

export default function AboutPage() {
  return (
    <main className="firm-about" data-nav-tone="light">
      <section className="firm-hero">
        <div className="firm-pattern" aria-hidden="true" />
        <div className="section-shell firm-hero-shell">
          <div className="firm-hero-copy reveal">
            <p className="firm-eyebrow">About Dippa</p>
            <h1 className="firm-hero-title">
              A consulting practice that ships the systems it recommends.
            </h1>
            <p className="firm-lead">
              Dippa helps companies turn operating problems into software and AI
              they can run — from the first diagnostic workshop through production
              delivery and handover. We are engineers, architects, and operators
              who stay in the room until the work is real.
            </p>
            <p className="firm-body">
              Founded to close the gap between strategy slides and production systems,
              we work with leadership teams in fintech, healthcare operations, logistics,
              retail, and B2B SaaS who need senior execution — not another vendor
              catalogue. Every engagement is scoped, built, and transferred by the
              same principals.
            </p>
          </div>
          <div className="firm-hero-visual reveal">
            <div className="firm-hero-photo firm-hero-photo-main">
              <ProgressiveImage
                src={aboutImages.heroMain}
                alt="Team collaboration in a client workshop"
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                quality={75}
                preload
                className="firm-photo-img"
              />
            </div>
            <div className="firm-hero-photo-row">
              <div className="firm-hero-photo firm-hero-photo-sub">
                <ProgressiveImage
                  src={aboutImages.heroSecondary}
                  alt="Engineering team planning delivery"
                  fill
                  sizes="(max-width: 900px) 46vw, 22vw"
                  quality={75}
                  className="firm-photo-img"
                />
              </div>
              <div className="firm-hero-photo firm-hero-photo-sub">
                <ProgressiveImage
                  src={aboutImages.heroAccent}
                  alt="Modern workspace"
                  fill
                  sizes="(max-width: 900px) 46vw, 22vw"
                  quality={75}
                  className="firm-photo-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="firm-banner" aria-label="Dippa at work">
        <div className="section-shell firm-banner-shell">
          <div className="firm-banner-media">
            <ProgressiveImage
              src={aboutImages.banner}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, min(1440px, 92vw)"
              quality={80}
              className="firm-banner-img"
            />
            <div className="firm-banner-scrim" aria-hidden="true" />
            <div className="firm-banner-copy">
              <p className="firm-banner-kicker">Inside the practice</p>
              <p className="firm-banner-text">
                Workshops, architecture reviews, and production delivery — in the same
                engagement, with the same team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="firm-stats">
        <div className="section-shell firm-stats-row">
          {studioStats.map((stat) => (
            <div key={stat.label} className="firm-stat reveal">
              <p className="firm-stat-value">
                {stat.value}
                <span>{stat.suffix}</span>
              </p>
              <p className="firm-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {NARRATIVE.map((chapter, index) => (
        <section key={chapter.title} className="firm-chapter">
          <div className="section-shell firm-chapter-shell">
            <div className={`firm-chapter-grid${index % 2 === 1 ? " firm-chapter-grid-flip" : ""}`}>
              <div className="firm-chapter-copy reveal">
                <p className="firm-eyebrow">Chapter 0{index + 1}</p>
                <h2 className="firm-chapter-title">{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={pIndex === 0 ? "firm-chapter-lead" : "firm-body"}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="firm-chapter-visual reveal">
                <div className="firm-chapter-media">
                  <ProgressiveImage
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 46vw"
                    quality={75}
                    className="firm-photo-img firm-chapter-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="firm-engage">
        <div className="section-shell">
          <header className="firm-section-head reveal">
            <p className="firm-eyebrow">Engagement model</p>
            <h2 className="firm-section-title">Four movements. One accountable team.</h2>
            <p className="firm-section-intro">
              Clients should always know what happens next, who owns each decision,
              and what “done” means before a line of code is written. Our sequence
              is deliberate — familiar enough to govern, rigorous enough to ship.
            </p>
          </header>
          <ol className="firm-engage-list">
            {aboutEngagement.map((step, index) => (
              <li key={step.step} className="firm-engage-item reveal">
                <div className="firm-engage-visual">
                  <ProgressiveImage
                    src={ENGAGEMENT_IMAGES[index] ?? ENGAGEMENT_IMAGES[0]}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    quality={75}
                    className="firm-photo-img"
                  />
                  <span className="firm-engage-step">{step.step}</span>
                </div>
                <div className="firm-engage-copy">
                  <h3 className="firm-engage-title">{step.title}</h3>
                  <p className="firm-body">{step.text}</p>
                  <p className="firm-engage-note">
                    {index === 0 &&
                      "Typical outputs: process maps, system inventory, stakeholder interviews, and a written problem statement leadership signs off."}
                    {index === 1 &&
                      "Typical outputs: architecture outline, phased scope, risk register, and explicit list of what will not be built in v1."}
                    {index === 2 &&
                      "Typical outputs: working software or agent flows in staging, weekly demos, and traceability from requirement to release."}
                    {index === 3 &&
                      "Typical outputs: runbooks, admin guides, training sessions, and a support window with defined SLAs."}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="firm-practices">
        <div className="section-shell">
          <header className="firm-section-head reveal">
            <p className="firm-eyebrow">Practice areas</p>
            <h2 className="firm-section-title">Where we spend our time</h2>
            <p className="firm-section-intro">
              Three disciplines, one contract. You do not coordinate a separate
              software house, AI lab, and strategy firm — the same principals
              architect the system, build it, and transfer it.
            </p>
          </header>
          <div className="firm-practice-list">
            {serviceLines.map((service, index) => (
              <article key={service.name} className="firm-practice-row reveal">
                <div className="firm-practice-media">
                  <ProgressiveImage
                    src={PRACTICE_IMAGES[index] ?? PRACTICE_IMAGES[0]}
                    alt={PRACTICE_IMAGE_ALTS[service.name] ?? service.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    quality={75}
                    className="firm-photo-img"
                  />
                </div>
                <div className="firm-practice-copy">
                  <p className="firm-practice-eyebrow">{service.eyebrow}</p>
                  <h3 className="firm-practice-name">{service.name}</h3>
                  <p className="firm-body">{service.description}</p>
                  <p className="firm-body">
                    Engagements in this practice usually combine discovery with
                    hands-on delivery — we do not hand off a specification and
                    disappear. Teams get senior engineers and architects in the
                    same cadence as leadership reviews.
                  </p>
                  <ul className="firm-practice-deliverables">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="firm-values">
        <div className="section-shell">
          <header className="firm-section-head reveal">
            <p className="firm-eyebrow">Standards</p>
            <h2 className="firm-section-title">What we hold ourselves to</h2>
            <p className="firm-section-intro">
              These are not wall posters. They are the tests we apply when a
              project is tempting to over-scope, over-automate, or under-document.
            </p>
          </header>
          <div className="firm-values-grid">
            {aboutValues.map((value, index) => (
              <article key={value.num} className="firm-value-card reveal">
                <div className="firm-value-media">
                  <ProgressiveImage
                    src={VALUE_IMAGES[index] ?? VALUE_IMAGES[0]}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    quality={75}
                    className="firm-photo-img"
                  />
                </div>
                <div className="firm-value-copy">
                  <span className="firm-value-num">{value.num}</span>
                  <h3 className="firm-value-title">{value.title}</h3>
                  <p className="firm-body">{value.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
