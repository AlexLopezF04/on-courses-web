import React from 'react';
import { Category } from '@domain/entities/Category';
import { Input } from '../Input';
import { Button } from '../Button';
import { ShieldAlert } from 'lucide-react';

interface CourseFormModalProps {
  isOpen: boolean;
  isEditing: boolean;
  categories: Category[];
  category: number | '';
  title: string;
  description: string;
  price: string;
  slug: string;
  isActive: boolean;
  loading: boolean;
  error: string | null;
  onCategoryChange: (val: number | '') => void;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onPriceChange: (val: string) => void;
  onSlugChange: (val: string) => void;
  onIsActiveChange: (val: boolean) => void;
  onCoverImageChange: (file: File | null) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  isEditing,
  categories,
  category,
  title,
  description,
  price,
  slug,
  isActive,
  loading,
  error,
  onCategoryChange,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onSlugChange,
  onIsActiveChange,
  onCoverImageChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative my-8">
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
          {isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}
        </h3>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-400 mb-6">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <div className="text-xs leading-relaxed">{error}</div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Categoría Temática *
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : '')}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500"
              required
            >
              <option value="">-- Selecciona una Categoría --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Título del Curso *"
            placeholder="Ej: React y TypeScript de Novato a Experto"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            disabled={loading}
            required
          />

          <Input
            label="Slug del Curso *"
            placeholder="ej: react-y-typescript-de-novato-a-experto"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            disabled={loading}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Descripción del Temario
            </label>
            <textarea
              placeholder="Escribe un resumen o las metas del curso..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Precio (USD) *"
              type="number"
              step="0.01"
              placeholder="19.99"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              disabled={loading}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Imagen de Portada (Opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onCoverImageChange(e.target.files?.[0] || null)}
                disabled={loading}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="formIsActive"
              checked={isActive}
              onChange={(e) => onIsActiveChange(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="formIsActive" className="text-sm font-semibold text-slate-700 dark:text-slate-350">
              Habilitar publicación (Visible en el catálogo público)
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={loading}>
              {isEditing ? 'Guardar Cambios' : 'Crear Curso'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
