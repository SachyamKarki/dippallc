const techPartners = [
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" />
      </svg>
    ),
  },
  {
    name: "React",
    logo: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className="h-8 text-[#61DAFB]">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 180 180" fill="currentColor" className="h-8">
        <path fillRule="evenodd" clipRule="evenodd" d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90zm38.163-54.675C144.154 110.16 154 91.196 154 90c0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64 12.012 0 23.255-3.313 32.846-9.034l-48.4-69.83H64v45.626h8.571V81.332l42.316 60.945h.001c.148-.205.312-.44.475-.682zM124 74.22h-8.571v31.428H124V74.22z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 38 57" fill="currentColor" className="h-8 w-8">
        <path d="M19 28.5C19 33.7467 14.7467 38 9.5 38C4.25329 38 0 33.7467 0 28.5C0 23.2533 4.25329 19 9.5 19H19V28.5Z" fill="#0ACF83"/>
        <path d="M0 47.5C0 52.7467 4.25329 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5Z" fill="#1ABCFE"/>
        <path d="M38 9.5C38 14.7467 33.7467 19 28.5 19H19V0H28.5C33.7467 0 38 4.2533 38 9.5Z" fill="#F24E1E"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.2533 0 9.5Z" fill="#FF7262"/>
        <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: "Framer",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <svg viewBox="0 0 60 25" fill="currentColor" className="h-8 text-[#635BFF]">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.15.53-2.91.82-4.66.82-4.14 0-6.95-2.22-6.95-6.83 0-4.48 2.62-7.16 6.34-7.16 3.96 0 5.92 2.76 5.92 6.55 0 .61-.04 1.15-.09 1.55l.25.15zM55.13 11c-.13-1.63-1.12-2.31-2.48-2.31-1.42 0-2.46.75-2.6 2.31h5.08zM42.27 19.82V6.26h3.45v13.56h-3.45zM38.86 11.23c-1.04-1.1-2.49-1.4-3.85-1.4-2.61 0-4.63 1.52-4.63 4.29 0 2.84 2.11 4.29 4.67 4.29 1.25 0 2.65-.25 3.58-1.01v4.45h3.45V6.26h-3.32v4.97zM35.63 15.68c-1.14 0-2.02-.75-2.02-2.03 0-1.15.8-1.92 1.92-1.92 1.05 0 1.83.56 1.83 1.55 0 1.25-.84 2.4-1.73 2.4zM24.84 19.82h-3.45V6.26h3.45v13.56zM15.42 19.82V14.1c0-1.72.93-2.65 2.43-2.65 1.5 0 2.43.93 2.43 2.65v5.71h3.45V13.8c0-3.38-1.79-5.32-4.63-5.32-1.62 0-3.02.58-3.9 1.58V6.26h-3.45v13.56h3.45l.22.01zM7.5 15.54c-1.1 0-2-.32-2.8-.75V18.1c.96.48 2.22.78 3.51.78 3.05 0 4.69-1.35 4.69-3.76 0-2.58-1.79-3.38-3.79-3.85-1.5-.35-2.26-.64-2.26-1.39 0-.6.54-1.02 1.39-1.02.82 0 1.5.25 2.12.58V6.44c-.75-.38-1.76-.6-2.9-.6-2.73 0-4.5 1.35-4.5 3.5 0 2.5 1.7 3.3 3.65 3.8 1.48.38 2.19.64 2.19 1.43 0 .71-.62 1.04-1.47 1.04l.17-.07z" />
      </svg>
    ),
  },
] as const;

export default function PartnersSection() {
  return (
    <section className="partners-section reveal">
      <div className="section-shell">
        <div className="partners-heading">
          <p className="partners-kicker">Brands We&apos;ve Worked With</p>
        </div>

        <div className="partners-marquee-wrapper" aria-label="Brands we have worked with">
          <div className="partners-marquee-track">
            {/* First set of logos */}
            {techPartners.map((partner, i) => (
              <article key={`set1-${i}`} className="partners-logo-item" aria-label={partner.name}>
                {partner.logo}
                <span className="partners-logo-name">{partner.name}</span>
              </article>
            ))}
            {/* Duplicate set for infinite scroll effect */}
            {techPartners.map((partner, i) => (
              <article key={`set2-${i}`} className="partners-logo-item" aria-hidden="true">
                {partner.logo}
                <span className="partners-logo-name">{partner.name}</span>
              </article>
            ))}
            {/* Third set to ensure smooth looping on wide screens */}
            {techPartners.map((partner, i) => (
              <article key={`set3-${i}`} className="partners-logo-item" aria-hidden="true">
                {partner.logo}
                <span className="partners-logo-name">{partner.name}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
