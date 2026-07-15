import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authRepositoryInstance } from '@infrastructure/factories/AuthFactory';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { GraduationCap, ShieldAlert, CheckCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Por favor completa los campos obligatorios (*)');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await authRepositoryInstance.register({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error al registrar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-violet-600 text-white shadow-lg shadow-brand-500/25 mb-4">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Crea tu Cuenta
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Únete gratis a OnCourses hoy
            </p>
          </div>

          {isSuccess && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-400 mb-6">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold">¡Registro Exitoso!</span>
                <p className="mt-0.5 text-xs font-medium leading-relaxed">
                  Tu cuenta ha sido creada correctamente. Te redirigiremos al login en unos segundos.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-450 mb-6">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold">Error al registrarse:</span>
                <p className="mt-0.5 text-xs font-medium leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre de Usuario *"
                type="text"
                placeholder="usuario123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || isSuccess}
              />
              <Input
                label="Correo Electrónico *"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                placeholder="Juan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading || isSuccess}
              />
              <Input
                label="Apellidos"
                type="text"
                placeholder="Pérez"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>

            <Input
              label="Teléfono"
              type="text"
              placeholder="+593 99 999 9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading || isSuccess}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contraseña *"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isSuccess}
              />
              <Input
                label="Confirmar Contraseña *"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>

            <Button type="submit" isLoading={isLoading} disabled={isSuccess} className="w-full mt-4 py-3">
              Registrar Cuenta
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
