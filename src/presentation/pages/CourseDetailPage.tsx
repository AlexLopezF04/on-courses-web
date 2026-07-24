import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getCourseByIdUseCase, updateCourseUseCase } from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
import { getEnrollmentsUseCase, enrollInCourseUseCase } from '@infrastructure/factories/EnrollmentFactory';
import { Course } from '@domain/entities/Course';
import { Category } from '@domain/entities/Category';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { CourseFormModal } from '../components/course-management/CourseFormModal';
import { BookOpen, Clock, Award, ShieldAlert, CheckCircle, ArrowLeft, Play, ShoppingBag, Pencil } from 'lucide-react';
import { CourseDetailSkeleton } from '../components/Skeletons';

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { addItem: addToCart } = useCartStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Direct Admin Course Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [formCategory, setFormCategory] = useState<number | ''>('');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formCoverImage, setFormCoverImage] = useState<File | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const courseId = Number(id);

  useEffect(() => {
    if (isNaN(courseId)) {
      setError('ID de curso no válido');
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const courseData = await getCourseByIdUseCase.execute(courseId);
        setCourse(courseData);

        const categoriesData = await getCategoriesUseCase.execute({ page_size: 100 });
        setCategories(categoriesData.results || []);

        if (isAuthenticated) {
          try {
            const enrollments = await getEnrollmentsUseCase.execute({ course: courseId });
            setIsEnrolled(
              Boolean(
                (enrollments && enrollments.count > 0) ||
                (enrollments && Array.isArray(enrollments.results) && enrollments.results.length > 0)
              )
            );
          } catch (enrollErr) {
            console.warn('Could not check enrollment status, defaulting to false', enrollErr);
            setIsEnrolled(false);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error al cargar detalles del curso');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [courseId, isAuthenticated]);

  const handleOpenEditModal = () => {
    if (!course) return;
    const catId = typeof course.category === 'object' ? (course.category as any)?.id : course.category;
    setFormCategory(catId ? Number(catId) : '');
    setFormTitle(course.title);
    setFormDescription(course.description || '');
    setFormPrice(course.price.toString());
    setFormSlug(course.slug);
    setFormIsActive(course.is_active);
    setFormCoverImage(null);
    setFormError(null);
    setShowEditModal(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    setFormLoading(true);
    setFormError(null);

    try {
      const updated = await updateCourseUseCase.execute(course.id, {
        category: formCategory ? Number(formCategory) : undefined,
        title: formTitle,
        description: formDescription,
        price: formPrice,
        slug: formSlug,
        is_active: formIsActive,
        cover_image: formCoverImage || undefined,
      });

      setCourse(updated);
      setShowEditModal(false);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar cambios del curso');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    setIsEnrolling(true);
    try {
      await enrollInCourseUseCase.execute(courseId);
      setIsEnrolled(true);
      // Find the first lesson ID if it exists
      const firstLesson = course?.modules?.[0]?.lessons?.[0];
      if (firstLesson) {
        navigate(`/learn/${courseId}/lesson/${firstLesson.id}`);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message || 'Ocurrió un error al inscribirse');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <CourseDetailSkeleton />
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto">
          <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Error al cargar el curso</h2>
          <p className="text-slate-500 mt-2">{error || 'El curso no existe.'}</p>
          <Link to="/courses" className="inline-block mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get total lessons count
  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  return (
    <Layout>
      <div className="mb-6">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Title, Description, Syllabus */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <span className="inline-block px-3 py-1 border-2 border-slate-950 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
              {course.category_name || 'Desarrollo'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">
              {course.description || 'Este curso no tiene una descripción detallada todavía.'}
            </p>
          </div>

          {/* Core metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y-2 border-slate-950 py-6 dark:border-slate-800">
            <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
              <Clock className="h-6 w-6 text-[#00cc33] mb-1" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Lecciones</span>
              <span className="text-sm font-black text-slate-950 dark:text-white">{totalLessons} temas</span>
            </div>
            <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
              <BookOpen className="h-6 w-6 text-[#00cc33] mb-1" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Módulos</span>
              <span className="text-sm font-black text-slate-950 dark:text-white">{course.modules?.length || 0} secciones</span>
            </div>
            <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
              <Award className="h-6 w-6 text-[#00cc33] mb-1" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Certificación</span>
              <span className="text-sm font-black text-slate-950 dark:text-white">Al finalizar</span>
            </div>
          </div>

          {/* Syllabus / Content list */}
          <div>
            <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              Contenido del Curso
            </h3>
            
            <div className="flex flex-col gap-4">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((mod, index) => (
                  <div
                    key={mod.id}
                    className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] overflow-hidden"
                  >
                    <div className="bg-slate-100 dark:bg-slate-950 px-5 py-3 border-b-2 border-slate-950 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Sección {index + 1}
                        </span>
                        <h4 className="font-extrabold text-slate-950 dark:text-white text-base">
                          {mod.title}
                        </h4>
                      </div>
                      <span className="text-xs font-black text-slate-950 dark:text-white bg-[#00cc33] border border-slate-950 px-2.5 py-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        {mod.lessons?.length || 0} temas
                      </span>
                    </div>

                    <div className="divide-y-2 divide-slate-100 dark:divide-slate-800">
                      {mod.lessons && mod.lessons.length > 0 ? (
                        mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="px-5 py-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/40 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center border border-slate-950 bg-[#00cc33] text-slate-950 font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                <Play className="h-3 w-3 fill-current" />
                              </div>
                              <span className="text-slate-800 dark:text-slate-200 font-bold">
                                {lesson.title}
                              </span>
                            </div>
                            {lesson.duration_seconds && (
                              <span className="text-slate-500 dark:text-slate-400 text-xs font-mono font-bold">
                                {Math.round(lesson.duration_seconds / 60)} min
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 italic">
                          No hay temas cargados en esta sección todavía.
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Aún no se ha estructurado el plan de estudios para este curso.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden flex flex-col">
            {/* Retro Window Top Header */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-mono">ONCOURSES.APP</span>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
                <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
                <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">X</span>
              </div>
            </div>

            {/* Full Cover Image Container */}
            <div className="relative aspect-video w-full bg-slate-950 border-b-2 border-slate-950 overflow-hidden">
              {course.cover_image ? (
                <img
                  src={course.cover_image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#00cc33] text-slate-950">
                  <BookOpen className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Inversión única</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-950 dark:text-white font-display">
                    {parseFloat(course.price) === 0 ? 'Gratis' : `$${course.price}`}
                  </span>
                </div>
              </div>

              {user?.role === 'admin' || user?.role === 'professor' ? (
                <div className="flex flex-col gap-3 bg-amber-50 dark:bg-amber-950/40 border-2 border-slate-950 p-4 text-xs font-bold text-slate-950 dark:text-amber-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00cc33] animate-pulse" />
                    <span>Modo Gestión (<span className="uppercase font-black text-brand-600 dark:text-[#00cc33]">{user?.role}</span>)</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleOpenEditModal}
                      className="w-full py-2 px-3 border-2 border-slate-950 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Editar Información del Curso</span>
                    </button>

                    <Link to={`/admin/courses/${course.id}/lessons`} className="w-full">
                      <Button className="w-full flex items-center justify-center gap-1.5 py-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Administrar Temas y Secciones &rarr;</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : isEnrolled ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 justify-center py-2 px-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-2 border-slate-950 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle className="h-4 w-4 text-[#00cc33]" />
                    <span>¡Ya estás inscrito en este curso!</span>
                  </div>
                  
                  {course.modules?.[0]?.lessons?.[0] ? (
                    <Link to={`/learn/${courseId}/lesson/${course.modules[0].lessons[0].id}`} className="w-full">
                      <Button className="w-full flex items-center justify-center gap-2">
                        <Play className="h-4 w-4 fill-current" />
                        Continuar Aprendizaje
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="w-full">
                      <Button className="w-full">Ir al panel de estudiante</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleEnroll}
                    isLoading={isEnrolling}
                    className="w-full py-3"
                  >
                    {isAuthenticated ? 'Inscribirse Ahora' : 'Iniciar sesión para inscribirse'}
                  </Button>
                  
                  {course && (
                    <Button
                      variant="outline"
                      onClick={() => addToCart(course)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Añadir al Carrito</span>
                    </Button>
                  )}
                </div>
              )}

              <div className="border-t-2 border-slate-950 dark:border-slate-800 pt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
                  <span>Acceso ilimitado de por vida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
                  <span>Evaluaciones modulares y tutoriales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
                  <span>Certificado de finalización al concluir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Edit Modal for Admins & Instructors */}
      <CourseFormModal
        isOpen={showEditModal}
        isEditing={true}
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
        onTitleChange={(val) => {
          setFormTitle(val);
          setFormSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }}
        onDescriptionChange={setFormDescription}
        onPriceChange={setFormPrice}
        onSlugChange={setFormSlug}
        onIsActiveChange={setFormIsActive}
        onCoverImageChange={setFormCoverImage}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSaveCourse}
      />
    </Layout>
  );
};
