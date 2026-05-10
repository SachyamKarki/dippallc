import { Search } from "lucide-react";

interface NewsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsTitle?: string;
}

export default function NewsHero({ searchQuery, onSearchChange, resultsTitle }: NewsHeroProps) {
  return (
    <section className="blogs-hero-section">
      <div className="blogs-hero-shell section-shell">
        <div className="blogs-hero-content text-center pt-2 pb-14 lg:pt-6 lg:pb-18">
          <h1 className="blogs-hero-title text-5xl lg:text-7xl font-black mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-lato), sans-serif' }}>
            DIPPA INSIGHTS.
          </h1>
          <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto mb-12 font-medium">
            Strategic perspectives on software systems, AI orchestration, and the future of institutional engineering.
          </p>
          
          <div className="w-full relative group max-w-4xl mx-auto">
            {resultsTitle ? (
              <div className="mb-5 text-left">
                <h2 className="text-xl font-bold tracking-tight text-[#111111]">
                  {resultsTitle}
                </h2>
              </div>
            ) : null}
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E293B] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search articles, tags, or topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-full bg-white border-0 shadow-sm outline-none focus:ring-4 focus:ring-[#1E293B]/5 transition-all text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
