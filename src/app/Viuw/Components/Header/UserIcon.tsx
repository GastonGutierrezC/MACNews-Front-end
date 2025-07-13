'use client';

import React, { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LoginIcon from './LoginIcon';
import { useUserRedirect } from '@/app/Controller/Hooks/User/useUserRedirect';
import { useUserProfile } from '@/app/Controller/Hooks/User/useUserProfile';
import { useToken } from '@/app/Controller/Context/UserContext';
import { useProfileUpdate } from '@/app/Controller/Context/ProfileUpdateContext'; // importa el contexto

const UserIcon = () => {
  const { token } = useToken();
  const { profile: user, loading, refreshProfile } = useUserProfile();
  const { redirectToProfile } = useUserRedirect();

  const { profileUpdated, setProfileUpdated } = useProfileUpdate();

  // Cuando profileUpdated cambie a true, recargamos perfil y luego reseteamos la bandera
  useEffect(() => {
    if (profileUpdated) {
      refreshProfile();
      setProfileUpdated(false);
    }
  }, [profileUpdated, refreshProfile, setProfileUpdated]);

  if (!token) return <LoginIcon />;
  if (loading) return null;
  if (user) {
    return (
      <Avatar
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer"
        onClick={redirectToProfile}
      >
        <AvatarImage
          src={user.UserImageURL}
          alt={user.UserFirstName || 'User Avatar'}
        />
        <AvatarFallback>
          {user.UserFirstName
            ? user.UserFirstName.slice(0, 2).toUpperCase()
            : 'US'}
        </AvatarFallback>
      </Avatar>
    );
  }
  return <LoginIcon />;
};

export default UserIcon;
