import React from 'react';
import { User } from '@domain/entities/User';
import { Phone, MapPin, Cake, Award, Book, Globe, Shield } from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize-url';

interface ProfileDetailsProps {
  user: User | null;
  isProfessorOrAdmin: boolean;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  user,
  isProfessorOrAdmin,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Biography Section */}
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8">
        <h3 className="font-display font-bold text-slate-855 dark:text-slate-200 text-lg mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-brand-500" />
          Biografía
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {user?.biography || <span className="italic text-slate-400">Aún no has agregado una biografía. ¡Cuéntanos más sobre ti!</span>}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8">
          <h3 className="font-display font-bold text-slate-855 dark:text-slate-200 text-lg mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-brand-500" />
            Datos Personales
          </h3>
          <div className="flex flex-col gap-4 text-sm font-semibold text-slate-500">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                Teléfono:
              </span>
              <span className="text-slate-805 dark:text-slate-200">{user?.phone || '--'}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                País:
              </span>
              <span className="text-slate-805 dark:text-slate-200">{user?.country || '--'}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2">
                <Cake className="h-4 w-4 text-slate-400" />
                Fecha de Nacimiento:
              </span>
              <span className="text-slate-805 dark:text-slate-200">{user?.birth_date || '--'}</span>
            </div>
          </div>
        </div>

        {/* Academic Details (only if Professor or Admin) */}
        {isProfessorOrAdmin && (
          <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8">
            <h3 className="font-display font-bold text-slate-855 dark:text-slate-200 text-lg mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-500" />
              Perfil Profesional
            </h3>
            <div className="flex flex-col gap-4 text-sm font-semibold text-slate-500">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-2">
                  Título Profesional:
                </span>
                <span className="text-slate-855 dark:text-slate-200 text-right">{user?.professional_title || '--'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-2">
                  Especialidad:
                </span>
                <span className="text-slate-855 dark:text-slate-200 text-right">{user?.specialty || '--'}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#0077b5]" />
                  LinkedIn:
                </span>
                {user?.linkedin_url ? (
                  <a
                    href={sanitizeUrl(user.linkedin_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-500 hover:underline"
                  >
                    Ver perfil
                  </a>
                ) : (
                  <span className="text-slate-805 dark:text-slate-200">--</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
