"use client";

import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-(--color-cream) flex items-center justify-center">
      <section style={{ padding: 0 }} className="w-full">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            No openings at the moment.
          </h1>

          <div className="mt-10 flex justify-center">
            <Link href="/" className="button-secondary inline-flex px-10 py-4 text-center">
              Back to home
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
