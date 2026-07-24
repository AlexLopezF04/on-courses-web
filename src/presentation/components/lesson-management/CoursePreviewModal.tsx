import React, { useState } from 'react';
import { Course } from '@domain/entities/Course';
import { Module } from '@domain/entities/Module';
import { Lesson } from '@domain/entities/Lesson';
import { X, Play, BookOpen, Clock, Award } from 'lucide-react';
import { Button } from '../Button';

interface CoursePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  modules: Module[];
  lessons: Lesson[];
  initialLessonId?: number | null;
}

export const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({
  isOpen,
  onClose,
  course,
  modules,
  lessons,
  initialLessonId,
}) => {
  const [activeTab, setActiveTab] = useState<'course' | 'player'>('player');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(
    initialLessonId || (lessons[0]?.id ?? null)
  );

  if (!isOpen || !course) return null;

  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  const sanitizeUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-6xl h-[90vh] border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Retro OS Chrome Top Bar Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
              👁️ MODO VISTA PREVIA DE ESTUDIANTE · {course.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Selector Tabs */}
            <div className="flex border border-slate-700 bg-slate-900 p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('player')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'player'
                    ? 'bg-[#00cc33] text-slate-950 font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Reproductor de Lecciones
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('course')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'course'
                    ? 'bg-[#00cc33] text-slate-950 font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Ficha del Curso
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 border border-slate-700 bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        {activeTab === 'course' ? (
          /* Public Course Landing Page Preview */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <span className="inline-block px-3 py-1 border-2 border-slate-950 bg-[#00cc33] text-slate-950 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {course.category_name || 'Desarrollo'}
                </span>
                <h1 className="font-display text-3xl font-black text-slate-950 dark:text-white">
                  {course.title}
                </h1>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  {course.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 border-y-2 border-slate-950 py-4">
                  <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
                    <Clock className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
                    <span className="text-[10px] uppercase font-bold block text-slate-500">Lecciones</span>
                    <span className="text-xs font-black">{lessons.length} temas</span>
                  </div>
                  <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
                    <BookOpen className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
                    <span className="text-[10px] uppercase font-bold block text-slate-500">Módulos</span>
                    <span className="text-xs font-black">{modules.length} secciones</span>
                  </div>
                  <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
                    <Award className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
                    <span className="text-[10px] uppercase font-bold block text-slate-500">Certificado</span>
                    <span className="text-xs font-black">Al concluir</span>
                  </div>
                </div>

                {/* Modules list preview */}
                <div className="space-y-3">
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">Plan de Estudios ({modules.length} Módulos)</h3>
                  {modules.map((mod, i) => (
                    <div key={mod.id} className="border-2 border-slate-950 bg-white dark:bg-slate-950 overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b-2 border-slate-950 flex justify-between items-center">
                        <span className="text-xs font-black text-slate-950 dark:text-white">Sección {i + 1}: {mod.title}</span>
                        <span className="text-[10px] font-mono font-bold bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950">
                          {lessons.filter(l => l.module === mod.id).length} lecciones
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Purchase Card Preview */}
              <div className="lg:col-span-1">
                <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-4">
                  <div className="aspect-video w-full border-2 border-slate-950 overflow-hidden bg-slate-900">
                    {course.cover_image ? (
                      <img src={course.cover_image} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#00cc33] text-slate-950">
                        <BookOpen className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase">Precio del Curso</span>
                    <div className="text-2xl font-black">${course.price} USD</div>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('player')}>
                    Ver reproductor de clases &rarr;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Student Player Preview */
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-72 border-r-2 border-slate-950 bg-slate-100 dark:bg-slate-900 flex flex-col h-full shrink-0">
              <div className="p-3 border-b-2 border-slate-950 bg-slate-200 dark:bg-slate-950">
                <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block">TEMARIO INTERACTIVO</span>
                <span className="text-xs font-black line-clamp-1">{course.title}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {modules.map((mod, i) => {
                  const modLessons = lessons.filter((l) => l.module === mod.id);
                  return (
                    <div key={mod.id} className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                        Sección {i + 1}: {mod.title}
                      </span>
                      <div className="space-y-1">
                        {modLessons.map((les) => {
                          const isSelected = les.id === currentLesson?.id;
                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => setSelectedLessonId(les.id)}
                              className={`w-full text-left flex items-center justify-between px-2.5 py-2 border border-slate-950 text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#00cc33] text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                  : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <Play className="h-3 w-3 shrink-0" />
                                <span className="truncate">{les.title}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Main Player Display Area */}
            <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-950">
              {currentLesson ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex justify-between items-center border-b-2 border-slate-950 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#00cc33] uppercase">LECCIÓN SELECCIONADA</span>
                      <h2 className="text-xl font-black text-slate-950 dark:text-white">{currentLesson.title}</h2>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 border border-slate-950 bg-amber-400 text-slate-950">
                      Orden: {currentLesson.order}
                    </span>
                  </div>

                  {/* Video Player Preview if present */}
                  {currentLesson.video_url && (
                    <div className="border-2 border-slate-950 bg-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
                      <div className="bg-slate-900 px-3 py-1 text-[10px] font-mono text-emerald-400 border-b border-slate-800">
                        ▶ VIDEO DE LA CLASE
                      </div>
                      <div className="aspect-video">
                        <iframe
                          src={sanitizeUrl(currentLesson.video_url)}
                          title={currentLesson.title}
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Manual & Code Block Render */}
                  <article className="prose dark:prose-invert max-w-none space-y-4 text-xs sm:text-sm">
                    {currentLesson.content_text ? (
                      currentLesson.content_text.split('```').map((block, i) => {
                        if (i % 2 === 1) {
                          const lines = block.trim().split('\n');
                          const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : 'code';
                          const codeContent = lines[0].match(/^[a-z]+/i) ? lines.slice(1).join('\n') : block;

                          return (
                            <div key={i} className="my-4 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] overflow-x-auto">
                              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold">
                                <span>{lang}</span>
                                <span>Console Output</span>
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
                                  <div key={j} className="my-2 p-2 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200">
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
                      <div className="p-6 border border-dashed border-slate-400 text-center text-slate-400 text-xs italic">
                        Esta lección no incluye manual escrito.
                      </div>
                    )}
                  </article>
                </div>
              ) : (
                <div className="text-center py-20 text-slate-400 text-sm">
                  Selecciona una lección del temario para ver su previsualización.
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
