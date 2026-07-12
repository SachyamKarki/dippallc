import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { allProducts, GANTABYA_LEGAL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gantabya — DIPPA Products",
  description:
    "Gantabya is Dippa’s Kathmandu Valley bus transit app. Coming soon to the App Store. Privacy, terms, and support available now.",
};

export default function GantabyaProductPage() {
  const product = allProducts.find((p) => p.slug === "gantabya");
  if (!product) return null;

  return (
    <main className="bg-[#fcfcfb] text-slate-950" data-nav-tone="light">
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#192338] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(143,179,226,0.22),transparent_45%)]" />
        <div className="section-shell relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-32 md:grid-cols-[1.2fr_0.8fr] md:items-center md:pb-20 md:pt-40">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8fb3e2]">
              Dippa Product · Mobile App
            </p>
            <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              Coming Soon
            </span>
            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {product.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#192338]">
                App Store — Coming Soon
              </span>
              <Link
                href="/products"
                className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                ← Back to products
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-white/10 blur-2xl" />
              <Image
                src={product.image}
                alt="Gantabya app"
                width={220}
                height={220}
                className="relative rounded-[2rem] border border-white/10 shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="section-shell mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            {product.details.map((block) => {
              if (block.type !== "narrative" && block.type !== "impact") return null;
              return (
                <article
                  key={block.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.04)] md:p-9"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {block.type === "impact" ? "Launch status" : "Product"}
                  </p>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{block.body}</p>
                </article>
              );
            })}

            <div className="flex flex-wrap gap-2">
              {product.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-[#f6f7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Availability
              </p>
              <h3 className="text-xl font-bold tracking-[-0.02em]">Coming soon to the App Store</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Gantabya v{product.stats.find((s) => s.label === "Version")?.value ?? "1.0"}
                {product.stats.find((s) => s.label === "Version")?.suffix ?? ".0"} is prepared for
                public release. Check back here for the download link once Apple review completes.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Legal & support
              </p>
              <h3 className="text-xl font-bold tracking-[-0.02em]">For App Store reviewers & users</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Privacy Policy, Terms of Service, and Support are live now. Click below if you need
                them.
              </p>
              <ul className="mt-5 space-y-3 text-sm font-semibold">
                <li>
                  <a
                    href={GANTABYA_LEGAL.privacy}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Privacy Policy →
                  </a>
                </li>
                <li>
                  <a
                    href={GANTABYA_LEGAL.terms}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Terms of Service →
                  </a>
                </li>
                <li>
                  <a
                    href={GANTABYA_LEGAL.support}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Support →
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
