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
      <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
        <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-[#00cc33]" />
          Biografía
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {user?.biography || <span className="italic text-slate-400 dark:text-slate-500">Aún no has agregado una biografía. ¡Cuéntanos más sobre ti!</span>}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
          <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#00cc33]" />
            Datos Personales
          </h3>
          <div className="flex flex-col gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                Teléfono:
              </span>
              <span className="font-mono text-slate-950 dark:text-white font-bold">{user?.phone || '--'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                País:
              </span>
              <span className="text-slate-950 dark:text-white font-bold">{user?.country || '--'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2">
                <Cake className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                Fecha Nacimiento:
              </span>
              <span className="font-mono text-slate-950 dark:text-white font-bold">{user?.birth_date || '--'}</span>
            </div>
          </div>
        </div>

        {/* Academic Details (only if Professor or Admin) */}
        {isProfessorOrAdmin && (
          <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
            <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-[#00cc33]" />
              Perfil Profesional
            </h3>
            <div className="flex flex-col gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
                <span>Título Profesional:</span>
                <span className="text-slate-950 dark:text-white font-bold text-right">{user?.professional_title || '--'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
                <span>Especialidad:</span>
                <span className="text-slate-950 dark:text-white font-bold text-right">{user?.specialty || '--'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#0077b5]" />
                  LinkedIn:
                </span>
                {user?.linkedin_url ? (
                  <a
                    href={sanitizeUrl(user.linkedin_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00cc33] font-extrabold underline hover:text-[#00ff41]"
                  >
                    Ver perfil ↗
                  </a>
                ) : (
                  <span className="text-slate-950 dark:text-white font-bold">--</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
