import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const from = (location.state as any)?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!username.trim() || !password.trim()) {
      setValidationError('Por favor completa todos los campos');
      return;
    }

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <Layout>
      <div className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl border-2 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] bg-white dark:bg-white transition-all duration-200 overflow-hidden">
          {/* OS Window Chrome Header Bar */}
          <div className="flex items-center justify-end px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">_</span>
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">+</span>
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">X</span>
            </div>
          </div>

          {/* Split Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Side — Branding & Logo Hero */}
            <div className="lg:col-span-5 relative flex flex-col justify-between p-8 sm:p-10 bg-slate-950 text-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-950 overflow-hidden">
              {/* Matrix Grid animation background */}
              <div className="animate-grid absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.12)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-400/10 border border-brand-400 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <span>$ oncourses --login</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
                  <Logo className="h-24 w-24 sm:h-28 sm:w-28 mb-6 drop-shadow-[0_0_25px_rgba(0,255,65,0.65)]" />
                  <h1 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
                    Bienvenido de vuelta
                  </h1>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Accede a tus cursos, continúa tu aprendizaje y pon a prueba tus habilidades de programación.
                  </p>
                </div>
              </div>

              {/* Badges / Stats */}
              <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="w-6 h-6 flex items-center justify-center bg-brand-400 text-slate-950 border border-slate-950 font-bold">⚡</span>
                  <span>Acceso directo a tus clases guardadas</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="w-6 h-6 flex items-center justify-center bg-emerald-400 text-slate-950 border border-slate-950 font-bold">🎓</span>
                  <span>Progresos y certificados al instante</span>
                </div>
              </div>
            </div>

            {/* Right Side — Login Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-white">
              <div className="mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-950">
                  Iniciar Sesión
                </h2>
                <p className="text-slate-600 dark:text-slate-600 text-sm mt-1">
                  Ingresa tus credenciales para ingresar a tu cuenta
                </p>
              </div>

              {(error || validationError) && (
                <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-50 border-2 border-rose-500 p-3.5 text-xs text-rose-900 dark:text-rose-900 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-600" />
                  <div>
                    <span className="font-bold">Error al iniciar sesión:</span>
                    <p className="mt-0.5 font-medium leading-relaxed">{validationError || error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                  label="Nombre de Usuario"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  disabled={isLoading}
                />

                <div className="w-full flex flex-col gap-1.5 relative">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="current-password"
                      className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-950 dark:hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full mt-3 py-3.5 border-2 border-slate-950 font-black text-sm uppercase tracking-wider bg-brand-400 hover:bg-brand-300 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] transition-all cursor-pointer"
                >
                  Ingresar a la Plataforma
                </Button>
              </form>

              <p className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-600">
                ¿Aún no tienes cuenta?{' '}
                <Link to="/register" className="font-bold text-brand-600 dark:text-brand-600 hover:underline">
                  Regístrate gratis aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
