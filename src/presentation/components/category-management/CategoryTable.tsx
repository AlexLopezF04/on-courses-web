import React from 'react';
import { Category } from '@domain/entities/Category';
import { Pencil, Trash2 } from 'lucide-react';

interface CategoryTableProps {
  categories: Category[];
  isAdmin: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full text-left border-collapse text-xs">
      <thead>
        <tr className="border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
          <th className="px-6 py-3.5">ID</th>
          <th className="px-6 py-3.5">Nombre</th>
          <th className="px-6 py-3.5">Slug</th>
          <th className="px-6 py-3.5">Descripción</th>
          <th className="px-6 py-3.5 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 font-medium text-slate-800 dark:text-slate-200">
        {categories.length > 0 ? (
          categories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="px-6 py-4 font-mono font-bold text-slate-400">#{category.id}</td>
              <td className="px-6 py-4 font-extrabold text-slate-950 dark:text-white">
                {category.name}
              </td>
              <td className="px-6 py-4">
                <span className="border border-slate-950 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-950 dark:text-slate-200">
                  {category.slug}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-xs truncate font-medium">
                {category.description || <span className="italic text-slate-400">Sin descripción</span>}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(category)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-slate-200 cursor-pointer"
                    title="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(category.id)}
                      className="px-2.5 py-1 bg-rose-500 text-white font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-rose-600 cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
              No se encontraron categorías cargadas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
