import React from 'react';
import { Lesson } from '@domain/entities/Lesson';
import { FileText, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../Button';

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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">
          Temas del Módulo Seleccionado
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length > 0 ? (
            filtered.map((les) => (
              <div
                key={les.id}
                className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 px-2 rounded-xl transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 mt-0.5 shrink-0">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 dark:text-slate-200">{les.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 max-w-lg">
                      {les.content_text || 'Sin contenido de texto todavía.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end sm:justify-start shrink-0">
                  <span className="text-xs font-semibold text-slate-455 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    Orden: {les.order}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(les)}
                    className="p-2"
                    title="Editar Tema"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(les.id)}
                    disabled={!isAdmin}
                    className={`p-2 ${
                      isAdmin ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20' : 'text-slate-350 dark:text-slate-700 cursor-not-allowed'
                    }`}
                    title={isAdmin ? "Eliminar Tema" : "Eliminar (Solo Administradores)"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 italic">
              No hay lecciones en este módulo todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
