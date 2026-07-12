import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/lib/data";

export const metadata = {
  title: "Products — DIPPA IT Solutions",
  description: "Products built by Dippa — including Gantabya, the Kathmandu Valley transit guide.",
};

export default function ProductsPage() {
  return (
    <main className="bg-[#fcfcfb] text-slate-950" data-nav-tone="light">
      <section className="border-b border-slate-200/80 pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="section-shell mx-auto max-w-6xl px-5">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
            Products
          </p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Software we build and ship.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            A focused catalogue of Dippa products. Each one is designed for real operating leverage —
            from mobile transit tools to AI and operations platforms.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="section-shell mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => {
            const comingSoon = "status" in product && product.status === "coming-soon";
            return (
              <Link
                key={product.slug}
                href={product.href}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {comingSoon ? (
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      Coming Soon
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    <span>{product.category}</span>
                    <span>{product.timeline}</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    {product.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900">
                    <span>View product</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
