import React from 'react';
import { Lesson } from '@domain/entities/Lesson';
import { FileText, Pencil, Trash2 } from 'lucide-react';

interface LessonsListProps {
  lessons: Lesson[];
  selectedModuleId: number | '';
  isAdmin: boolean;
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: number) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  selectedModuleId,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const filtered = lessons.filter((les) => les.module === selectedModuleId);

  return (
    <div className="lg:col-span-3 flex flex-col gap-4">
      <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
        <h3 className="font-display font-black text-lg text-slate-950 dark:text-white mb-6 flex items-center justify-between border-b-2 border-slate-950 pb-3">
          <span>Temas del Módulo Seleccionado</span>
          <span className="text-xs font-mono bg-brand-400 text-slate-950 px-2.5 py-0.5 border border-slate-950">
            {filtered.length} Lecciones
          </span>
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
            <div className="py-12 text-center text-slate-400 italic text-xs font-medium">
              No hay lecciones en este módulo todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
