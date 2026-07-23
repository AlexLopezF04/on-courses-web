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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00FF41] animate-in zoom-in-95 duration-200">
        <h2 className="font-display text-xl font-black text-slate-950 mb-4 pb-2 border-b-2 border-slate-950 flex justify-between items-center">
          <span>{isEditing ? 'Editar Tema' : 'Crear Nuevo Tema'}</span>
          <span className="text-xs font-mono bg-brand-400 text-slate-950 px-2 py-0.5 border border-slate-950">TEMA</span>
        </h2>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 bg-rose-50 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900 mb-6">
            <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Sección Asociada (Módulo) *
            </label>
            <select
              value={moduleId}
              onChange={(e) => onModuleChange(e.target.value ? Number(e.target.value) : '')}
              disabled={loading}
              className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500"
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
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Contenido Escrito (Markdown / Texto)
            </label>
            <textarea
              placeholder="Escribe la explicación teórica o enlaces de recursos aquí..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              disabled={loading}
              rows={4}
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
              {isEditing ? 'Guardar Cambios' : 'Crear Tema'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
