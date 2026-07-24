import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingBag } from 'lucide-react';
import { Course } from '../../domain/entities/Course';
import { useCartStore } from '../store/useCartStore';

interface CourseCardProps {
  course: Course;
}

const getCategoryColor = (categoryName?: string) => {
  const name = (categoryName || '').toLowerCase();
  if (name.includes('front') || name.includes('js') || name.includes('javascript') || name.includes('web')) {
    return 'bg-amber-500 text-amber-955';
  }
  if (name.includes('back') || name.includes('python') || name.includes('django') || name.includes('api')) {
    return 'bg-brand-600 text-brand-100';
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
  const { addItem } = useCartStore();
  const videoHours = ((course.modules_count || 0) * 1.5 + 2).toFixed(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(course);
  };

  return (
    <div
      className="relative flex flex-col h-full bg-white border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] rounded-none overflow-hidden transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] animate-fade-in"
    >
      {/* Window Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-950 bg-slate-100 px-3 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-700 truncate max-w-[150px]">
          {course.category_name || 'Desarrollo'}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">_</span>
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">+</span>
          <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">X</span>
        </div>
      </div>

      {/* Card Header Color Block */}
      <div className={`relative aspect-video flex items-center justify-center p-6 ${getCategoryColor(course.category_name)}`}>
        {/* Certificate Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white border border-slate-950 rounded px-1.5 py-0.5 text-[9px] font-bold text-slate-900 dark:text-slate-900 uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
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
      <div className="flex flex-1 flex-col p-5 bg-white">
        <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-slate-950 transition-colors border-b border-slate-200 pb-1.5">
          {course.title}
        </h3>
        
        {/* Dynamic statistics */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-700 dark:text-slate-700 py-3">
          <div className="flex items-center gap-2">
            <span>📄</span>
            <span className="font-medium text-slate-700 dark:text-slate-700">{(course.modules_count || 0) * 8} lecciones</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎬</span>
            <span className="font-medium text-slate-700 dark:text-slate-700">{videoHours} horas en vídeo</span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-500 text-xs line-clamp-2">
          {course.description || 'Curso estructurado para el dominio completo de la tecnología.'}
        </p>
      </div>
      
      {/* Bottom Button Stack */}
      <div className="flex flex-col gap-2 p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-mono font-bold text-slate-600">
            {parseFloat(course.price) === 0 ? 'Gratuito' : `Precio:`}
          </span>
          <span className="text-sm font-black text-slate-950 font-mono">
            {parseFloat(course.price) === 0 ? 'GRATIS' : `$${course.price} USD`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/courses/${course.id}`}>
            <button className="w-full text-center py-2 border-2 border-slate-950 text-xs font-extrabold bg-white text-slate-950 hover:bg-slate-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              Ver detalle
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 py-2 border-2 border-slate-950 text-xs font-black bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 transition-colors shadow-[2px_2px_0px_0px_#00b835] cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Carrito</span>
          </button>
        </div>
      </div>
    </div>
  );
};
