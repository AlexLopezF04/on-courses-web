import React, { useState } from 'react';
import { ShieldCheck, FileText, Cookie, Award, Check, Mail, Info, Building2, Code2, GraduationCap, X } from 'lucide-react';

/* ─── 1. Modal Información Legal Unificada ────────────────────── */
export const LegalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
        {/* OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2" translate="no">
            <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              oncourses.app/legal-terms
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Header Ribbon */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-950 flex items-center gap-3">
          <FileText className="h-6 w-6 text-[#00cc33] shrink-0" />
          <div>
            <h2 className="font-display text-lg font-black leading-none">Información Legal Completa & Términos</h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Términos de Servicio, Política de Privacidad y Cookies de OnCourses
            </p>
          </div>
        </div>

        {/* Complete Unified Legal Document */}
        <div className="p-6 max-h-[420px] overflow-y-auto text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-5 font-medium scrollbar-thin">
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
              <FileText className="h-4 w-4 text-[#00cc33]" />
              1. Términos y Condiciones de Uso
            </h3>
            <p>
              Al utilizar la plataforma <strong>OnCourses</strong>, el usuario acepta cumplir con las normas de acceso, inscripción y convivencia académica. Todo el material didáctico, guías interactivas, código de lecciones y videoclases son propiedad exclusiva de OnCourses y sus autores. Queda estrictamente prohibida la redistribución o copia no autorizada.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
              <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
              2. Política de Privacidad y Datos Personales
            </h3>
            <p>
              Garantizamos la protección de tus datos personales conforme a la normativa vigente. La información recopilada (nombre, correo electrónico, perfil académico y avance de cursos) se utiliza únicamente para el funcionamiento técnico de tu Campus Estudiantil. Tus datos nunca serán comercializados ni transferidos a terceros.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
              <Cookie className="h-4 w-4 text-[#00cc33]" />
              3. Cookies y Almacenamiento de Sesión
            </h3>
            <p>
              OnCourses utiliza cookies estrictamente necesarias y almacenamiento local de navegador (<em>localStorage</em>) para mantener activa tu sesión segura, guardar tus credenciales de acceso JWT y recordar tus preferencias de interfaz (Modo Claro / Oscuro y temas seleccionados).
            </p>
          </section>
        </div>

        {/* Footer button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00ff41] transition-all cursor-pointer"
          >
            Entendido y Acepto
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── 2. Modal "Nosotros" (About OnCourses) ─────────────────────── */
export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
        {/* OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2" translate="no">
            <Info className="h-4 w-4 text-[#00cc33]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              oncourses.app/nosotros
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-[#00cc33] text-slate-950 border-2 border-slate-950 flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Code2 className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-black text-slate-950 dark:text-white">
              Sobre OnCourses
            </h2>
            <p className="text-xs font-bold text-emerald-600 dark:text-[#00cc33] uppercase tracking-wider mt-1">
              Plataforma de Educación Interactiva en Ingeniería de Software
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              <strong>OnCourses</strong> es una plataforma web de aprendizaje práctico diseñada para estudiantes, desarrolladores e investigadores que buscan dominar lenguajes de programación, estructura de datos, arquitecturas de software y gestión de bases de datos de forma estructurada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
                  <GraduationCap className="h-4 w-4 text-[#00cc33]" />
                  <span>Enfoque Práctico</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Manuales paso a paso con bloques de código ejecutables, ejemplos de terminal y videoclases integradas.
                </p>
              </div>

              <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
                  <Building2 className="h-4 w-4 text-[#00cc33]" />
                  <span>Universidad UTE</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Proyecto de desarrollo tecnológico gestado en la Sede Tulcán, Ecuador.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-center text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
            📍 Tulcán, Carchi, Ecuador • Versión Web v2.4
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-500 hover:text-slate-950 transition-all cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── 3. Modal de Precios y Planes ─────────────────────────────── */
export const PricingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden">
        {/* OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2" translate="no">
            <Award className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              oncourses.app/pricing-plans
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-brand-300">
              $ oncourses --pricing
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 dark:text-white">
              Planes de Membresía DEV
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Acceso ilimitado a todos los cursos con certificados incluidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Gratuito */}
            <div className="border-2 border-slate-950 p-6 bg-white dark:bg-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm uppercase text-slate-900 dark:text-white">Plan Free</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-950">Gratis</span>
                </div>
                <div className="text-4xl font-extrabold text-slate-950 dark:text-white mb-4">$0 <span className="text-xs text-slate-500 font-normal">/siempre</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6 font-medium">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Acceso a cursos introductorios</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Lecciones interactivas</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Foro de preguntas básicas</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border-2 border-slate-950 text-slate-950 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Plan Actual
              </button>
            </div>

            {/* Plan PRO */}
            <div className="border-2 border-slate-950 p-6 bg-slate-900 text-white shadow-[4px_4px_0px_0px_#00b835] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-brand-400 text-slate-950 font-black text-[10px] uppercase border border-slate-950 shadow-sm">
                RECOMENDADO
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm uppercase text-brand-400">Plan PRO Full Pass</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-4">$9.99 <span className="text-xs text-slate-400 font-normal">/mes</span></div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6 font-medium">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Acceso ilimitado a +50 Cursos</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Certificados con código de validación</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Proyectos reales para portafolio</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Soporte docente prioritario 24/7</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('¡Gracias por tu interés en OnCourses PRO! La integración de pagos está lista para sincronizarse con Stripe.');
                  onClose();
                }}
                className="w-full py-2.5 bg-brand-400 hover:bg-brand-300 border-2 border-slate-950 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                Suscribirme Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── 4. Modal de Newsletter ───────────────────────────────────── */
export const NewsletterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2" translate="no">
            <Mail className="h-4 w-4 text-pink-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              oncourses.app/newsletter
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-6">
          {subscribed ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-slate-950">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">¡Suscripción Confirmada!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Te enviaremos los mejores tutoriales, noticias y recursos de programación a <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => { setSubscribed(false); onClose(); }}
                className="mt-6 px-6 py-2.5 bg-brand-400 border-2 border-slate-950 font-bold text-xs uppercase text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h2 className="font-display text-2xl font-extrabold text-slate-950 dark:text-white">Boletín Técnico OnCourses</h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                  Recibe semanalmente guías de código, nuevos cursos y recursos gratuitos en tu bandeja de entrada.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 block">
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="desarrollador@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-slate-950 bg-white text-slate-950 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-400 hover:bg-brand-300 border-2 border-slate-950 font-black text-xs uppercase tracking-wider text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                Suscribirme Gratis
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
