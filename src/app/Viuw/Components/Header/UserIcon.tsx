'use client';

import React from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LoginIcon from './LoginIcon';
import { useUserRedirect } from '@/app/Controller/Hooks/User/useUserRedirect';


const UserIcon = () => {
  const { user } = useUser();
  const { redirectToProfile } = useUserRedirect();

  return (
    <>
      {user ? (
        <Avatar
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer"
          onClick={redirectToProfile}
        >
          <AvatarImage src={user.UserImageURL} alt={user.UserFirstName || 'User Avatar'} />
          <AvatarFallback>
            {user.UserFirstName ? user.UserFirstName.slice(0, 2).toUpperCase() : 'US'}
          </AvatarFallback>
        </Avatar>
      ) : (
        <LoginIcon />
      )}
    </>
  );
};

export default UserIcon;
