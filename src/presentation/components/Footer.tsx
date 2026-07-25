import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Info, Mailbox, Database, Code, Terminal, GitBranch, Building2, MapPin, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal, PricingModal, AboutModal, NewsletterModal } from './FooterModals';

export const Footer: React.FC = () => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  return (
    <footer className="border-t-2 border-slate-950 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display font-black tracking-tight text-slate-900 dark:text-white text-xl">
                OnCourses
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Estudia desarrollo de software, algoritmos y bases de datos de manera premium y estructurada en OnCourses.
            </p>
            <div className="flex flex-col gap-2.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#00cc33] shrink-0" />
                <span>Universidad UTE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00cc33] shrink-0" />
                <span>Tulcán, Ecuador</span>
              </div>
            </div>
            <Link 
              to="/courses" 
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer w-fit"
            >
              <span>Ir al catálogo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Col 2: Plataforma */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Plataforma
            </h3>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-mono font-bold">
              <Link to="/courses" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Cursos</span>
              </Link>
              <Link to="/courses?max_price=0" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <Info className="h-4 w-4 text-brand-500" />
                <span>Recursos Gratis</span>
              </Link>
              <button
                onClick={() => setShowNewsletterModal(true)}
                className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
              >
                <Mailbox className="h-4 w-4 text-pink-500" />
                <span>Newsletter</span>
              </button>
              <button
                onClick={() => setShowAboutModal(true)}
                className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
              >
                <Info className="h-4 w-4 text-emerald-500" />
                <span>Nosotros</span>
              </button>
            </div>
          </div>

          {/* Col 3: Cursos Temas */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Cursos Destacados
            </h3>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-mono font-bold">
              <Link to="/courses?search=terminal" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <Terminal className="h-4 w-4 text-emerald-500" />
                <span>Bash y terminal</span>
              </Link>
              <Link to="/courses?search=python" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <Code className="h-4 w-4 text-blue-500" />
                <span>Python</span>
              </Link>
              <Link to="/courses?search=javascript" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <Code className="h-4 w-4 text-yellow-500" />
                <span>JavaScript</span>
              </Link>
              <Link to="/courses?search=git" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <GitBranch className="h-4 w-4 text-brand-500" />
                <span>Git y GitHub</span>
              </Link>
              <Link to="/courses?search=sql" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
                <Database className="h-4 w-4 text-orange-500" />
                <span>SQL y bases de datos</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Información Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Información Legal
            </h3>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-mono font-bold">
              <button
                onClick={() => setShowLegalModal(true)}
                className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
                <span>Información Legal & Términos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Giant Brand Banner Window Frame with Soft Mint Green Retro Shadow Offset */}
        <div className="group relative mt-16 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_#86efac] dark:shadow-[6px_6px_0px_0px_#7effa0] overflow-hidden flex flex-col select-none transition-all duration-300 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_0px_#86efac] dark:hover:shadow-[10px_10px_0px_0px_#7effa0] cursor-pointer">
          {/* Retro OS Window Chrome Header Bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-950 transition-colors">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono" translate="no">
              ONCOURSES.APP
            </span>
            <div className="flex items-center gap-1.5" translate="no">
              <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
              <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
              <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
                <X className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Banner Body Container */}
          <div className="relative py-10 px-4 overflow-hidden flex items-center justify-center">
            {/* Light mode grid */}
            <div className="block dark:hidden animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,200,50,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,50,0.12)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

            {/* Dark mode grid */}
            <div className="hidden dark:block animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.16)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
            
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[#00cc33]/10 dark:bg-[#00ff41]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-300" />

            {/* Brand Logo Text with Hover Micro-Movement */}
            <div className="relative z-10 font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tight uppercase leading-none text-center transition-transform duration-300 group-hover:scale-[1.02]">
              <span className="text-slate-950 dark:text-white transition-colors duration-200">On</span>
              <span className="text-[#00aa2e] dark:text-[#00ff41] drop-shadow-[0_4px_16px_rgba(0,204,51,0.3)] dark:drop-shadow-[0_4px_24px_rgba(0,255,65,0.5)] transition-colors duration-200">Courses</span>
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
