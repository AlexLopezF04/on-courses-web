import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
import { LayoutDashboard, BookOpen, Users, FolderOpen, ClipboardList, FolderKanban, UserCheck, BarChart3, ShieldCheck } from 'lucide-react';
import { Loader } from '../components/Loader';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const coursesData = await getCoursesUseCase.execute({ page_size: 1 });
        setTotalCoursesCount(coursesData.count || 0);

        const enrollments = await getEnrollmentsUseCase.execute({ page_size: 1 });
        setEnrollmentsCount(enrollments.count || 0);

        const categories = await getCategoriesUseCase.execute({ page_size: 1 });
        setCategoriesCount(categories.count || 0);
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
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-[#00cc33]" />
          Panel de Control Administrativo
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
          Bienvenido, <span className="font-bold text-slate-950 dark:text-white">{user?.first_name || user?.username}</span>. Rol: <span className="text-[#00cc33] font-extrabold uppercase">{user?.role}</span>
        </p>
      </div>

      {/* Grid: 3 Core KPI Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Total Courses KPI */}
        <Link
          to="/admin/courses"
          className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
        >
          <div className="border border-slate-950 bg-[#00cc33] p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-[#00cc33] transition-colors">
              Catálogo de Cursos &rarr;
            </span>
            <span className="text-2xl font-black">{totalCoursesCount} cursos</span>
          </div>
        </Link>

        {/* Total Enrollments KPI */}
        <Link
          to="/admin/students"
          className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
        >
          <div className="border border-slate-950 bg-emerald-400 p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-emerald-500 transition-colors">
              Inscripciones &rarr;
            </span>
            <span className="text-2xl font-black">{enrollmentsCount} alumnos</span>
          </div>
        </Link>

        {/* Total Categories KPI */}
        <Link
          to="/admin/categories"
          className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
        >
          <div className="border border-slate-950 bg-rose-400 p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-rose-500 transition-colors">
              Categorías de Estudio &rarr;
            </span>
            <span className="text-2xl font-black">{categoriesCount} categorías</span>
          </div>
        </Link>
      </div>

      {/* Unified Administration Modules Grid */}
      <h2 className="font-display text-xl font-black text-slate-950 dark:text-white mb-6 pb-2 border-b-2 border-slate-950 dark:border-slate-800 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#00cc33]" />
        <span>Módulos de Gestión del Sistema</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Unified Catalog & Courses Module */}
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-brand-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black mb-2">Gestión del Catálogo y Cursos</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
              Administra el catálogo completo de contenidos. Crea nuevos cursos, organiza secciones, edita lecciones paso a paso, gestiona precios y conmuta el estado (Activo / Inactivo) a 1-clic.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/admin/courses"
              className="px-3 py-1.5 bg-[#00cc33] text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00ff41] transition-all cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Administrar Cursos &rarr;</span>
            </Link>
            <Link
              to="/admin/categories"
              className="px-3 py-1.5 bg-rose-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-300 transition-all cursor-pointer flex items-center gap-1"
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>Categorías &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Students & Enrollments Module */}
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-emerald-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black mb-2">Estudiantes e Inscripciones</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
              Nómina general de alumnos matriculados por curso. Busca estudiantes por nombre, analiza el avance de lecciones completadas y realiza inscripciones directas.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/admin/students"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-300 transition-all cursor-pointer"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Ver Nómina de Estudiantes &rarr;</span>
            </Link>
          </div>
        </div>

        {/* User Roles & Access Control Module */}
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-purple-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black mb-2">Gestión de Usuarios y Roles</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
              Asigna roles de Administrador, Docente o Estudiante. Administra las credenciales y accesos del sistema con control estricto de seguridad.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-300 transition-all cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Administrar Usuarios y Roles &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Analytics & Reports Module */}
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-amber-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black mb-2">Analíticas y Reportes</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
              Visualiza reportes ejecutivos de rendimiento, ingresos por ventas de cursos, tasa de retención estudiantil y métricas de aprendizaje.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/admin/analytics"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all cursor-pointer"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Ver Métricas y Reportes &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
