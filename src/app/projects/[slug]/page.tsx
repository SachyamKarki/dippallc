import { allProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "gantabya") {
    return {
      title: "Gantabya — DIPPA Products",
      description: "Kathmandu Valley bus transit guide by Dippa. Now in App Store review.",
    };
  }
  const project = allProducts.find((p) => p.slug === slug);
  if (!project) return { title: "Product Not Found" };
  return {
    title: `${project.name} — DIPPA Products`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = allProducts.find((p) => p.slug === slug);
  if (!project) return notFound();

  const details = "details" in project && project.details ? project.details : [];

  return (
    <main className="bg-[#fcfcfb] text-black" data-nav-tone="light">
      <div className="fixed left-6 top-6 z-[100] md:left-8 md:top-8">
        <Link
          href="/products"
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-900 hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Products
        </Link>
      </div>

      <section className="border-b border-slate-200/70 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="section-shell mx-auto max-w-5xl px-5 text-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            Product Showcase
          </p>
          <span className="mb-8 inline-flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
            {project.category}
          </span>
          <h1 className="text-[clamp(3.1rem,7vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-slate-950">
            {project.name}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-[1.32rem] md:leading-10">
            {project.description}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="section-shell mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Timeline
            </p>
            <p className="text-2xl font-bold tracking-[-0.03em]">{project.timeline}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-[#f6f7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              >
                Visit live →
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {details.length > 0 ? (
        <section className="border-t border-slate-200/70 py-16 md:py-24">
          <div className="section-shell mx-auto max-w-3xl px-5">
            <div className="flex flex-col gap-12 md:gap-14">
              {details.map((block) => (
                <article key={block.title}>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-700 md:text-[1.0625rem] md:leading-[1.85]">
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
