import React from 'react';

export const CatalogSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden h-[380px]">
          <div className="aspect-video bg-slate-250 dark:bg-slate-800" />
          <div className="flex-1 p-6 space-y-4">
            <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-lg" />
              <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-lg w-5/6" />
            </div>
            <div className="pt-4 flex justify-between">
              <div className="h-4 bg-slate-250 dark:bg-slate-805 rounded-lg w-1/4" />
              <div className="h-4 bg-slate-250 dark:bg-slate-805 rounded-lg w-1/4" />
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/4" />
            <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[220px]">
          <div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-lg w-2/3" />
              <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/5" />
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-6 animate-pulse" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
          </div>
          <div className="flex gap-3 mt-auto">
            <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-xl flex-1" />
            <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-xl flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const CourseDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Banner / Header skeleton */}
      <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-2xl w-1/3 mb-4" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main detail skeletons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-slate-250 dark:bg-slate-800 rounded-3xl" />
          <div className="space-y-4 p-6 border border-slate-200 dark:border-slate-800 rounded-3xl">
            <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-5/6" />
            </div>
          </div>
        </div>
        
        {/* Sidebar buy skeletons */}
        <div className="space-y-6">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 space-y-6">
            <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
            <div className="h-12 bg-slate-250 dark:bg-slate-800 rounded-2xl w-full" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-2/3" />
              <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
