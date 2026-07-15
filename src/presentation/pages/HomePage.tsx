import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { Course } from '@domain/entities/Course';
import { ArrowRight, BookOpen, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { Loader } from '../components/Loader';

export const HomePage: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getCoursesUseCase
      .execute({ page_size: 3, is_active: true })
      .then((data) => {
        if (isMounted) {
          setFeaturedCourses(data.results);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden rounded-3xl bg-slate-900 text-white dark:bg-slate-900/50 mb-16">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 to-violet-900/40 opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[120px]" />
        
        <div className="relative mx-auto max-w-4xl text-center px-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-4 py-1.5 text-xs font-semibold text-brand-400 border border-slate-700/50 backdrop-blur mb-6">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>El Futuro del Aprendizaje Tecnológico</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Domina las Tecnologías más <br className="hidden sm:inline" />
            Demandadas del Mercado
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Aprende programación, desarrollo de software y sistemas de la mano de expertos del sector, con lecciones estructuradas y evaluaciones reales.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto flex items-center gap-2">
                Explorar Cursos
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#benefits">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 hover:text-white">
                Ver Beneficios
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              Cursos Destacados
            </h2>
            <p className="text-slate-550 dark:text-slate-400 mt-1">
              Impulsa tu carrera con estas rutas de aprendizaje populares
            </p>
          </div>
          <Link to="/courses" className="group flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Ver todo el catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.length > 0 ? (
              featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
                >
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
                    {course.cover_image ? (
                      <img
                        src={course.cover_image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-violet-100 text-brand-600 dark:from-brand-950 dark:to-violet-950">
                        <BookOpen className="h-10 w-10" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 rounded-lg bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-bold text-slate-900 shadow">
                      {course.category_name || 'Desarrollo'}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">
                      {course.description || 'Sin descripción disponible todavía.'}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-brand-500" />
                        <span>{course.modules_count || 0} Módulos</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                        <span>Prof: {course.professor_name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                      {parseFloat(course.price) === 0 ? 'Gratis' : `$${course.price}`}
                    </span>
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-500">
                No hay cursos disponibles en este momento.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="mb-16 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            ¿Por qué aprender en OnCourses?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Nuestra plataforma está diseñada para acompañarte en cada paso de tu formación técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-6">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">A tu propio ritmo</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Accede a los tutoriales y lecciones teóricas las 24 horas del día. Sin horarios fijos ni presiones.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Evaluaciones y Cuestionarios</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Valida lo aprendido completando cuestionarios integrados al finalizar cada módulo.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Liderado por Expertos</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Aprende de profesores con experiencia real en el desarrollo de software y sistemas distribuidos.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
