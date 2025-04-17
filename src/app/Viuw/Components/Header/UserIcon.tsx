import React from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRouter } from 'next/navigation'; 

import LoginIcon from './LoginIcon';

const UserIcon = () => {
  const { user } = useUser(); 
  const router = useRouter(); 


  const handleClick = () => {
    router.push('/pages/userData'); 
  };

  return (
    <>
      {user ? (
        <img
          src={user.UserImageURL} 
          alt="User Avatar"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-white shadow cursor-pointer"
          onClick={handleClick} 
        />
      ) : (
        <LoginIcon />
      )}
    </>
  );
};

export default UserIcon;
