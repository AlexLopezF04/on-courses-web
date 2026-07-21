import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { Course } from '@domain/entities/Course';
import {
  ArrowRight, BookOpen, ChevronLeft, ChevronRight,
  Clock, Users, ShieldCheck, GraduationCap, Star,
  FolderOpen, Sparkles, Code2, Layers
} from 'lucide-react';
import { Loader } from '../components/Loader';
import { CourseCard } from '../components/CourseCard';

/* ─── Stat pill ─────────────────────────────────────────────────── */
const Stat: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className={`flex flex-col items-center px-6 py-3 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)]`}>
    <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
  </div>
);

/* ─── Profile card (¿Es para ti?) ──────────────────────────────── */
const ProfileCard: React.FC<{ emoji: string; title: string; desc: string; color: string }> = ({ emoji, title, desc, color }) => (
  <div className={`relative flex flex-col p-6 border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] bg-white dark:bg-slate-900 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
    <span className={`text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-lg ${color}`}>{emoji}</span>
    <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

/* ─── Testimonial card ──────────────────────────────────────────── */
const Testimonial: React.FC<{ name: string; role: string; quote: string; initial: string; color: string }> = ({ name, role, quote, initial, color }) => (
  <div className="flex flex-col p-6 border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
    </div>
    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5 flex-1">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-white border-2 border-slate-900 dark:border-slate-700 ${color}`}>
        {initial}
      </div>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-white">{name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
      </div>
    </div>
  </div>
);

/* ─── Benefit card ──────────────────────────────────────────────── */
const Benefit: React.FC<{ icon: React.ReactNode; title: string; desc: string; accent: string }> = ({ icon, title, desc, accent }) => (
  <div className={`flex gap-4 p-5 border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 transition-all duration-200`}>
    <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-900 dark:border-slate-700 ${accent}`}>
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════ */
export const HomePage: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    getCoursesUseCase
      .execute({ page_size: 6, is_active: true })
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
    return () => { isMounted = false; };
  }, []);

  const scrollCourses = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <Layout>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white mb-16 border-b-2 border-slate-900">
        {/* Grid background — animated neon green + cyan */}
        <div className="animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.18)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Left column */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Plataforma de Aprendizaje Tecnológico
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4">
                <span className="text-white">On</span>
                <span className="text-brand-400">Courses</span>
                <br />
                <span className="text-slate-300 text-4xl sm:text-5xl lg:text-6xl font-bold">
                  es aprender<br />
                  <span className="text-white">de verdad</span>
                </span>
              </h1>

              {/* Sub */}
              <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Estudia programación y desarrollo de software con cursos estructurados, evaluaciones reales y certificados que respaldan tu progreso.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <Link to="/courses">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm border-2 border-brand-400 shadow-[4px_4px_0px_0px_rgba(139,92,246,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    Comenzar a aprender
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/register">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent hover:bg-slate-800 text-slate-200 font-bold text-sm border-2 border-slate-700 hover:border-slate-500 transition-all duration-200 cursor-pointer">
                    Crear cuenta gratis
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Stat value="+500" label="Estudiantes" color="text-brand-400" />
                <Stat value="+20" label="Cursos" color="text-emerald-400" />
                <Stat value="100%" label="Online" color="text-amber-400" />
              </div>
            </div>

            {/* Right column — mockup window retro style */}
            <div className="hidden lg:block flex-1 max-w-lg w-full">
              <div className="border-2 border-white/20 shadow-[8px_8px_0px_0px_rgba(139,92,246,0.35)] bg-slate-900">
                {/* window chrome — retro _ + X style */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b-2 border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">oncourses.app</span>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 flex items-center justify-center border border-white/20 text-[10px] font-bold text-slate-300 bg-slate-700 select-none">_</span>
                    <span className="w-4 h-4 flex items-center justify-center border border-white/20 text-[10px] font-bold text-slate-300 bg-slate-700 select-none">+</span>
                    <span className="w-4 h-4 flex items-center justify-center border border-white/20 text-[10px] font-bold text-slate-300 bg-slate-700 select-none">X</span>
                  </div>
                </div>
                {/* content */}
                <div className="p-6 space-y-3">
                  {[
                    { icon: '🐍', label: 'Python desde cero', color: 'bg-amber-500' },
                    { icon: '⚛️', label: 'React & TypeScript', color: 'bg-brand-600' },
                    { icon: '🐳', label: 'Docker & DevOps', color: 'bg-emerald-600' },
                    { icon: '🗄️', label: 'Bases de Datos SQL', color: 'bg-indigo-600' },
                  ].map(({ icon, label, color }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700">
                      <div className={`w-8 h-8 flex items-center justify-center text-base border border-slate-600 ${color}`}>{icon}</div>
                      <span className="text-sm text-slate-300 font-medium">{label}</span>
                      <div className="ml-auto w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.random() * 40 + 50}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── COURSES ─────────────────────────────────────────────── */}
      <section className="mb-20">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">
              <FolderOpen className="h-4 w-4" />
              <span>courses.folder</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Cursos
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Aprende programación desde cero y mejora tus habilidades
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCourses('left')}
              className="w-9 h-9 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollCourses('right')}
              className="w-9 h-9 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link
              to="/courses"
              className="flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline ml-2"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : featuredCourses.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCourses.map((course) => (
              <div key={course.id} className="snap-start shrink-0 w-[270px]">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
            No hay cursos disponibles en este momento.
          </div>
        )}
      </section>

      {/* ── ¿ES PARA TI? ────────────────────────────────────────── */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
            <Code2 className="h-4 w-4" />
            <span>community.folder</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ¿Estás en el lugar correcto?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm max-w-xl">
            Si te identificas con alguno de estos perfiles, estás en el lugar correcto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProfileCard
            emoji="🌱"
            title="Empiezas desde cero"
            desc="¿Sin experiencia previa? Te damos el aprendizaje estructurado con fundamentos sólidos y buenas prácticas desde el primer día."
            color="bg-emerald-100 dark:bg-emerald-900/30"
          />
          <ProfileCard
            emoji="⚡"
            title="Estudiante o Junior"
            desc="Tienes algo de base pero quieres solidificar conocimientos, avanzar en tu carrera o aprender tecnologías más demandadas del mercado."
            color="bg-brand-100 dark:bg-brand-900/30"
          />
          <ProfileCard
            emoji="🚀"
            title="Profesional activo"
            desc="Con experiencia pero necesitas actualizarte, cambiar de stack, o añadir habilidades que te diferencien en el mercado laboral."
            color="bg-amber-100 dark:bg-amber-900/30"
          />
        </div>
      </section>

      {/* ── POR QUÉ ONCOURSES ───────────────────────────────────── */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">
            <Layers className="h-4 w-4" />
            <span>benefits.folder</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Y además
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Todo lo que incluye aprender en OnCourses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Benefit
            icon={<Clock className="h-5 w-5 text-white" />}
            title="A tu propio ritmo"
            desc="Accede a las lecciones las 24h del día. Sin horarios fijos ni fechas de vencimiento."
            accent="bg-brand-600"
          />
          <Benefit
            icon={<ShieldCheck className="h-5 w-5 text-white" />}
            title="Certificado incluido"
            desc="Al completar cada curso recibes un certificado de finalización validado por la plataforma."
            accent="bg-emerald-600"
          />
          <Benefit
            icon={<BookOpen className="h-5 w-5 text-white" />}
            title="Lecciones y cuestionarios"
            desc="Valida lo aprendido con tests integrados al finalizar cada módulo del curso."
            accent="bg-amber-500"
          />
          <Benefit
            icon={<Users className="h-5 w-5 text-white" />}
            title="Docentes expertos"
            desc="Aprende de profesores con experiencia real en la industria del software."
            accent="bg-brand-700"
          />
          <Benefit
            icon={<GraduationCap className="h-5 w-5 text-white" />}
            title="Contenido estructurado"
            desc="Rutas de aprendizaje claras organizadas por módulos, de menor a mayor complejidad."
            accent="bg-rose-600"
          />
          <Benefit
            icon={<Sparkles className="h-5 w-5 text-white" />}
            title="Actualización continua"
            desc="El contenido se actualiza periódicamente para mantenerlo al día con las tendencias del sector."
            accent="bg-indigo-600"
          />
        </div>
      </section>

      {/* ── TESTIMONIOS ─────────────────────────────────────────── */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-1">
            <Star className="h-4 w-4" />
            <span>reviews.folder</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Lo que dicen nuestros estudiantes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Testimonial
            name="Sofía Ramírez"
            role="Desarrolladora Junior · Quito"
            quote="OnCourses me dio la estructura que necesitaba. Aprendí Python desde cero y en 3 meses ya estaba aplicando a mi primer trabajo."
            initial="S"
            color="bg-brand-600"
          />
          <Testimonial
            name="Mateo Torres"
            role="Estudiante de Ingeniería · Guayaquil"
            quote="Los cursos están muy bien explicados. Los cuestionarios al final de cada módulo me ayudaron a afianzar los conceptos."
            initial="M"
            color="bg-emerald-600"
          />
          <Testimonial
            name="Valeria Cárdenas"
            role="Diseñadora → Dev Full Stack · Cuenca"
            quote="Venía del diseño y no sabía nada de código. Los cursos son claros, directos y con práctica desde el primer día. ¡Muy recomendado!"
            initial="V"
            color="bg-amber-500"
          />
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="bg-slate-950 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(139,92,246,0.4)] p-10 lg:p-14 text-center relative overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative">
            <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">¿Listo para empezar?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Comienza a aprender hoy
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Únete a cientos de estudiantes que ya están transformando su carrera con OnCourses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm border-2 border-brand-400 shadow-[4px_4px_0px_0px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(139,92,246,0.5)] transition-all duration-200 cursor-pointer">
                  Registrarse gratis
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/courses">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent hover:bg-slate-800 text-slate-200 font-bold text-sm border-2 border-slate-700 hover:border-slate-500 transition-all duration-200 cursor-pointer">
                  Ver catálogo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};
