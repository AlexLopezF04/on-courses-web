import React from 'react';
import { Course } from '@domain/entities/Course';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, ListPlus, Eye } from 'lucide-react';

interface CourseTableProps {
  courses: Course[];
  isAdmin: boolean;
  onEdit: (course: Course) => void;
  onToggleStatus?: (course: Course) => void;
  onDelete: (id: number) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  isAdmin,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <table className="w-full text-left border-collapse text-xs">
      <thead>
        <tr className="border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
          <th className="py-3.5 px-6">ID</th>
          <th className="py-3.5 px-4">Curso</th>
          <th className="py-3.5 px-4">Precio</th>
          <th className="py-3.5 px-4">Estado (Clic para Cambiar)</th>
          <th className="py-3.5 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 font-medium text-slate-800 dark:text-slate-200">
        {courses.length > 0 ? (
          courses.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <td className="py-4 px-6 font-mono font-bold text-slate-400">#{c.id}</td>
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <span className="font-extrabold text-slate-950 dark:text-white line-clamp-1">{c.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 mt-0.5">Slug: /{c.slug}</span>
                </div>
              </td>
              <td className="py-4 px-4 font-mono font-extrabold text-slate-950 dark:text-white">
                {parseFloat(c.price) === 0 ? 'Gratis' : `$${c.price}`}
              </td>
              <td className="py-4 px-4">
                <button
                  type="button"
                  onClick={() => onToggleStatus?.(c)}
                  className={`inline-flex items-center gap-1 border-2 border-slate-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                    c.is_active
                      ? 'bg-emerald-400 text-slate-950 hover:bg-rose-400'
                      : 'bg-amber-400 text-slate-950 hover:bg-emerald-400'
                  }`}
                  title={c.is_active ? 'Clic para Inactivar este curso' : 'Clic para Activar este curso'}
                >
                  <span>{c.is_active ? '🟢 ACTIVO' : '🟡 INACTIVO'}</span>
                </button>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Link to={`/courses/${c.id}`}>
                    <button
                      className="px-2.5 py-1 bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-[#00ff41] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
                      title="Vista Previa de Estudiante"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Ver</span>
                    </button>
                  </Link>
                  <Link to={`/admin/courses/${c.id}/lessons`}>
                    <button className="px-2.5 py-1 bg-brand-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-brand-300 flex items-center gap-1 cursor-pointer">
                      <ListPlus className="h-3.5 w-3.5" />
                      <span>Temas</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => onEdit(c)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-slate-200 cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    disabled={!isAdmin}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-slate-950 cursor-pointer ${
                      isAdmin ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="py-12 text-center text-slate-400 italic">
              No se encontraron cursos cargados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
