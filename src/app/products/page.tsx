"use client";

import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/lib/data";

export default function ProductsPage() {
  const filteredProducts = [...allProducts];

  return (
    <main className="min-h-screen bg-[var(--color-cream)]">
      <section id="inventory" className="section pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.name} className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2">
                <div className="product-card-image h-[280px] relative overflow-hidden bg-slate-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 h-[72px] line-clamp-3">{product.description}</p>
                  <Link href={product.href} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:gap-4 transition-all group/link">
                    Explore solution
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600">
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-slate-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>


    </main>
  );
}
