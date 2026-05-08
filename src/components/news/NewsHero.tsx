import { Search } from "lucide-react";

interface NewsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function NewsHero({ searchQuery, onSearchChange }: NewsHeroProps) {
  return (
    <section className="blogs-hero-section">
      <div className="blogs-hero-shell section-shell">
        <div className="blogs-hero-content">
          <h1 className="blogs-hero-title">
            Inside Tech: Systems and Intelligence
          </h1>
          
          <div className="w-full relative group max-w-4xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#364835] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search articles, tags, or topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full min-h-14 pl-12 pr-4 rounded-full bg-gray-50 border-none outline-none focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all text-sm shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
