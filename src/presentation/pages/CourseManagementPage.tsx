import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { getCoursesUseCase, createCourseUseCase, updateCourseUseCase, deleteCourseUseCase } from '@infrastructure/factories/CourseFactory';
import { AxiosCategoryRepository } from '@infrastructure/adapters/AxiosCategoryRepository';
import { Course } from '@domain/entities/Course';
import { Category } from '@domain/entities/Category';
import { useAuthStore } from '../store/useAuthStore';
import { Pencil, Trash2, Plus, ArrowLeft, Search, Eye, ShieldAlert, CheckCircle, ListPlus } from 'lucide-react';
import { Loader } from '../components/Loader';

const categoryRepository = new AxiosCategoryRepository();

export const CourseManagementPage: React.FC = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  // Status indicators
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Load categories
    categoryRepository
      .getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err));

    loadCourses();
  }, []);

  const loadCourses = () => {
    setIsLoading(true);
    getCoursesUseCase
      .execute()
      .then((data) => {
        setCourses(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses', err);
        setIsLoading(false);
      });
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingCourseId(null);
    setFormCategory('');
    setFormTitle('');
    setFormDescription('');
    setFormPrice('0.00');
    setFormSlug('');
    setFormIsActive(true);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (course: Course) => {
    setIsEditing(true);
    setEditingCourseId(course.id);
    setFormCategory(typeof course.category === 'object' ? course.category.id : course.category);
    setFormTitle(course.title);
    setFormDescription(course.description || '');
    setFormPrice(course.price);
    setFormSlug(course.slug);
    setFormIsActive(course.is_active);
    setFormError(null);
    setShowFormModal(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormTitle(val);
    // Auto-generate slug from title
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!formCategory || !formTitle || !formSlug) {
      setFormError('Por favor completa todos los campos requeridos (*)');
      return;
    }

    setFormLoading(true);
    const data = {
      category: Number(formCategory),
      title: formTitle,
      description: formDescription,
      price: formPrice,
      slug: formSlug,
      is_active: formIsActive,
    };

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
      
      // Auto clear success msg
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

    if (!window.confirm('¿Estás seguro de que deseas eliminar este curso de forma permanente?')) {
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

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand-500 mb-2">
            <ArrowLeft className="h-3 w-3" />
            Volver al Panel de Control
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
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-450 mb-6 animate-pulse">
          <CheckCircle className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-sm overflow-hidden">
        {/* Search bar */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por título de curso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table Area */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4">Título</th>
                  <th className="py-4 px-4">Categoría</th>
                  <th className="py-4 px-4">Precio</th>
                  <th className="py-4 px-4">Estado</th>
                  <th className="py-4 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                      <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {c.title}
                      </td>
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-455">
                        {c.category_name || 'Desarrollo'}
                      </td>
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-455 font-medium">
                        ${c.price}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded ${
                          c.is_active
                            ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {c.is_active ? 'Activo' : 'Borrador'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/courses/${c.id}/lessons`}>
                            <Button variant="ghost" size="sm" className="p-2 flex items-center gap-1.5 text-brand-600" title="Ver Lecciones">
                              <ListPlus className="h-4 w-4" />
                              <span className="hidden sm:inline">Temas</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEdit(c)}
                            className="p-2 text-slate-600 dark:text-slate-350"
                            title="Editar Curso"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(c.id)}
                            className={`p-2 ${
                              isAdmin ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            }`}
                            disabled={!isAdmin}
                            title={isAdmin ? "Eliminar Curso" : "Eliminar (Solo Administradores)"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                      No se encontraron cursos cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative my-8">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
              {isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </h3>

            {formError && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-400 mb-6">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <div className="text-xs leading-relaxed">{formError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Categoría *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Título del Curso *"
                type="text"
                placeholder="Introducción a React"
                value={formTitle}
                onChange={handleTitleChange}
                required
              />

              <Input
                label="Slug del Curso *"
                type="text"
                placeholder="introduccion-a-react"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Descripción
                </label>
                <textarea
                  placeholder="Escribe una breve descripción del curso..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm min-h-[100px]"
                />
              </div>

              <Input
                label="Precio ($) *"
                type="text"
                placeholder="0.00"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                required
              />

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="formIsActive"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <label htmlFor="formIsActive" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Publicar curso inmediatamente (Activo)
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFormModal(false)}
                  disabled={formLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={formLoading}>
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};
