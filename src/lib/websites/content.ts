/** Long-form case writeups for Dippa-built client websites. */

export type WebsiteDetail = {
  type: "narrative" | "impact";
  title: string;
  body: string;
};

export type WebsiteProject = {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  liveLink: string;
  stack: readonly string[];
  timeline: string;
  details: readonly WebsiteDetail[];
};

export const WEBSITE_PROJECTS: readonly WebsiteProject[] = [
  {
    slug: "unmarkd",
    name: "Unmarkd",
    description:
      "A full Shopify-powered gymwear storefront for Nepal — editorial homepage, category merchandising, product quick-view, wishlist, and Instagram-led discovery built around Unmarkd’s compression and mesh collections.",
    category: "E-commerce",
    image: "/projects/1.jpg",
    liveLink: "https://unmarkdofficial.com",
    stack: ["Shopify", "Liquid", "Custom theme", "Responsive", "SEO"],
    timeline: "Live",
    details: [
      {
        type: "narrative",
        title: "Client & brief",
        body:
          "Unmarkd is a premium men’s gymwear label based in Nepal, selling compression tees, oversized mesh jerseys, tank tops, and everyday training essentials. The brand needed a storefront that felt editorial — closer to a lookbook than a generic template — while still handling real commerce: variant pricing in NPR, sale badges, sold-out states, and a shopping bag that customers trust on mobile. Dippa was engaged to design and build the full web presence: homepage storytelling, collection architecture, product discovery patterns, and the visual system that carries through checkout on Shopify.",
      },
      {
        type: "narrative",
        title: "Information architecture",
        body:
          "We structured the site around how customers actually shop gymwear — by product type first, then by drop. The homepage leads with hero modules for flagship lines (OG Compression Tee, Oversized Mesh Jersey), then fans out into category blocks: OG Compression, Mesh Jersey, All Tanktops, and Men’s Gym T-Shirts. Each block uses consistent product cards with color swatches, NPR pricing, compare-at pricing where applicable, NEW and SOLD OUT badges, and quick-view entry points so browsing never requires a full page reload for first impressions. Category pages and collection filters were tuned so merchandising can rotate seasonal drops without rebuilding layout.",
      },
      {
        type: "narrative",
        title: "Design & brand expression",
        body:
          "Visually, the site leans high-contrast and performance-oriented: large product photography, tight typography, and restrained UI chrome so the apparel stays central. Editorial sections break up the grid — short copy blocks explain fabric and fit, Instagram is pulled forward as a discovery channel (“exclusive drops and behind-the-scenes”), and whitespace is used deliberately so the store feels premium rather than crowded. Color naming (Green Dots, Off White, Navy Blue) is surfaced on cards so customers know exactly which variant they are viewing before opening the product page. Sale pricing is shown inline with strikethrough compare-at values, matching how Nepali shoppers evaluate value on social-first brands.",
      },
      {
        type: "narrative",
        title: "Commerce features delivered",
        body:
          "On the commerce side we implemented quick-view modals, wishlist with persistent bag/wishlist counters in the header, recently viewed products, and cookie-consent handling aligned with analytics and marketing tags. Product cards support sold-out states without breaking grid rhythm. Checkout remains on Shopify’s secure flow while the custom theme controls everything upstream — collection sorting, promotional badges, and mobile tap targets sized for one-handed use. NPR formatting, discount display, and inventory messaging were tested across common phone widths used in Kathmandu and Pokhara traffic.",
      },
      {
        type: "narrative",
        title: "Technical implementation",
        body:
          "The build runs on Shopify with a custom Liquid theme tailored to Unmarkd’s catalog structure. Sections are modular so the client can reorder homepage stories, swap hero products, and publish new collections without developer intervention. Performance work focused on image lazy-loading, sensible hero asset sizing, and minimizing render-blocking scripts on mobile networks. SEO foundations include semantic headings, collection-level metadata, and clean product URLs. Third-party integrations (Instagram embed, analytics, consent banner) were wired so marketing can measure conversion without compromising load time on mid-tier Android devices.",
      },
      {
        type: "narrative",
        title: "Launch & ongoing use",
        body:
          "The site launched as the primary sales channel for Unmarkd’s drops — compression lines, mesh jerseys, hybrid tanks, and athletic club oversized tees. Merchandising updates (NEW tags, sold-out SKUs, promotional pricing) are handled through Shopify admin; the theme preserves layout integrity when products are added or archived. Post-launch refinements included tightening mobile quick-view spacing, wishlist feedback states, and Instagram module placement based on how users scroll on first visit.",
      },
      {
        type: "impact",
        title: "Outcome",
        body:
          "Unmarkd now has a live, brand-faithful storefront at unmarkdofficial.com — editorial where it matters, transactional where it counts. Customers can browse by category, inspect variants and pricing at a glance, save items to wishlist, and complete purchase through Shopify checkout. The build gives the label room to grow new collections without a redesign each season.",
      },
    ],
  },
  {
    slug: "lfg-burnego",
    name: "LFG Burnego",
    description:
      "A campaign-style marketing site for a car-culture alarm app — origin story, manifesto sections, mobile mockups, and a high-energy visual system that sells “wake up to your engine.”",
    category: "Marketing",
    image: "/projects/2.jpg",
    liveLink: "https://www.lfgburnego.com",
    stack: ["Web", "Campaign landing", "Motion", "Responsive"],
    timeline: "Live",
    details: [
      {
        type: "narrative",
        title: "Client & brief",
        body:
          "LFG Burn Ego is a lifestyle product aimed at car enthusiasts: an app that replaces a boring morning alarm with the sound of a real cold start — record your engine, set it as your alarm, and start the day with track-day energy. The founder’s story (a forced pause in life that led to the idea) is central to the brand, not an afterthought. Dippa was asked to build a marketing site that could carry that narrative, explain the product in seconds to newcomers, and feel like car culture — dark surfaces, bold type, poster energy — without reading like a generic app landing page.",
      },
      {
        type: "narrative",
        title: "Story-first structure",
        body:
          "We organized the page as a scroll narrative rather than a feature bullet list. It opens with product context, moves into “The Origin” — the personal story behind LFG — then transitions into “Energy, With Intention,” where the alarm concept connects to discipline and community. Dedicated sections spell out what the brand stands on (purpose over noise, discipline over impulse, respect is a flex, community over clout) and why the product exists (culture, how you start the day, alignment after being slowed down). A forward-looking close reinforces the promise: move with intention, respect the craft, burn the ego. This structure lets visitors who only skim the hero still get the manifesto; readers who scroll get the full emotional arc.",
      },
      {
        type: "narrative",
        title: "Visual & UX design",
        body:
          "The visual language uses dark backgrounds, high-contrast headlines, and phone mockups (9:41 status bar framing) so the app feels tangible before install. Typography is oversized and confident — poster layout on desktop, stacked rhythm on mobile — matching the “Burn Ego” tone. Sections alternate text and visual weight so long copy never feels like a wall. CTAs repeat the core hook: wake to horsepower, cold starts, track energy. The design intentionally avoids sterile SaaS gradients; it reads automotive and cultural, aligned with how enthusiast brands present themselves on Instagram and at meets.",
      },
      {
        type: "narrative",
        title: "What we built",
        body:
          "Deliverables included responsive layout across phone, tablet, and desktop; animated or static hero treatments supporting the engine-alarm concept; modular content sections the team can update (story, values, feature callouts); and performance-conscious assets so the page loads quickly on mobile data. We implemented semantic HTML for accessibility and sharing, meta tags for link previews when the URL is posted in car groups or social, and touch-friendly spacing for one-thumb scrolling. The site acts as the canonical explainer for press, community posts, and app-store traffic — one URL that answers “what is this?” and “why should I care?”",
      },
      {
        type: "narrative",
        title: "Content & messaging",
        body:
          "Copy on the live site emphasizes authenticity over hype: the alarm is not a gimmick but a daily ritual tied to craft and community. We preserved the founder’s voice in the origin story while tightening paragraphs for web reading. Value pillars are scannable lists; longer prose sits in sections where readers self-select. Repeated taglines (“LFG — Burn Ego”, “Wake to the horsepower of your engine”) anchor brand recall without feeling spammy because they appear at natural chapter breaks.",
      },
      {
        type: "impact",
        title: "Outcome",
        body:
          "lfgburnego.com is live as the brand’s public home — story, manifesto, and product promise in one scroll. It supports app discovery for car enthusiasts who find the project through social and word of mouth, and gives LFG a professional surface that matches the intensity of the product idea.",
      },
    ],
  },
  {
    slug: "rabinson",
    name: "RabinSon",
    description:
      "A portfolio site for a Nepal-based photographer — hero positioning, service pillars (mountains, automotive, studio, weddings), featured gallery grid, testimonials, and a contact inquiry flow.",
    category: "Portfolio",
    image: "/projects/4.jpg",
    liveLink: "https://www.rabinson.info",
    stack: ["Web", "Portfolio", "Gallery", "Contact form", "Responsive"],
    timeline: "Live",
    details: [
      {
        type: "narrative",
        title: "Client & brief",
        body:
          "RabinSon is a photographer working across high altitude, adventure, automobile, studio portrait, and wedding assignments in Nepal. The previous need was simple: a credible online portfolio that communicates “honest light, timeless detail” — not a generic template with a contact email buried in the footer. Dippa built rabinson.info as a premium booking-oriented site: strong hero positioning, curated featured work, clear service categories, social proof, and a contact path that captures project type and preferred channel (email or WhatsApp).",
      },
      {
        type: "narrative",
        title: "Positioning & homepage",
        body:
          "The homepage leads with a direct value statement — “Honest Light. Timeless Detail.” — and a subline that names the practice: high altitude, adventure, and automobile photography. Primary actions are “Book a shoot” and “View More,” so both ready-to-buy and browsing visitors have an obvious next step. A vision section explains the approach: calm direction, clean composition, documentary sincerity with an editorial finish — language that matches how clients choose photographers for expensive, once-in-a-lifetime shoots. An industry partners strip adds credibility without cluttering the hero.",
      },
      {
        type: "narrative",
        title: "Featured work & gallery",
        body:
          "The featured grid showcases signature images across categories — Himalayas, studio portraits, automobile — with consistent aspect treatment so the page feels curated, not dumped. Images are labeled by genre so visitors immediately see range: mountains, cars, people. The layout is responsive: multi-column on desktop, two-column or single-column on phone, with touch-friendly spacing. Photography sites live or die on image quality presentation; we prioritized sharp loading, minimal compression artifacts on hero assets, and lazy loading below the fold so first paint stays fast on mobile networks in Nepal.",
      },
      {
        type: "narrative",
        title: "Services architecture",
        body:
          "Four numbered service pillars structure the offer: Mountains & High Altitude; Automotive photography; Studio; Pre-Wedding & Weddings. Each block has a headline, descriptive paragraph tuned to that discipline, and shared principles — intentional storytelling, clear communication, calm shoots, cohesive delivery. This mirrors how RabinSon actually sells: clients self-identify into a category, then read the approach that matters to them (technical precision in the Himalayas vs. form and motion for cars vs. expression in studio vs. editorial wedding coverage). Repetition of process promises across categories reinforces professionalism without four completely different pages to maintain.",
      },
      {
        type: "narrative",
        title: "Testimonials & trust",
        body:
          "A testimonials section pairs client quotes with names and context (portrait session, creative director, etc.) so prospects see outcomes, not just stars. Quotes emphasize calm sessions and lasting images — aligned with the brand promise. This section is placed after services so visitors understand what is offered before social proof closes the argument.",
      },
      {
        type: "narrative",
        title: "Contact & inquiry flow",
        body:
          "The contact area invites date, location, and project needs, with a form that captures name, email, category selection, message, and preferred contact method (email or WhatsApp). Category dropdown reduces vague inquiries and helps RabinSon respond with relevant availability and pricing faster. Consent copy covers outreach in plain language. The form is styled to match the rest of the site — no embedded third-party widget that breaks typography — and fields are sized for mobile thumbs. Response-time expectation (24–48 hours) is stated upfront to set professional boundaries.",
      },
      {
        type: "impact",
        title: "Outcome",
        body:
          "rabinson.info is live as RabinSon’s portfolio and inquiry hub — showcasing range across mountains, automotive, studio, and weddings while making it easy to start a booking conversation. The site reads premium and intentional, matching the quality bar of the work it presents.",
      },
    ],
  },
] as const;
