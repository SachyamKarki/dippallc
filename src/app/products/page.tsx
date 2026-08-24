export const metadata = {
  title: "Products — DIPPA IT Solutions",
  description: "Dippa products are temporarily unavailable while we perform maintenance.",
};

export default function ProductsPage() {
  return (
    <main className="bg-white text-slate-950" data-nav-tone="light">
      <section className="flex min-h-[67dvh] items-center justify-center px-5 pt-44 pb-28 md:min-h-[93vh] md:pt-52 md:pb-36">
        <div className="section-shell mx-auto max-w-xl text-center">
          <h1 className="text-[clamp(1.85rem,5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.04em] text-slate-950">
            Temporarily unavailable
          </h1>
          <p className="mt-7 text-base leading-8 text-slate-600">
            This page is under maintenance right now. Please check back soon —
            we&apos;ll have our product lineup back up shortly.
          </p>
        </div>
      </section>
    </main>
  );
}
