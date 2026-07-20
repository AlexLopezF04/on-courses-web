import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileDetails } from '../components/profile/ProfileDetails';
import { ProfileEditForm } from '../components/profile/ProfileEditForm';
import { CheckCircle, ShieldAlert, Settings, ArrowLeft } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
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
    isProfessorOrAdmin,
    handleEditToggle,
    handleSubmit,
    getInitials,
    formatJoinedDate,
    roleConfig,
  } = useProfile();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Mi Perfil</h1>
          <Button
            variant={isEditing ? 'outline' : 'primary'}
            onClick={handleEditToggle}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <ArrowLeft className="h-4 w-4" />
                Cancelar Edición
              </>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                Editar Perfil
              </>
            )}
          </Button>
        </div>

        {/* Global Notifications */}
        {successMsg && (
          <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-450">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-455" />
            <span>{successMsg}</span>
          </div>
        )}

        {formError && (
          <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-455">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <div className="text-xs leading-relaxed">{formError}</div>
          </div>
        )}

        {/* Header Widget */}
        <ProfileHeader
          user={user}
          initials={getInitials()}
          roleConfig={roleConfig}
          joinedDate={formatJoinedDate(user?.date_joined)}
        />

        {/* Body forms / details */}
        {isEditing ? (
          <ProfileEditForm
            isProfessorOrAdmin={isProfessorOrAdmin}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            biography={biography}
            country={country}
            birthDate={birthDate}
            professionalTitle={professionalTitle}
            specialty={specialty}
            linkedinUrl={linkedinUrl}
            loading={isLoading}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhone={setPhone}
            setBiography={setBiography}
            setCountry={setCountry}
            setBirthDate={setBirthDate}
            setProfessionalTitle={setProfessionalTitle}
            setSpecialty={setSpecialty}
            setLinkedinUrl={setLinkedinUrl}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProfileDetails
            user={user}
            isProfessorOrAdmin={isProfessorOrAdmin}
          />
        )}
      </div>
    </Layout>
  );
};
