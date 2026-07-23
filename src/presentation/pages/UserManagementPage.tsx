import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { UserCheck, Search, ArrowLeft, Filter, Check, Crown, BookOpen, Shield } from 'lucide-react';

interface SystemUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'professor' | 'student';
  date_joined: string;
  is_active: boolean;
}

const SAMPLE_USERS: SystemUser[] = [
  {
    id: 1,
    username: 'alex.admin',
    email: 'j.alexander.lopez.f@gmail.com',
    first_name: 'Alex',
    last_name: 'López',
    role: 'admin',
    date_joined: '2024-01-10T10:00:00Z',
    is_active: true
  },
  {
    id: 2,
    username: 'prof.garcia',
    email: 'garcia.docente@ute.edu.ec',
    first_name: 'Carlos',
    last_name: 'García',
    role: 'professor',
    date_joined: '2024-02-14T09:30:00Z',
    is_active: true
  },
  {
    id: 3,
    username: 'sofia.ramirez',
    email: 'sofia.ramirez@gmail.com',
    first_name: 'Sofía',
    last_name: 'Ramírez',
    role: 'student',
    date_joined: '2026-07-15T14:20:00Z',
    is_active: true
  },
  {
    id: 4,
    username: 'mateo.torres',
    email: 'mateo.torres@gmail.com',
    first_name: 'Mateo',
    last_name: 'Torres',
    role: 'student',
    date_joined: '2026-07-18T11:00:00Z',
    is_active: true
  },
  {
    id: 5,
    username: 'valeria.cardenas',
    email: 'valeria.cardenas@gmail.com',
    first_name: 'Valeria',
    last_name: 'Cárdenas',
    role: 'student',
    date_joined: '2026-07-20T16:45:00Z',
    is_active: true
  },
  {
    id: 6,
    username: 'prof.martinez',
    email: 'martinez.profesor@ute.edu.ec',
    first_name: 'Elena',
    last_name: 'Martínez',
    role: 'professor',
    date_joined: '2024-03-01T08:15:00Z',
    is_active: true
  }
];

export const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<SystemUser[]>(SAMPLE_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'professor' | 'student'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        searchTerm === '' ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'all' || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleRoleChange = (userId: number, newRole: 'admin' | 'professor' | 'student') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    const updatedUser = users.find((u) => u.id === userId);
    setNotification(`Rol de ${updatedUser?.username || 'usuario'} actualizado a: ${newRole.toUpperCase()}`);
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_active: !u.is_active } : u))
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00FF41] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Panel de Control</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-brand-500" />
              Gestión de Usuarios y Roles RBAC
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Administración central de cuentas de usuario, permisos de docentes y acceso de administradores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Operador: <span className="text-brand-500">{currentUser?.username}</span>
            </span>
          </div>
        </div>
      </div>

      {notification && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-xs font-bold text-emerald-900 dark:text-emerald-200 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.4)] animate-fade-in">
          <Check className="h-5 w-5 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Administradores</span>
            <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
              {users.filter((u) => u.role === 'admin').length} Usuarios
            </div>
          </div>
        </div>

        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Docentes / Profesores</span>
            <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
              {users.filter((u) => u.role === 'professor').length} Docentes
            </div>
          </div>
        </div>

        <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41] flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Estudiantes</span>
            <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
              {users.filter((u) => u.role === 'student').length} Estudiantes
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00FF41]">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por usuario, nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
            >
              <option value="all">Todos los Roles</option>
              <option value="admin">Solo Administradores</option>
              <option value="professor">Solo Docentes</option>
              <option value="student">Solo Estudiantes</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00FF41] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Cuentas de Usuario Registradas ({filteredUsers.length})
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-400 text-slate-950 border border-slate-950">
            PANEL RBAC SECURITY
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <th className="py-3.5 px-6">Usuario / Nombre</th>
                <th className="py-3.5 px-6">Correo Electrónico</th>
                <th className="py-3.5 px-6">Fecha Registro</th>
                <th className="py-3.5 px-6">Rol Actual</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Asignar Nuevo Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 text-xs font-medium text-slate-800 dark:text-slate-200">
              {filteredUsers.map((u) => {
                const formattedDate = new Date(u.date_joined).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                });

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-bold border border-slate-950 flex items-center justify-center text-xs shrink-0">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold block text-slate-950 dark:text-white">
                            {u.first_name} {u.last_name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">@{u.username}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-400">
                      {u.email}
                    </td>

                    <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                      {formattedDate}
                    </td>

                    <td className="py-4 px-6">
                      {u.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-300 font-bold text-[10px] uppercase">
                          <Crown className="h-3 w-3" /> ADMIN
                        </span>
                      )}
                      {u.role === 'professor' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-100 dark:bg-brand-950/40 border border-brand-500 text-brand-800 dark:text-brand-300 font-bold text-[10px] uppercase">
                          <Shield className="h-3 w-3" /> DOCENTE
                        </span>
                      )}
                      {u.role === 'student' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase">
                          <BookOpen className="h-3 w-3" /> ESTUDIANTE
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-2.5 py-1 border text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                          u.is_active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-500'
                            : 'bg-rose-50 text-rose-700 border-rose-500'
                        }`}
                      >
                        {u.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleRoleChange(u.id, 'student')}
                          disabled={u.role === 'student'}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-emerald-400 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          Estudiante
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'professor')}
                          disabled={u.role === 'professor'}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-brand-400 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          Docente
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'admin')}
                          disabled={u.role === 'admin'}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-rose-400 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          Admin
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
