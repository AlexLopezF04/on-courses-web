import React from 'react';
import { Module } from '@domain/entities/Module';

interface ModuleSidebarProps {
  modules: Module[];
  selectedModuleId: number | '';
  onSelect: (id: number) => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  selectedModuleId,
  onSelect,
}) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-3">
      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 px-1">
        Secciones / Módulos ({modules.length})
      </h3>
      {modules.length > 0 ? (
        modules.map((mod, i) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => onSelect(mod.id)}
            className={`w-full text-left px-4 py-3 border-2 border-slate-950 font-bold transition-all cursor-pointer ${
              selectedModuleId === mod.id
                ? 'bg-brand-400 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00FF41]'
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <span className="text-[10px] uppercase font-mono block text-slate-500">Módulo {i + 1}</span>
            <span className="line-clamp-1 text-xs font-black">{mod.title}</span>
          </button>
        ))
      ) : (
        <div className="p-4 border-2 border-dashed border-slate-400 bg-white dark:bg-slate-900 text-center text-xs text-slate-500 italic">
          Aún no has creado ningún módulo. Crea uno para poder agregar lecciones.
        </div>
      )}
    </div>
  );
};
