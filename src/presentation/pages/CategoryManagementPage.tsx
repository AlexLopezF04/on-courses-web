import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import { CategoryTable } from '../components/category-management/CategoryTable';
import { CategoryFormModal } from '../components/category-management/CategoryFormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ArrowLeft, Search, Plus, CheckCircle } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';

export const CategoryManagementPage: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const {
    categories,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    totalCategories,
    showFormModal,
    setShowFormModal,
    isEditing,
    formName,
    formDescription,
    setFormDescription,
    formSlug,
    setFormSlug,
    formLoading,
    formError,
    successMessage,
    isAdmin,
    loadCategories,
    handleOpenCreate,
    handleOpenEdit,
    handleNameChange,
    handleSubmit,
    handleDelete,
  } = useCategoryManagement();

  return (
    <Layout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand-500 mb-2"
          >
            <ArrowLeft className="h-3 w-3" />
            Volver al Panel de Control
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Gestión de Categorías
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Crea, edita y organiza las áreas temáticas del catálogo.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      {successMessage && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/35 dark:border-emerald-900/50 p-4 text-sm text-emerald-800 dark:text-emerald-450">
          <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-455" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-455" />
        <input
          type="text"
          placeholder="Buscar categorías por nombre o descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500"
        />
      </div>

      {/* Main categories table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <CategoryTable
              categories={categories}
              isAdmin={isAdmin}
              onEdit={handleOpenEdit}
              onDelete={(id) => {
                setDeleteTargetId(id);
                setConfirmOpen(true);
              }}
            />
            <Pagination
              count={totalCategories}
              currentPage={page}
              pageSize={10}
              onPageChange={(newPage) => {
                setPage(newPage);
                loadCategories(newPage);
              }}
            />
          </div>
        )}
      </div>

      {/* Form Modal */}
      <CategoryFormModal
        isOpen={showFormModal}
        isEditing={isEditing}
        name={formName}
        description={formDescription}
        slug={formSlug}
        loading={formLoading}
        error={formError}
        onNameChange={handleNameChange}
        onDescriptionChange={setFormDescription}
        onSlugChange={setFormSlug}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="¿Eliminar Categoría?"
        message="¿Estás seguro de que deseas eliminar esta categoría? Esto podría afectar a los cursos relacionados."
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
