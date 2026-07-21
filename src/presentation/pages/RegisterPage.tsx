import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authRepositoryInstance } from '@infrastructure/factories/AuthFactory';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { ShieldAlert, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';

const LATAM_COUNTRIES = [
  { code: '+593', name: 'Ecuador', iso: 'ec', placeholder: '099 999 9999', format: 'XXX XXX XXXX' },
  { code: '+57', name: 'Colombia', iso: 'co', placeholder: '300 123 4567', format: 'XXX XXX XXXX' },
  { code: '+51', name: 'Perú', iso: 'pe', placeholder: '999 999 999', format: 'XXX XXX XXX' },
  { code: '+54', name: 'Argentina', iso: 'ar', placeholder: '11 1234 5678', format: 'XX XXXX XXXX' },
  { code: '+55', name: 'Brasil', iso: 'br', placeholder: '11 91234 5678', format: 'XX XXXXX XXXX' },
  { code: '+56', name: 'Chile', iso: 'cl', placeholder: '9 1234 5678', format: 'X XXXX XXXX' },
  { code: '+52', name: 'México', iso: 'mx', placeholder: '55 1234 5678', format: 'XX XXXX XXXX' },
  { code: '+58', name: 'Venezuela', iso: 've', placeholder: '412 123 4567', format: 'XXX XXX XXXX' },
  { code: '+591', name: 'Bolivia', iso: 'bo', placeholder: '7000 1234', format: 'XXXX XXXX' },
  { code: '+595', name: 'Paraguay', iso: 'py', placeholder: '981 123 456', format: 'XXX XXX XXX' },
  { code: '+598', name: 'Uruguay', iso: 'uy', placeholder: '099 123 456', format: 'XXX XXX XXX' },
  { code: '+506', name: 'Costa Rica', iso: 'cr', placeholder: '8888 8888', format: 'XXXX XXXX' },
  { code: '+507', name: 'Panamá', iso: 'pa', placeholder: '6666 6666', format: 'XXXX XXXX' },
  { code: '+502', name: 'Guatemala', iso: 'gt', placeholder: '5555 5555', format: 'XXXX XXXX' },
  { code: '+504', name: 'Honduras', iso: 'hn', placeholder: '9999 9999', format: 'XXXX XXXX' },
  { code: '+503', name: 'El Salvador', iso: 'sv', placeholder: '7777 7777', format: 'XXXX XXXX' },
  { code: '+505', name: 'Nicaragua', iso: 'ni', placeholder: '8888 8888', format: 'XXXX XXXX' },
  { code: '+53', name: 'Cuba', iso: 'cu', placeholder: '5 1234567', format: 'X XXXXXXX' },
  { code: '+1', name: 'República Dominicana', iso: 'do', placeholder: '809 123 4567', format: 'XXX XXX XXXX' }
];

const applyPhoneMask = (value: string, mask: string) => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  let digitIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    if (digitIndex >= digits.length) break;
    if (mask[i] === 'X') {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      formatted += mask[i];
    }
  }
  return formatted;
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <Logo className="h-12 w-auto text-brand-600 dark:text-brand-400 mb-3" />
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
                              // Auto re-format current number with new country mask
                              setPhoneLocal((prev) => {
                                const digits = prev.replace(/\D/g, '');
                                return applyPhoneMask(digits, c.format);
                              });
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
                  placeholder={LATAM_COUNTRIES[selectedCountryIndex].placeholder}
                  value={phoneLocal}
                  onChange={(e) => {
                    const formatted = applyPhoneMask(e.target.value, LATAM_COUNTRIES[selectedCountryIndex].format);
                    setPhoneLocal(formatted);
                  }}
                  disabled={isLoading || isSuccess}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || isSuccess}
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

              <div className="w-full flex flex-col gap-1.5 relative">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading || isSuccess}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
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
