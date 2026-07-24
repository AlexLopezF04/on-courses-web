import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { useCartStore } from '../store/useCartStore';
import { Sun, Moon, LogOut, Menu, X, BookOpen, Compass, Award, Info, ShoppingBag } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';
import { PricingModal } from './FooterModals';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { items: cartItems, openCart } = useCartStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Logo className="h-9 w-9" />
                <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-450 dark:to-brand-300">
                  OnCourses
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-6">
                <Link to="/courses" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                  <Compass className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Ruta de Estudio</span>
                </Link>
                <Link to="/courses" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                  <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Cursos</span>
                </Link>
                <button
                  onClick={() => setShowPricingModal(true)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 cursor-pointer"
                >
                  <Award className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>Precios</span>
                </button>
                <Link to="/courses?max_price=0" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                  <Info className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>Recursos Gratis</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative p-2 border-2 border-slate-950 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[2px_2px_0px_0px_#00b835] transition-colors cursor-pointer"
                aria-label="Ver carrito de compras"
                title="Carrito de Compras"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white border-2 border-slate-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 border-2 border-slate-950 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[2px_2px_0px_0px_#00b835] transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2.5">
                  {/* Role Identification Badge */}
                  {user?.role === 'admin' && (
                    <span className="inline-flex items-center gap-1 bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Administrador">
                      👑 ADMIN
                    </span>
                  )}
                  {user?.role === 'professor' && (
                    <span className="inline-flex items-center gap-1 bg-purple-500 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Docente / Profesor">
                      🎓 DOCENTE
                    </span>
                  )}
                  {user?.role === 'student' && (
                    <span className="inline-flex items-center gap-1 bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Estudiante">
                      ⚡ ALUMNO
                    </span>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 mr-1"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-7 w-7 rounded-full object-cover border-2 border-slate-950 dark:border-slate-300 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-[#00cc33] text-slate-950 border-2 border-slate-950 dark:border-slate-300 font-black text-xs flex items-center justify-center shrink-0 uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835]">
                        {(user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U')}
                      </div>
                    )}
                    <span>Mi Perfil</span>
                  </Link>
                  <Link to={user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard'}>
                    <Button variant="outline" size="sm">Ir al campus</Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Salir</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/register">
                    <Button variant="outline" size="sm">Registrarse</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="primary" size="sm">Ir al campus</Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 flex flex-col gap-4">
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
            >
              <Compass className="h-4 w-4 text-amber-500" />
              <span>Ruta de Estudio</span>
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
            >
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span>Cursos</span>
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowPricingModal(true);
              }}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600 cursor-pointer"
            >
              <Award className="h-4 w-4 text-blue-500" />
              <span>Precios</span>
            </button>
            <Link
              to="/courses?max_price=0"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
            >
              <Info className="h-4 w-4 text-brand-500" />
              <span>Recursos Gratis</span>
            </Link>

          <hr className="border-slate-200 dark:border-slate-800" />

          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-7 w-7 rounded-full object-cover border-2 border-slate-950 dark:border-slate-300 shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-[#00cc33] text-slate-950 border-2 border-slate-950 dark:border-slate-300 font-black text-xs flex items-center justify-center shrink-0 uppercase">
                      {(user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U')}
                    </div>
                  )}
                  <span>{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}</span>
                </div>
                {user?.role === 'admin' && (
                  <span className="bg-rose-500 text-white font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    👑 ADMIN
                  </span>
                )}
                {user?.role === 'professor' && (
                  <span className="bg-purple-500 text-white font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    🎓 DOCENTE
                  </span>
                )}
                {user?.role === 'student' && (
                  <span className="bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    ⚡ ALUMNO
                  </span>
                )}
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600"
              >
                Mi Perfil
              </Link>
              <Link
                to={user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard'}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600"
              >
                Mi Panel
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-2 text-left text-sm font-medium text-rose-500 hover:text-rose-600"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Registrarse</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Ir al campus</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
    <PricingModal
      isOpen={showPricingModal}
      onClose={() => setShowPricingModal(false)}
    />
    </>
  );
};
