/** Chapter and About page photography (`public/images/about/`). */

const p = (name: string) => `/images/about/${name}.jpg`;

export const aboutImages = {
  heroMain: p("hero-main"),
  heroSecondary: p("hero-secondary"),
  heroAccent: p("hero-accent"),
  banner: p("banner"),

  narrativeWorkshop: p("narrative-workshop"),
  narrativeAi: p("narrative-ai"),
  narrativeBuild: p("narrative-build"),
  narrativeTransfer: p("narrative-transfer"),

  discover: p("discover"),
  recommend: p("recommend"),
  build: p("build"),
  transfer: p("transfer"),

  practiceEngineering: p("practice-engineering"),
  practiceAi: p("practice-ai"),
  practiceAdvisory: p("practice-advisory"),

  valueDiagnose: p("value-diagnose"),
  valueAdvice: p("value-advice"),
  valueAiOps: p("value-ai-ops"),
  valueTransfer: p("value-transfer"),
} as const;
