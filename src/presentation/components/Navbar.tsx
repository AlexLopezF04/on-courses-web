import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { Sun, Moon, User, LogOut, Menu, X, GraduationCap, BookOpen, Compass, Award, Info, Link2 } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      {/* Orange Promo Banner */}
      <div className="w-full bg-amber-500 text-slate-950 text-center py-1.5 px-4 text-xs font-bold tracking-wide">
        Cupón "MUNDIAL" 30% hasta el 21/07/2026
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-violet-600 text-white shadow-md shadow-brand-500/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-violet-400">
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
              <a href="#" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                <Award className="h-4 w-4 text-blue-500 shrink-0" />
                <span>Precios</span>
              </a>
              <a href="#" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                <Info className="h-4 w-4 text-violet-500 shrink-0" />
                <span>Recursos Gratis</span>
              </a>
              <a href="https://on-courses-api.uaeftt-ute.site/api/docs/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                <Link2 className="h-4 w-4 text-rose-500 shrink-0" />
                <span>API Docs</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 mr-2"
                >
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </Link>
                <Link
                  to={user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-850 px-4 h-[38px] text-sm font-semibold shadow-sm transition-colors"
                >
                  <span>Ir al campus</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20">
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Ingresar</Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="sm" className="h-[38px] px-4 font-semibold">Ir al campus</Button>
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
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
          >
            <Award className="h-4 w-4 text-blue-500" />
            <span>Precios</span>
          </a>
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
          >
            <Info className="h-4 w-4 text-violet-500" />
            <span>Recursos Gratis</span>
          </a>
          <a
            href="https://on-courses-api.uaeftt-ute.site/api/docs/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
          >
            <Link2 className="h-4 w-4 text-rose-500" />
            <span>API Docs</span>
          </a>

          <hr className="border-slate-200 dark:border-slate-800" />

          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4 text-brand-500" />
                <span>{user?.username}</span>
                <span className="text-xs font-normal text-slate-500">({user?.role})</span>
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
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Ingresar</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Ir al campus</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
