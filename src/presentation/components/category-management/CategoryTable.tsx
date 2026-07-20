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
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          <th className="px-6 py-4">ID</th>
          <th className="px-6 py-4">Nombre</th>
          <th className="px-6 py-4">Slug</th>
          <th className="px-6 py-4">Descripción</th>
          <th className="px-6 py-4 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
        {categories.length > 0 ? (
          categories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="px-6 py-4 font-semibold text-slate-400">#{category.id}</td>
              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                {category.name}
              </td>
              <td className="px-6 py-4">
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {category.slug}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                {category.description || <span className="italic text-slate-400">Sin descripción</span>}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(category.id)}
                      className="rounded-xl border border-slate-200 p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:text-rose-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-455 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
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
