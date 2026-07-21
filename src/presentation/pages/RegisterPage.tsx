import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authRepositoryInstance } from '@infrastructure/factories/AuthFactory';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { GraduationCap, ShieldAlert, CheckCircle } from 'lucide-react';

const LATAM_COUNTRIES = [
  { code: '+593', name: 'Ecuador', iso: 'ec' },
  { code: '+57', name: 'Colombia', iso: 'co' },
  { code: '+51', name: 'Perú', iso: 'pe' },
  { code: '+54', name: 'Argentina', iso: 'ar' },
  { code: '+55', name: 'Brasil', iso: 'br' },
  { code: '+56', name: 'Chile', iso: 'cl' },
  { code: '+52', name: 'México', iso: 'mx' },
  { code: '+58', name: 'Venezuela', iso: 've' },
  { code: '+591', name: 'Bolivia', iso: 'bo' },
  { code: '+595', name: 'Paraguay', iso: 'py' },
  { code: '+598', name: 'Uruguay', iso: 'uy' },
  { code: '+506', name: 'Costa Rica', iso: 'cr' },
  { code: '+507', name: 'Panamá', iso: 'pa' },
  { code: '+502', name: 'Guatemala', iso: 'gt' },
  { code: '+504', name: 'Honduras', iso: 'hn' },
  { code: '+503', name: 'El Salvador', iso: 'sv' },
  { code: '+505', name: 'Nicaragua', iso: 'ni' },
  { code: '+53', name: 'Cuba', iso: 'cu' },
  { code: '+1', name: 'República Dominicana', iso: 'do' }
];

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneLocal, setPhoneLocal] = useState('');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      const selectedCountry = LATAM_COUNTRIES[selectedCountryIndex];
      const formattedPhone = phoneLocal.trim()
        ? `(${selectedCountry.code}) [${selectedCountry.name}] ${phoneLocal}`
        : '';

      await authRepositoryInstance.register({
        username,
        email,
        password,
        password_confirm: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone: formattedPhone,
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

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Teléfono
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isLoading || isSuccess}
                    className="flex items-center justify-between gap-2 h-[46px] px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none text-sm min-w-[110px] focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1.5">
                      <img
                        src={`https://flagcdn.com/w40/${LATAM_COUNTRIES[selectedCountryIndex].iso}.png`}
                        alt={LATAM_COUNTRIES[selectedCountryIndex].name}
                        className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                      />
                      <span>{LATAM_COUNTRIES[selectedCountryIndex].code}</span>
                    </div>
                    <span className="text-xs text-slate-400">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute left-0 mt-1.5 w-60 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 shadow-xl z-50 scrollbar-thin">
                        {LATAM_COUNTRIES.map((c, index) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountryIndex(index);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors text-sm"
                          >
                            <img
                              src={`https://flagcdn.com/w40/${c.iso}.png`}
                              alt={c.name}
                              className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                            />
                            <span className="font-medium">{c.code}</span>
                            <span className="text-xs text-slate-500 truncate">({c.name})</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="099 999 9999"
                  value={phoneLocal}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setPhoneLocal(formatted);
                  }}
                  disabled={isLoading || isSuccess}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950"
                />
              </div>
            </div>

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
