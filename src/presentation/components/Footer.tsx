import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Mail, Link2, BookOpen, Compass, Award, Users, Info, Mailbox, Database, Code, Terminal, GitBranch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-violet-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-display font-bold tracking-tight text-slate-900 dark:text-white text-xl">
                OnCourses
              </span>
            </div>
            <p className="text-sm text-slate-505 dark:text-slate-450 leading-relaxed">
              Estudia desarrollo de software, algoritmos y bases de datos de manera premium y estructurada en OnCourses.
            </p>
            <div className="flex gap-3 text-slate-400 dark:text-slate-505 mt-2">
              <a href="https://github.com/AlexLopezF04" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="mailto:support@on-courses.com" className="hover:text-brand-500 transition-colors"><Mail className="h-5 w-5" /></a>
              <a href="https://on-courses-api.uaeftt-ute.site" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors"><Link2 className="h-5 w-5" /></a>
            </div>
            <Link 
              to="/courses" 
              className="mt-4 inline-flex items-center justify-center h-[42px] px-5 w-fit rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-sm font-semibold shadow-sm"
            >
              Ir al catálogo
            </Link>
          </div>

          {/* Col 2: Plataforma */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Plataforma
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/courses" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Compass className="h-4 w-4 text-amber-500" />
                <span>Ruta de Estudio</span>
              </Link>
              <Link to="/courses" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Cursos</span>
              </Link>
              <a href="#" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Award className="h-4 w-4 text-blue-500" />
                <span>Precios</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Info className="h-4 w-4 text-violet-500" />
                <span>Recursos Gratis</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Users className="h-4 w-4 text-orange-500" />
                <span>Comunidad</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Mailbox className="h-4 w-4 text-pink-500" />
                <span>Newsletter</span>
              </a>
            </div>
          </div>

          {/* Col 3: Cursos Temas */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Cursos Destacados
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-500" />
                <span>Bash y terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span>Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-yellow-500" />
                <span>JavaScript</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-violet-500" />
                <span>Git y GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-orange-500" />
                <span>SQL y bases de datos</span>
              </div>
            </div>
          </div>

          {/* Col 4: Información Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Información Legal
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#" className="hover:text-brand-500 transition-colors">Legal</a>
              <a href="#" className="hover:text-brand-500 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-brand-500 transition-colors">Cookies</a>
              <a 
                href="https://on-courses-api.uaeftt-ute.site/api/docs/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-500 font-semibold transition-colors mt-2 text-brand-600 dark:text-brand-400"
              >
                API Docs (Swagger)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          Desarrollado con ♡ [y gracias a ti] desde Ecuador para el mundo. v1.0 &copy; 2024-{new Date().getFullYear()} OnCourses by Alex López.
        </div>
      </div>
    </footer>
  );
};
