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
    <div className="relative border-2 border-slate-950 bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00FF41] overflow-hidden text-slate-950">
      {/* Avatar Container */}
      <div className="relative shrink-0 select-none">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-24 w-24 rounded-full object-cover border-4 border-slate-950 shadow-md"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-brand-400 text-slate-950 border-2 border-slate-950 flex items-center justify-center font-display font-black text-3xl shadow-inner uppercase">
            {initials}
          </div>
        )}
      </div>

      {/* Basic Text info */}
      <div className="text-center md:text-left flex-1">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1.5">
          <h2 className="font-display text-2xl font-black text-slate-950 leading-tight">
            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
          </h2>
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-slate-950 bg-brand-400 text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            {roleConfig.label}
          </span>
        </div>
        <p className="text-xs font-mono font-bold text-slate-500">@{user?.username}</p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-slate-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>Miembro desde: {joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
