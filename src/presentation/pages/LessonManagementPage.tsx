import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useLessonManagement } from '../hooks/useLessonManagement';
import { ModuleSidebar } from '../components/lesson-management/ModuleSidebar';
import { LessonsList } from '../components/lesson-management/LessonsList';
import { LessonModal } from '../components/lesson-management/LessonModal';
import { SingleLessonPreviewModal } from '../components/lesson-management/SingleLessonPreviewModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ArrowLeft, Plus, CheckCircle, Eye, Zap } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Lesson } from '@domain/entities/Lesson';

export const LessonManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Single Lesson Preview Modal State
  const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<Lesson | null>(null);
  const [showSinglePreviewModal, setShowSinglePreviewModal] = useState(false);

  const { courseId } = useParams<{ courseId: string }>();
  const {
    course,
    modules,
    selectedModuleId,
    setSelectedModuleId,
    lessons,
    isLoading,
    showLessonModal,
    setShowLessonModal,
    isEditingLesson,
    formLessonTitle,
    setFormLessonTitle,
    formLessonContent,
    setFormLessonContent,
    formLessonVideoUrl,
    setFormLessonVideoUrl,
    formLessonOrder,
    setFormLessonOrder,
    formLessonModule,
    setFormLessonModule,
    showModuleForm,
    setShowModuleForm,
    isEditingModule,
    moduleTitle,
    setModuleTitle,
    moduleOrder,
    setModuleOrder,
    formLoading,
    formError,
    successMessage,
    isAdmin,
    handleOpenCreateModule,
    handleOpenEditModule,
    handleSaveModule,
    handleDeleteModule,
    handleOpenCreateLesson,
    handleOpenEditLesson,
    handleSaveLesson,
    handleDeleteLesson,
    handleSeedSQLCourseStructure,
  } = useLessonManagement(courseId);

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-8">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Gestión de Cursos</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00cc33] block">
              Temario de Curso:
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {course?.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Template Generator Action */}
            <button
              type="button"
              onClick={handleSeedSQLCourseStructure}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1.5"
              title="Generar automáticamente los 6 Módulos y 42 Temas Teóricos de SQL"
            >
              <Zap className="h-4 w-4 text-slate-950 fill-slate-950" />
              <span>Cargar Temario SQL (42 Temas)</span>
            </button>

            {/* Student View Action */}
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}`)}
              className="px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-950 dark:text-white font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4 text-emerald-500" />
              <span>Vista Previa Estudiante</span>
            </button>

            {/* Module Addition Action */}
            <button
              type="button"
              onClick={() => {
                if (showModuleForm) {
                  setShowModuleForm(false);
                } else {
                  handleOpenCreateModule();
                }
              }}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-950 dark:text-white font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Sección (Módulo)</span>
            </button>

            {/* Primary Lesson Creation Action */}
            <button
              type="button"
              onClick={handleOpenCreateLesson}
              disabled={modules.length === 0}
              className={`px-4 py-2 font-sans font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] transition-all inline-flex items-center gap-2 ${
                modules.length === 0
                  ? 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer'
              }`}
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Crear Nuevo Tema</span>
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-slate-950 p-4 text-xs font-black text-emerald-900 dark:text-emerald-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] mb-6">
          <CheckCircle className="h-5 w-5 text-[#00cc33] shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Module Addition / Editing Sub-Form */}
      {showModuleForm && (
        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-950 p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-950 dark:text-white mb-4">
            {isEditingModule ? '✏️ Editar Sección (Módulo)' : '➕ Nueva Sección (Módulo)'}
          </h3>
          <form onSubmit={handleSaveModule} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Input
              label="Título del Módulo *"
              type="text"
              placeholder="Ej: Módulo 1: Setup e Instalación de Entorno"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              required
            />
            <Input
              label="Orden *"
              type="number"
              placeholder="1"
              value={moduleOrder}
              onChange={(e) => setModuleOrder(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" isLoading={formLoading} className="flex-1">
                {isEditingModule ? 'Actualizar Sección' : 'Guardar Sección'}
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
          <ModuleSidebar
            modules={modules}
            selectedModuleId={selectedModuleId}
            onSelect={setSelectedModuleId}
            onEditModule={handleOpenEditModule}
            onDeleteModule={handleDeleteModule}
          />
          <LessonsList
            lessons={lessons}
            selectedModuleId={selectedModuleId}
            isAdmin={isAdmin}
            onEdit={handleOpenEditLesson}
            onPreview={(lesId) => {
              const target = lessons.find((l) => l.id === lesId) || null;
              setSelectedLessonForPreview(target);
              setShowSinglePreviewModal(true);
            }}
            onDelete={(id) => {
              setDeleteTargetId(id);
              setConfirmOpen(true);
            }}
          />
        </div>
      )}

      {/* Single Lesson Dedicated Preview Modal */}
      <SingleLessonPreviewModal
        isOpen={showSinglePreviewModal}
        onClose={() => setShowSinglePreviewModal(false)}
        lesson={selectedLessonForPreview}
        moduleTitle={modules.find((m) => m.id === selectedLessonForPreview?.module)?.title}
        courseId={Number(courseId)}
        onLaunchFullPlayer={(lesId) => {
          setShowSinglePreviewModal(false);
          navigate(`/learn/${courseId}/lesson/${lesId}`);
        }}
      />

      {/* Lesson Modal */}
      <LessonModal
        isOpen={showLessonModal}
        isEditing={isEditingLesson}
        modules={modules}
        title={formLessonTitle}
        content={formLessonContent}
        videoUrl={formLessonVideoUrl}
        order={formLessonOrder}
        moduleId={formLessonModule}
        loading={formLoading}
        error={formError}
        onTitleChange={setFormLessonTitle}
        onContentChange={setFormLessonContent}
        onVideoUrlChange={setFormLessonVideoUrl}
        onOrderChange={setFormLessonOrder}
        onModuleChange={setFormLessonModule}
        onClose={() => setShowLessonModal(false)}
        onSubmit={handleSaveLesson}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="¿Eliminar Tema?"
        message="¿Estás seguro de que deseas eliminar este tema? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDanger
        onConfirm={() => {
          if (deleteTargetId !== null) {
            handleDeleteLesson(deleteTargetId);
          }
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Layout>
  );
};
