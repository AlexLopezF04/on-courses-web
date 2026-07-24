import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, BookOpen, Users, Info, Mailbox, Database, Code, Terminal, GitBranch, Building2, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal, PricingModal, CommunityModal, NewsletterModal } from './FooterModals';

export const Footer: React.FC = () => {
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'cookies' | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display font-bold tracking-tight text-slate-900 dark:text-white text-xl">
                OnCourses
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Estudia desarrollo de software, algoritmos y bases de datos de manera premium y estructurada en OnCourses.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Universidad UTE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Tulcán, Ecuador</span>
              </div>
              <a href="mailto:j.alexander.lopez.f@gmail.com" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>j.alexander.lopez.f@gmail.com</span>
              </a>
              <a href="https://instagram.com/alexlopez_f04" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <svg className="h-4 w-4 fill-current text-slate-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>alexlopez_f04</span>
              </a>
            </div>
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 mt-1">
              <a href="https://github.com/AlexLopezF04" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="mailto:j.alexander.lopez.f@gmail.com" className="hover:text-brand-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Link 
              to="/courses" 
              className="mt-4 inline-flex items-center justify-center h-[42px] px-5 w-fit rounded-xl border border-slate-350 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-sm font-semibold shadow-sm"
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
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Cursos</span>
              </Link>
              <Link to="/courses?max_price=0" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Info className="h-4 w-4 text-brand-500" />
                <span>Recursos Gratis</span>
              </Link>
              <button
                onClick={() => setShowCommunityModal(true)}
                className="flex items-center gap-2 text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                <Users className="h-4 w-4 text-orange-500" />
                <span>Comunidad</span>
              </button>
              <button
                onClick={() => setShowNewsletterModal(true)}
                className="flex items-center gap-2 text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                <Mailbox className="h-4 w-4 text-pink-500" />
                <span>Newsletter</span>
              </button>
            </div>
          </div>

          {/* Col 3: Cursos Temas */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Cursos Destacados
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/courses?search=terminal" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Terminal className="h-4 w-4 text-emerald-500" />
                <span>Bash y terminal</span>
              </Link>
              <Link to="/courses?search=python" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Code className="h-4 w-4 text-blue-500" />
                <span>Python</span>
              </Link>
              <Link to="/courses?search=javascript" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Code className="h-4 w-4 text-yellow-500" />
                <span>JavaScript</span>
              </Link>
              <Link to="/courses?search=git" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <GitBranch className="h-4 w-4 text-brand-500" />
                <span>Git y GitHub</span>
              </Link>
              <Link to="/courses?search=sql" className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <Database className="h-4 w-4 text-orange-500" />
                <span>SQL y bases de datos</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Información Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Información Legal
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <button
                onClick={() => setLegalModalTab('terms')}
                className="text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                Legal
              </button>
              <button
                onClick={() => setLegalModalTab('privacy')}
                className="text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                Privacidad
              </button>
              <button
                onClick={() => setLegalModalTab('cookies')}
                className="text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          Desarrollado con ♡ [y gracias a ti] desde Ecuador para el mundo. v1.0 &copy; 2024-{new Date().getFullYear()} OnCourses by Alex López.
        </div>
      </div>

      {/* Modals Rendering */}
      <LegalModal
        isOpen={legalModalTab !== null}
        onClose={() => setLegalModalTab(null)}
        tab={legalModalTab || 'terms'}
      />
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />
      <CommunityModal
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
      />
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />
    </footer>
  );
};
