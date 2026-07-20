import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const useProfile = () => {
  const { user, updateProfile, isLoading, error } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  // Form States
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [biography, setBiography] = useState(user?.biography || '');
  const [country, setCountry] = useState(user?.country || '');
  const [birthDate, setBirthDate] = useState(user?.birth_date || '');
  const [professionalTitle, setProfessionalTitle] = useState(user?.professional_title || '');
  const [specialty, setSpecialty] = useState(user?.specialty || '');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || '');

  // Notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isProfessorOrAdmin = user?.role === 'admin' || user?.role === 'professor';

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset to original values on cancel
      setFirstName(user?.first_name || '');
      setLastName(user?.last_name || '');
      setPhone(user?.phone || '');
      setBiography(user?.biography || '');
      setCountry(user?.country || '');
      setBirthDate(user?.birth_date || '');
      setProfessionalTitle(user?.professional_title || '');
      setSpecialty(user?.specialty || '');
      setLinkedinUrl(user?.linkedin_url || '');
    }
    setIsEditing(!isEditing);
    setFormError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    const data: any = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      biography: biography.trim(),
      country: country.trim(),
      birth_date: birthDate || null,
    };

    if (isProfessorOrAdmin) {
      data.professional_title = professionalTitle.trim();
      data.specialty = specialty.trim();
      data.linkedin_url = linkedinUrl.trim();
    }

    try {
      await updateProfile(data);
      setSuccessMsg('¡Perfil actualizado correctamente!');
      setIsEditing(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar los cambios de perfil');
    }
  };

  // Get Initials for Avatar
  const getInitials = () => {
    const f = firstName.substring(0, 1).toUpperCase();
    const l = lastName.substring(0, 1).toUpperCase();
    return f + l || user?.username.substring(0, 2).toUpperCase() || 'U';
  };

  // Format Django joined date
  const formatJoinedDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Role style mapping
  const getRoleConfig = () => {
    switch (user?.role) {
      case 'admin':
        return {
          label: 'ADMINISTRADOR',
          bg: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-455 border border-rose-250/20',
          dot: 'bg-rose-500',
        };
      case 'professor':
        return {
          label: 'DOCENTE',
          bg: 'bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-455 border border-violet-250/20',
          dot: 'bg-violet-500',
        };
      default:
        return {
          label: 'ESTUDIANTE',
          bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-455 border border-emerald-250/20',
          dot: 'bg-emerald-500',
        };
    }
  };

  return {
    user,
    isEditing,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    biography,
    setBiography,
    country,
    setCountry,
    birthDate,
    setBirthDate,
    professionalTitle,
    setProfessionalTitle,
    specialty,
    setSpecialty,
    linkedinUrl,
    setLinkedinUrl,
    successMsg,
    formError,
    isLoading,
    error,
    isProfessorOrAdmin,
    handleEditToggle,
    handleSubmit,
    getInitials,
    formatJoinedDate,
    roleConfig: getRoleConfig(),
  };
};
