import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Course } from '../../domain/entities/Course';

interface CourseCardProps {
  course: Course;
}

const getCategoryColor = (categoryName?: string) => {
  const name = (categoryName || '').toLowerCase();
  if (name.includes('front') || name.includes('js') || name.includes('javascript') || name.includes('web')) {
    return 'bg-amber-500 text-amber-955';
  }
  if (name.includes('back') || name.includes('python') || name.includes('django') || name.includes('api')) {
    return 'bg-violet-600 text-violet-100';
  }
  if (name.includes('base') || name.includes('sql') || name.includes('data')) {
    return 'bg-indigo-600 text-indigo-100';
  }
  if (name.includes('git') || name.includes('github') || name.includes('version')) {
    return 'bg-rose-600 text-rose-100';
  }
  return 'bg-emerald-600 text-emerald-100';
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const videoHours = ((course.modules_count || 0) * 1.5 + 2).toFixed(0);

  return (
    <div
      className="relative flex flex-col bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] rounded-none overflow-hidden transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] animate-fade-in"
    >
      {/* Window Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-950 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-3 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-650 dark:text-slate-400 truncate max-w-[150px]">
          {course.category_name || 'Desarrollo'}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 dark:border-slate-800 text-[10px] font-bold select-none cursor-pointer bg-white dark:bg-slate-900 text-slate-900 dark:text-white">_</span>
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 dark:border-slate-800 text-[10px] font-bold select-none cursor-pointer bg-white dark:bg-slate-900 text-slate-900 dark:text-white">+</span>
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 dark:border-slate-800 text-[10px] font-bold select-none cursor-pointer bg-white dark:bg-slate-900 text-slate-900 dark:text-white">X</span>
        </div>
      </div>

      {/* Card Header Color Block */}
      <div className={`relative aspect-video flex items-center justify-center p-6 ${getCategoryColor(course.category_name)}`}>
        {/* Certificate Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 border border-slate-950 dark:border-slate-800 rounded px-1.5 py-0.5 text-[9px] font-bold text-slate-900 dark:text-white uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <span>🛡️</span>
          <span>Con certificado</span>
        </div>
        
        {/* Centered technology/course image */}
        <div className="w-20 h-20 bg-white border-2 border-slate-950 p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
          {course.cover_image ? (
            <img
              src={course.cover_image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="h-10 w-10 text-slate-900" />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 bg-white dark:bg-slate-900">
        <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1 border-b border-slate-200 dark:border-slate-800 pb-1.5">
          {course.title}
        </h3>
        
        {/* Dynamic statistics */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-700 dark:text-slate-300 py-3">
          <div className="flex items-center gap-2">
            <span>📄</span>
            <span className="font-medium">{(course.modules_count || 0) * 8} lecciones</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎬</span>
            <span className="font-medium">{videoHours} horas en vídeo</span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">
          {course.description || 'Curso estructurado para el dominio completo de la tecnología.'}
        </p>
      </div>
      
      {/* Bottom Button Stack */}
      <div className="flex flex-col gap-2 p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
        <Link to={`/courses/${course.id}`} className="w-full">
          <button className="w-full text-center py-2 border border-slate-950 dark:border-slate-800 text-xs font-extrabold bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.05)] cursor-pointer">
            Ver el curso
          </button>
        </Link>
        <div className="w-full text-center py-2 border border-slate-350 dark:border-slate-800 text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.05)]">
          {parseFloat(course.price) === 0 ? 'Acceso Gratis' : `Pago único: $${course.price}`}
        </div>
      </div>
    </div>
  );
};
