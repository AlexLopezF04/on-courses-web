import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { AxiosEnrollmentRepository } from '@infrastructure/adapters/AxiosEnrollmentRepository';
import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
import { Enrollment } from '@domain/entities/Enrollment';
import { BookOpen, LayoutDashboard, PlayCircle, Trophy, Calendar } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';

const enrollmentRepository = new AxiosEnrollmentRepository();

export const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    enrollmentRepository
      .getEnrollments()
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

  if (isLoading) return <Loader fullScreen />;

  return (
    <Layout>
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-brand-500" />
            Mi Panel de Estudiante
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Bienvenido de vuelta, <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.first_name || user?.username}</span>
          </p>
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex items-center gap-3">
            <div className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Inscrito en</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{enrollments.length} cursos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Mis Cursos Matriculados
        </h2>

        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {enrollment.course_title}
                    </h3>
                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                      Progreso: {Math.round(parseFloat(enrollment.total_progress))}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-6">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-violet-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${parseFloat(enrollment.total_progress)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                    <Calendar className="h-4 w-4" />
                    <span>Inscrito el {new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button
                    onClick={() => handleResumeCourse(enrollment.course)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Estudiar
                  </Button>
                  <Link to={`/courses/${enrollment.course}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Ver Temario
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-350 dark:border-slate-800 rounded-3xl max-w-lg mx-auto">
            <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">¿Listo para aprender algo nuevo?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-455 mt-2 mb-6">
              Aún no te has inscrito en ningún curso. ¡Explora nuestro catálogo y empieza tu formación!
            </p>
            <Link to="/courses">
              <Button>Explorar Catálogo</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};
