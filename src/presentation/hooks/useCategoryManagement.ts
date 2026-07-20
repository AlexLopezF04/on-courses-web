import React, { useState, useEffect, useCallback } from 'react';
import { Category } from '@domain/entities/Category';
import { useAuthStore } from '../store/useAuthStore';
import {
  getCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
} from '@infrastructure/factories/CategoryFactory';

export const useCategoryManagement = () => {
  const { user } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  // Form Modal State
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSlug, setFormSlug] = useState('');

  // Status indicators
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const loadCategories = useCallback((currentPage: number = page, searchQuery: string = search) => {
    setIsLoading(true);
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    params.page = currentPage;

    getCategoriesUseCase
      .execute(params)
      .then((data) => {
        setCategories(data.results);
        setTotalCategories(data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load categories', err);
        setIsLoading(false);
      });
  }, [page, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      loadCategories(1, search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, loadCategories]);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingCategoryId(null);
    setFormName('');
    setFormDescription('');
    setFormSlug('');
    setFormError(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (category: Category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setFormName(category.name);
    setFormDescription(category.description || '');
    setFormSlug(category.slug);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleNameChange = (val: string) => {
    setFormName(val);
    const generatedSlug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('El nombre de la categoría es obligatorio.');
      return;
    }

    if (!formSlug.trim()) {
      setFormError('El slug de la categoría es obligatorio.');
      return;
    }

    setFormLoading(true);

    const payload = {
      name: formName.trim(),
      description: formDescription.trim() || undefined,
      slug: formSlug.trim(),
    };

    try {
      if (isEditing && editingCategoryId !== null) {
        await updateCategoryUseCase.execute(editingCategoryId, payload);
        setSuccessMessage('Categoría actualizada con éxito');
      } else {
        await createCategoryUseCase.execute(payload);
        setSuccessMessage('Categoría creada con éxito');
      }

      setShowFormModal(false);
      loadCategories();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar la categoría');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (categoryId: number) => {
    if (!isAdmin) {
      alert('Solo los administradores tienen permisos para eliminar recursos.');
      return;
    }

    try {
      await deleteCategoryUseCase.execute(categoryId);
      setSuccessMessage('Categoría eliminada con éxito');
      loadCategories();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la categoría');
    }
  };

  return {
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
    setFormName,
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
  };
};
