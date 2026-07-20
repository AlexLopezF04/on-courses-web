import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { ShieldAlert } from 'lucide-react';

interface CategoryFormModalProps {
  isOpen: boolean;
  isEditing: boolean;
  name: string;
  description: string;
  slug: string;
  loading: boolean;
  error: string | null;
  onNameChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onSlugChange: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  isEditing,
  name,
  description,
  slug,
  loading,
  error,
  onNameChange,
  onDescriptionChange,
  onSlugChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
          {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-400">
            <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-455" />
            <span className="font-medium text-xs">{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre de la Categoría"
            placeholder="Ej: Inteligencia Artificial, Frontend, Backend"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={loading}
            required
          />

          <Input
            label="Slug de la Categoría"
            placeholder="ej: inteligencia-artificial"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            disabled={loading}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Descripción (Opcional)
            </label>
            <textarea
              placeholder="Detalles sobre esta categoría académica..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={loading}>
              {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
