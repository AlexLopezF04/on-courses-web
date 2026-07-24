import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
import { LayoutDashboard, BookOpen, Users, FolderOpen, ClipboardList, FolderKanban, UserCheck, BarChart3 } from 'lucide-react';
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
        <div className="border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-5">
          <div className="border border-slate-950 bg-brand-400 p-3.5 text-slate-950 shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Cursos Activos</span>
            <span className="text-2xl font-black text-slate-950">{coursesCount}</span>
          </div>
        </div>

        <Link to="/admin/students" className="border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-5 hover:bg-slate-50 transition-all cursor-pointer">
          <div className="border border-slate-950 bg-emerald-400 p-3.5 text-slate-950 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Inscripciones &rarr;</span>
            <span className="text-2xl font-black text-slate-950">{enrollmentsCount}</span>
          </div>
        </Link>

        <div className="border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-5">
          <div className="border border-slate-950 bg-rose-400 p-3.5 text-slate-950 shrink-0">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Categorías</span>
            <span className="text-2xl font-black text-slate-950">{categoriesCount}</span>
          </div>
        </div>
      </div>

      {/* Grid: Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Manage Courses Action Card */}
        <div className="border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-brand-400 text-slate-950 mb-6 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-2">Administrar Cursos</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Crea, actualiza y elimina cursos del catálogo de OnCourses. Organiza secciones, gestiona precios y edita slugs para optimizar el acceso.
            </p>
          </div>
          <Link to="/admin/courses" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:text-brand-600 underline mt-auto">
            Acceder al listado de cursos &rarr;
          </Link>
        </div>

        {/* Manage Categories Action Card */}
        <div className="border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-rose-400 text-slate-950 mb-6 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-2">Administrar Categorías</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Organiza los cursos en grupos temáticos. Crea nuevas categorías, edita descripciones y estructura el catálogo del sitio web.
            </p>
          </div>
          <Link to="/admin/categories" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:text-brand-600 underline mt-auto">
            Acceder a las categorías &rarr;
          </Link>
        </div>

        {/* Manage Students Action Card */}
        <div className="border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-amber-400 text-slate-950 mb-6 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-2">Estudiantes Inscritos</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Nómina general de alumnos matriculados por curso. Busca estudiantes por nombre, analiza el avance de lecciones y filtra por estado.
            </p>
          </div>
          <Link to="/admin/students" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:text-brand-600 underline mt-auto">
            Ver nómina de estudiantes &rarr;
          </Link>
        </div>

        {/* User Role Management Card */}
        <div className="border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-purple-400 text-slate-950 mb-6 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-2">Gestión de Usuarios y Roles</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Asigna roles de Administrador, Docente o Estudiante. Administra las credenciales y accesos del sistema con control estricto RBAC.
            </p>
          </div>
          <Link to="/admin/users" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:text-brand-600 underline mt-auto">
            Administrar usuarios y roles &rarr;
          </Link>
        </div>

        {/* Analytics & Reports Card */}
        <div className="border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-emerald-400 text-slate-950 mb-6 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-2">Analíticas y Reportes</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
              Visualiza reportes ejecutivos de rendimiento, ingresos por ventas de cursos, tasa de retención estudiantil y bitácoras de auditoría.
            </p>
          </div>
          <Link to="/admin/analytics" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:text-brand-600 underline mt-auto">
            Ver métricas y exportar informe &rarr;
          </Link>
        </div>
      </div>
    </Layout>
  );
};
