import React from 'react';

export const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-800" />
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">Cargando...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="py-12 flex justify-center w-full">{spinner}</div>;
};
