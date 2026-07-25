import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
import { getModulesUseCase } from '@infrastructure/factories/ModuleFactory';
import { getLessonsUseCase } from '@infrastructure/factories/LessonFactory';
import {
  getLessonProgressUseCase,
  markLessonAsCompletedUseCase,
} from '@infrastructure/factories/LessonProgressFactory';
import { Course } from '@domain/entities/Course';
import { Lesson } from '@domain/entities/Lesson';
import { GraduationCap, ArrowLeft, CheckCircle, ChevronRight, Play, BookOpen, CheckSquare } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';
import { getEmbedVideoUrl } from '../utils/sanitize-url';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const LessonPlayerPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isAdminOrProfessor = user?.role === 'admin' || user?.role === 'professor';
  const backTarget = isAdminOrProfessor ? `/admin/courses/${courseId}/lessons` : '/dashboard';

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Record<number, boolean>>({});

  const idCourse = Number(courseId);
  const idLesson = Number(lessonId);

  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoading(true);
      try {
        const courseData = await getCourseByIdUseCase.execute(idCourse);

        // Enrich modules with lessons
        try {
          const modulesData = await getModulesUseCase.execute(idCourse);
          if (modulesData && modulesData.length > 0) {
            const modulesWithLessons = await Promise.all(
              modulesData.map(async (mod) => {
                try {
                  const modLessons = await getLessonsUseCase.execute(mod.id);
                  modLessons.sort((a, b) => a.order - b.order);
                  return {
                    ...mod,
                    lessons: modLessons || [],
                  };
                } catch {
                  return {
                    ...mod,
                    lessons: mod.lessons || [],
                  };
                }
              })
            );
            courseData.modules = modulesWithLessons;
          }
        } catch (modErr) {
          console.warn('Could not fetch modules/lessons in player', modErr);
        }

        setCourse(courseData);

        // Find active lesson or default to first lesson
        let foundLesson: Lesson | null = null;
        courseData.modules?.forEach((mod) => {
          mod.lessons?.forEach((les) => {
            if (les.id === idLesson) {
              foundLesson = les;
            }
          });
        });

        if (!foundLesson && courseData.modules?.[0]?.lessons?.[0]) {
          foundLesson = courseData.modules[0].lessons[0];
        }
        setCurrentLesson(foundLesson);

        // Load lesson progress for the student
        const completedMap: Record<number, boolean> = {};
        try {
          const progressList = await getLessonProgressUseCase.execute(idCourse);
          if (Array.isArray(progressList)) {
            progressList.forEach((prog: any) => {
              if (prog.is_completed) {
                completedMap[prog.lesson] = true;
              }
            });
          }
        } catch {
          // ignore API error
        }

        // Merge local storage cached completed lessons for current user
        try {
          const userKey = user?.username?.toLowerCase() || String(user?.id);
          const cachedCompleted = JSON.parse(
            localStorage.getItem(`oncourses_completed_lessons_${userKey}_${idCourse}`) || '{}'
          );
          Object.keys(cachedCompleted).forEach((lesId) => {
            if (cachedCompleted[Number(lesId)]) {
              completedMap[Number(lesId)] = true;
            }
          });
        } catch {
          // ignore cache error
        }

        setCompletedLessons(completedMap);
      } catch (err) {
        console.error('Failed to load course detail or progress', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
  }, [idCourse, idLesson, user]);

  const handleMarkAsCompleted = async () => {
    if (!currentLesson) return;
    setIsCompleting(true);
    try {
      try {
        await markLessonAsCompletedUseCase.execute(currentLesson.id);
      } catch (apiErr) {
        console.warn('API mark as completed error, updating local cache', apiErr);
      }

      // Update local state
      const updatedCompletedMap = { ...completedLessons, [currentLesson.id]: true };
      setCompletedLessons(updatedCompletedMap);

      // Calculate total course progress percentage
      const allLessons: Lesson[] = [];
      course?.modules?.forEach((m) => {
        if (m.lessons) {
          allLessons.push(...m.lessons);
        }
      });

      const totalLessonsCount = allLessons.length;
      const completedCount = Object.keys(updatedCompletedMap).filter((k) => updatedCompletedMap[Number(k)]).length;
      const calculatedProgress = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 100;

      // Save updated progress locally for instant dashboard reactivity
      try {
        const userKey = user?.username?.toLowerCase() || String(user?.id);
        
        // 1. Save completed lessons map
        localStorage.setItem(
          `oncourses_completed_lessons_${userKey}_${idCourse}`,
          JSON.stringify(updatedCompletedMap)
        );

        // 2. Update user enrollment list in cache
        const storedCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
        const userEnrollments = storedCache[userKey] || [];
        
        const existingEnr = userEnrollments.find(
          (e: any) => Number(e.course) === Number(idCourse) || Number(e.course_data?.id) === Number(idCourse)
        );

        if (existingEnr) {
          existingEnr.total_progress = String(calculatedProgress);
        } else {
          userEnrollments.push({
            id: Date.now(),
            student: user?.id,
            course: idCourse,
            course_title: course?.title,
            enrolled_at: new Date().toISOString(),
            total_progress: String(calculatedProgress),
            course_data: course,
          });
        }

        storedCache[userKey] = userEnrollments;
        localStorage.setItem('oncourses_user_enrollments', JSON.stringify(storedCache));
      } catch (saveErr) {
        console.warn('Could not save progress cache', saveErr);
      }

      // Find next lesson to auto-navigate
      let nextLesson: Lesson | null = null;
      let foundCurrent = false;

      if (course?.modules) {
        for (const mod of course.modules) {
          if (mod.lessons) {
            for (const les of mod.lessons) {
              if (foundCurrent) {
                nextLesson = les;
                break;
              }
              if (les.id === currentLesson.id) {
                foundCurrent = true;
              }
            }
          }
          if (nextLesson) break;
        }
      }

      if (nextLesson) {
        navigate(`/learn/${idCourse}/lesson/${nextLesson.id}`);
      } else {
        alert('🎉 ¡Has completado todas las lecciones de este curso! ¡Felicidades!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message || 'Error al guardar el progreso');
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;

  if (!course || !currentLesson) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="text-center max-w-sm">
          <GraduationCap className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Lección no encontrada</h2>
          <p className="text-slate-500 mt-2">La lección seleccionada no existe o no tienes acceso.</p>
          <Link to="/dashboard" className="inline-block mt-6">
            <Button>Volver a mis cursos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCurrentCompleted = !!completedLessons[currentLesson.id];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-100">
      {/* Sidebar: Navigation List */}
      <aside className="w-80 border-r border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Link
            to={backTarget}
            className="p-2 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-400 hover:text-slate-950 transition-all cursor-pointer shrink-0"
            title={isAdminOrProfessor ? 'Volver a Gestión del Temario' : 'Volver a Mi Panel'}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-500 line-clamp-1">
              {course.title}
            </h4>
            <span className="text-xs text-slate-400">Progreso del Tutorial</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.modules?.map((mod, index) => (
            <div key={mod.id} className="space-y-1.5">
              <h5 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider px-2">
                Sección {index + 1}: {mod.title}
              </h5>
              <div className="space-y-1">
                {mod.lessons?.map((les) => {
                  const isLesActive = les.id === currentLesson.id;
                  const isLesCompleted = !!completedLessons[les.id];

                  return (
                    <button
                      key={les.id}
                      onClick={() => navigate(`/learn/${idCourse}/lesson/${les.id}`)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium cursor-pointer ${
                        isLesActive
                          ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-650 dark:text-brand-400 font-semibold border border-brand-500/25'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-655 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                            isLesCompleted ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                        <span className="truncate">{les.title}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 opacity-50 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar inside player */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-500" />
            <span className="text-sm font-semibold text-slate-500">Tutorial Actual:</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{currentLesson.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to={backTarget}>
              <Button size="sm" variant="secondary">Cerrar Reproductor</Button>
            </Link>
          </div>
        </header>

        {/* Lesson Contents */}
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-8 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 flex justify-between items-center">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {currentLesson.title}
                </h1>
                <p className="text-xs text-slate-400">
                  Completa las lecturas y guías de este tema para poder continuar.
                </p>
              </div>

              {isCurrentCompleted && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-500/20 rounded-xl text-xs font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completado</span>
                </div>
              )}
            </div>

            {/* Embedded Video Player */}
            {(() => {
              const { isDirectVideo, embedUrl } = getEmbedVideoUrl(currentLesson.video_url);
              return (
                <div className="mb-8 overflow-hidden border-2 border-slate-950 bg-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b-2 border-slate-950 text-xs font-mono font-bold text-brand-400">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 fill-current text-brand-400" />
                      <span>CLASE EN VIDEO · ONCOURSES PLAYER</span>
                    </div>
                    <span className="text-[10px] text-slate-400">HD 1080p</span>
                  </div>
                  <div className="relative aspect-video bg-black">
                    {isDirectVideo ? (
                      <video
                        src={embedUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={embedUrl}
                        title={currentLesson.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              );
            })()}
            {/* Practical instructions / theoretical text */}
            <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              {currentLesson.content_text ? (
                <MarkdownRenderer content={currentLesson.content_text} />
              ) : (
                <div className="p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                  Este tema no incluye material de lectura estático. Por favor consulta las referencias externas.
                </div>
              )}
            </article>

            {/* Complete Section CTA */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-slate-400 max-w-sm text-center sm:text-left">
                * Al hacer clic en completar se guardará tu registro de avance en la base de datos de Django.
              </div>

              <Button
                onClick={handleMarkAsCompleted}
                isLoading={isCompleting}
                disabled={isCurrentCompleted}
                className={`w-full sm:w-auto flex items-center gap-2 px-6 ${
                  isCurrentCompleted ? 'from-emerald-600 to-emerald-600 shadow-emerald-500/10' : ''
                }`}
              >
                <CheckSquare className="h-5 w-5" />
                {isCurrentCompleted ? 'Tema Completado' : 'Marcar como Completado'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
