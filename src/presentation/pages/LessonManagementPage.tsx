import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useLessonManagement } from '../hooks/useLessonManagement';
import { ModuleSidebar } from '../components/lesson-management/ModuleSidebar';
import { LessonsList } from '../components/lesson-management/LessonsList';
import { LessonModal } from '../components/lesson-management/LessonModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ArrowLeft, Plus, CheckCircle } from 'lucide-react';
import { Loader } from '../components/Loader';

export const LessonManagementPage: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const {courseId} = useParams<{ courseId: string }>();
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
    moduleTitle,
    setModuleTitle,
    moduleOrder,
    setModuleOrder,
    formLoading,
    formError,
    successMessage,
    isAdmin,
    handleCreateModule,
    handleOpenCreateLesson,
    handleOpenEditLesson,
    handleSaveLesson,
    handleDeleteLesson,
  } = useLessonManagement(courseId);

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
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-455" />
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
          <ModuleSidebar
            modules={modules}
            selectedModuleId={selectedModuleId}
            onSelect={setSelectedModuleId}
          />
          <LessonsList
            lessons={lessons}
            selectedModuleId={selectedModuleId}
            isAdmin={isAdmin}
            onEdit={handleOpenEditLesson}
            onDelete={(id) => {
              setDeleteTargetId(id);
              setConfirmOpen(true);
            }}
          />
        </div>
      )}

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
