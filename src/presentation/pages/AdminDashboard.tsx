import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
import { LayoutDashboard, BookOpen, Users, FolderOpen, ArrowRight, ShieldCheck, ClipboardList, FolderKanban } from 'lucide-react';
import { Loader } from '../components/Loader';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [coursesCount, setCoursesCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const courses = await getCoursesUseCase.execute();
        setCoursesCount(courses.count);

        const enrollments = await getEnrollmentsUseCase.execute({ page_size: 1 });
        setEnrollmentsCount(enrollments.count);

        const categories = await getCategoriesUseCase.execute({ page_size: 1 });
        setCategoriesCount(categories.count);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (isLoading) return <Loader fullScreen />;

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-brand-500" />
          Panel de Control Administrativo
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Bienvenido, <span className="font-bold text-slate-800 dark:text-slate-200">{user?.first_name || user?.username}</span>. Rol: <span className="text-brand-500 font-semibold">{user?.role}</span>
        </p>
      </div>

      {/* Grid: Statistics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex items-center gap-5">
          <div className="rounded-2xl bg-brand-100 p-4.5 text-brand-600 dark:bg-brand-900/30 dark:text-brand-450 shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Cursos Activos</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{coursesCount}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex items-center gap-5">
          <div className="rounded-2xl bg-violet-100 p-4.5 text-violet-600 dark:bg-violet-900/30 dark:text-violet-450 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Inscripciones</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{enrollmentsCount}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex items-center gap-5">
          <div className="rounded-2xl bg-rose-100 p-4.5 text-rose-600 dark:bg-rose-900/30 dark:text-rose-450 shrink-0">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Categorías</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{categoriesCount}</span>
          </div>
        </div>
      </div>

      {/* Grid: Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Manage Courses Action Card */}
        <div className="group rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:border-brand-500/30 transition-all duration-300">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-650 dark:text-brand-400 mb-6">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Administrar Cursos</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Crea, actualiza y elimina cursos del catálogo de OnCourses. Organiza secciones, gestiona precios y edita slugs para optimizar el acceso.
            </p>
          </div>
          <Link to="/admin/courses" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline mt-auto">
            Acceder al listado de cursos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Manage Categories Action Card */}
        <div className="group rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:border-brand-500/30 transition-all duration-300">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-650 dark:text-rose-400 mb-6">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Administrar Categorías</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Organiza los cursos en grupos temáticos. Crea nuevas categorías, edita descripciones y estructura el catálogo del sitio web.
            </p>
          </div>
          <Link to="/admin/categories" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline mt-auto">
            Acceder a las categorías
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Security / System Access Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-650 dark:text-emerald-400 mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Reglas de Negocio y Roles</h3>
          <p className="text-slate-500 dark:text-slate-455 text-sm leading-relaxed mb-6">
            De acuerdo con el rol asignado por Django, se configuran las siguientes directivas automáticas:
          </p>
          <ul className="text-xs text-slate-500 dark:text-slate-455 flex flex-col gap-2.5 mt-auto">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>**ADMINISTRADOR:** Acceso completo CRUD y capacidad de eliminación definitiva.</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              <span>**DOCENTE:** Edición, creación e inserción de lecciones a cursos propios.</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>**ESTUDIANTE:** Acceso restringido al portal y reproductor de lecciones.</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};
