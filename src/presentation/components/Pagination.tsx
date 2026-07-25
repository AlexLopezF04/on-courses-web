import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  count: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / pageSize);

  if (totalPages <= 1) return null;

  // Generate range of pages to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between border border-slate-200/80 dark:border-slate-800/80 px-4 py-3 sm:px-6 mt-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xs">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-850"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-850"
        >
          Siguiente
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Mostrando página <span className="font-extrabold text-slate-900 dark:text-white">{currentPage}</span> de{' '}
            <span className="font-extrabold text-slate-900 dark:text-white">{totalPages}</span> ({count} resultados totales)
          </p>
        </div>
        <div>
          <nav className="inline-flex items-center gap-1.5 p-1.5 bg-slate-50/90 dark:bg-slate-950/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center justify-center h-10 w-10 rounded-2xl border border-slate-200/80 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white shadow-2xs"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            </button>

            {pages.map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex items-center justify-center h-10 min-w-10 px-3.5 text-sm font-extrabold transition-all cursor-pointer rounded-2xl ${
                    isActive
                      ? 'bg-[#00cc33] text-white shadow-md shadow-[#00cc33]/30 border border-[#00cc33] scale-105'
                      : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 shadow-2xs'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center justify-center h-10 w-10 rounded-2xl border border-slate-200/80 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white shadow-2xs"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
