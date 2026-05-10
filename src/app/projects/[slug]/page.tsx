import { allProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Link as LinkIcon, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

type Project = (typeof allProducts)[number];
type ProjectDetailBlock = Project["details"][number];
type ProjectStat = NonNullable<Project["stats"]>[number];

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProducts.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: project.description,
    keywords: project.stack.map(s => `#${s.toLowerCase().replace(/\s+/g, "")}`),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = allProducts.find((p) => p.slug === slug);
  const relatedProjects = allProducts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!project) {
    if (!isNaN(Number(slug))) {
       return (
         <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfcfb] p-20 text-center">
             <h1 className="mb-4 text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black" style={{ fontFamily: 'var(--font-lato)' }}>Project {slug}</h1>
             <p className="mb-8 max-w-xl text-base leading-8 text-black/70 font-medium">Case study for project {slug} is currently being finalized. Our full editorial piece will be available shortly.</p>
             <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 shadow-xl">
                 <ArrowLeft size={16} />
                 Back to Home
             </Link>
         </div>
       );
    }
    return notFound();
  }

  return (
    <main className="project-detail-page bg-[#fcfcfb] text-black">
      <div className="fixed left-6 top-6 z-[100] md:left-8 md:top-8">
        <Link 
          href="/" 
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-900 hover:text-white"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <section className="border-b border-slate-200/70 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Project Showcase</p>
            <span className="mb-8 inline-flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
              {project.category}
            </span>
            <h1 className="text-[clamp(3.1rem,7vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-slate-950">
              {project.name}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-[1.32rem] md:leading-10">
              {project.description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
            {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-slate-200 bg-[#f6f7f8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                #{tech.replace(/\s+/g, "")}
              </span>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.7fr)_360px] lg:gap-18">
            <div className="space-y-12 md:space-y-16">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] md:p-10">
                <div className="grid gap-8 md:grid-cols-3">
                  {project.stats?.map((stat: ProjectStat) => (
                    <div key={stat.label} className="border-b border-slate-100 pb-6 md:border-b-0 md:border-r md:pr-8 md:pb-0 last:border-b-0 md:last:border-r-0">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                      <p className="text-3xl font-bold tracking-[-0.04em] text-slate-950">
                        {stat.value}
                        <span className="ml-1 text-lg font-semibold text-slate-500">{stat.suffix}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {project.details.map((block: ProjectDetailBlock, idx: number) => {
                if (block.type === "narrative") {
                  return (
                    <section key={idx} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)] md:p-10">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Case Study Note</p>
                      <h2 className="max-w-2xl text-3xl font-bold tracking-[-0.04em] text-slate-950 md:text-4xl">
                        {block.title}
                      </h2>
                      <p className="mt-6 max-w-3xl text-[1.05rem] leading-8 text-slate-600 md:text-[1.12rem]">
                        {block.body}
                      </p>
                    </section>
                  );
                }

                if (block.type === "media") {
                  return (
                    <figure key={idx} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.04)] md:p-5">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.4rem] bg-slate-100">
                        <Image 
                          src={block.image} 
                          alt={block.caption || "Project detail"} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="px-2 pt-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                
                if (block.type === "impact") {
                  return (
                    <section key={idx} className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] md:p-10">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{block.title}</p>
                      <p className="max-w-4xl text-3xl font-bold leading-[1.02] tracking-[-0.05em] text-white md:text-5xl">
                        {block.body}
                      </p>
                    </section>
                  );
                }

                return null;
              })}

            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-[#f8f8f7] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                  <div>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Project Overview</p>
                    <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-950">Built for operational clarity and long-term leverage.</h3>
                    <p className="mt-4 text-[1rem] leading-7 text-slate-600">
                      This case study highlights the problem framing, technical execution, and measurable business result behind the system.
                    </p>
                  </div>

                  <div className="grid gap-5 border-t border-slate-200 pt-6">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Timeline</p>
                      <p className="text-xl font-bold tracking-[-0.03em] text-slate-950">{project.timeline}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Category</p>
                      <p className="text-xl font-bold tracking-[-0.03em] text-slate-950">{project.category}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Capabilities</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                          <span key={s} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                            #{s.replace(/\s+/g, "")}
                          </span>
                        ))}
                      </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Next Step</p>
                    <div className="space-y-3">
                      {project.liveLink && (
                        <Link 
                          href={project.liveLink}
                          target="_blank"
                          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 transition-colors hover:bg-slate-50"
                        >
                          Visit Live Project <LinkIcon size={16} />
                        </Link>
                      )}
                      
                      <Link 
                        href="/#contact" 
                        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
                      >
                        Start Inquiry <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-24 md:py-32">
        <div className="section-shell">
            <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">Further Depth</p>
                    <h2 className="text-4xl font-bold tracking-[-0.05em] text-slate-950 lg:text-5xl">Recommended Systems</h2>
                    <p className="max-w-2xl text-base leading-8 text-slate-600">
                      Explore adjacent product systems and transformation work with similar technical depth.
                    </p>
                </div>
                <Link href="/products" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:text-slate-950">
                    View Catalog
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {relatedProjects.map((other) => (
                    <Link key={other.slug} href={other.href} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfbfa] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-white">
                             <Image 
                                src={other.image} 
                                alt={other.name} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                        </div>
                        <div className="space-y-4 p-8">
                             <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{other.category}</p>
                             <h3 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 transition-colors group-hover:text-slate-700">{other.name}</h3>
                             <p className="max-w-2xl text-base leading-8 text-slate-600">{other.description}</p>
                             <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                               View Case Study <ArrowRight size={14} />
                             </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}
