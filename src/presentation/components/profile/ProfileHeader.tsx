import React from 'react';
import { User } from '@domain/entities/User';
import { Mail, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  user: User | null;
  initials: string;
  roleConfig: { label: string; bg: string; dot: string };
  joinedDate: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  initials,
  roleConfig,
  joinedDate,
}) => {
  return (
    <div className="relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm overflow-hidden">
      {/* Avatar Container */}
      <div className="relative shrink-0 select-none">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-slate-850 shadow-md"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-brand-500 text-white flex items-center justify-center font-display font-black text-3xl shadow-inner uppercase">
            {initials}
          </div>
        )}
      </div>

      {/* Basic Text info */}
      <div className="text-center md:text-left flex-1">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1.5">
          <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
          </h2>
          <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${roleConfig.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${roleConfig.dot}`} />
            {roleConfig.label}
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">@{user?.username}</p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-slate-400" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Miembro desde: {joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
