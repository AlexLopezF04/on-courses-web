import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Mail, Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-violet-600 text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display font-semibold tracking-tight text-slate-900 dark:text-white">
              OnCourses
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-455">
            <Link to="/courses" className="hover:text-brand-500">Cursos</Link>
            <a href="https://on-courses-api.uaeftt-ute.site/api/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500">API Docs</a>
          </div>

          <div className="flex gap-4 text-slate-400 dark:text-slate-500">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500"><Globe className="h-5 w-5" /></a>
            <a href="mailto:support@on-courses.com" className="hover:text-brand-500"><Mail className="h-5 w-5" /></a>
            <a href="https://on-courses-api.uaeftt-ute.site" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500"><Link2 className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-8 text-center text-xs text-slate-400 dark:border-slate-850 dark:text-slate-600">
          Desarrollado con ♡ [y gracias a ti] desde Ecuador para el mundo. v1.0 &copy; 2024-{new Date().getFullYear()} OnCourses by Alex López.
        </div>
      </div>
    </footer>
  );
};
