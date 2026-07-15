import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
import { AxiosModuleRepository } from '@infrastructure/adapters/AxiosModuleRepository';
import { AxiosLessonRepository } from '@infrastructure/adapters/AxiosLessonRepository';
import { Course } from '@domain/entities/Course';
import { Module } from '@domain/entities/Module';
import { Lesson } from '@domain/entities/Lesson';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, Pencil, Trash2, Plus, CheckCircle, ShieldAlert, FileText } from 'lucide-react';
import { Loader } from '../components/Loader';

const moduleRepository = new AxiosModuleRepository();
const lessonRepository = new AxiosLessonRepository();

export const LessonManagementPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuthStore();
  const idCourse = Number(courseId);

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number | ''>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals/Forms State
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

  // Lesson Form Fields
  const [formLessonTitle, setFormLessonTitle] = useState('');
  const [formLessonContent, setFormLessonContent] = useState('');
  const [formLessonVideoUrl, setFormLessonVideoUrl] = useState('');
  const [formLessonOrder, setFormLessonOrder] = useState('0');
  const [formLessonModule, setFormLessonModule] = useState<number | ''>('');

  // Module creation sub-form (in-page)
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleOrder, setModuleOrder] = useState('0');

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const loadCourseDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const courseData = await getCourseByIdUseCase.execute(idCourse);
      setCourse(courseData);

      const modulesData = await moduleRepository.getModules(idCourse);
      setModules(modulesData);

      // Fetch all lessons for these modules
      const allLessons: Lesson[] = [];
      for (const mod of modulesData) {
        const moduleLessons = await lessonRepository.getLessons(mod.id);
        allLessons.push(...moduleLessons);
      }
      // Sort lessons by order
      allLessons.sort((a, b) => a.order - b.order);
      setLessons(allLessons);

      if (modulesData.length > 0 && selectedModuleId === '') {
        setSelectedModuleId(modulesData[0].id);
      }
    } catch (err) {
      console.error('Failed to load course details', err);
    } finally {
      setIsLoading(false);
    }
  }, [idCourse, selectedModuleId]);

  useEffect(() => {
    loadCourseDetails();
  }, [idCourse, loadCourseDetails]);

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    setFormLoading(true);
    try {
      await moduleRepository.createModule({
        course: idCourse,
        title: moduleTitle,
        order: Number(moduleOrder),
      });
      setModuleTitle('');
      setModuleOrder('0');
      setShowModuleForm(false);
      setSuccessMessage('Módulo creado correctamente');
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al crear el módulo');
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenCreateLesson = () => {
    setIsEditingLesson(false);
    setEditingLessonId(null);
    setFormLessonTitle('');
    setFormLessonContent('');
    setFormLessonVideoUrl('');
    setFormLessonOrder('0');
    setFormLessonModule(selectedModuleId || '');
    setFormError(null);
    setShowLessonModal(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setIsEditingLesson(true);
    setEditingLessonId(lesson.id);
    setFormLessonTitle(lesson.title);
    setFormLessonContent(lesson.content_text || '');
    setFormLessonVideoUrl(lesson.video_url || '');
    setFormLessonOrder(String(lesson.order));
    setFormLessonModule(lesson.module);
    setFormError(null);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formLessonTitle.trim() || !formLessonModule) {
      setFormError('Por favor completa todos los campos obligatorios (*)');
      return;
    }

    setFormLoading(true);
    const data = {
      title: formLessonTitle,
      content_text: formLessonContent,
      video_url: formLessonVideoUrl || undefined,
      order: Number(formLessonOrder),
      module: Number(formLessonModule),
    };

    try {
      if (isEditingLesson && editingLessonId !== null) {
        await lessonRepository.updateLesson(editingLessonId, data);
        setSuccessMessage('Lección actualizada correctamente');
      } else {
        await lessonRepository.createLesson(data);
        setSuccessMessage('Lección creada correctamente');
      }
      setShowLessonModal(false);
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar la lección');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!isAdmin) {
      alert('Solo los administradores tienen permisos para eliminar lecciones.');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas eliminar este tema?')) {
      return;
    }

    try {
      await lessonRepository.deleteLesson(lessonId);
      setSuccessMessage('Lección eliminada correctamente');
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la lección');
    }
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-8">
        <Link to="/admin/courses" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand-500 mb-2">
          <ArrowLeft className="h-3 w-3" />
          Volver a Gestión de Cursos
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 block">
              Temario de Curso:
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {course?.title}
            </h1>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={() => setShowModuleForm(!showModuleForm)}>
              Gestionar Secciones/Módulos
            </Button>
            <Button onClick={handleOpenCreateLesson} disabled={modules.length === 0} className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Crear Nuevo Tema
            </Button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-450 mb-6">
          <CheckCircle className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Module Addition Sub-Form */}
      {showModuleForm && (
        <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-8">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Nueva Sección (Módulo)</h3>
          <form onSubmit={handleCreateModule} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Input
              label="Título del Módulo *"
              type="text"
              placeholder="Bases y Conceptos Clave"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              required
            />
            <Input
              label="Orden *"
              type="number"
              placeholder="0"
              value={moduleOrder}
              onChange={(e) => setModuleOrder(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" isLoading={formLoading} className="flex-1">
                Guardar Sección
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowModuleForm(false)} className="px-4">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modules Selector & Content list */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modules list */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 px-2">Secciones</h3>
            {modules.length > 0 ? (
              modules.map((mod, i) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                    selectedModuleId === mod.id
                      ? 'bg-brand-50 border-brand-500/20 text-brand-650 dark:bg-brand-950/20 dark:text-brand-400'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-655 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-850'
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

          {/* Lessons list details */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">
                Temas del Módulo Seleccionado
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {lessons.filter((les) => les.module === selectedModuleId).length > 0 ? (
                  lessons
                    .filter((les) => les.module === selectedModuleId)
                    .map((les) => (
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
                            onClick={() => handleOpenEditLesson(les)}
                            className="p-2.5"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLesson(les.id)}
                            disabled={!isAdmin}
                            className={`p-2.5 ${
                              isAdmin ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="py-12 text-center text-slate-400 text-sm italic">
                    No hay lecciones agregadas a esta sección. Haz clic en "Crear Nuevo Tema" arriba para empezar.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson creation/edit modal */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative my-8">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
              {isEditingLesson ? 'Editar Tema' : 'Crear Nuevo Tema'}
            </h3>

            {formError && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-455 mb-6">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <div className="text-xs leading-relaxed">{formError}</div>
              </div>
            )}

            <form onSubmit={handleSaveLesson} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Sección / Módulo *
                </label>
                <select
                  value={formLessonModule}
                  onChange={(e) => setFormLessonModule(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm"
                  required
                >
                  <option value="">Selecciona la sección</option>
                  {modules.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.title}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Título del Tema *"
                type="text"
                placeholder="Componentes Funcionales vs Componentes de Clase"
                value={formLessonTitle}
                onChange={(e) => setFormLessonTitle(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contenido Teórico / Instrucciones *
                </label>
                <textarea
                  placeholder="Escribe la explicación teórica, guías o código de ejemplo..."
                  value={formLessonContent}
                  onChange={(e) => setFormLessonContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm min-h-[140px]"
                  required
                />
              </div>

              <Input
                label="Enlace de apoyo / Referencia (Vimeo, YouTube, GitHub)"
                type="text"
                placeholder="https://github.com/ejemplo/repo"
                value={formLessonVideoUrl}
                onChange={(e) => setFormLessonVideoUrl(e.target.value)}
              />

              <Input
                label="Orden *"
                type="number"
                placeholder="0"
                value={formLessonOrder}
                onChange={(e) => setFormLessonOrder(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLessonModal(false)}
                  disabled={formLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={formLoading}>
                  Guardar Tema
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};
