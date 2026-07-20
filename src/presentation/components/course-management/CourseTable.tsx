import React from 'react';
import { Course } from '@domain/entities/Course';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, ListPlus } from 'lucide-react';
import { Button } from '../Button';

interface CourseTableProps {
  courses: Course[];
  isAdmin: boolean;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          <th className="py-4 px-6">ID</th>
          <th className="py-4 px-4">Curso</th>
          <th className="py-4 px-4">Precio</th>
          <th className="py-4 px-4">Estado</th>
          <th className="py-4 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
        {courses.length > 0 ? (
          courses.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="py-4 px-6 font-semibold text-slate-400">#{c.id}</td>
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</span>
                  <span className="text-xs text-slate-400 mt-0.5">Slug: {c.slug}</span>
                </div>
              </td>
              <td className="py-4 px-4 font-bold text-brand-600 dark:text-brand-400">
                {parseFloat(c.price) === 0 ? 'Gratis' : `$${c.price}`}
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  c.is_active
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${c.is_active ? 'bg-emerald-500' : 'bg-slate-455'}`} />
                  {c.is_active ? 'Activo' : 'Borrador'}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link to={`/admin/courses/${c.id}/lessons`}>
                    <Button variant="ghost" size="sm" className="p-2 flex items-center gap-1.5 text-brand-600" title="Ver Lecciones">
                      <ListPlus className="h-4 w-4" />
                      <span className="hidden sm:inline">Temas</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(c)}
                    className="p-2 text-slate-600 dark:text-slate-350"
                    title="Editar Curso"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(c.id)}
                    className={`p-2 ${
                      isAdmin ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                    }`}
                    disabled={!isAdmin}
                    title={isAdmin ? "Eliminar Curso" : "Eliminar (Solo Administradores)"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
