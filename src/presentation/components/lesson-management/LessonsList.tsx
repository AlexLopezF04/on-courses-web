import React from 'react';
import { Lesson } from '@domain/entities/Lesson';
import { FileText, Pencil, Trash2, Eye, Plus } from 'lucide-react';

interface LessonsListProps {
  lessons: Lesson[];
  selectedModuleId: number | '';
  isAdmin: boolean;
  onEdit: (lesson: Lesson) => void;
  onPreview?: (lessonId: number) => void;
  onDelete: (id: number) => void;
  onCreateLesson?: () => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  selectedModuleId,
  isAdmin,
  onEdit,
  onPreview,
  onDelete,
  onCreateLesson,
}) => {
  const filtered = lessons.filter((les) => les.module === selectedModuleId);

  return (
    <div className="lg:col-span-3 flex flex-col gap-4">
      <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
        <h3 className="font-display font-black text-lg text-slate-950 dark:text-white mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-950 pb-3">
          <span>Temas del Módulo Seleccionado</span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono bg-[#00cc33] text-slate-950 font-extrabold px-2.5 py-1 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {filtered.length} {filtered.length === 1 ? 'Lección' : 'Lecciones'}
            </span>
            {onCreateLesson && (
              <button
                type="button"
                onClick={onCreateLesson}
                disabled={selectedModuleId === ''}
                className={`px-3 py-1 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedModuleId === '' ? 'opacity-50 cursor-not-allowed bg-slate-200' : ''
                }`}
                title="Crear una nueva lección/tema para este módulo"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva Lección</span>
              </button>
            )}
          </div>
        </h3>

        <div className="divide-y-2 divide-slate-100 dark:divide-slate-850">
          {filtered.length > 0 ? (
            filtered.map((les) => (
              <div
                key={les.id}
                className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-3 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white mt-0.5 shrink-0 font-bold">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">{les.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-lg font-medium">
                      {les.content_text || 'Sin contenido de texto todavía.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end sm:justify-start shrink-0">
                  <span className="text-[10px] font-mono font-extrabold text-slate-950 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 border border-slate-950 px-2 py-0.5">
                    Orden: {les.order}
                  </span>
                  {onPreview && (
                    <button
                      onClick={() => onPreview(les.id)}
                      className="px-2.5 py-1 bg-[#00cc33] text-slate-950 font-extrabold text-[10px] uppercase border border-slate-950 hover:bg-[#00ff41] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1"
                      title="Vista Previa de la Lección"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden md:inline">Ver</span>
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(les)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase border border-slate-950 hover:bg-slate-200 cursor-pointer"
                    title="Editar Tema"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(les.id)}
                    disabled={!isAdmin}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase border border-slate-950 cursor-pointer ${
                      isAdmin ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed'
                    }`}
                    title={isAdmin ? "Eliminar Tema" : "Eliminar (Solo Administradores)"}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
              <p className="text-slate-400 italic text-xs font-medium">
                No hay lecciones en este módulo todavía.
              </p>
              {onCreateLesson && selectedModuleId !== '' && (
                <button
                  type="button"
                  onClick={onCreateLesson}
                  className="px-4 py-2 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Crear la Primera Lección de este Módulo</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
