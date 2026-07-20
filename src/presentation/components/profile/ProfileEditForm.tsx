import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

interface ProfileEditFormProps {
  isProfessorOrAdmin: boolean;
  firstName: string;
  lastName: string;
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
    <form onSubmit={onSubmit} className="flex flex-col gap-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8">
      <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">Editar Información Personal</h3>

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
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Biografía</label>
        <textarea
          placeholder="Escribe una pequeña descripción sobre tus habilidades o aficiones..."
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          disabled={loading}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-brand-500 resize-none"
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
