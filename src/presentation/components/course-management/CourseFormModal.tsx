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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00FF41] relative my-8">
        <h3 className="font-display text-xl font-black text-slate-950 mb-6 pb-2 border-b-2 border-slate-950 flex justify-between items-center">
          <span>{isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}</span>
          <span className="text-xs font-mono bg-brand-400 text-slate-950 px-2 py-0.5 border border-slate-950">CURSO</span>
        </h3>

        {error && (
          <div className="flex items-start gap-2.5 bg-rose-50 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900 mb-6">
            <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Categoría Temática *
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : '')}
              disabled={loading}
              className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500"
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
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Descripción del Temario
            </label>
            <textarea
              placeholder="Escribe un resumen o las metas del curso..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500 resize-none"
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
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Imagen de Portada (Opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onCoverImageChange(e.target.files?.[0] || null)}
                disabled={loading}
                className="w-full text-xs text-slate-700 file:mr-4 file:py-1.5 file:px-3 file:border-2 file:border-slate-950 file:text-xs file:font-extrabold file:bg-brand-400 file:text-slate-950"
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
              className="h-4 w-4 border-2 border-slate-950 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="formIsActive" className="text-xs font-bold text-slate-800">
              Habilitar publicación (Visible en el catálogo público)
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" isLoading={loading}>
              {isEditing ? 'Guardar Cambios' : 'Crear Curso'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
