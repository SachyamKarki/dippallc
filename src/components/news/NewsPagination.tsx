import { ArrowLeft, ArrowRight } from "lucide-react";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NewsPagination({ currentPage, totalPages, onPageChange }: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="blogs-pagination-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="blogs-paginate-btn"
      >
        <ArrowLeft size={18} />
        <span>Previous</span>
      </button>

      <div className="blogs-pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`blogs-pagination-number ${currentPage === num ? "active" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="blogs-paginate-btn"
      >
        <span>Next</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
