'use client';

import { useLoginRedirect } from '@/app/Controller/Hooks/User/useLoginRedirect';
import React from 'react';
import { MdAccountCircle } from 'react-icons/md';


const LoginIcon = () => {
  const { redirectToLogin } = useLoginRedirect();

  return (
    <MdAccountCircle
      className="text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white"
      title="Login"
      onClick={redirectToLogin}
    />
  );
};

export default LoginIcon;
