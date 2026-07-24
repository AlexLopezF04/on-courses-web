import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

interface ProfileEditFormProps {
  isProfessorOrAdmin: boolean;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone: string;
  biography: string;
  country: string;
  birthDate: string;
  professionalTitle: string;
  specialty: string;
  linkedinUrl: string;
  loading: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setAvatar?: (val: string) => void;
  onAvatarFileChange?: (file: File | null) => void;
  setPhone: (val: string) => void;
  setBiography: (val: string) => void;
  setCountry: (val: string) => void;
  setBirthDate: (val: string) => void;
  setProfessionalTitle: (val: string) => void;
  setSpecialty: (val: string) => void;
  setLinkedinUrl: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  isProfessorOrAdmin,
  firstName,
  lastName,
  avatar,
  phone,
  biography,
  country,
  birthDate,
  professionalTitle,
  specialty,
  linkedinUrl,
  loading,
  setFirstName,
  setLastName,
  onAvatarFileChange,
  setPhone,
  setBiography,
  setCountry,
  setBirthDate,
  setProfessionalTitle,
  setSpecialty,
  setLinkedinUrl,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] text-slate-950 dark:text-white">
      <h3 className="font-display font-extrabold text-slate-950 dark:text-white text-xl pb-3 border-b-2 border-slate-950 dark:border-slate-800">
        Editar Perfil de Usuario
      </h3>

      {/* Avatar upload section */}
      <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200">
          Foto de Perfil (Subir imagen desde equipo)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onAvatarFileChange?.(e.target.files?.[0] || null)}
          disabled={loading}
          className="w-full text-xs text-slate-700 dark:text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:border-2 file:border-slate-950 dark:file:border-slate-700 file:text-xs file:font-extrabold file:bg-[#00cc33] file:text-slate-950 hover:file:bg-[#00ff41] file:cursor-pointer"
        />
        {avatar && (
          <div className="flex items-center gap-3 mt-2">
            <img src={avatar} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-slate-950 dark:border-slate-700" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">✓ Vista previa de foto cargada</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombres *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          label="Apellidos *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
        <Input
          label="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={loading}
        />
        <Input
          label="Fecha de Nacimiento"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Biografía</label>
        <textarea
          placeholder="Escribe una pequeña descripción sobre tus habilidades o aficiones..."
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          disabled={loading}
          rows={4}
          className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] outline-none transition-all focus:border-[#00cc33] resize-none font-medium"
        />
      </div>

      {isProfessorOrAdmin && (
        <div className="flex flex-col gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">Información Académica / Docente</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título Profesional"
              placeholder="Ej: Ingeniero de Software"
              value={professionalTitle}
              onChange={(e) => setProfessionalTitle(e.target.value)}
              disabled={loading}
            />
            <Input
              label="Especialidad / Área"
              placeholder="Ej: Desarrollo Backend & Cloud"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              disabled={loading}
            />
          </div>

          <Input
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/..."
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            disabled={loading}
          />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" isLoading={loading}>
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};
