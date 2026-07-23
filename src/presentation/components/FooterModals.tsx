import React, { useState } from 'react';
import { ShieldCheck, FileText, Cookie, Award, Check, Users, Send, Mail } from 'lucide-react';

/* ─── 1. Modal Legal / Privacidad / Cookies ────────────────────── */
export const LegalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tab: 'terms' | 'privacy' | 'cookies';
}> = ({ isOpen, onClose, tab: initialTab }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00FF41] overflow-hidden">
        {/* OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              oncourses.app/legal-terms
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
          >
            X
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-slate-950 bg-slate-50 dark:bg-slate-950">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border-r-2 border-slate-950 transition-colors ${
              activeTab === 'terms'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-b-2 border-b-transparent -mb-[2px]'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Términos</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border-r-2 border-slate-950 transition-colors ${
              activeTab === 'privacy'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-b-2 border-b-transparent -mb-[2px]'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacidad</span>
          </button>
          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'cookies'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-b-2 border-b-transparent -mb-[2px]'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Cookie className="h-4 w-4" />
            <span>Cookies</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[400px] overflow-y-auto text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 font-medium scrollbar-thin">
          {activeTab === 'terms' && (
            <>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Términos y Condiciones de Uso</h3>
              <p>
                Al acceder y utilizar OnCourses, aceptas cumplir con los presentes términos. Nuestra plataforma ofrece cursos interactivos de programación, bases de datos y desarrollo de software.
              </p>
              <p className="font-bold text-slate-900 dark:text-white">1. Propiedad Intelectual</p>
              <p>
                Todo el contenido, código de lecciones y material educativo es propiedad de OnCourses y sus creadores. Queda prohibida la reproducción no autorizada.
              </p>
              <p className="font-bold text-slate-900 dark:text-white">2. Certificaciones</p>
              <p>
                Los certificados entregados al completar módulos validan tu avance en la plataforma.
              </p>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Política de Privacidad</h3>
              <p>
                En OnCourses valoramos y protegemos la privacidad de tus datos personales según los estándares internacionales.
              </p>
              <p className="font-bold text-slate-900 dark:text-white">1. Información Recopilada</p>
              <p>
                Recopilamos únicamente la información necesaria para gestionar tu cuenta (nombre, correo electrónico, progreso académico).
              </p>
              <p className="font-bold text-slate-900 dark:text-white">2. Uso de la Información</p>
              <p>
                Tus datos no serán vendidos ni compartidos con terceros con fines comerciales.
              </p>
            </>
          )}

          {activeTab === 'cookies' && (
            <>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Política de Cookies</h3>
              <p>
                Utilizamos cookies esenciales para mantener tu sesión activa y recordar tus preferencias de tema (Modo Claro / Modo Oscuro).
              </p>
              <p className="font-bold text-slate-900 dark:text-white">Cookies de Sesión</p>
              <p>
                Permiten autenticar tus solicitudes de manera segura en el backend y guardar tu token de acceso.
              </p>
            </>
          )}
        </div>

        {/* Footer buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brand-400 text-slate-950 font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-300 transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── 2. Modal de Precios y Planes ─────────────────────────────── */
export const PricingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00FF41] overflow-hidden">
        {/* OS Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              oncourses.app/pricing-plans
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
          >
            X
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
            <div className="border-2 border-slate-950 p-6 bg-white dark:bg-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] flex flex-col justify-between">
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
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border-2 border-slate-950 text-slate-950 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Plan Actual
              </button>
            </div>

            {/* Plan PRO */}
            <div className="border-2 border-slate-950 p-6 bg-slate-900 text-white shadow-[4px_4px_0px_0px_#00FF41] flex flex-col justify-between relative overflow-hidden">
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

/* ─── 3. Modal de Comunidad ────────────────────────────────────── */
export const CommunityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00FF41] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              oncourses.app/community
            </span>
          </div>
          <button onClick={onClose} className="w-5 h-5 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white cursor-pointer">X</button>
        </div>

        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/40 border-2 border-slate-950 mx-auto flex items-center justify-center mb-4 text-orange-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-950 dark:text-white mb-2">Comunidad de Estudiantes DEV</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            Conéctate con otros programadores, comparte dudas de tus ejercicios y participa en salas de estudio en vivo.
          </p>

          <div className="space-y-3">
            <a
              href="https://github.com/AlexLopezF04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 border-2 border-slate-950 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#00FF41] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div className="flex items-center gap-3">
                <Send className="h-4 w-4 text-brand-400" />
                <span>Comunidad GitHub & Discusiones</span>
              </div>
              <span>ÚNETE ↗</span>
            </a>

            <a
              href="mailto:j.alexander.lopez.f@gmail.com"
              className="flex items-center justify-between p-3.5 border-2 border-slate-950 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>Contacto Directo con Mentores</span>
              </div>
              <span>CONTACTAR ↗</span>
            </a>
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
      <div className="w-full max-w-md border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00FF41] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-pink-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              oncourses.app/newsletter
            </span>
          </div>
          <button onClick={onClose} className="w-5 h-5 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white cursor-pointer">X</button>
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
