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
      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 px-2">Secciones</h3>
      {modules.length > 0 ? (
        modules.map((mod, i) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => onSelect(mod.id)}
            className={`w-full text-left px-4 py-3 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
              selectedModuleId === mod.id
                ? 'bg-brand-50 border-brand-500/20 text-brand-650 dark:bg-brand-950/20 dark:text-brand-400'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-650 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-850'
            }`}
          >
            <span className="text-xs text-slate-400 block font-normal">Módulo {i + 1}</span>
            <span className="line-clamp-1">{mod.title}</span>
          </button>
        ))
      ) : (
        <div className="p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center text-xs text-slate-400 italic bg-white dark:bg-slate-900">
          Aún no has creado ningún módulo. Crea uno para poder agregar lecciones.
        </div>
      )}
    </div>
  );
};
