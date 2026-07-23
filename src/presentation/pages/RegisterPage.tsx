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
      <div className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl border-2 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00FF41] bg-white dark:bg-white transition-all duration-200 overflow-hidden">
          {/* OS Window Chrome Header Bar */}
          <div className="flex items-center justify-end px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">_</span>
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">+</span>
              <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold text-slate-800 dark:text-slate-800 bg-white dark:bg-white select-none">X</span>
            </div>
          </div>

          {/* Split Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            {/* Left Side — Branding & Logo Hero */}
            <div className="lg:col-span-5 relative flex flex-col justify-between p-8 sm:p-10 bg-slate-950 text-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-950 overflow-hidden">
              {/* Matrix Grid animation background */}
              <div className="animate-grid absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.12)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-400/10 border border-brand-400 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <span>$ oncourses --register</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
                  <Logo className="h-24 w-24 sm:h-28 sm:w-28 mb-6 drop-shadow-[0_0_25px_rgba(0,255,65,0.65)]" />
                  <h1 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
                    Comienza tu Carrera DEV
                  </h1>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Forma parte de la plataforma interactiva de aprendizaje de programación más dinámica.
                  </p>
                </div>
              </div>

              {/* Badges / Stats */}
              <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="w-6 h-6 flex items-center justify-center bg-brand-400 text-slate-950 border border-slate-950 font-bold">💻</span>
                  <span>+50 Cursos interactivos desde cero</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="w-6 h-6 flex items-center justify-center bg-emerald-400 text-slate-950 border border-slate-950 font-bold">🛡️</span>
                  <span>Proyectos reales de portafolio</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-400 text-slate-950 border border-slate-950 font-bold">⚡</span>
                  <span>Acceso a la comunidad DEV 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Side — Register Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-white">
              <div className="mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-950">
                  Crea tu Cuenta
                </h2>
                <p className="text-slate-600 dark:text-slate-600 text-sm mt-1">
                  Únete gratis a OnCourses hoy mismo
                </p>
              </div>

              {isSuccess && (
                <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-50 border-2 border-emerald-500 p-3.5 text-xs text-emerald-900 dark:text-emerald-900 mb-6 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.5)]">
                  <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-600" />
                  <div>
                    <span className="font-bold">¡Registro Exitoso!</span>
                    <p className="mt-0.5 font-medium leading-relaxed">
                      Tu cuenta ha sido creada correctamente. Te redirigiremos al login en unos segundos...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-50 border-2 border-rose-500 p-3.5 text-xs text-rose-900 dark:text-rose-900 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-600" />
                  <div>
                    <span className="font-bold">Error al registrarse:</span>
                    <p className="mt-0.5 font-medium leading-relaxed">{error}</p>
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

                {/* Teléfono con selector de país */}
                <div className="w-full flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
                    Teléfono
                  </label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={isLoading || isSuccess}
                        className="flex items-center justify-between gap-2 h-[44px] px-3 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 outline-none text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00FF41] transition-all duration-200 focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00FF41] min-w-[110px] disabled:opacity-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <img
                            src={`https://flagcdn.com/w40/${LATAM_COUNTRIES[selectedCountryIndex].iso}.png`}
                            alt={LATAM_COUNTRIES[selectedCountryIndex].name}
                            className="w-5 h-3.5 object-cover border border-slate-950 shadow-sm"
                          />
                          <span>{LATAM_COUNTRIES[selectedCountryIndex].code}</span>
                        </div>
                        <span className="text-xs text-slate-500">▼</span>
                      </button>

                      {isDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <div className="absolute left-0 mt-1.5 w-60 max-h-60 overflow-y-auto border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] z-50 scrollbar-thin">
                            {LATAM_COUNTRIES.map((c, index) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountryIndex(index);
                                  setIsDropdownOpen(false);
                                  setPhoneLocal((prev) => {
                                    const digits = prev.replace(/\D/g, '');
                                    return applyPhoneMask(digits, c.format);
                                  });
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-100 text-slate-950 dark:text-slate-950 transition-colors text-sm font-medium cursor-pointer"
                              >
                                <img
                                  src={`https://flagcdn.com/w40/${c.iso}.png`}
                                  alt={c.name}
                                  className="w-5 h-3.5 object-cover border border-slate-950 shadow-sm"
                                />
                                <span className="font-bold">{c.code}</span>
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
                      className="flex-1 px-4 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00FF41] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00FF41] disabled:opacity-50 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full flex flex-col gap-1.5 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00FF41] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00FF41] disabled:opacity-50 text-sm font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading || isSuccess}
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

                  <div className="w-full flex flex-col gap-1.5 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00FF41] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00FF41] disabled:opacity-50 text-sm font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading || isSuccess}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-950 dark:hover:text-slate-950 transition-colors cursor-pointer"
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

                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isSuccess}
                  className="w-full mt-3 py-3.5 border-2 border-slate-950 font-black text-sm uppercase tracking-wider bg-brand-400 hover:bg-brand-300 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00FF41] transition-all cursor-pointer"
                >
                  Registrar Cuenta
                </Button>
              </form>

              <p className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-bold text-brand-600 dark:text-brand-600 hover:underline">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
