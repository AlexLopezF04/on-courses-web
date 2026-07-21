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
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <Logo className="h-12 w-12 mb-3" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Iniciar Sesión
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Ingresa a tu cuenta de OnCourses
            </p>
          </div>

          {(error || validationError) && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-400 mb-6">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold">Error al iniciar sesión:</span>
                <p className="mt-0.5 text-xs font-medium leading-relaxed">{validationError || error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <Input
                label="Nombre de Usuario"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="w-full flex flex-col gap-1.5 relative">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full mt-2">
              Ingresar
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
