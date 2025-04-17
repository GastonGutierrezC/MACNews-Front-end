'use client';

import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const LoginIcon = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/pages/enterUser');
  };

  return (
    <MdAccountCircle
      className="text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white"
      title="Login"
      onClick={handleClick}
    />
  );
};

export default LoginIcon;
