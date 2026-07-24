import React from 'react';
import { Module } from '@domain/entities/Module';
import { Pencil, Trash2 } from 'lucide-react';

interface ModuleSidebarProps {
  modules: Module[];
  selectedModuleId: number | '';
  onSelect: (id: number) => void;
  onEditModule?: (mod: Module) => void;
  onDeleteModule?: (modId: number) => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  selectedModuleId,
  onSelect,
  onEditModule,
  onDeleteModule,
}) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-3">
      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 px-1">
        Secciones / Módulos ({modules.length})
      </h3>
      {modules.length > 0 ? (
        modules.map((mod, i) => {
          const isSelected = selectedModuleId === mod.id;
          return (
            <div
              key={mod.id}
              className={`w-full flex items-center justify-between px-3 py-2.5 border-2 border-slate-950 font-bold transition-all ${
                isSelected
                  ? 'bg-[#00cc33] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(mod.id)}
                className="flex-1 text-left cursor-pointer overflow-hidden mr-2"
              >
                <span className="text-[10px] uppercase font-mono block text-slate-700 dark:text-slate-300 font-extrabold">Módulo {i + 1}</span>
                <span className="line-clamp-1 text-xs font-black">{mod.title}</span>
              </button>

              <div className="flex items-center gap-1 shrink-0">
                {onEditModule && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditModule(mod);
                    }}
                    title="Editar título/orden del módulo"
                    className="p-1 border border-slate-950 bg-white text-slate-950 hover:bg-yellow-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}
                {onDeleteModule && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteModule(mod.id);
                    }}
                    title="Eliminar módulo"
                    className="p-1 border border-slate-950 bg-rose-500 text-white hover:bg-rose-600 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4 border-2 border-dashed border-slate-400 bg-white dark:bg-slate-900 text-center text-xs text-slate-500 italic">
          Aún no has creado ningún módulo. Crea uno para poder agregar lecciones.
        </div>
      )}
    </div>
  );
};
