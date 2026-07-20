import React, { useState, useEffect, useCallback } from 'react';
import { Course } from '@domain/entities/Course';
import { Category } from '@domain/entities/Category';
import { useAuthStore } from '../store/useAuthStore';
import {
  getCoursesUseCase,
  createCourseUseCase,
  updateCourseUseCase,
  deleteCourseUseCase,
} from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';

export const useCourseManagement = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  // Form State
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  const [formCategory, setFormCategory] = useState<number | ''>('');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formCoverImage, setFormCoverImage] = useState<File | null>(null);

  // Status indicators
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const loadCourses = useCallback((currentPage: number = page, searchQuery: string = search) => {
    setIsLoading(true);
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    params.page = currentPage;

    getCoursesUseCase
      .execute(params)
      .then((data) => {
        setCourses(data.results);
        setTotalCourses(data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses', err);
        setIsLoading(false);
      });
  }, [page, search]);

  useEffect(() => {
    // Load categories
    getCategoriesUseCase
      .execute({ page_size: 100 })
      .then((data) => setCategories(data.results))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      loadCourses(1, search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, loadCourses]);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingCourseId(null);
    setFormCategory('');
    setFormTitle('');
    setFormDescription('');
    setFormPrice('0.00');
    setFormSlug('');
    setFormIsActive(true);
    setFormCoverImage(null);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (course: Course) => {
    setIsEditing(true);
    setEditingCourseId(course.id);
    const catVal = typeof course.category === 'object' && course.category !== null
      ? course.category.id
      : course.category;
    setFormCategory(catVal || '');
    setFormTitle(course.title);
    setFormDescription(course.description || '');
    setFormPrice(course.price);
    setFormSlug(course.slug);
    setFormIsActive(course.is_active);
    setFormCoverImage(null);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
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

    if (!formCategory) {
      setFormError('Por favor selecciona una categoría');
      return;
    }

    if (!formTitle.trim()) {
      setFormError('El título del curso es obligatorio');
      return;
    }

    if (!formSlug.trim()) {
      setFormError('El slug del curso es obligatorio');
      return;
    }

    setFormLoading(true);

    // Using FormData to support multipart uploads (cover image)
    const data = new FormData();
    data.append('category', String(formCategory));
    data.append('title', formTitle.trim());
    data.append('description', formDescription.trim());
    data.append('price', formPrice);
    data.append('slug', formSlug.trim());
    data.append('is_active', String(formIsActive));

    if (formCoverImage) {
      data.append('cover_image', formCoverImage);
    }

    try {
      if (isEditing && editingCourseId !== null) {
        await updateCourseUseCase.execute(editingCourseId, data);
        setSuccessMessage('Curso actualizado correctamente');
      } else {
        await createCourseUseCase.execute(data);
        setSuccessMessage('Curso creado correctamente');
      }

      setShowFormModal(false);
      loadCourses();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar el curso');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (courseId: number) => {
    if (!isAdmin) {
      alert('Solo los administradores tienen permisos para eliminar recursos.');
      return;
    }

    try {
      await deleteCourseUseCase.execute(courseId);
      setSuccessMessage('Curso eliminado correctamente');
      loadCourses();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el curso');
    }
  };

  return {
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
    setFormTitle,
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
  };
};
