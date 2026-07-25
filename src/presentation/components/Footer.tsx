import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Info, Mailbox, Database, Code, Terminal, GitBranch, Building2, MapPin, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal, PricingModal, AboutModal, NewsletterModal } from './FooterModals';

export const Footer: React.FC = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
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
                onClick={() => setShowNewsletterModal(true)}
                className="flex items-center gap-2 text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                <Mailbox className="h-4 w-4 text-pink-500" />
                <span>Newsletter</span>
              </button>
              <button
                onClick={() => setShowAboutModal(true)}
                className="flex items-center gap-2 text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                <Info className="h-4 w-4 text-emerald-500" />
                <span>Nosotros</span>
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
                onClick={() => setShowLegalModal(true)}
                className="flex items-center gap-2 text-left hover:text-brand-500 transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-brand-500" />
                <span>Información Legal & Términos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Graphic Title Element */}
        <div className="mt-16 pt-10 border-t-2 border-slate-200 dark:border-slate-800/80 w-full overflow-hidden flex flex-col items-center justify-center select-none py-6">
          <div className="relative group flex items-center justify-center max-w-full px-2">
            {/* Ambient Green Glow */}
            <div className="absolute inset-0 bg-[#00cc33]/15 dark:bg-[#00ff41]/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex items-center gap-2 sm:gap-4">
              <span className="font-mono font-black text-3xl sm:text-5xl md:text-7xl text-[#00cc33] dark:text-[#00ff41] drop-shadow-[0_2px_8px_rgba(0,204,51,0.4)]">
                &lt;
              </span>
              <span
                className="font-mono font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight uppercase leading-none text-slate-950 dark:text-white dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-[#00ff41] dark:via-emerald-400 dark:to-[#00cc33] drop-shadow-[0_4px_16px_rgba(0,204,51,0.25)] dark:drop-shadow-[0_4px_24px_rgba(0,255,65,0.4)] transition-all duration-300"
                style={{
                  WebkitTextStroke: '2.5px #00cc33',
                }}
              >
                ONCOURSES
              </span>
              <span className="font-mono font-black text-3xl sm:text-5xl md:text-7xl text-[#00cc33] dark:text-[#00ff41] drop-shadow-[0_2px_8px_rgba(0,204,51,0.4)]">
                /&gt;
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
          <div className="p-1 rounded-md bg-white dark:bg-slate-900 border border-slate-950 dark:border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] flex items-center justify-center shrink-0">
            <Logo className="h-4 w-4 drop-shadow" />
          </div>
          <span>
            Desarrollado con ❤️ para todos mis Estudiantes. v1.0 &copy; 2024-{new Date().getFullYear()} OnCourses.
          </span>
        </div>
      </div>

      {/* Modals Rendering */}
      <LegalModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      />
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      />
    </footer>
  );
};
