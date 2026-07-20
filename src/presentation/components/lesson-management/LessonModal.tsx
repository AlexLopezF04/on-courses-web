import React from 'react';
import { Module } from '@domain/entities/Module';
import { Input } from '../Input';
import { Button } from '../Button';
import { ShieldAlert } from 'lucide-react';

interface LessonModalProps {
  isOpen: boolean;
  isEditing: boolean;
  modules: Module[];
  title: string;
  content: string;
  videoUrl: string;
  order: string;
  moduleId: number | '';
  loading: boolean;
  error: string | null;
  onTitleChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onVideoUrlChange: (val: string) => void;
  onOrderChange: (val: string) => void;
  onModuleChange: (val: number | '') => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  isEditing,
  modules,
  title,
  content,
  videoUrl,
  order,
  moduleId,
  loading,
  error,
  onTitleChange,
  onContentChange,
  onVideoUrlChange,
  onOrderChange,
  onModuleChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
          {isEditing ? 'Editar Tema' : 'Crear Nuevo Tema'}
        </h2>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-455 mb-6">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <span className="font-medium text-xs">{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sección Asociada (Módulo) *
            </label>
            <select
              value={moduleId}
              onChange={(e) => onModuleChange(e.target.value ? Number(e.target.value) : '')}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500"
              required
            >
              <option value="">-- Selecciona una Sección --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Título del Tema *"
            placeholder="Ej: Introducción a Zustand"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            disabled={loading}
            required
          />

          <Input
            label="Enlace de Video (URL de YouTube / Vimeo)"
            placeholder="https://www.youtube.com/watch?v=..."
            type="url"
            value={videoUrl}
            onChange={(e) => onVideoUrlChange(e.target.value)}
            disabled={loading}
          />

          <Input
            label="Orden *"
            type="number"
            placeholder="0"
            value={order}
            onChange={(e) => onOrderChange(e.target.value)}
            disabled={loading}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contenido Escrito (Markdown / Texto)
            </label>
            <textarea
              placeholder="Escribe la explicación teórica o enlaces de recursos aquí..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              disabled={loading}
              rows={4}
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
              {isEditing ? 'Guardar Cambios' : 'Crear Tema'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
