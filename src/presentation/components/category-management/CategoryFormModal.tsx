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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] animate-in zoom-in-95 duration-200">
        <h2 className="font-display text-xl font-black text-slate-950 mb-4 pb-2 border-b-2 border-slate-950 flex justify-between items-center">
          <span>{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</span>
          <span className="text-xs font-mono bg-brand-400 text-slate-950 px-2 py-0.5 border border-slate-950">FORM</span>
        </h2>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 bg-rose-50 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre de la Categoría *"
            placeholder="Ej: Inteligencia Artificial, Frontend, Backend"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={loading}
            required
          />

          <Input
            label="Slug de la Categoría *"
            placeholder="ej: inteligencia-artificial"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            disabled={loading}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Descripción (Opcional)
            </label>
            <textarea
              placeholder="Detalles sobre esta categoría académica..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
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
              {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
