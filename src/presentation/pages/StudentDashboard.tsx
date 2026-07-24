import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
import { Enrollment } from '@domain/entities/Enrollment';
import { BookOpen, LayoutDashboard, PlayCircle, Trophy, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { DashboardSkeleton } from '../components/Skeletons';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEnrollmentsUseCase
      .execute()
      .then((data) => {
        setEnrollments(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load enrollments', err);
        setIsLoading(false);
      });
  }, []);

  const handleResumeCourse = async (courseId: number) => {
    try {
      const courseDetails = await getCourseByIdUseCase.execute(courseId);
      const firstLesson = courseDetails.modules?.[0]?.lessons?.[0];
      if (firstLesson) {
        navigate(`/learn/${courseId}/lesson/${firstLesson.id}`);
      } else {
        navigate(`/courses/${courseId}`);
      }
    } catch {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <Layout>
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-brand-500" />
            Mi Panel de Estudiante
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm font-medium">
            <span className="text-slate-600 dark:text-slate-400">
              Bienvenido de vuelta, <span className="font-extrabold text-slate-950 dark:text-white">{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}</span>
            </span>
            <span className="text-slate-400">•</span>
            {user?.role === 'admin' && (
              <span className="inline-flex items-center gap-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
                👑 ROL: ADMINISTRADOR
              </span>
            )}
            {user?.role === 'professor' && (
              <span className="inline-flex items-center gap-1 bg-purple-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
                🎓 ROL: DOCENTE
              </span>
            )}
            {user?.role === 'student' && (
              <span className="inline-flex items-center gap-1 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
                ⚡ ESTUDIANTE
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border-2 border-slate-950 bg-white p-4 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex items-center gap-3">
            <div className="border border-slate-950 bg-brand-400 p-2 text-slate-950">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Inscrito en</span>
              <span className="text-base font-black text-slate-950">{enrollments.length} cursos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-brand-500" />
          Mis Cursos Matriculados
        </h2>

        {isLoading ? (
          <DashboardSkeleton />
        ) : enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => {
              const progressNum = Math.round(parseFloat(enrollment.total_progress || '0'));
              return (
                <div
                  key={enrollment.id}
                  className="border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="font-display text-lg font-black text-slate-950 leading-snug line-clamp-2">
                        {enrollment.course_title}
                      </h3>
                      <span className="shrink-0 text-xs font-black px-2.5 py-1 border border-slate-950 bg-brand-400 text-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        Progreso: {progressNum}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 border-2 border-slate-950 h-4 overflow-hidden mb-6">
                      <div
                        className="bg-brand-500 h-full transition-all duration-500"
                        style={{ width: `${progressNum}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-6">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>Matriculado: {new Date(enrollment.enrolled_at).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleResumeCourse(enrollment.course)}
                    className="w-full py-2.5 px-4 border-2 border-slate-950 bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] hover:bg-brand-500 hover:text-slate-950 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Continuar Aprendizaje
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-slate-950 bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-950">Aún no estás matriculado en ningún curso</h3>
            <p className="text-xs text-slate-600 mt-1 mb-6">Explora nuestro catálogo y empieza tu ruta de aprendizaje hoy mismo.</p>
            <Link to="/courses">
              <Button className="font-extrabold text-xs uppercase tracking-wider">Explorar Catálogo</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};
