import React from 'react';
import { Lesson } from '@domain/entities/Lesson';
import { X, Play, FileText, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Button } from '../Button';
import { sanitizeUrl } from '../../utils/sanitize-url';

interface SingleLessonPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  moduleTitle?: string;
  courseId: number;
  onLaunchFullPlayer: (lessonId: number) => void;
}

export const SingleLessonPreviewModal: React.FC<SingleLessonPreviewModalProps> = ({
  isOpen,
  onClose,
  lesson,
  moduleTitle,
  courseId: _courseId,
  onLaunchFullPlayer,
}) => {
  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 text-slate-950 dark:text-white border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] flex flex-col overflow-hidden my-auto">
        
        {/* Retro Window Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#00cc33] animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-[#00cc33]">
              👁️ VISTA PREVIA INDIVIDUAL DE LECCIÓN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border-2 border-white bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900">
          {/* Lesson Header Info */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
            {moduleTitle && (
              <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-brand-600 dark:text-[#00cc33] block mb-1">
                {moduleTitle}
              </span>
            )}
            <h2 className="font-display font-black text-2xl text-slate-950 dark:text-white leading-snug">
              {lesson.title}
            </h2>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#00cc33]" />
                <span>Orden: {lesson.order}</span>
              </div>
              {lesson.duration_seconds && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#00cc33]" />
                  <span>{Math.round(lesson.duration_seconds / 60)} minutos</span>
                </div>
              )}
            </div>
          </div>

          {/* Embedded Video (if present) */}
          {lesson.video_url && (
            <div className="border-2 border-slate-950 bg-slate-950 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
              <div className="bg-slate-900 px-4 py-2 text-xs font-mono font-bold text-[#00cc33] border-b border-slate-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  <span>CLASE EN VIDEO · ONCOURSES PLAYER</span>
                </div>
                <span className="text-[10px] text-slate-400">HD 1080p</span>
              </div>
              <div className="relative aspect-video bg-black">
                {lesson.video_url.includes('youtube') || lesson.video_url.includes('embed') ? (
                  <iframe
                    src={sanitizeUrl(lesson.video_url)}
                    title={lesson.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-300">
                    <Play className="h-12 w-12 text-[#00cc33] mb-3" />
                    <p className="text-sm font-bold">Video de la lección disponible</p>
                    <a
                      href={sanitizeUrl(lesson.video_url)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 text-xs text-[#00cc33] underline font-mono"
                    >
                      Abrir enlace de video ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Practical Manual / Content Text */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-950 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#00cc33]" />
              Manual de Instrucciones & Contenido del Tema
            </h3>

            <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4">
              {lesson.content_text ? (
                lesson.content_text.split('```').map((block, i) => {
                  if (i % 2 === 1) {
                    // Code Block
                    const lines = block.trim().split('\n');
                    const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : 'code';
                    const codeContent = lines[0].match(/^[a-z]+/i) ? lines.slice(1).join('\n') : block;

                    return (
                      <div key={i} className="my-4 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] overflow-x-auto">
                        <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold">
                          <span>{lang}</span>
                          <span>Console Code Sandbox</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{codeContent.trim()}</pre>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="space-y-3">
                      {block.split('\n\n').map((para, j) => {
                        if (para.startsWith('### ')) {
                          return <h3 key={j} className="text-base font-black text-slate-950 dark:text-white mt-4 mb-1">{para.replace('### ', '')}</h3>;
                        }
                        if (para.startsWith('#### ')) {
                          return (
                            <div key={j} className="my-2 p-2.5 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200">
                              {para.replace('#### ', '')}
                            </div>
                          );
                        }
                        if (para.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
                          return (
                            <ul key={j} className="list-disc list-inside space-y-1 text-xs text-slate-800 dark:text-slate-200 font-medium pl-2">
                              {para.split('\n').map((item, k) => (
                                <li key={k}>{item.replace(/^[-*]\s+/, '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={j} className="text-xs sm:text-sm leading-relaxed font-medium">{para}</p>;
                      })}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 text-xs italic">
                  Este tema no incluye manual de lectura o bloques de código estáticos.
                </div>
              )}
            </article>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t-2 border-slate-950 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border-2 border-slate-950 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase hover:bg-slate-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Cerrar Vista Previa
          </button>

          <Button
            onClick={() => onLaunchFullPlayer(lesson.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider"
          >
            <span>Abrir en Reproductor de Alumnos Completo</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
