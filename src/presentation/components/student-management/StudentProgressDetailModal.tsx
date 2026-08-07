import React from 'react';
import { Enrollment } from '@domain/entities/Enrollment';
import { X, CheckCircle2, Clock, MapPin, BookOpen, User } from 'lucide-react';

interface StudentProgressDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: Enrollment | null;
}

export const StudentProgressDetailModal: React.FC<StudentProgressDetailModalProps> = ({
  isOpen,
  onClose,
  enrollment,
}) => {
  if (!isOpen || !enrollment) return null;

  const progressNum = Math.min(100, Math.max(0, parseFloat(enrollment.total_progress || '0')));
  const isCompleted = progressNum >= 100;

  // Mock lesson progress breakdown based on student's current progress
  const mockModules = [
    {
      title: 'Módulo 1: Fundamentos y Entorno de Desarrollo',
      lessons: [
        { title: 'Manual de Instalación y Requisitos Previos', completed: true },
        { title: 'Lección 1.1: Configuración Inicial del Proyecto', completed: true },
        {
          title: 'Lección 1.2: Paginación Global y Serialización de Listas',
          completed: progressNum >= 50,
          isCurrent: progressNum < 100 && progressNum >= 30,
        },
      ],
    },
    {
      title: 'Módulo 2: Arquitectura y Lógica de Negocio',
      lessons: [
        {
          title: 'Lección 2.1: Implementación de Endpoints y Vistas',
          completed: progressNum >= 75,
          isCurrent: progressNum < 100 && progressNum >= 50,
        },
        {
          title: 'Lección 2.2: Autenticación JWT y Permisos de Usuario',
          completed: progressNum >= 90,
          isCurrent: progressNum < 100 && progressNum >= 75,
        },
        {
          title: 'Lección 2.3: Despliegue y Certificación Final',
          completed: progressNum >= 100,
          isCurrent: progressNum >= 90 && progressNum < 100,
        },
      ],
    },
  ];

  const currentLessonTitle = enrollment.last_lesson_title || 
    (isCompleted ? 'Certificado emitido - Curso finalizado' : 'Lección 1.2: Paginación Global y Serialización de Listas');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] overflow-hidden my-auto flex flex-col">
        {/* Retro Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
          <div className="flex items-center gap-2.5" translate="no">
            <span className="w-3 h-3 rounded-full bg-[#00cc33] animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-[#00cc33]">
              DETALLE DE AVANCE ESTUDIANTIL · ONCOURSES
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-7 h-7 flex items-center justify-center border-2 border-white bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-900 max-h-[80vh] overflow-y-auto font-sans">
          
          {/* Student Profile Ribbon */}
          <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#00cc33] border-2 border-slate-950 font-black text-slate-950 text-base flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {enrollment.user_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-slate-950 dark:text-white leading-tight">
                  {enrollment.user_name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <User className="h-3.5 w-3.5 text-[#00cc33]" />
                  <span>ID Estudiante: #{enrollment.user}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Avance General
              </span>
              <div className="flex items-center gap-2">
                <div className="w-28 h-3 bg-slate-200 dark:bg-slate-800 border border-slate-950 overflow-hidden">
                  <div
                    className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-[#00cc33]'}`}
                    style={{ width: `${progressNum}%` }}
                  />
                </div>
                <span className="font-mono font-bold text-xs text-slate-950 dark:text-white">{progressNum}%</span>
              </div>
            </div>
          </div>

          {/* 📍 HIGHLIGHT BOX: Exact Location Where Student Left Off */}
          <div className="border-2 border-slate-950 bg-amber-50 dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-3">
            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600 dark:text-[#00cc33] animate-bounce" />
                📍 DÓNDE SE QUEDÓ EL ESTUDIANTE (ÚLTIMA UBICACIÓN VISTA)
              </span>
              {isCompleted ? (
                <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-mono font-bold text-[10px] uppercase border border-slate-950">
                  CURSO FINALIZADO ✅
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono font-bold text-[10px] uppercase border border-slate-950">
                  EN PROGRESO 🟡
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">
                Curso: {enrollment.course_title}
              </span>
              <h3 className="font-display font-black text-xl text-slate-950 dark:text-white">
                {currentLessonTitle}
              </h3>
            </div>

            <div className="pt-2 border-t border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#00cc33]" />
                Último acceso registrado: Reciente
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                Tema activo #{Math.ceil((progressNum / 100) * 6) || 1} de 6
              </span>
            </div>
          </div>

          {/* Module Syllabus & Student Progress Checklist */}
          <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#00cc33]" />
              Desglose de Lecciones Vistas vs Pendientes
            </h4>

            <div className="space-y-4">
              {mockModules.map((mod, idx) => (
                <div key={idx} className="border border-slate-950 p-3.5 bg-slate-50 dark:bg-slate-900 space-y-2">
                  <span className="font-bold text-xs text-slate-950 dark:text-white block border-b border-slate-300 dark:border-slate-800 pb-1">
                    {mod.title}
                  </span>

                  <div className="space-y-1.5 pl-2">
                    {mod.lessons.map((les, lIdx) => (
                      <div
                        key={lIdx}
                        className={`flex items-center justify-between p-2 text-xs font-medium border ${
                          les.isCurrent
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 font-bold text-slate-950 dark:text-amber-200'
                            : les.completed
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-300'
                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {les.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : les.isCurrent ? (
                            <MapPin className="h-4 w-4 text-amber-600 dark:text-[#00cc33] shrink-0 animate-pulse" />
                          ) : (
                            <Clock className="h-4 w-4 text-slate-300 shrink-0" />
                          )}
                          <span>{les.title}</span>
                        </div>

                        {les.isCurrent && (
                          <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono text-[9px] font-black uppercase">
                            UBICACIÓN ACTUAL
                          </span>
                        )}
                        {les.completed && !les.isCurrent && (
                          <span className="text-[10px] text-emerald-600 font-mono font-bold">COMPLETADA</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-200 cursor-pointer"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
