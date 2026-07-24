import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useCourseManagement } from '../hooks/useCourseManagement';
import { CourseTable } from '../components/course-management/CourseTable';
import { CourseFormModal } from '../components/course-management/CourseFormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ArrowLeft, Search, Plus, CheckCircle } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';

export const CourseManagementPage: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const {
    courses,
    categories,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    totalCourses,
    showFormModal,
    setShowFormModal,
    isEditing,
    formCategory,
    setFormCategory,
    formTitle,
    formDescription,
    setFormDescription,
    formPrice,
    setFormPrice,
    formSlug,
    setFormSlug,
    formIsActive,
    setFormIsActive,
    setFormCoverImage,
    formLoading,
    formError,
    successMessage,
    isAdmin,
    loadCourses,
    handleOpenCreate,
    handleOpenEdit,
    handleTitleChange,
    handleSubmit,
    handleDelete,
  } = useCourseManagement();

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Panel de Control</span>
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Gestión de Cursos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Administra el catálogo completo de cursos y rutas formativas.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 self-start sm:self-auto">
          <Plus className="h-5 w-5" />
          Crear Nuevo Curso
        </Button>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-450 mb-6">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-455" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden">
        {/* Search bar */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título de curso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white pl-10 pr-4 py-2 text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <CourseTable
              courses={courses}
              isAdmin={isAdmin}
              onEdit={handleOpenEdit}
              onDelete={(id) => {
                setDeleteTargetId(id);
                setConfirmOpen(true);
              }}
            />
            <Pagination
              count={totalCourses}
              currentPage={page}
              pageSize={10}
              onPageChange={(newPage) => {
                setPage(newPage);
                loadCourses(newPage);
              }}
            />
          </div>
        )}
      </div>

      {/* Form Modal */}
      <CourseFormModal
        isOpen={showFormModal}
        isEditing={isEditing}
        categories={categories}
        category={formCategory}
        title={formTitle}
        description={formDescription}
        price={formPrice}
        slug={formSlug}
        isActive={formIsActive}
        loading={formLoading}
        error={formError}
        onCategoryChange={setFormCategory}
        onTitleChange={handleTitleChange}
        onDescriptionChange={setFormDescription}
        onPriceChange={setFormPrice}
        onSlugChange={setFormSlug}
        onIsActiveChange={setFormIsActive}
        onCoverImageChange={setFormCoverImage}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="¿Eliminar Curso?"
        message="¿Estás seguro de que deseas eliminar este curso de forma permanente? Esta acción borrará todas sus lecciones y módulos."
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDanger
        onConfirm={() => {
          if (deleteTargetId !== null) {
            handleDelete(deleteTargetId);
          }
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Layout>
  );
};
