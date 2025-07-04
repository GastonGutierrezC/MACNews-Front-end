'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LoginIcon from './LoginIcon';
import { useUserRedirect } from '@/app/Controller/Hooks/User/useUserRedirect';
import { useUserProfile } from '@/app/Controller/Hooks/User/useUserProfile';
import { useToken } from '@/app/Controller/Context/UserContext';


const UserIcon = () => {
  const { token } = useToken();
  const { profile: user, loading } = useUserProfile();
  const { redirectToProfile } = useUserRedirect();
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
